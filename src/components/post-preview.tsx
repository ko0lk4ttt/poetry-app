import { Post } from "@prisma/client"
import { Card } from "react-daisyui"
import Link from "next/link"
import { Button } from "react-daisyui"

export default function PostPreview({ post }: { post: Post }) {
  return (
    <Card>
      <Card.Body>
        <h2>{post.title}</h2>
        <Link href={`/posts/${post.id}`}>
          <Button className="btn-primary">View this post</Button>
        </Link>
      </Card.Body>
    </Card>
  )
}
