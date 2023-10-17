import { z } from 'zod';

export const addSpendingSchema = z.object({
  amount: z.string().nonempty('Amount is Required.'),
});

export type AddSpendingSchema = z.infer<typeof addSpendingSchema>;
