'use client';

import { getPosts } from "../../lib/post.actions";
import Link from "next/link";
import { Button } from 'react-daisyui';

export default async function Page() {
  const posts = await getPosts();

  return (
    <div className="my-4 p-4 border rounded">
      <h1 className="mb-4">Posts</h1>
      <ul className="list-group">
        {posts.map((post) => (
          <li key={post.id} className="list-group-item d-flex justify-content-between align-items-center">
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
