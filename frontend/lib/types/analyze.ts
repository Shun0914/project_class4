export interface AnalyzeResponse {
  user: string;
  total: number;
  budget: number | null;
  remaining: number | null;
  remaining_rate: number | null;
  pace_rate: number | null;
  coach_type: string;
  coach_message: string;
  has_expenses: boolean;
  has_budget: boolean;
  weekly_report: WeeklyReport;
}

export interface WeeklyReport {
  start_date: string;
  end_date: string;
  total: number;
  count: number;
  average: number;
  coach_message: string;
}

export interface AIAnalyzeResponse {
  user: string;
  total: number;
  budget: number;
  coach_type: string;
  ai_message: string;
}
