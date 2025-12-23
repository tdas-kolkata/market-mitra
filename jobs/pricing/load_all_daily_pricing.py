import os 
import sys
import dotenv
from prefect import flow, task, get_run_logger
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine
import asyncio
from prefect.deployments import run_deployment

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


@flow(log_prints=True)
async def load_all_daily_pricing(period:str = '1d', concurrency_limit:int = 3):
    logger = get_run_logger()
    companies = get_company_list.submit().result()
    logger.info(f"Pulling data for {len(companies)} companies")

    for i, company in enumerate(companies):
        await run_deployment(
            name="load-daily-pricing/single-pricing-load",
            parameters={
                "symbol": company.symbol,
                "isin_code": company.isin_code,
                "period": period
            },
            timeout=0,
            as_subflow=True
        )


if __name__ == '__main__':
    asyncio.run(load_all_daily_pricing(period='7d'))