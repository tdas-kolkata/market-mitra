import os 
import sys
import dotenv
from enum import Enum
from prefect import flow, task, get_run_logger
from sqlalchemy import select
from sqlalchemy.ext.asyncio import create_async_engine
from prefect.deployments import run_deployment
from daily.load_daily_pricing import load_daily_pricing

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env')
dotenv.load_dotenv(dotenv_path)

sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', 'jobs'))
from models.company import Company  # noqa: E402


class RUNMODE(str, Enum):
    SYNC = "sync"
    ASYNC = "async"

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
def load_all_daily_pricing(period:str = '1d', mode:RUNMODE = RUNMODE.SYNC):
    logger = get_run_logger()
    companies = get_company_list.submit().result()
    logger.info(f"Pulling data for {len(companies)} companies")
        
              
    for i, company in enumerate(companies):
        logger.info(f"Deploying jobs for {company.symbol}")
        if mode == RUNMODE.ASYNC:
            run_deployment(
                name="load-daily-pricing/single-pricing-load",
                parameters={
                    "symbol": company.symbol,
                    "isin_code": company.isin_code,
                    "period": period
                },
                timeout=0,
                as_subflow=True
            )
        if mode == RUNMODE.SYNC:
            load_daily_pricing(company.symbol, company.isin_code, period)

if __name__ == '__main__':
    load_all_daily_pricing(period='7d', mode = RUNMODE.SYNC)