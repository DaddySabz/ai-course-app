import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  const isLoggedIn = !!req.auth
  const isOnDashboard = req.nextUrl.pathname.startsWith("/dashboard")
  const isOnModule = req.nextUrl.pathname.startsWith("/module")
  const isOnCertificate = req.nextUrl.pathname.startsWith("/certificate")

  // Protect dashboard, module, and certificate routes
  if ((isOnDashboard || isOnModule || isOnCertificate) && !isLoggedIn) {
    return NextResponse.redirect(new URL("/", req.url))
  }

  return NextResponse.next()
})

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
