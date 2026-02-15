import os
import base64
import json
from openai import AzureOpenAI

# 環境変数の読み込み
endpoint = os.getenv("AZURE_OPENAI_ENDPOINT")
api_key = os.getenv("AZURE_OPENAI_API_KEY")
deployment = os.getenv("AZURE_OPENAI_DEPLOYMENT_NAME")
api_version = os.getenv("AZURE_OPENAI_API_VERSION")

client = AzureOpenAI(
    azure_endpoint=endpoint,
    api_key=api_key,
    api_version=api_version
)

def analyze_receipt_image(image_bytes: bytes):
    base64_image = base64.b64encode(image_bytes).decode('utf-8')

    # より具体的な指示に変更（精度向上）
    prompt = """
    あなたはプロの会計士として、提供されたレシート画像を【1文字も漏らさず】正確にデータ化してください。
    
    【抽出ルール】
    1. store: 店名を正確に抽出。
    2. date: 「2024/01/01」のような表記を「2024-01-01」形式に変換。不明な場合は今日の年月日。
    3. items: 
       - 品目名と価格をペアで抽出。
       - 「割引」「値引」がある場合は、その金額をマイナス数値（例: -50）で一つの品目として追加。
       - 個数や単価ではなく、その行の【最終的な支払金額】を抽出。
    4. total: レシートに記載された最終的な「合計金額」を数値で抽出。
    
    必ず以下のJSON形式で出力してください：
    {
      "date": "YYYY-MM-DD",
      "store": "店名",
      "items": [ {"name": "品名", "price": 100}, ... ],
      "total": 1000
    }
    """

    response = client.chat.completions.create(
        model=deployment,
        messages=[
            {
                "role": "user",
                "content": [
                    {"type": "text", "text": prompt},
                    {"type": "image_url", "image_url": {"url": f"data:image/jpeg;base64,{base64_image}"}}
                ],
            }
        ],
        response_format={ "type": "json_object" },
        max_tokens=1500
    )
    
    return response.choices[0].message.content