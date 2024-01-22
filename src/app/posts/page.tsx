"use client";

import { getPosts } from "@/lib/post.actions";
import Link from "next/link";
import { Button } from "react-daisyui";
import { useEffect, useState } from "react";
import { Post } from "@prisma/client";
import PostPreview from "@/components/post-preview";

export default function Page() {
  const [posts, setPosts] = useState<Post[] | null>(null);

  useEffect(() => {
    const getData = async () => {
      const posts = await getPosts();
      setPosts(posts);
    }

    getData();
  }, []);

  return (
    <div className="my-4 p-4 border rounded">
      <h1 className="mb-4">Posts</h1>
      <div className="flex flex-col gap-2">
        {posts?.map((post) => (
          <PostPreview post={post} />
        ))}
      </div>
    </div>
  );
}
{/* <Link href="/">
<Button color="primary" className="mt-4">
  Homepage
</Button>
</Link> */}