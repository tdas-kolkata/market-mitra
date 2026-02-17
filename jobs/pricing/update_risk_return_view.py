from prefect import flow, task, get_run_logger
from sqlalchemy import create_engine, text
import dotenv
import os

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '.env')
dotenv.load_dotenv(dotenv_path)


@task
def update_risk_return_view_task():
    logger = get_run_logger()
    statement = text("refresh materialized view risk_return_view;")
    engine = create_engine(os.getenv("DB_URL"))
    try:
        with engine.begin() as conn:
            conn.execute(statement)
    except Exception as e:
        logger.error(e)


@flow
def update_risk_return_view_flow():
    update_risk_return_view_task()


# if __name__ == "__main__":
#     update_risk_return_view_flow()
