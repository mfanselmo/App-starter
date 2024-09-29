import {
  type Control,
  type FieldPath,
  type FieldValues,
} from "react-hook-form";

import type { OurFileRouter } from "@/app/api/uploadthing/core";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { UploadDropzone } from "@/components/uploadThing";

type Props<T extends FieldValues> = {
  control: Control<T>;
  name: FieldPath<T>;
  label?: string;
  description?: string;
  endpoint: keyof OurFileRouter;
};

export const FileInput = <T extends FieldValues>({
  control,
  name,
  label,
  description,
  endpoint,
}: Props<T>) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <UploadDropzone
              endpoint={endpoint}
              onClientUploadComplete={(res) => {
                console.log("xx-res", res);
                field.onChange(res[0].appUrl);
              }}
              onUploadError={(error: Error) => {
                alert(`ERROR! ${error.message}`);
              }}
            />
          </FormControl>
          {description && <FormDescription>{description}</FormDescription>}
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
