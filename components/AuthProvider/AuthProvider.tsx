'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { checkSession, getCurrentUser } from '@/lib/api/clientApi';
import { useAuthStore } from '@/lib/store/authStore';

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();
  const setUser = useAuthStore(state => state.setUser);
  const clearIsAuthenticated = useAuthStore(state => state.clearIsAuthenticated);

  useEffect(() => {
    async function fetchSession() {
      try {
        const sessionValid = await checkSession();
        if (sessionValid) {
          const user = await getCurrentUser();
          setUser(user);
        } else if (pathname.startsWith('/profile') || pathname.startsWith('/notes')) {
          clearIsAuthenticated();
          router.replace('/sign-in');
        }
      } catch {
        clearIsAuthenticated();
        if (pathname.startsWith('/profile') || pathname.startsWith('/notes')) {
          router.replace('/sign-in');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchSession();
  }, [pathname, router, setUser, clearIsAuthenticated]);

  if (loading) return <div style={{ padding: '2rem', textAlign: 'center' }}>Loading…</div>;
  return <>{children}</>;
}