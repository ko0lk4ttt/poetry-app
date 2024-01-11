"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "react-daisyui";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main>
      {status === "loading" && (
        <div>
          <p>loading...</p>
        </div>
      )}

      {!session && (
        <>
          <p>Not signed in</p>
          <Button color="primary">
            <Link href="/api/auth/signin">Sign in</Link>
          </Button>
        </>
      )}

      {session && (
        <div>
          Signed in as {session?.user?.name} <br />
          <Button color="primary">
            <Link href="/api/auth/signout">Sign out</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
