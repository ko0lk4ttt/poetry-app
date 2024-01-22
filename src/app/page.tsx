'use client';
import { useSession } from "next-auth/react";
import Link from "next/link";
import { Button, Divider } from "react-daisyui";

export default function Home() {
  const { data: session, status } = useSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {/* <pre>{JSON.stringify(session, null, 2)}</pre> */}
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">
          Welcome to VerseVibe: Where Words Take Flight
        </h1>
        <div className="divider"></div>

        <p>📜 Unleash Your Inner Poet, Share Your Soulful Verses 📜</p>
        <div className="divider"></div>

        <p>
          Dive into a world of rhythm and rhyme, where emotions flow freely through the art of poetry. Welcome to VerseVibe, your haven for poetic expression.
        </p>
        <div className="divider"></div>

        
        <div className="flex justify-center">
        <div className="mx-auto block">
          <img className="homepage" src="https://f8n-production-collection-assets.imgix.net/0x02c4394307de62241aa8d5a0915494a96B288261/8/nft.gif?q=80&auto=compress&cs=srgb&w=3000&h=3000&fit=max" alt="Description of the image"/>
        </div>  
        </div>    
      </div>

      {!session && (
        <div>
        
            <div className="absolute top-4 right-4 flex items-center">
              <p className="mr-4">
              You are not signed in
              </p>
              <Button color="secondary" >
                <Link href="/api/auth/signin">Sign in</Link>
              </Button>
            </div>
            <div className="">
              <p>Sign in to see your posts:</p>
              <Button className="btn-wide" color="secondary" >
                <Link href="/api/auth/signin">Sign in</Link>
              </Button>
            </div>
            </div>
      )}
      {session && (
        <div>
          <div className="absolute top-4 right-4 flex items-center">
            <p className="mr-4">
              Signed in as {session?.user?.name}
            </p>
            <Button color="secondary">
              <Link href="/api/auth/signout">Sign out</Link>
            </Button>
          </div>

          <div className="flex justify-center">
            <Button className="ml-5 mt-4">
              <Link href="/posts">
                <Button color="secondary">
                  See my posts
                </Button>
              </Link>
            </Button>
            <div className="divider divider-horizontal"></div>

            <Link href="/create">
              <Button color="primary" className="mt-4">
                Create a post
              </Button>
            </Link>
          </div>
        </div>
      )}
    </main>
  );
}
