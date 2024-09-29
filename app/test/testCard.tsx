"use client";

import { type inferRouterOutputs } from "@trpc/server";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { type AppRouter } from "@/server";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { trpc } from "../_trpc/client";
import { EditDialog } from "./[id]/editDialog";

type RouterOutput = inferRouterOutputs<AppRouter>;

export const TestListCard = (props: {
  test: RouterOutput["testsRouter"]["getTests"][number];
}) => {
  return (
    <Link href={`/test/${props.test.id}`}>
      <Card className="mb-4">
        <CardHeader>
          <CardTitle>{props.test.stringField}</CardTitle>
        </CardHeader>
        <CardContent>
          <CardDescription>
            {props.test.dateField.toDateString()}
          </CardDescription>
        </CardContent>
      </Card>
    </Link>
  );
};

export const TestCard = (props: {
  test: RouterOutput["testsRouter"]["getTest"];
}) => {
  const router = useRouter();
  const { mutate: deleteTest, isPending } =
    trpc.testsRouter.deleteTest.useMutation({
      onSuccess: () => {
        router.push(`/test`);
        router.refresh();
      },
    });

  return (
    <Card>
      <CardHeader>
        <CardTitle>{props.test.stringField}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{props.test.dateField.toDateString()}</CardDescription>
        {props.test.imageUrlField && (
          <Image
            src={props.test.imageUrlField}
            alt="image"
            width={200}
            height={200}
          />
        )}
      </CardContent>
      <CardFooter>
        <EditDialog test={props.test} />

        <Button
          onClick={() => deleteTest({ id: props.test.id })}
          variant={"destructive"}
          loading={isPending}
        >
          Delete
        </Button>
      </CardFooter>
    </Card>
  );
};
