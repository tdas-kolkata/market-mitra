import os 
import dotenv
from src.models.company import CompanyBase


if __name__ == "__main__":
    company = CompanyBase(country="IND", id=1 , Industry="metal", Series="ok", source="nifty", Symbol="HFDC", isin_code="IND00123", name="HDFC")