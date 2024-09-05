import { serverClient } from "@/app/_trpc/serverClient";

import { TestCard } from "../testCard";

export default async function Page({ params }: { params: { id: string } }) {
  const test = await serverClient.testsRouter.getTest({ id: params.id });
  return (
    <>
      <TestCard test={test} />
    </>
  );
}
