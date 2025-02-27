import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const lang = searchParams.get('lang');
  
  return NextResponse.json({
    detectedLanguage: lang,
    url: request.url,
    headers: Object.fromEntries(request.headers.entries())
  });
} 