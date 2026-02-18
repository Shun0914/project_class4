// frontend/app/receipt/types.ts

export type ReceiptItem = {
  name: string;
  price: number;
};

export type AnalysisResult = {
  store: string;
  date: string;
  items: ReceiptItem[];
  total: number;
};