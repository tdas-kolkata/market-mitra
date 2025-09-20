from sqlalchemy import Column, Integer, String
from models import common_base

class Company(common_base.Base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)            # Company Name
    industry = Column(String, nullable=False)        # Industry
    symbol = Column(String, unique=True, nullable=False)  # Stock symbol
    country = Column(String, nullable=False)  # Stock symbol
    source = Column(String, nullable=False)  # Stock symbol
    isin_code = Column(String, unique=True, nullable=False)  # ISIN Code
