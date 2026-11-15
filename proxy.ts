import { NextResponse, type NextRequest } from "next/server";
import { localizePath, parsePublicPath } from "@/lib/i18n/routes";

/**
 * English lives at the root ("/sales"), Spanish under "/es" ("/es/ventas").
 * The folders in /app are [lang]/sales, so this file quietly points each address at the right folder.
 * Milestone 7 will need to exclude /admin and /api here when they arrive.
 */
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const { lang, hadEnglishPrefix, canonicalPath } = parsePublicPath(pathname);
  const publicPath = localizePath(canonicalPath, lang);
  const trimmed = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;

  // "/en/sales" or "/es/sales" are not the real addresses: send visitors to "/sales" and "/es/ventas".
  if (hadEnglishPrefix || trimmed !== publicPath) {
    const url = request.nextUrl.clone();
    url.pathname = publicPath;
    return NextResponse.redirect(url, 308);
  }

  const url = request.nextUrl.clone();
  url.pathname = `/${lang}${canonicalPath === "/" ? "" : canonicalPath}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // Skip Next.js internals and any file with an extension (images, fonts, icons).
  matcher: ["/((?!api|_next/static|_next/image|.*\\..*).*)"],
};
