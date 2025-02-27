import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Define supported languages
const SUPPORTED_LANGUAGES = ['en', 'ro'];
const DEFAULT_LANGUAGE = 'ro';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Skip middleware for API routes, static files, OG images, etc.
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname.includes('.') ||
    pathname.includes('opengraph-image') ||
    pathname.includes('twitter-image') ||
    pathname.includes('icon') ||
    pathname.includes('favicon')
  ) {
    return NextResponse.next();
  }
  
  // Check if the path is just the root
  if (pathname === '/') {
    // Always redirect to Romanian by default
    return NextResponse.redirect(new URL(`/${DEFAULT_LANGUAGE}`, request.url));
  }
  
  // Check if the current path is a language path
  const pathSegments = pathname.split('/').filter(Boolean);
  const firstSegment = pathSegments[0]?.toLowerCase();
  
  // If the first segment is a supported language, continue
  if (SUPPORTED_LANGUAGES.includes(firstSegment)) {
    return NextResponse.next();
  }
  
  // Otherwise, redirect to the default language
  return NextResponse.redirect(new URL(`/${DEFAULT_LANGUAGE}${pathname}`, request.url));
}

export const config = {
  matcher: [
    // Match all paths except static files, api routes, and image routes
    '/((?!_next/static|_next/image|favicon.ico|opengraph-image|twitter-image|icon).*)',
  ],
}; 