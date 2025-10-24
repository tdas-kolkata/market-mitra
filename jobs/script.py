import requests
import pandas as pd
import time
from sqlalchemy import create_engine
from urllib.parse import quote_plus


def fetch_nse_annual_reports(symbol: str) -> pd.DataFrame:
    """
    Fetch recent annual report announcements for an NSE-listed company.
    Works around NSE's anti-bot protection by initializing a session first.
    """
    base_url = "https://www.nseindia.com"
    api_url = f"{base_url}/api/corporate-announcements?symbol={symbol}&limit=1000"

    headers = {
        "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:128.0) Gecko/20100101 Firefox/128.0",
        "Accept-Encoding": "gzip, deflate, br",
        "Accept-Language": "en-US,en;q=0.9",
        "Referer": f"{base_url}/get-quotes/equity?symbol={symbol}",
        "Accept": "application/json, text/javascript, */*; q=0.01",
        "Connection": "keep-alive",
    }

    session = requests.Session()
    session.headers.update(headers)

    # Step 1: Hit homepage to get cookies
    _ = session.get(base_url, timeout=10)
    time.sleep(10)  # NSE needs a slight delay

    # Step 2: Fetch corporate announcements
    res = session.get(api_url, timeout=10)
    if res.status_code == 401:
        raise Exception("Unauthorized. NSE blocked request — try again after a short delay.")
    res.raise_for_status()

    data = res.json()
    reports = []

    for item in data.get("data", []):
        headline = item.get("headline", "").lower()
        if "annual report" in headline:
            pdf_link = item.get("attchmntFile", "")
            if pdf_link and not pdf_link.startswith("http"):
                pdf_link = base_url + pdf_link
            reports.append({
                "symbol": symbol,
                "date": item.get("sm_date"),
                "headline": item.get("headline"),
                "pdf_url": pdf_link,
            })

    return pd.DataFrame(reports)


def save_to_sql(df: pd.DataFrame, db_url: str, table_name="annual_reports"):
    """
    Save DataFrame to SQL database.
    """
    engine = create_engine(db_url)
    df.to_sql(table_name, engine, if_exists="append", index=False)
    print(f"✅ Saved {len(df)} records to '{table_name}'.")


if __name__ == "__main__":
    symbols = ["RELIANCE", "INFY", "TCS"]

    all_reports = []
    for sym in symbols:
        print(f"Fetching reports for {sym}...")
        try:
            df = fetch_nse_annual_reports(sym)
            if not df.empty:
                all_reports.append(df)
                print(f"✅ Found {len(df)} reports for {sym}")
            else:
                print(f"⚠️ No annual reports found for {sym}")
        except Exception as e:
            print(f"❌ Error fetching {sym}: {e}")
        time.sleep(2)  # avoid rate-limit blocking

    if all_reports:
        final_df = pd.concat(all_reports, ignore_index=True)
        db_url = "sqlite:///nse_reports.db"
        save_to_sql(final_df, db_url)
        print(final_df)
    else:
        print("⚠️ No reports found for any symbol.")
