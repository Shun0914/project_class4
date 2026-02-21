from fastapi import APIRouter, UploadFile, File
from app.services.receipt_service import analyze_receipt_image
import json

router = APIRouter(prefix="/receipt", tags=["receipt"])

@router.post("/analyze")
async def upload_receipt(file: UploadFile = File(...)):
    """
    画面から送られてきたレシート画像をAIに渡す窓口
    """
    # 1. 送られてきたファイルの内容を読み込む
    image_bytes = await file.read()
    
    # 2. AI解析サービス（receipt_service.py）を呼び出す
    analysis_result_str = analyze_receipt_image(image_bytes)
    
    # 3. 文字列をプログラムで扱いやすい辞書形式（JSON）に変換する
    try:
        analysis_result_json = json.loads(analysis_result_str)
    except Exception:
        # もしAIの回答がJSONじゃなかった時のための予備
        return {"status": "error", "message": "AI解析に失敗しました", "raw": analysis_result_str}
    
    # 4. 成功した結果を返す
    return {"status": "success", "data": analysis_result_json}