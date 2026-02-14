from datetime import date, datetime
from typing import List, Optional
from pydantic import BaseModel

class ExpenseCreateRequest(BaseModel):
    item: str
    category_id: int
    price: int
    expense_date: date

class ExpenseResponse(BaseModel):
    id: int
    item: str
    price: int
    expense_date: date
    category_id: Optional[int]
    category_name: Optional[str]
    created_at: datetime

class ExpenseListResponse(BaseModel):
    expenses: List[ExpenseResponse]

