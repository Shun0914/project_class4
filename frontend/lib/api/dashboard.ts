// frontend/lib/api/dashboard.ts

/**
 * ダッシュボードサマリーデータの取得を行うAPIクライアント関数
 * * @param year  - 集計対象の年
 * @param month - 集計対象の月
 * @returns 予算、支出、カテゴリ別集計を含むサマリーオブジェクト
 */
export async function getDashboardSummary(year: number, month: number) {
  // 認証トークンの取得：
  // ログイン時に保存したJWTトークンをローカルストレージから取得し、リクエストヘッダーに使用します。
  const token = localStorage.getItem('access_token');

  // APIリクエストの実行：
  // 環境変数 NEXT_PUBLIC_API_URL を基準に、クエリパラメータとして年月を渡します。
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/v1/dashboard/summary?year=${year}&month=${month}`,
    {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    }
  );

  // エラーハンドリング：
  if (!res.ok) {
    // 401エラー（未認証/有効期限切れ）の場合は、ユーザーに再ログインを促すメッセージを投げます。
    if (res.status === 401) {
       throw new Error('セッションが切れました。再ログインしてください。');
    }
    // その他の異常系エラー
    throw new Error('データの取得に失敗しました');
  }

  // 成功時はレスポンスボディをJSONとしてパースして返却
  return res.json();
}