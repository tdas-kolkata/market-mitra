import os
from prefect import flow, task, get_run_logger
import yfinance as yf
import pandas as pd
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
import dotenv
import sys
from sqlalchemy.dialects.postgresql import insert

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
        price_history = price_history.rename(
            columns={
                "Date": "date",
                "Open": "open",
                "High": "high",
                "Low": "low",
                "Close": "close",
                "Volume": "volume",
                "Dividends": "dividends",
                "Stock Splits": "stock_splits",
                "Stock": "stock",
                "ISIN": "isin_code",
            }
        )


    records = price_history.to_dict(orient="records")
    engine = create_engine(os.getenv("DB_URL"))
    try:
        with engine.begin() as conn:
            stmt = insert(Price).values(records)
            stmt = stmt.on_conflict_do_update(
                index_elements=["stock", "date"],
                set_={
                    "open": stmt.excluded.open,
                    "high": stmt.excluded.high,
                    "low": stmt.excluded.low,
                    "close": stmt.excluded.close,
                    "volume": stmt.excluded.volume,
                },
            )
            conn.execute(stmt)

        logger.info(f"Upserted {len(records)} rows")

    except Exception as e:
        logger.error(f"Pricing upsert failed: {e}")
        raise

@flow(log_prints=True, flow_run_name="daily-price-{symbol}-{period}")
def load_daily_pricing(symbol:str, isin_code:str, period: str):
    logger = get_run_logger()
    pricing_history = extract_pricing(symbol, period)
    transformed_pricing_history = transform_pricing(pricing_history, symbol, isin_code)
    logger.info(transformed_pricing_history.info())
    if len(transformed_pricing_history) > 0:
        load_pricing(transformed_pricing_history)

if __name__ == "__main__":
    load_daily_pricing(symbol="RELINFRA.NS", isin_code="INE036A01016", period='1d')