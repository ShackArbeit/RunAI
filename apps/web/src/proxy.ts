import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const localePattern = /^\/(zh|en|de)(\/|$)/;

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/") {
    return NextResponse.redirect(new URL("/zh", request.url));
  }

  const match = pathname.match(localePattern);
  const response = NextResponse.next();

  if (match) {
    response.cookies.set("NEXT_LOCALE", match[1], {
      path: "/",
      sameSite: "lax",
    });
  }

  return response;
}

export const config = {
  matcher: ["/", "/((?!_next|api|favicon.ico).*)"],
};
