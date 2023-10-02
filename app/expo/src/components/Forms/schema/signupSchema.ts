import { z } from 'zod';

export const signUpSchema = z
  .object({
    email: z
      .string()
      .nonempty('Email is required.')
      .email({ message: 'Enter a valid email.' }),
    password: z
      .string()
      .nonempty('Password is required.')
      .min(6, { message: 'Password must be atleast 6 characters.' }),
    confirmPassword: z.string().nonempty('Confirm password is required.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password does not match.',
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
