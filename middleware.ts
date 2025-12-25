// src/middleware.ts (root mein banao)
import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const { data: { session } } = await supabase.auth.getSession()

  // Admin routes that need protection
  const protectedAdminRoutes = [
    '/admin/dashboard',
    '/admin/projects',
    '/admin/categories',
    '/admin/clients',
    '/admin/contacts',
    '/admin/blogs',
    '/admin/settings'
  ]

  const pathname = req.nextUrl.pathname

  // Check if it's a protected admin route
  const isProtectedAdminRoute = protectedAdminRoutes.some(route =>
    pathname.startsWith(route)
  )

  if (isProtectedAdminRoute && !session) {
    // No session, redirect to login
    return NextResponse.redirect(new URL('/admin/login', req.url))
  }

  // If user is logged in and trying to access login/signup, redirect to dashboard
  if (session && (pathname === '/admin/login' || pathname === '/admin/signup')) {
    return NextResponse.redirect(new URL('/admin/dashboard', req.url))
  }
  return res
}

export const config = {
  matcher: ['/admin/:path*']
}