import { z } from 'zod';

export const addBusinessProfileSchema = z.object({
  name: z.string().nonempty('Field is empty.'),
  description: z.string().optional(),
  contactNumber: z.string().regex(/^\d{9}$/, 'Provide valid contact number.'),
  address: z.string().nonempty('Field is empty.'),
});

export type AddBusinessProfileSchema = z.infer<typeof addBusinessProfileSchema>;
