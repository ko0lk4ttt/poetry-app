'use client';

import { useSession } from 'next-auth/react';
import { Button } from 'react-daisyui';

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main>
      <pre>{JSON.stringify(session, null, 2)}</pre>
    </main>
  )
}
