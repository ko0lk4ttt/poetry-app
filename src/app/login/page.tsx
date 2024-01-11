'use client';

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  const { data: session } = useSession();

  if (session) {
    redirect('/');
  }

  return (
    <div>
      <LoginForm />
    </div>
  );
}
