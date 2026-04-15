import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect admin routes — require x-admin-token header or admin_session cookie
  if (pathname.startsWith('/admin')) {
    const adminToken = request.cookies.get('admin_session')?.value;

    if (!adminToken) {
      // Redirect unauthenticated users to homepage
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
