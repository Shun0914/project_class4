export type CreateExpenseRequest = {
  item: string;
  price: number;
  expense_date: string; // YYYY-MM-DD
  category_id?: number | null;
};

export type CreateExpenseResponse = {
  id: number;
  user_id: number;
  item: string;
  price: number;
  expense_date: string;
  category_id: number | null;
  created_at: string;
};

export async function createExpense(
  payload: CreateExpenseRequest
): Promise<CreateExpenseResponse> {
  const res = await fetch("/api/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify(payload),
  });

  if (!res.ok) {
    let detail = "";
    try {
      const data = await res.json();
      detail = data?.detail ? String(data.detail) : JSON.stringify(data);
    } catch {
      // ignore
    }
    throw new Error(detail || `Failed to create expense: ${res.status}`);
  }

  return res.json();
}
