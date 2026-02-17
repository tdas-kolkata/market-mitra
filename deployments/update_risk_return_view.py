from prefect import flow

if __name__ == '__main__':
    flow.from_source(
        source="https://github.com/tdas-kolkata/market-mitra.git",
        entrypoint="jobs/pricing/update_risk_return_view.py:update_risk_return_view_flow",
    ).deploy(
        description="Refreshes the risk return view",
        work_pool_name="etl-workers",
    )