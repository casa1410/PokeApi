import { NextResponse, type NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const url = new URL(req.nextUrl);
  const isDetail = /^\/pokemon\/[^\/]+$/.test(url.pathname);
  if (!isDetail) return NextResponse.next();

  const role = req.cookies.get("role")?.value as
    | "viewer"
    | "editor"
    | undefined;
  const canViewDetail = role === "editor";
  if (!canViewDetail) {
    url.pathname = "/acceso-denegado";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/pokemon/:path*"],
};
