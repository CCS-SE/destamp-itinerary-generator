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
      .regex(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/,
        'Password must be atleast 8 characters, contain at least\none uppercase letter, one lowercase letter, and one number.',
      )
      .refine((s) => !s.includes(' '), 'Password must not contain spaces.'),
    confirmPassword: z.string().nonempty('Confirm password is required.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Password does not match.',
  });

export type SignUpSchema = z.infer<typeof signUpSchema>;
