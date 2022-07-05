import { useRouter } from "next/router";
import React, { FormEvent, useState } from "react";
import Button from "../components/Button";
import Field from "../components/Field";
import Input from "../components/Input";
import Page from "../components/Page";
import { useSignIn } from "../hooks/user";

export default function SignInPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { signIn, signInError, signInLoading } = useSignIn();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const valid = await signIn(email, password);
    if (valid) router.push("/");
  }

  return (
    <Page title="Sign in">
      <form onSubmit={handleSubmit}>
        <Field label="Email">
          <Input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Field>
        <Field label="password">
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Field>
        {signInError && <p className="text-red-700">invalid credentials</p>}
        <Button type="submit" disabled={signInLoading}>
          {signInLoading ? "loading..." : "Sign In"}
        </Button>
      </form>
    </Page>
  );
}
