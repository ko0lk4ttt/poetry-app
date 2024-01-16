'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button } from "react-daisyui";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to VerseVibe: Where Words Take Flight
        </h1>
        <p>📜 Unleash Your Inner Poet, Share Your Soulful Verses 📜</p>
        <p>
          Dive into a world of rhythm and rhyme, where emotions flow freely through the art of poetry. Welcome to VerseVibe, your haven for poetic expression.
        </p>
      </div>

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
            <div className="absolute top-4 right-4 flex items-center">
              <p className="mr-4">
                Signed in as {session?.user?.name}
              </p>
              <Button color="secondary" >
                <Link href="/api/auth/signout">Sign out</Link>
              </Button>
            </div>
            <div className="flex justify-center">
              <Button color="bg-ghost" className="ml-5">
                <Link href="/posts">
                  <Button color="secondary" className="mt-4">
                        See my posts
                  </Button>
                </Link>
              </Button>
                <Link href="/create">
                  <Button color="primary">Create a post</Button>
                </Link>
            </div>
            </div>
      )}
    </main>
  );
}
