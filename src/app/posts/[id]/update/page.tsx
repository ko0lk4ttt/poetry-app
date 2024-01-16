import { notFound } from "next/navigation";
import { updatePost, getPost } from "../../../../lib/post.actions";
import Link from "next/link";

export default async function Page({ params }: { params: { id: string } }) {
  //this bit gives us the id from the url
  const post = await getPost(params.id);

  if (!post) {
    notFound();
  }

  return (
    <form action={updatePost} className="my-4 p-4 border rounded">
      <input type="hidden" name="id" value={post.id} />
      <div className="mb-3">
        <label htmlFor="title" className="form-label">
          Name
        </label>
        <input
          id="title"
          name="title"
          type="text"
          className="form-control"
          defaultValue={post.title}
        />
      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          rows="8"
          className="form-control"
          defaultValue={post.content}
        ></textarea>
      </div>
      <button type="submit" className="btn btn-primary">
        Update Post
      </button>
      <Link className="btn btn-secondary float-end" href="/posts">
        Go back
      </Link>
    </form>
  );
}
