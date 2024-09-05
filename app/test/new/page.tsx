"use client";

import { TestForm } from "./newForm";

export default function Page() {
  return (
    <>
      <h1>Create new test</h1>
      <div className="mx-auto max-w-sm">
        <TestForm />
      </div>
    </>
  );
}
