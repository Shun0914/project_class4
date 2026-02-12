import { NextRequest, NextResponse } from "next/server";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:8000";

// バックエンド側の実装差を吸収するために候補を複数持つ
const CANDIDATE_PATHS = ["/expenses", "/api/expenses"];

async function forward(req: NextRequest, path: string) {
  const target = new URL(path, BACKEND_URL);
  const bodyText = await req.text();

  const res = await fetch(target.toString(), {
    method: "POST",
    headers: {
      "Content-Type": req.headers.get("content-type") ?? "application/json",
      // ★ 修正点: クライアントから送られた Authorization ヘッダーをバックエンドに引き継ぐ
      "Authorization": req.headers.get("authorization") ?? "",
      "Cookie": req.headers.get("cookie") ?? "",
    },
    body: bodyText,
    redirect: "manual",
  });

  return res;
}

export async function POST(req: NextRequest) {
  let lastRes: Response | null = null;

  // 1) まずは候補パスを順に試す
  for (const path of CANDIDATE_PATHS) {
    try {
      const res = await forward(req, path);
      lastRes = res;

      // 成功 or 404以外ならそのまま返す（400/401/500は原因が明確）
      if (res.ok || res.status !== 404) {
        const text = await res.text();
        const contentType = res.headers.get("content-type") ?? "application/json";
        return new NextResponse(text, { status: res.status, headers: { "Content-Type": contentType } });
      }

      // 404なら次の候補へ
    } catch {
      // fetch自体が落ちた（バックエンド未起動など）→ 次の候補へ
      continue;
    }
  }

  // 2) ここまで来たら「バックエンド未起動 or どのパスも無い」
  // 開発中はモックで成功させてUI実装を先に完了させる
  if (process.env.NODE_ENV !== "production") {
    let payload: any = {};
    try {
      payload = await req.json();
    } catch {}

    const now = new Date().toISOString();
    const mock = {
      id: Math.floor(Math.random() * 1000000),
      user_id: 0,
      item: payload?.item ?? "",
      price: Number(payload?.price ?? 0),
      expense_date: payload?.expense_date ?? now.slice(0, 10),
      category_id: payload?.category_id ?? null,
      created_at: now,
    };

    return NextResponse.json(mock, {
      status: 200,
      headers: { "x-mock": "1" },
    });
  }

  // 本番ではちゃんと失敗として返す
  const status = lastRes?.status ?? 502;
  const text = lastRes ? await lastRes.text() : "Backend is unreachable";
  return new NextResponse(text, { status, headers: { "Content-Type": "text/plain" } });
}
