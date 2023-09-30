import { z } from 'zod';

export const addSpendingSchema = z.object({
  amount: z.string({
    required_error: 'Amount is required.',
  }),
});

export type AddSpendingSchema = z.infer<typeof addSpendingSchema>;
