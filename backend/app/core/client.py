import httpx

class HttpClientHolder:
    client: httpx.AsyncClient = None

# インスタンスを1つだけ作成（これを各所からインポートする）
cms = HttpClientHolder()