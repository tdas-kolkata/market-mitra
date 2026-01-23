from prefect import flow

if __name__ == '__main__':
    flow.from_source(
        source = "https://github.com/tdas-kolkata/market-mitra.git",
        entrypoint = "jobs/cleanup/prefect_db_cleanup.py:clean_up_db"
    ).deploy(
        name = "regular-cleanup",
        work_pool_name = "etl-workers",
        description = "cleans up the old data to clear the database",
        tags = ["db", "cleanup"]
    )