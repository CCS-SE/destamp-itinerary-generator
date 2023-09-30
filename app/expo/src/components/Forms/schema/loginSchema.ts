import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({
      required_error: 'Email is required.',
    })
    .email({ message: 'Enter a valid email.' }),
  password: z.string({
    required_error: 'Password is required.',
  }),
});

export type LoginSchema = z.infer<typeof loginSchema>;
