import { z } from 'zod';

export const businessInfoSchema = z.object({
  name: z.string().nonempty('Field is empty.'),
  description: z.string().optional(),
  contactNumber: z
    .string()
    .regex(/^\d{10}$|^02\d{7}$/, 'Provide valid contact number.'),
});

export const attractionSchema = z.object({
  admissionFee: z
    .string()
    .refine(
      (price) => price !== '' && !isNaN(Number(price)) && Number(price) >= 0,
      'Provide valid price.',
    ),
});

export const accommodationSchema = z.object({
  hotelPrice: z
    .string()
    .refine(
      (price) => !isNaN(Number(price)) && Number(price) > 0 && price !== '',
      'Provide valid price',
    ),
});

export const restaurantSchema = z
  .object({
    minPrice: z
      .string()
      .refine(
        (price) => price !== '' && !isNaN(Number(price)) && Number(price) >= 0,
        'Provide valid min price.',
      ),
    maxPrice: z
      .string()
      .refine(
        (price) => price !== '' && !isNaN(Number(price)) && Number(price) >= 0,
        'Provide valid max price.',
      ),
  })
  .refine((data) => Number(data.minPrice) <= Number(data.maxPrice), {
    message: 'Min price must be less than max price.',
    path: ['minPrice'],
  });

export type BusinessInfoSchema = z.infer<typeof businessInfoSchema>;
export type AttractionSchema = z.infer<typeof attractionSchema>;
export type AccommodationSchema = z.infer<typeof accommodationSchema>;
export type RestaurantSchema = z.infer<typeof restaurantSchema>;
