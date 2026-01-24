from prefect import flow
from prefect.schedules import Cron

if __name__ == '__main__':
    flow.from_source(
        source = "https://github.com/tdas-kolkata/market-mitra.git",
        entrypoint = "jobs/cleanup/prefect_db_cleanup.py:clean_up_db"
    ).deploy(
        name = "regular-cleanup",
        work_pool_name = "etl-workers",
        description = "cleans up the old data to clear the database",
        tags = ["db", "cleanup"],
        schedule = Cron(
            "0 23 * * 1-5",          # 11:00 PM every day
            timezone="Asia/Kolkata"
        )
    )