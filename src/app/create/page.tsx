"use client";

import { createPost } from "../../lib/post.actions";
import { Input, Textarea, Button } from "react-daisyui";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

export default function CreatePostPage() {
  const { data: session } = useSession();

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <form action={createPost} className="my-4 p-4 border rounded">
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Title
        </label>
        <Input
          id="title"
          name="title"
          type="text"
          className="form-control"
          style={{ width: "100%" }}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <Textarea
          id="content"
          name="content"
          className="form-control"
          style={{ width: "100%" }}
        />
      </div>
      <Button type="submit" className="btn btn-primary">
        Create Post
      </Button>
    </form>
  );
}
