import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Detect language from URL, cookie, or Accept-Language header
  const language = detectLanguage(request);
  
  // Clone the response and modify headers
  const response = NextResponse.next();
  
  // Set language-specific metadata in response headers
  // (These can be read by client-side JS to update meta tags)
  response.headers.set('X-Language', language);
  
  return response;
}

function detectLanguage(request: NextRequest): string {
  // Check URL parameter
  const url = new URL(request.url);
  const langParam = url.searchParams.get('lang');
  if (langParam && ['EN', 'RO'].includes(langParam.toUpperCase())) {
    return langParam.toUpperCase();
  }
  
  // Check cookie
  const langCookie = request.cookies.get('language')?.value;
  if (langCookie && ['EN', 'RO'].includes(langCookie.toUpperCase())) {
    return langCookie.toUpperCase();
  }
  
  // Check Accept-Language header
  const acceptLanguage = request.headers.get('Accept-Language') || '';
  if (acceptLanguage.includes('ro')) return 'RO';
  
  // Default to English
  return 'EN';
} 