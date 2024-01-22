"use client";
import { deletePost, getPost } from "../../../lib/post.actions";
import { notFound } from "next/navigation";
import Link from "next/link";
import { Button } from "react-daisyui";

export default async function Page({ params }: { params: { id: string } }) {
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <div className="container mt-4 p-4 rounded">
      <h1 className="text-2xl font-bold mb-4">{post.title}</h1>
      <hr className="mb-4" />
      <p className="text-lg">{post.content}</p>
      <Link href="/posts">
        <Button color="secondary" className="mt-4">
          Back to Posts
        </Button>
      </Link>
      <div className="flex space-between">
        <form action={deletePost}>
          <input type="hidden" name="id" value={post.id} />
          <Button color="danger" type="submit" className="mt-4">
            Delete Post
          </Button>
        </form>
        <div className="divider divider-horizontal"></div>
        <Link href={`/posts/${post.id}/update`}>
          <Button color="primary" className="float-end mt-4">
            Update Post
          </Button>
        </Link>
      </div>
    </div>
  );
}
