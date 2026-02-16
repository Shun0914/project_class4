/** frontend/proxy.ts （旧 middleware.ts） **/

/**
 * 目的：
 * - GoogleToken が localStorage 方式のままでもセキュリティが保たれるように、
 *   最低限の “ブラウザ側ガード” を掛ける
 *
 * 背景：
 * - localStorage にトークンを持つ方式は「XSSでトークンを盗まれる」リスクが残る
 * - CSP を入れると「悪意ある script の読み込み・実行」を抑止しやすくなる
 * - 将来的には、CSPだけでなく Http-Only Cookieを使う方が本格的な実装
 *
 * 方針：
 * - いきなり厳しいCSPにするとログイン等が壊れやすい
 *   → 開発環境(dev)は Report-Only（違反ログを見るだけ、動作は止めない）
 *   → 本番(production)で強制(CSP)にする
 *
 * 注意：
 * - CSPは “許可リスト(ホワイトリスト)” なので、必要な外部ドメインが漏れていると機能が壊れる。
 */

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * 認証ガード用の “公開パス” （将来、Cookie認証に移行した場合に使う想定）
 * - 現状は localStorage 方式のため proxy では認証判定ができず、効果が薄い
 * - そのため現時点では「使わない」方針（必要になったら復活させる）
 *
 * const publicPaths = ["/login", "/signup", "/setup"];
 */

/**
 * buildCsp():
 *   CSP（Content Security Policy）を組み立てる関数。
 *   このフロントエンドが “信頼して読み込む/実行する/通信する” 先を指定する。
 *
 * ここでは最小限として：
 * - Google OAuth が動くための Google ドメインを許可
 * - 画像(data/blob/https)は実運用で必要になりやすいので許可
 * - connect-src（API通信先）に NEXT_PUBLIC_API_URL の origin を追加
 */
function buildCsp(apiOrigin?: string) {
  /**
   * connect-src：
   * - fetch/XHR/WebSocket 等の “通信先” を制限する
   * - APIが別ドメインの場合、ここに入れないと通信がブロックされる
   */
  const connectSrc = [
    "'self'",
    // ▽バックエンド（例：ローカル http://localhost:8000 / 本番 https://xxx）
    ...(apiOrigin ? [apiOrigin] : []),
    // ▽Google OAuth 周辺通信
    "https://*.googleapis.com",
    "https://accounts.google.com",
  ].join(" ");

  /**
   * script-src（Google OAuth向け）：
   * - accounts.google.com : 認証画面、トークン取得など
   * - apis.google.com / gstatic.com : Googleのスクリプト配信などで必要になることがある
   *
   * ⚠ 'unsafe-inline' はセキュリティ強度を下げるが、
   *   いきなり外すと壊れやすいので “最小運用” として許可している。
   *   本気で締めるなら nonce/hashes へ移行する。
   */
  const googleScriptSrc = [
    "'self'",
    "'unsafe-inline'",
    "https://accounts.google.com",
    "https://apis.google.com",
    "https://www.gstatic.com",
  ].join(" ");

  /**
   * style-src：
   * - 自ドメインのCSSと、HTML内の inline style を許可
   * - Tailwind/Next.js などで inline style が必要になるケースがあるため最初は許可
   * - 本気で締めるなら nonce/hashes を検討（ただし導入コスト増）
   */
  const styleSrc = ["'self'", "'unsafe-inline'"].join(" ");

  /**
   * directives：
   * - ここに “許可ルール” を並べて最後に join("; ") でCSP文字列にする
   */
  const directives = [
    // 基本は自ドメインのみ許可
    "default-src 'self'",

    // <base> タグ悪用を防ぐ
    "base-uri 'self'",

    // Flash等の古いプラグインは全拒否
    "object-src 'none'",

    // クリックジャッキング対策：他サイトのiframe内で表示させない
    "frame-ancestors 'none'",

    // フォーム送信先を自サイトに限定（フィッシング対策に有効なことがある）
    "form-action 'self'",

    // 画像：data/blob/https を許可（アイコン/プレビュー等で必要になることが多い）
    "img-src 'self' data: blob: https:",

    // CSS：まずは壊さない運用（後で締める）
    `style-src ${styleSrc}`,

    // JS：まずは壊さない運用（後で締める）
    `script-src ${googleScriptSrc}`,

    // Googleログインが frame を使う可能性に備える
    "frame-src https://accounts.google.com",

    // 通信先：APIやGoogle系を許可
    `connect-src ${connectSrc}`,
  ];

  /**
   * upgrade-insecure-requests：
   * - http → https 混在をブラウザ側で自動的に https に寄せる
   * - ローカル開発で http://localhost にアクセスするケースがあるため、本番だけ有効化する
   */
  if (process.env.NODE_ENV === "production") {
    directives.push("upgrade-insecure-requests");
  }

  return directives.join("; ");
}

/**
 * addSecurityHeaders():
 * - CSP と、最低限のセキュリティヘッダをレスポンスに付与する
 *
 * Dev: Report-Only（違反ログだけ出す。動作は止めない）
 * Prod: 強制（ブロックする）
 *
 * まずは dev でログイン動作確認 → 違反ログを潰す → 本番で有効化 が安全。
 */
function addSecurityHeaders(res: NextResponse) {
  // API URL を connect-src に入れるため origin を抽出
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  let apiOrigin: string | undefined;

  try {
    if (apiUrl) apiOrigin = new URL(apiUrl).origin;
  } catch {
    // URLが不正でもアプリを落とさない（CSPを組める範囲で組む）
  }

  const csp = buildCsp(apiOrigin);

  // 開発環境では Report-Only にして処理を止めない。
  if (process.env.NODE_ENV !== "production") {
    res.headers.set("Content-Security-Policy-Report-Only", csp);
  } else {
    res.headers.set("Content-Security-Policy", csp);

    // 本番がHTTPSで運用される場合にのみ意味がある（HTTPだと効かない）
    res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  }

  // MIME sniffing対策（Content-Typeを推測させない）
  res.headers.set("X-Content-Type-Options", "nosniff");

  // referrer漏えいを抑える（外部サイトへ余計なパス情報を送らない）
  res.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");

  // クリックジャッキング対策（古いブラウザ向けの保険。CSP frame-ancestors が本命）
  res.headers.set("X-Frame-Options", "DENY");

  // 権限（カメラ/マイク等）をデフォルト拒否（必要なら個別に許可する）
  res.headers.set(
    "Permissions-Policy",
    "camera=(), microphone=(), geolocation=(self), payment=(), usb=()"
  );

  return res;
}

/**
 * proxy（旧 middleware）
 * - 認証チェックは行わず、レスポンスにヘッダを付与するだけ（現状の意図通り）
 * - matcher で静的ファイル等を除外し、ページ表示に対して適用する
 */
export function proxy(_request: NextRequest) {
  // いまは public/private に関係なく素通し（将来cookie移行したらここで分岐しても良い）
  const res = NextResponse.next();
  return addSecurityHeaders(res);
}

/**
 * matcher：
 * - Next.js の内部リソースや favicon などは対象外にする（無駄な副作用を避ける）
 * - APIルートは通常バックエンド側で別途セキュリティ設定するので除外
 */
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
