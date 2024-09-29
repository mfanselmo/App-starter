"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { trpc } from "@/app/_trpc/client";

import { newTestFormSchema, selectFieldValues } from "@/lib/forms/test/new";

import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";

import { CheckboxInput } from "@/components/form/Checkbox";
import { DateInput } from "@/components/form/Date";
import { FileInput } from "@/components/form/File";
import { FormInput } from "@/components/form/Input";
import { SelectInput } from "@/components/form/Select";
import { SwitchInput } from "@/components/form/Switch";

export function TestForm() {
  const router = useRouter();

  const { mutate: createTest, isPending } =
    trpc.testsRouter.createTest.useMutation({
      onSuccess: () => {
        router.push("/test");
        router.refresh();
      },
      onError: (error) => {
        console.error("Error creating test", error);
      },
    });
  const form = useForm<z.infer<typeof newTestFormSchema>>({
    resolver: zodResolver(newTestFormSchema),
    defaultValues: {
      selectField: selectFieldValues[0].value,
      dateField: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof newTestFormSchema>) {
    createTest(values);
  }

  return (
    <Form {...form}>
      <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
        <FormInput
          control={form.control}
          name={"stringField"}
          textArea
          label="Title of string field"
          placeholder="Enter a string here"
          description="Long description of this input"
        />
        <FormInput
          control={form.control}
          name={"numericField"}
          type="number"
          label="Title of numeric field"
          placeholder="Enter a number here"
        />

        <SwitchInput
          control={form.control}
          name="switchField"
          label="Switch Field"
        />
        <CheckboxInput
          control={form.control}
          name="checkboxField"
          label="Checkbox Input"
          description={
            "Description of the checkbox input. This is a long description that should wrap to the next line."
          }
        />

        <SelectInput
          control={form.control}
          name="selectField"
          values={selectFieldValues}
          label="Select Field"
        />
        <DateInput
          control={form.control}
          name="dateField"
          label="Date Field"
          description="Your date of birth is used to calculate your age."
          disabled={(date: Date) =>
            date > new Date() || date < new Date("1900-01-01")
          }
        />
        <FileInput
          control={form.control}
          name="imageUrlField"
          label="Image Field"
          description="Some image to upload."
          endpoint="imageUploader"
        />

        <Button type="submit" loading={isPending}>
          Submit
        </Button>
      </form>
    </Form>
  );
}
