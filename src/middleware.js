import { NextResponse } from 'next/server';

export async function middleware(request) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Define public paths that don't require authentication
  const publicPaths = ['/login', '/signup', '/'];
  const isPublicPath = publicPaths.includes(path) || 
                       path.startsWith('/api/') || 
                       path.includes('.');

  // Get the session cookie from the cookies
  const session = request.cookies.get('auth-session')?.value;

  // If the path is not public and there's no session, redirect to login
  if (!isPublicPath && !session) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // If the user is authenticated and trying to access login/signup, redirect to dashboard
  if ((path === '/login' || path === '/signup') && session) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure the middleware to run on specific paths
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
}; 