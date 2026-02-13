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

export async function createExpense(data: any) {
  // 1. 保存してあるトークンを取得
  const token = localStorage.getItem('access_token');

  // 2. Next.js の Route Handler (/api/expenses) にリクエスト
  const response = await fetch("/api/expenses", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 3. Authorization ヘッダーを付与
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("保存に失敗しました");
  }

  return response.json();
}
