
import { NextResponse } from "next/server";

export function proxy(request) {
  const session = request.cookies.get("session")?.value;

 

  const validSessions = ["demo-user-1", "demo-staff-1"];

  if (!session || !validSessions.includes(session)) {
    const url = new URL("/signin", request.url);
    url.searchParams.set("next", request.nextUrl.pathname);

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/checkout/:path*", "/orders/:path*"],
};
