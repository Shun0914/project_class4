# app/routers/nearShops.py
# 最寄りのショップ情報取得（Yahoo!ローカルサーチAPI版）

from fastapi import APIRouter, HTTPException, Depends
from pydantic import BaseModel, Field
import os, re
import httpx
from app.core.client import cms

router = APIRouter(tags=["支出"])

# Yahoo!ローカルサーチAPI（YOLP）
# Doc: https://developer.yahoo.co.jp/webapi/map/openlocalplatform/v1/localsearch.html
YAHOO_APP_ID = os.getenv("YAHOO_APP_ID")  # = Client ID（アプリケーションID）
YAHOO_LOCAL_SEARCH_URL = "https://map.yahooapis.jp/search/local/V1/localSearch"

# 電話帳カセット（全国の店舗を網羅したデータ）
# Doc内に明記されている固定値
PHONEBOOK_CID = "d8a23e9e64a4c817227ab09858bc1330"

# デモ用座標（Tech0事務所）
DEMO_LAT = 35.6812
DEMO_LNG = 139.7671

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


def _parse_lon_lat(coords: str | None) -> tuple[float | None, float | None]:
    """YOLPのCoordinates（'lon,lat'）をfloatへ"""
    if not coords or "," not in coords:
        return None, None
    lon_s, lat_s = coords.split(",", 1)
    try:
        return float(lon_s), float(lat_s)
    except ValueError:
        return None, None


@router.post("/nearShops", response_model=list[PlaceSummary])
async def get_near_shops(
    req: NearShopsRequest,
    n: int = 3,
    client: httpx.AsyncClient = Depends(get_http_client),
):
    """
    現在地(lat/lng)から最寄りの商業施設を返す（Yahoo!ローカルサーチAPI）。
    環境変数 IS_DEMO が 'true' または '1' の場合は固定の座標を使用する。
    """
    if not YAHOO_APP_ID:
        # 環境変数が無いケースはサーバー設定不備なので 500
        raise HTTPException(status_code=500, detail="YAHOO_APP_ID is not set")

    is_demo = os.getenv("DEMO_FLAG", "false").lower() in ("true", "1")
    if is_demo:
        target_lat = DEMO_LAT
        target_lng = DEMO_LNG
    else:
        target_lat = req.lat
        target_lng = req.lng

    params = {
        "appid": YAHOO_APP_ID,
        "cid": PHONEBOOK_CID,   # 電話帳カセット（広く商業施設を拾いやすい）
        "lat": round(target_lat, 4),
        "lon": round(target_lng, 4),
        "dist": 1,              # 検索半径（km）※必要なら調整
        "sort": "geo",          # 距離順（球面三角法）
        "results": n,           # 最寄り n件
        "output": "json",
        "detail": "standard",
        "group": "gid",         # 同一店舗の名寄せ
        "distinct": "true",
    }

    try:
        res = await client.get(YAHOO_LOCAL_SEARCH_URL, params=params)
    except httpx.RequestError as e:
        raise HTTPException(status_code=502, detail=f"Yahoo Local Search network error: {str(e)}")

    if res.status_code != 200:
        raise HTTPException(status_code=502, detail=f"Yahoo Local Search request failed: {res.status_code}")

    data = res.json()

    # 正常時は ResultInfo.Status=200（エラー時は別コード）
    result_info = (data.get("ResultInfo") or {})
    status_code = result_info.get("Status")
    if status_code not in (200, "200"):
        raise HTTPException(
            status_code=400,
            detail={
                "status": status_code,
                "description": result_info.get("Description"),
                "error_message": "400 Error: Shops cannot get from api.",
            },
        )

    features = data.get("Feature") or []
    out: list[PlaceSummary] = []

    for f in features[:n]:
        raw_name = f.get("Name") or ""
        name = re.split(r'[ 　]', raw_name)[0] # 名前の最初のブロックだけ
        # place_id 相当：名寄せID(Gid)があれば優先、なければId
        place_id = f.get("Gid") or f.get("Id") or ""
        coords = (f.get("Geometry") or {}).get("Coordinates")
        lon, lat = _parse_lon_lat(coords)
        prop = f.get("Property") or {}
        address = prop.get("Address")

        # rating / review count 等はカセットによって無い場合があるため、あれば拾う
        rating = prop.get("Rating")
        review_count = prop.get("ReviewCount")

        out.append(
            PlaceSummary(
                name=name,
                place_id=str(place_id),
                vicinity=address,
                rating=float(rating) if rating is not None else None,
                user_ratings_total=int(review_count) if review_count is not None else None,
                open_now=None,  # YOLPのローカルサーチAPIは open_now 相当が常にあるわけではない
                lat=lat,
                lng=lon,  # 注意：YOLPはlon,lat（Googleはlat,lng）
            )
        )

    return out
