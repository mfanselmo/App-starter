import { zodResolver } from "@hookform/resolvers/zod";
import { type inferRouterOutputs } from "@trpc/server";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { type z } from "zod";

import { trpc } from "@/app/_trpc/client";

import { type AppRouter } from "@/server";

import { editTestFormSchema, selectFieldValues } from "@/lib/forms/test/edit";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";

import { CheckboxInput } from "@/components/form/Checkbox";
import { DateInput } from "@/components/form/Date";
import { FileInput } from "@/components/form/File";
import { FormInput } from "@/components/form/Input";
import { SelectInput } from "@/components/form/Select";
import { SwitchInput } from "@/components/form/Switch";

type RouterOutput = inferRouterOutputs<AppRouter>;

export function EditDialog(props: {
  test: RouterOutput["testsRouter"]["getTest"];
}) {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const { mutate: createTest, isPending } =
    trpc.testsRouter.updateTest.useMutation({
      onSuccess: () => {
        router.refresh();
        setOpen(false);
      },
    });
  const form = useForm<z.infer<typeof editTestFormSchema>>({
    resolver: zodResolver(editTestFormSchema),
    defaultValues: {
      stringField: props.test.stringField,
      numericField: props.test.numericField,
      switchField: props.test.switchField,
      checkboxField: props.test.checkboxField,
      selectField: props.test.selectField,
      dateField: props.test.dateField,
      imageUrlField: props.test.imageUrlField,
    },
  });

  function onSubmit(values: z.infer<typeof editTestFormSchema>) {
    createTest({ id: props.test.id, data: values });
  }
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Edit Test</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Test</DialogTitle>
          <DialogDescription>
            Make changes to your Test here. Click save when youre done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8" onSubmit={form.handleSubmit(onSubmit)}>
            <FormInput
              control={form.control}
              name={"stringField"}
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

            <DialogFooter>
              <Button type="submit" loading={isPending}>
                Save changes
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
