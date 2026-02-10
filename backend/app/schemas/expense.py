from datetime import date
from pydantic import BaseModel

class ExpenseCreateRequest(BaseModel):
    item: str
    category_id: str
    price: int
    expense_date: date

