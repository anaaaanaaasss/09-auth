import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSession } from '@/lib/api/serverApi';
import { cookies } from 'next/headers';
import type { AxiosResponse } from 'axios';

const protectedRoutes = ['/notes', '/profile'];
const publicRoutes = ['/sign-in', '/sign-up'];

export async function middleware(request: NextRequest) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;
  const refreshToken = cookieStore.get('refreshToken')?.value;

  const { pathname } = request.nextUrl;

  let isAuth = !!accessToken;

  let user: AxiosResponse | null = null;

  if (!isAuth && refreshToken) {
    try {
      user = await getSession();
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

  const response = NextResponse.next();

  if (user?.data?.accessToken && user.data.refreshToken) {
    response.cookies.set('accessToken', user.data.accessToken);
    response.cookies.set('refreshToken', user.data.refreshToken);
  }
  return response;
}

export const config = {
  matcher: ['/notes/:path*', '/profile/:path*', '/sign-in', '/sign-up'],
};