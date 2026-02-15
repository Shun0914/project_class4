import { get, put, ApiError } from '@/lib/api/client';

export type BudgetResponse = {
  id: number;
  user_id: number;
  budget_year: number;
  budget_month: number;
  monthly_budget: number;
  created_at: string;
  updated_at: string;
};

export type BudgetSetRequest = {
  budget_year: number;
  budget_month: number;
  monthly_budget: number;
};

/** 指定年月の予算を取得（未設定時は null を返す） */
export async function getBudget(year: number, month: number): Promise<BudgetResponse | null> {
  try {
    return await get<BudgetResponse>(`/api/budget?year=${year}&month=${month}`);
  } catch (error: unknown) {
    if (error instanceof ApiError && error.status === 404) {
      return null;
    }
    throw error;
  }
}

/** 予算を設定（作成 or 更新） */
export async function setBudget(data: BudgetSetRequest): Promise<BudgetResponse> {
  return await put<BudgetResponse>('/api/budget', data);
}
