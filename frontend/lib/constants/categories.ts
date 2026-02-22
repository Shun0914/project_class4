// frontend/lib/constants/categories.ts

export type CategorySetting = {
  id: number;
  color: string;
};

/**
 * DB(categoriesTBL)の内容を正としたカテゴリ設定
 * 視認性を重視し、重複のないカラーパレットを割り当てています
 */
export const CATEGORY_CONFIG: Record<string, CategorySetting> = {
  "未分類": { id: 1, color: "#9E9E9E" },       
  "食費": { id: 2, color: "#fa4848" },     
  "日用品": { id: 3, color: "#fab948" },   
  "趣味・娯楽": { id: 4, color: "#48db3e" },    
  "交通費": { id: 5, color: "#3ec3db" },   
  "水道・光熱費": { id: 6, color: "#483edb" },    
};

/* 　デモは旧カテゴリで実施のため新カテゴリをコメントアウト（ここから）
export const CATEGORY_CONFIG: Record<string, CategorySetting> = {
  "食費": { id: 1, color: "#FF5252" },       // レッド
  "交通費": { id: 2, color: "#448AFF" },     // ブルー
  "住居費": { id: 3, color: "#FF9800" },     // オレンジ
  "光熱費": { id: 4, color: "#FFEB3B" },     // イエロー
  "通信費": { id: 5, color: "#26C6DA" },     // シアン
  "娯楽費": { id: 6, color: "#66BB6A" },     // グリーン
  "書籍・教育": { id: 7, color: "#AB47BC" }, // パープル
  "医療費": { id: 8, color: "#EC407A" },     // ピンク
  "被服費": { id: 9, color: "#78909C" },     // ブルーグレー
  "その他": { id: 10, color: "#9E9E9E" },    // グレー
};

デモは旧カテゴリで実施のため新カテゴリをコメントアウト（ここまで）　*/

export const DEFAULT_CATEGORY: CategorySetting = {
  id: 0,
  color: "#ADB5BD"
};

export const getCategoryById = (id: number | null): CategorySetting => {
  const found = Object.values(CATEGORY_CONFIG).find(cat => cat.id === id);
  return found || DEFAULT_CATEGORY;
};

export const getCategoryByName = (name: string): CategorySetting => {
  return CATEGORY_CONFIG[name] || DEFAULT_CATEGORY;
};