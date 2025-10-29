import os 
import sys
import dotenv
from prefect import flow, task, get_run_logger
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine
from daily.load_daily_pricing import load_daily_pricing
import asyncio


dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env')
dotenv.load_dotenv(dotenv_path)

sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'jobs'))
from models.company import Company  # noqa: E402


@task
async def get_company_list()->list[Company]:
    logger = get_run_logger()
    engine = create_async_engine(os.getenv("DB_URL_ASYNC"))
    statement = select(Company.name, Company.isin_code, Company.symbol)
    logger.info(f"Running SQL - {statement.compile()}")
    async with engine.connect() as conn:
        logger.info("Successfully connected to the database")
        results = await conn.execute(statement)
        companies = results.fetchall()
    return companies

@task(tags=["pricing-child-flows"])
async def run_load_daily_pricing(symbol, isin_code, period):
    await asyncio.to_thread(load_daily_pricing,symbol, isin_code, period)

@flow(log_prints=True)
def load_all_daily_pricing(period:str = '1d', concurrency_limit:int = 3):
    logger = get_run_logger()
    companies = get_company_list.submit().result()
    logger.info(f"Pulling data for {len(companies)} companies")
    futures = []

    for i, company in enumerate(companies):
        logger.info(f"Starting the loading- {i} - {company.name}")
        f = run_load_daily_pricing.submit(company.symbol, company.isin_code, period)
        futures.append(f)
        logger.info(f"Completed the loading- {i} - {company.name}")

    for f in futures:
        f.result()
    # semaphore = asyncio.Semaphore(concurrency_limit)

    # async def limited_task(i, symbol, isin_code, period):
    #     async with semaphore:
    #         logger.info(f"Starting the loading- {i} - {symbol}")
    #         run_load_daily_pricing.submit(symbol, isin_code, period)
    #         logger.info(f"Completed the loading- {i} - {symbol}")

    # await asyncio.gather(*(limited_task(i,company.symbol, company.isin_code, period) for i, company in enumerate(companies)))

# if __name__ == '__main__':
#     load_all_daily_pricing(period='1d')