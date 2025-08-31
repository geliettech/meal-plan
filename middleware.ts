import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-up(.*)",
  "/subscribe(.*)",
])

const isSignUpRoute = createRouteMatcher(["/sign-up(.*)"])


export default clerkMiddleware(async (auth, req) => {
  const userAuth = await auth();
  const {userId} = userAuth;
  const {pathname, origin} = req.nextUrl
  console.log('Middleware Info:', {userId, pathname, origin});

  // If user is not signed in and the route is not public → go to /sign-up
  if(!isPublicRoute(req) && !userId) {
    return NextResponse.redirect(new URL("/sign-up", origin))
  }

  // If user is signed in, when click on get started → go to /mealplan
  if(isSignUpRoute(req) && userId) {
    return NextResponse.redirect(new URL("/mealplan", origin))
  }

// continue with other requests
  return NextResponse.next()
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:ht ml?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};