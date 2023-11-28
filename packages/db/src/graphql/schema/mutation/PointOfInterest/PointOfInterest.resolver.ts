import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreatePoiInput = NexusGenInputs['CreatePoiInput'];

export const createPoi = async (
  userId: string,
  input: CreatePoiInput,
  ctx: Context,
) => {
  return await ctx.prisma.pointOfInterest.create({
    data: {
      address: input.address,
      name: input.name,
      visitDuration: input.visitDuration,
      contactNumber: input.contactNumber,
      description: input.description || '',
      price: input.price,
      latitude: input.latitude,
      longitude: input.longitude,
      isAttraction: input.isAttraction,
      poiImages: {
        create: input.imageUrls.map((url) => {
          return {
            image: {
              create: {
                url: url,
              },
            },
          };
        }),
      },
      categories: {
        connectOrCreate: input.categories.map((cat) => ({
          where: { name: cat },
          create: { name: cat },
        })),
      },
      operatingHours: {
        createMany: {
          data: input.operatingHours.map((openingHour) => {
            return {
              day: openingHour.day,
              closeTime: new Date(openingHour.closeTime),
              is24Hours: openingHour.is24hours,
              isClosed: openingHour.isClosed,
              openTime: new Date(openingHour.openTime),
            };
          }),
        },
      },
      accommodation:
        input.amenities || []
          ? {
              create: {
                amenities: {
                  connectOrCreate: input.amenities?.map((amenity) => ({
                    where: { name: amenity },
                    create: { name: amenity },
                  })),
                },
              },
            }
          : undefined,
      restaurant:
        input.atmospheres || []
          ? {
              create: {
                atmospheres: {
                  set: input.atmospheres as string[],
                },
              },
            }
          : undefined,
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};
