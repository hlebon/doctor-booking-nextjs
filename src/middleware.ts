import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const response = NextResponse.next();

  if (request.headers.get('upgrade') === 'websocket') {
    return response;
  }

  if (request.nextUrl.pathname.match(/\.(js|css|png|jpg|jpeg|gif|webp)$/)) {
    response.headers.set(
      'Cache-Control',
      'public, max-age=31536000, immutable',
    );
  } else {
    response.headers.set(
      'Cache-Control',
      'no-store, must-revalidate, max-age=0',
    );
  }

  return response;
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
