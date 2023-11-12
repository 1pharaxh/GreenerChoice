import { authMiddleware } from "@clerk/nextjs";

// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your middleware

// IMPORTANT: This middleware must be configured for all routes that you want to protect OR make public.
export default authMiddleware({
  publicRoutes: ["/api/testApi"],
  ignoredRoutes: ["/((?!api|trpc))(_next|.+..+)(.*)", "/api/testApi", "/"],
});
