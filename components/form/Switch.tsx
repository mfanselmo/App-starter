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

import { Switch } from "../ui/switch";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  placeholder?: string;
  description?: string;
};

export const SwitchInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
}: Props<T>) => {
  // control.

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
          <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
            <div className="space-y-0.5">
              <FormLabel className="text-base">{label}</FormLabel>
              {description && <FormDescription>{description}</FormDescription>}
            </div>
            <FormControl>
              <Switch
                checked={field.value ?? false}
                onCheckedChange={field.onChange}
              />
            </FormControl>
          </FormItem>
        );
      }}
    />
  );
};
