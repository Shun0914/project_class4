# app/routers/nearShops.py
# 最寄りのショップ情報取得

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
import os
import httpx
from app.core.client import cms

router = APIRouter(tags=["支出"])

GOOGLE_MAPS_API_KEY = os.getenv("GOOGLE_MAPS_API_KEY")
PLACES_NEARBY_URL = "https://maps.googleapis.com/maps/api/place/nearbysearch/json"

# ==========
# Request / Response schema
# ==========

def get_http_client():
    if cms.client is None:
        raise RuntimeError("HTTP client is not initialized")
    return cms.client

class NearShopsRequest(BaseModel):
    """現在地（緯度・経度）"""
    lat: float = Field(..., description="現在地の緯度")
    lng: float = Field(..., description="現在地の経度")


class PlaceSummary(BaseModel):
    """クライアントへ返す施設情報（必要最小限）"""
    name: str
    place_id: str
    vicinity: str | None = None
    rating: float | None = None
    user_ratings_total: int | None = None
    open_now: bool | None = None
    lat: float | None = None
    lng: float | None = None


@router.post("/nearShops", response_model=list[PlaceSummary])
async def get_near_shops(
    req: NearShopsRequest,
    client: httpx.AsyncClient = Depends(get_http_client)):
    """
    現在地(lat/lng)から最寄りの商業施設をX件返す。
    Places API Nearby Search を rankby=distance で呼び出す。
    """
    if not GOOGLE_MAPS_API_KEY:
        # 環境変数が無いケースはサーバー設定不備なので 500
        raise HTTPException(status_code=500, detail="GOOGLE_MAPS_API_KEY is not set")

    params = {
        "key": GOOGLE_MAPS_API_KEY,
        "location": f"{req.lat},{req.lng}",
        "rankby": "distance",     # 距離順
        # "keyword": ( # 検索キーワードを指定
        #     "restaurant OR convenience_store OR supermarket OR shop OR "
        #     "drugstore OR cafe OR shopping_mall OR department_store OR "
        #     "clothing_store OR jewelry_store OR beauty_salon OR hair_carer OR "
        #     "bakery OR fast_food"
        #    ),
        "language": "ja",
    }

    try:
        res = await client.get(PLACES_NEARBY_URL, params=params)
    except httpx.RequestError as e:
        # 外部APIへの通信問題
        raise HTTPException(status_code=502, detail=f"Places API network error: {str(e)}")

    if res.status_code != 200:
        raise HTTPException(status_code=502, detail=f"Places API request failed: {res.status_code}")

    data = res.json()

    status_ = data.get("status")
    if status_ not in ("OK", "ZERO_RESULTS"):
        # 例：REQUEST_DENIED / INVALID_REQUEST / OVER_QUERY_LIMIT
        raise HTTPException(
            status_code=400,
            detail={
                "status": status_,
                "error_message": "400 Error: Shops cannot get from api.",
            },
        )

    results = data.get("results", [])
    topX = results[:3]

    out: list[PlaceSummary] = []
    for p in topX:
        loc = (p.get("geometry") or {}).get("location") or {}
        opening_hours = p.get("opening_hours") or {}

        out.append(
            PlaceSummary(
                name=p.get("name", ""),
                place_id=p.get("place_id", ""),
                vicinity=p.get("vicinity"),
                rating=p.get("rating"),
                user_ratings_total=p.get("user_ratings_total"),
                open_now=opening_hours.get("open_now"),
                lat=loc.get("lat"),
                lng=loc.get("lng"),
            )
        )

    return out
