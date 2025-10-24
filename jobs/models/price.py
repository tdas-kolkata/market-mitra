from datetime import datetime
from pydantic import BaseModel, Field, ConfigDict
from typing import Optional
from sqlalchemy import Column, DateTime, Float, Integer, ForeignKey, VARCHAR, PrimaryKeyConstraint
from .common_base import Base as comm_base

class PriceModel(BaseModel):
    date: datetime = Field(..., alias="Date")
    open: float = Field(..., alias="Open")
    high: float = Field(..., alias="High")
    low: float = Field(..., alias="Low")
    close: float = Field(..., alias="Close")
    volume: int = Field(..., alias="Volume")
    dividends: Optional[float] = Field(0.0, alias="Dividends")
    stock_splits: Optional[float] = Field(0.0, alias="Stock Splits")
    stock: str = Field(..., alias="Stock")
    isin_code:str = Field(..., alias="ISIN")


    model_config = ConfigDict(from_attributes=True)



class Price(comm_base):
    __tablename__ = "prices"

    date = Column(DateTime(timezone=True), nullable=False, index=True)
    open = Column(Float, nullable=False)
    high = Column(Float, nullable=False)
    low = Column(Float, nullable=False)
    close = Column(Float, nullable=False)
    volume = Column(Integer, nullable=False)
    dividends = Column(Float, default=0.0)
    stock_splits = Column(Float, default=0.0)
    stock = Column(VARCHAR, nullable=False, index=True)
    isin_code = Column(
        VARCHAR,
        ForeignKey("companies.isin_code", ondelete="CASCADE"),
        nullable=False,
    )

    __table_args__ = (
        PrimaryKeyConstraint(date, stock),
    )
