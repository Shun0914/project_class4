import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

// バックエンド側の実装差を吸収するために候補を複数持つ
const CANDIDATE_PATHS = ["/nearShops", "/api/nearShops"];

async function forward(req: NextRequest, path: string, bodyText: string) {
  const target = new URL(path, BACKEND_URL);

  return fetch(target.toString(), {
    method: "POST",
    headers: {
      "Content-Type": req.headers.get("content-type") ?? "application/json",
      // クライアントからの認証情報を引き継ぐ
      "Authorization": req.headers.get("authorization") ?? "",
      "Cookie": req.headers.get("cookie") ?? "",
    },
    body: bodyText,
    redirect: "manual",
  });
}

export async function POST(req: NextRequest) {
  let lastRes: Response | null = null;
  const bodyText = await req.text();

  for (const path of CANDIDATE_PATHS) {
    try {
      const res = await forward(req, path, bodyText);
      lastRes = res;

      // 成功 or 404以外ならそのまま返す
      if (res.ok || res.status !== 404) {
        const text = await res.text();
        const contentType = res.headers.get("content-type") ?? "application/json";
        return new NextResponse(text, { status: res.status, headers: { "Content-Type": contentType } });
      }
    } catch {
      continue;
    }
  }

  // 開発時はモックで空配列を返す
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.json([], { status: 200, headers: { "x-mock": "1" } });
  }

  const status = lastRes?.status ?? 502;
  const text = lastRes ? await lastRes.text() : "Backend is unreachable";
  return new NextResponse(text, { status, headers: { "Content-Type": "text/plain" } });
}
