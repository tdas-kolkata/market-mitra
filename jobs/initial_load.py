from prefect import flow, task
from pathlib import Path
import pandas as pd
from models.company import Company, CompanyModel
import dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pydantic import ValidationError

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
dotenv.load_dotenv(dotenv_path)


@task
def read_data(file_name:str)-> pd.DataFrame:
    df = pd.read_csv(Path(f"./ref-data/companies/{file_name}"))
    return df

@task
def transform_data(raw_df:pd.DataFrame) -> pd.DataFrame:
    transformed_df = raw_df
    transformed_df["Source"] = "Nifty50"
    transformed_df["Country"] = "IND"
    transformed_df["Symbol"] = transformed_df["Symbol"] + ".NS"
    return transformed_df

@task
def load_data(transformed_df:pd.DataFrame):
    df_records = transformed_df.to_dict(orient="records")
    validated_companies = []
    for record in df_records:
        try:
            validated_company = CompanyModel(**record)
            validated_companies.append(validated_company.model_dump())
        except ValidationError as e:
            raise(e)
    engine = create_engine(os.getenv("DB_URL"))
    SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    with SessionLocal() as session:
        try:
            session.bulk_insert_mappings(Company, validated_companies)
            session.commit()
            print(f"Successfully inserted {len(validated_companies)} records.")
        except Exception as e:
            session.rollback()
            print(f"An error occurred: {e}")

@flow(log_prints=True)
def load_company_details_flow(file_name:str):
    raw_df = read_data(file_name)
    transformed_df = transform_data(raw_df)
    load_data(transformed_df)
    
    


if __name__ == "__main__":
    load_company_details_flow(file_name="ind_nifty50_list.csv")