"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import { LoginForm } from "@/components/login-form";

export default function LoginPage() {
  return (
    <div>
      <LoginForm />
    </div>
  );
}
