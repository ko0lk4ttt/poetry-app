import { useState } from "react";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { Alert, Button, Card, Input } from "react-daisyui";

export function LoginForm() {
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSumbit = async () => {
    setError("");

    const result = await signIn("credentials", {
      redirect: false,
      name,
      password,
    });

    if (result && result.error) {
      setError(result.error);
    } else {
      console.log(result);
      redirect("/");
    }
  };

  return (
    <Card>
      <Card.Body>
        <form action={handleSumbit} className="flex flex-col gap-2">
          <Input
            placeholder="name"
            type="name"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            placeholder="Password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button color="primary" type="submit">
            Login
          </Button>

          {error && <Alert status="error">{error}</Alert>}
        </form>
      </Card.Body>
    </Card>
  );
}
