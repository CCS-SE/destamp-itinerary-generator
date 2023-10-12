import { z } from 'zod';

export const addProfileSchema = z.object({
  firstName: z.string().nonempty('Field is empty.'),
  lastName: z.string().nonempty('Field is empty.'),
});

export type AddProfileSchema = z.infer<typeof addProfileSchema>;
