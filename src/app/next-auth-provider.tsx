"use client";

import { SessionProvider } from 'next-auth/react';

export function NextAuthProvider({ session, children }: { children: React.ReactNode }) {
  return <SessionProvider>{children}</SessionProvider>
}
