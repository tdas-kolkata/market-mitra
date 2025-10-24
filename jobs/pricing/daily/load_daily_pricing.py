import os
from prefect import flow, task, get_run_logger
import yfinance as yf
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import dotenv
import sys

dotenv_path = os.path.join(os.path.dirname(__file__), '..', '..', '..', '.env')
dotenv.load_dotenv(dotenv_path)

sys.path.append(os.path.join(os.path.dirname(__file__), '..', '..', '..', 'jobs'))
from models.price import Price, PriceModel  # noqa: E402



@task
def extract_pricing(symbol:str, period:str)->pd.DataFrame:
    logger = get_run_logger()
    logger.info(f"Pulling price history for {symbol}")
    stock = yf.Ticker(symbol)
    price_history = stock.history(period=period)
    return price_history

@task
def transform_pricing(price_history:pd.DataFrame, symbol:str, isin_code:str)->pd.DataFrame:
    logger = get_run_logger()
    price_history.reset_index(inplace=True)
    price_history["Stock"] = symbol
    price_history["ISIN"] = isin_code
    logger.info("Transfomrmed Pricing data")
    logger.info(price_history.info())

    return price_history

@task
def load_pricing(price_history:pd.DataFrame):
    logger = get_run_logger()
    validated_rows = []
    df_records = price_history.to_dict(orient="records")
    for record in df_records:
        price_row = PriceModel(**record)
        validated_rows.append(price_row)

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
            session.bulk_insert_mappings(Price, validated_rows)
            session.commit()
            logger.info(f"Successfully inserted {len(validated_rows)} records 👍")
        except Exception as e:
            session.rollback()
            logger.error(f"An error occurred: {e}")
            raise e

@flow(log_prints=True)
def load_daily_pricing(symbol:str, isin_code:str, period: str):
    logger = get_run_logger()
    pricing_history = extract_pricing(symbol, period)
    transformed_pricing_history = transform_pricing(pricing_history, symbol, isin_code)
    logger.info(transformed_pricing_history.info())
    load_pricing(transformed_pricing_history)

# if __name__ == "__main__":
#     load_daily_pricing(symbol="TCS.NS", isin_code="INE467B01029", period='7d')