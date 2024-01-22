"use client";

import { getPosts } from "@/lib/post.actions";
import Link from "next/link";
import { Button } from "react-daisyui";
import { useEffect, useState } from "react";
import { Post } from "@prisma/client";

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
      <ul className="list-group">
        {posts?.map((post) => (
          <li
            key={post.id}
            className="list-group-item d-flex justify-content-between align-items-center"
          >
            <Link href={`/posts/${post.id}`}>{post.title}</Link>
            <div>
              <Link href={`/posts/${post.id}/update`}>
                <Button color="primary" size="sm">
                  Update
                </Button>
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
