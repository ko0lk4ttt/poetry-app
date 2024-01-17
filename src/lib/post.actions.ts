"use server";

import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { getSession } from "next-auth/react";
import { redirect } from "next/navigation";

export async function createPost(formData: FormData) {
  const prisma = new PrismaClient();

  const session = await getServerSession();

  if (!session) {
    return {
      error: "You must be logged in to create a post",
    };
  }

  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return {
      error: "Please fill in all fields",
    };
  }

  console.log(session);

  const post = await prisma.post.create({
    data: {
      // authorId: session.user.id,
      title: title,
      content: content,
    },
  });

  redirect(`/posts/${post.id}`);
}

export async function getPost(id: string) {
  const prisma = new PrismaClient();

  const post = await prisma.post.findUnique({
    where: {
      id: id,
    },
  });

  return post;
}

export async function getPosts() {
  const prisma = new PrismaClient();

  const posts = await prisma.post.findMany({
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  return posts;
}

export async function updatePost(formData: FormData) {
  const prisma = new PrismaClient();
  const session = await getSession();

  const id = formData.get("id") as string;
  const title = formData.get("title") as string;
  const content = formData.get("content") as string;

  if (!title || !content) {
    return {
      error: "Please fill in all fields",
    };
  }

  const post = await prisma.post.update({
    where: {
      id: id,
    },
    data: {
      title: title,
      content: content,
    },
  });

  redirect(`/posts/${post.id}`);
}

export async function deletePost(formData: FormData) {
  const prisma = new PrismaClient();
  const id = formData.get("id") as string;

  await prisma.post.delete({
    where: {
      id: id,
    },
  });

  redirect(`/posts`);
}