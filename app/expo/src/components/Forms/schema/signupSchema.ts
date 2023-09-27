import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z
      .string()
      .min(1, { message: 'Email is required.' })
      .email({ message: 'Enter a valid email.' }),
    password: z
      .string()
      .min(1, { message: 'Password is required.' })
      .min(6, { message: 'Password must be atleast 6 characters.' }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Confirm password is required.' }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password does not match.',
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
