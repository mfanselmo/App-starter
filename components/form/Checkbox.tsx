import { type HTMLInputTypeAttribute } from "react";
import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";

import { Checkbox } from "../ui/checkbox";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  type?: HTMLInputTypeAttribute;
  label: string;
  placeholder?: string;
  description?: string;
};

export const CheckboxInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => {
        // If the field value is undefined, set it to false. This avoids having to set a default value in the form.
        if (field.value === undefined) {
          field.onChange(false);
        }
        return (
          <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
              />
            </FormControl>
            <div className="space-y-1 leading-none">
              <FormLabel>{label}</FormLabel>
              <FormDescription>{description}</FormDescription>
            </div>
          </FormItem>
        );
      }}
    />
  );
};
