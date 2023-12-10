import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreatePoiInput = NexusGenInputs['CreatePoiInput'];

export const createPoi = async (
  type: string,
  userId: string,
  input: CreatePoiInput,
  ctx: Context,
) => {
  return await ctx.prisma.pointOfInterest.create({
    data: {
      address: input.address,
      name: input.name,
      visitDuration: type === 'Accommodation' ? 60 * 24 : input.visitDuration,
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
            return type !== 'Accommodation'
              ? {
                  day: openingHour.day,
                  closeTime: new Date(openingHour.closeTime),
                  is24Hours: openingHour.is24hours,
                  isClosed: openingHour.isClosed,
                  openTime: new Date(openingHour.openTime),
                }
              : {
                  day: openingHour.day,
                  closeTime: null,
                  is24Hours: true,
                  isClosed: false,
                  openTime: null,
                };
          }),
        },
      },
      accommodation:
        type === 'Accommodation'
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
        type === 'Restaurant'
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
      businessPermit: {
        create: {
          user: {
            connect: {
              id: userId,
            },
          },
          image: {
            create: {
              url: input.permitUrl,
            },
          },
        },
      },
    },
  });
};

export const deletePoi = async (poiId: string, ctx: Context) => {
  await ctx.prisma.businessPermit.delete({
    where: {
      poiId: poiId,
    },
  });
  await ctx.prisma.operatingHour.deleteMany({
    where: {
      poiId: poiId,
    },
  });

  await ctx.prisma.poiImage.deleteMany({
    where: {
      poiId: poiId,
    },
  });

  await ctx.prisma.image.deleteMany({
    where: {
      poiImage: {
        poiId: poiId,
      },
    },
  });

  const restaurant = await ctx.prisma.restaurant.findUnique({
    where: {
      poiId: poiId,
    },
  });
  const accommodation = await ctx.prisma.accommodation.findUnique({
    where: {
      poiId: poiId,
    },
  });

  if (restaurant) {
    await ctx.prisma.restaurant.delete({
      where: {
        id: restaurant.id,
      },
    });
  }

  if (accommodation) {
    await ctx.prisma.accommodation.delete({
      where: {
        id: accommodation.id,
      },
    });
  }

  return await ctx.prisma.pointOfInterest.delete({
    where: {
      id: poiId,
    },
  });
};
