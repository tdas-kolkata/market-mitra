from prefect import flow

if __name__ == '__main__':
    flow.from_source(
        source="https://github.com/tdas-kolkata/market-mitra.git",
        entrypoint="jobs/update_view.py:update_view_flow",
    ).deploy(
        name = "risk-return-view-refresher",
        description="Refreshes the risk return view",
        work_pool_name="etl-workers",
    )