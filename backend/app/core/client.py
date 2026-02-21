# app/core/client.py

import httpx
import asyncio

class HttpClientHolder:
    def __init__(self):
        self.client: httpx.AsyncClient | None = None

    def init_client(self):
        """
        アプリ起動時に1度だけ呼び出す初期化メソッド
        """
        # コネクションプールの設定
        # max_connections: 同時接続数の上限
        # max_keepalive_connections: 維持する空きコネクション数
        limits = httpx.Limits(
            max_connections=100, 
            max_keepalive_connections=20,
            keepalive_expiry=50.0
        )

        # タイムアウトの設定（デフォルトは5秒程度が適切）
        timeout = httpx.Timeout(10.0, connect=2.0)

        self.client = httpx.AsyncClient(
            limits=limits,
            timeout=timeout,
            http2=True,  # サーバーが対応していればHTTP/2で高速化
            trust_env=True # 環境変数（プロキシ等）を読み込む
        )

    async def close_client(self):
        """
        アプリ終了時にコネクションを安全に閉じる
        """
        if self.client:
            await self.client.aclose()
            self.client = None

# インスタンスを作成
cms = HttpClientHolder()