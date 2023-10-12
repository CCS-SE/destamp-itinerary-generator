import { z } from 'zod';

export const editSpendingSchema = z.object({
  amount: z.string({
    required_error: 'Amount is required.',
  }),
});

export type EditSpendingSchema = z.infer<typeof editSpendingSchema>;
