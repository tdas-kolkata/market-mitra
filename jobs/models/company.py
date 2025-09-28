from sqlalchemy import Column, Integer, String
from .common_base import Base as comm_base
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional

class Company(comm_base):
    __tablename__ = "companies"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)            # Company Name
    industry = Column(String, nullable=False)        # Industry
    symbol = Column(String, unique=True, nullable=False)  # Stock symbol
    country = Column(String, nullable=False)  # Stock symbol
    source = Column(String, nullable=False)  # Stock symbol
    isin_code = Column(String, unique=True, nullable=False)  # ISIN Code


class CompanyModel(BaseModel):
    name: str = Field(alias='Company Name')
    industry: str = Field(alias='Industry')
    symbol: str = Field(alias='Symbol')
    country: Optional[str] = Field(None, alias='Country')
    source: Optional[str] = Field(None, alias='Source')
    isin_code: str = Field(alias='ISIN Code')

    model_config = ConfigDict(from_attributes=True)
