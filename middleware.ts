import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import type { User } from '@/types/user';
import { getSession } from '@/lib/api/serverApi';

const protectedRoutes = ['/notes', '/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const refreshToken = request.cookies.get('refreshToken');

  const { pathname } = request.nextUrl;

  let isAuth = !!accessToken;

  if (!isAuth && refreshToken) {
    try {
      const user: User | null = await getSession();
      if (user) {
        isAuth = true;
      }
    } catch {
      isAuth = false;
    }
  }

  const isProtected = protectedRoutes.some(route => pathname.startsWith(route));
  const isPublic = publicRoutes.some(route => pathname.startsWith(route));

  if (isProtected && !isAuth) {
    return NextResponse.redirect(new URL('/sign-in', request.url));
  }

  if (isPublic && isAuth) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};