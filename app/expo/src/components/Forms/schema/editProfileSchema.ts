import { z } from 'zod';

export const editProfileSchema = z.object({
  firstName: z.string().nonempty('Field is empty.'),
  lastName: z.string().nonempty('Field is empty.'),
});

export type EditProfileSchema = z.infer<typeof editProfileSchema>;
