import Link from "next/link";

import { serverClient } from "../_trpc/serverClient";
import { TestListCard } from "./testCard";

export default async function Page() {
  const tests = await serverClient.testsRouter.getTests({});

  return (
    <>
      <h1>This is a model library page</h1>
      <div className="mt-4">
        {tests.map((test) => (
          <TestListCard key={test.id} test={test} />
        ))}
      </div>
      <Link href={"/test/new"}>Create new test</Link>
    </>
  );
}
