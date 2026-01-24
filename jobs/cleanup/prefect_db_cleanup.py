from prefect import flow, task, get_run_logger
from sqlalchemy.ext.asyncio import create_async_engine 
from sqlalchemy import text
import os

@task
async def clean_up_prefect_db():
    logger = get_run_logger()
    engine = create_async_engine(os.getenv("PREFECT_API_DATABASE_CONNECTION_URL"), echo = True)

    async with engine.begin() as conn:
        logger.info("Successfully connected to prefect db")
        statements = [
            "DELETE FROM task_run WHERE start_time < NOW() - INTERVAL '3 days'",
            "DELETE FROM task_run_state WHERE timestamp < NOW() - INTERVAL '3 days'",
            "DELETE FROM flow_run WHERE start_time < NOW() - INTERVAL '3 days'",
            "DELETE FROM flow_run_state WHERE timestamp < NOW() - INTERVAL '3 days'",
            "DELETE FROM log WHERE timestamp < NOW() - INTERVAL '3 days'",
            "DELETE FROM artifact WHERE created < NOW() - INTERVAL '3 days'",
            "DELETE FROM artifact_collection WHERE created < NOW() - INTERVAL '3 days'",
        ]
        for sql in statements:
            result = await conn.execute(text(sql))
            logger.info(f"Executed cleanup: {sql} → {result.rowcount} rows")
        


@flow
async def clean_up_db():
    await clean_up_prefect_db()




