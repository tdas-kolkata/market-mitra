from prefect import flow

if __name__ == "__main__":
    flow.from_source(
        source="https://github.com/tdas-kolkata/market-mitra.git",
        entrypoint="jobs/pricing/load_all_daily_pricing.py:load_all_daily_pricing",
    ).deploy(
        description="Loads daily pricing",
        work_pool_name="etl-workers",
        name="pricing-load",
        tags=["pricing", "python"]
    )