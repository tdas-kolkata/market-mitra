from prefect import flow, task
from pathlib import Path
import pandas as pd

@task
def read_data()-> pd.DataFrame:
    df = pd.read_csv(Path("./ref-data/companies/ind_nifty50_list.csv"))
    return df

@task
def transform_data(raw_df:pd.DataFrame) -> pd.DataFrame:
    transformed_df = raw_df
    transformed_df["Source"] = "Nifty50"
    transformed_df["Country"] = "IND"
    transformed_df["Symbol"] = transformed_df["Symbol"] + ".NS"
    return transformed_df

@flow(log_prints=True)
def load_company_details_flow():
    raw_df = read_data()
    transformed_df = transform_data(raw_df)
    print(transformed_df)

if __name__ == "__main__":
    load_company_details_flow()