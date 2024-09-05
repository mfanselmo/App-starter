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
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  type?: "text" | "number";
  label?: string;
  placeholder?: string;
  description?: string;
  textArea?: boolean;
};

export const FormInput = <T extends FieldValues>({
  control,
  name,
  type = "text",
  label,
  placeholder,
  description,
  textArea,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            {textArea ? (
              <Textarea
                placeholder={placeholder}
                {...field}
                // Even if the value is undefined (for numbers and strings), we want to pass an empty string to the input to avoid the error
                value={field.value ?? ""}
              />
            ) : (
              <Input
                placeholder={placeholder}
                {...field}
                type={type}
                // Even if the value is undefined (for numbers and strings), we want to pass an empty string to the input to avoid the error
                value={field.value ?? ""}
              />
            )}
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
