import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getToken } from "next-auth/jwt"
import { UAParser } from "ua-parser-js"

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request, secret: process.env.NEXTAUTH_SECRET })

  // If user is not logged in, allow the request
  if (!token) {
    return NextResponse.next()
  }

  // Check if user has completed onboarding
  const onboardingCompleted = token.onboardingCompleted
  const path = request.nextUrl.pathname

  // If user is logged in but hasn't completed onboarding and is not on the onboarding page
  if (!onboardingCompleted && !path.startsWith("/onboarding") && !path.startsWith("/api")) {
    return NextResponse.redirect(new URL("/onboarding", request.url))
  }

  // If user has completed onboarding and is trying to access the onboarding page
  if (onboardingCompleted && path.startsWith("/onboarding")) {
    return NextResponse.redirect(new URL("/", request.url))
  }

  // Security check for account sharing
  if (token.role === "premium" && request.headers.get("user-agent")) {
    const parser = new UAParser(request.headers.get("user-agent") || "")
    const currentDevice = {
      browser: parser.getBrowser().name,
      os: parser.getOS().name,
      device: parser.getDevice().type || "desktop",
    }

    // If device info exists in token and is significantly different from current device
    if (
      token.deviceInfo &&
      token.deviceInfo.browser !== currentDevice.browser &&
      token.deviceInfo.os !== currentDevice.os
    ) {
      // Only apply this check to premium-only features
      if (path.includes("/notes/download") || path.includes("/reviews") || path.startsWith("/premium")) {
        // Log suspicious activity but still allow access
        // In a real production app, you might want to implement stricter measures
        console.log("Suspicious activity detected: Possible account sharing", {
          userId: token.id,
          storedDevice: token.deviceInfo,
          currentDevice,
        })
      }
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api/auth).*)"],
}
