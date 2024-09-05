import * as z from "zod";

export const selectFieldValues = [
  { label: "Option 1", value: "option1" },
  { label: "Option 2", value: "option2" },
  { label: "Option 3", value: "option3" },
];

export const editTestFormSchema = z.object({
  stringField: z.string().min(1),
  numericField: z.coerce.number(),
  switchField: z.boolean(),
  checkboxField: z.boolean(),
  selectField: z
    .string()
    .refine((val) => selectFieldValues.some((v) => v.value === val)),
  dateField: z.date(),
});
