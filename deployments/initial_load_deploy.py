from prefect import flow

if __name__ == "__main__":
    flow.from_source(
        source="https://github.com/tdas-kolkata/market-mitra.git",
        entrypoint="jobs/initial_load.py:load_company_details_flow",
    ).deploy(
        description="Loads initial comnay details",
        work_pool_name="etl-workers",
        name="initial-load",
        tags=["initial", "python"]
    )