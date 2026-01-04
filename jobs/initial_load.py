from prefect import flow, task, get_run_logger
from pathlib import Path
import pandas as pd
from models.company import Company, CompanyModel
import dotenv
import os
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from pydantic import ValidationError
from enum import Enum

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '.env')
dotenv.load_dotenv(dotenv_path)

class FILESOURCE(str, Enum):
    NIFTY50 = "ind_nifty50_list.csv"
    NIFTY_NEXT_50 = "ind_niftynext50_list.csv"
    NIFTY_MIDCAP_150 = "ind_niftymidcap150_list.csv"
    NIFTY_SMALLCAP_250 = "ind_niftysmallcap250_list.csv"

@task
def read_data(file_name:str)-> pd.DataFrame:
    logger = get_run_logger()
    filename = f"./ref-data/companies/{file_name}"
    logger.info(f"looking for file - {file_name} 📖")
    df = pd.read_csv(Path(filename))
    return df

@task
def transform_data(raw_df:pd.DataFrame, file_name:str) -> pd.DataFrame:
    logger = get_run_logger()
    logger.info("Transforming the raw data 👨‍🔧")
    transformed_df = raw_df
    transformed_df["Source"] = file_name
    transformed_df["Country"] = "IND"
    transformed_df["Symbol"] = transformed_df["Symbol"] + ".NS"
    return transformed_df

@task(log_prints=True)
def load_data(transformed_df:pd.DataFrame):
    logger = get_run_logger()
    df_records = transformed_df.to_dict(orient="records")
    validated_companies = []
    for record in df_records:
        try:
            validated_company = CompanyModel(**record)
            validated_companies.append(validated_company.model_dump())
            logger.debug(f"Validation passed - {validated_company.name}")
        except ValidationError as e:
            logger.error(f"Validation failed for {record["Company Name"]}")
            raise e
    try:
        engine = create_engine(os.getenv("DB_URL"))
        # Try connecting to the database to check connectivity
        with engine.connect() as _:
            pass
        SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
    except Exception as conn_err:
        logger.error(f"Database connection failed: {conn_err} 🤒")
        raise
    with SessionLocal() as session:
        try:
            session.bulk_insert_mappings(Company, validated_companies)
            session.commit()
            logger.info(f"Successfully inserted {len(validated_companies)} records 👍")
        except Exception as e:
            session.rollback()
            logger.error(f"An error occurred: {e}")
            raise e


@task(task_run_name="process-file-{file_name}")
def process_file(file_name:str):
    raw_df = read_data(file_name)
    transformed_df = transform_data(raw_df, file_name)
    load_data(transformed_df)

@flow(log_prints=True)
def load_company_details_flow(file_names:list[FILESOURCE]):
    for file_name in file_names:
        raw_df = read_data(file_name)
        transformed_df = transform_data(raw_df, file_name)
        load_data(transformed_df)
    


if __name__ == "__main__":
    load_company_details_flow(file_names=["ind_nifty50_list.csv", "ind_niftymidcap150_list.csv"])