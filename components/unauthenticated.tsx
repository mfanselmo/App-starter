import { SignInButton } from "@clerk/nextjs";

import { Button } from "./ui/button";

export default function Unauthenticated() {
  return (
    <>
      <h1>This is the unauthenticated page of this web-app</h1>
      <h2>This is the unauthenticated page of this web-app</h2>
      <h3>This is the unauthenticated page of this web-app</h3>
      <h4>This is the unauthenticated page of this web-app</h4>

      <SignInButton>
        <Button>Sign in</Button>
      </SignInButton>
    </>
  );
}
