from prefect import flow, task, get_run_logger
from sqlalchemy import create_engine, text
import dotenv
import os
from enum import Enum

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
dotenv.load_dotenv(dotenv_path)


class DB_VIEW(str, Enum):
    RISK_RETURN_VIEW = "risk_return_view"

@task
def update_view_task(view_name: DB_VIEW):
    logger = get_run_logger()
    statement = text(f"refresh materialized view {view_name.value};")
    engine = create_engine(os.getenv("DB_URL"))
    try:
        with engine.begin() as conn:
            conn.execute(statement)
        logger.info(f"Successfully refreshed the {view_name.value}")
    except Exception as e:
        logger.error(e)


@flow(log_prints=True)
def update_view_flow(view_name: DB_VIEW):
    update_view_task(view_name)


if __name__ == '__main__':
    update_view_flow(view_name = DB_VIEW.RISK_RETURN_VIEW)

