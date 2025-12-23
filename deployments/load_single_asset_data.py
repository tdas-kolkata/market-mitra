from prefect import flow

if __name__ =='__main__':
    flow.from_source(
        source="https://github.com/tdas-kolkata/market-mitra.git",
        entrypoint="jobs\pricing\daily\load_daily_pricing.py:load_daily_pricing",
    ).deploy(
        name="single-pricing-load",
        work_pool_name="etl-workers",
        description="Loads price history of a single asset",
        tags=["python"],
        concurrency_limit=2
    )