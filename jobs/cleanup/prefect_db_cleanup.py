from prefect import flow, task, get_run_logger
from sqlalchemy import create_engine
import os

@task
def clean_up_prefect_db():
    logger = get_run_logger()
    engine = create_engine(os.getenv("PREFECT_API_DATABASE_CONNECTION_URL"), echo = True)

    with engine.connect() as conn:
        logger.info("Successfully connected to prefect db")
        conn.execute("""
                    DELETE FROM task_run WHERE start_time < NOW() - INTERVAL '3 days';
                    DELETE FROM task_run_state WHERE timestamp < NOW() - INTERVAL '3 days';
                    DELETE FROM flow_run WHERE start_time < NOW() - INTERVAL '3 days';
                    DELETE FROM flow_run_state WHERE timestamp < NOW() - INTERVAL '3 days';
                    DELETE FROM log WHERE timestamp < NOW() - INTERVAL '3 days';
                    DELETE FROM artifact WHERE created < NOW() - INTERVAL '3 days';
                    DELETE FROM artifact_collection WHERE created < NOW() - INTERVAL '3 days';
                    """
            )
        


@flow
def clean_up_db():
    clean_up_prefect_db()

if __name__ == '__main__':
    clean_up_db()



