/* eslint-disable indent */
import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreatePoiInput = NexusGenInputs['CreatePoiInput'];
type EditPoiInput = NexusGenInputs['EditPoiInput'];

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
      businessPermitImage: {
        create: {
          image: {
            create: {
              url: input.permitUrl,
            },
          },
        },
      },
      user: {
        connect: {
          id: userId,
        },
      },
    },
  });
};

export const editPoi = async (
  type: string,
  poiId: string,
  input: EditPoiInput,
  ctx: Context,
) => {
  const poi = await ctx.prisma.pointOfInterest.findUniqueOrThrow({
    where: {
      id: poiId,
    },
  });

  if (ctx.userId !== poi.userId) {
    throw new Error('You are not authorized to edit this point of interest.');
  }

  return await ctx.prisma.pointOfInterest.update({
    where: {
      id: poiId,
    },
    data: {
      address: input.address as string,
      name: input.name as string,
      visitDuration:
        type === 'Accommodation' ? 60 * 24 : (input.visitDuration as number),
      contactNumber: input.contactNumber as string,
      description: input.description,
      price: input.price as string,
      latitude: input.latitude as number,
      longitude: input.longitude as number,
      poiImages:
        input.imageUrls !== undefined &&
        input.imageUrls!.length > 0 &&
        input.imageUrls != null
          ? {
              deleteMany: {},
              create: input.imageUrls!.map((url) => {
                return {
                  image: {
                    create: {
                      url: url,
                    },
                  },
                };
              }),
            }
          : undefined,
      categories:
        input.categories != undefined &&
        input.categories!.length > 0 &&
        input.categories != null
          ? {
              deleteMany: {},
              connectOrCreate: input.categories!.map((cat) => ({
                where: { name: cat },
                create: { name: cat },
              })),
            }
          : undefined,
      operatingHours:
        input.operatingHours != undefined &&
        input.operatingHours!.length > 0 &&
        input.operatingHours != null
          ? {
              deleteMany: {},
              create: input.operatingHours!.map((openingHour) => {
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
            }
          : undefined,
      accommodation:
        type === 'Accommodation' &&
        input.amenities != undefined &&
        input.amenities!.length > 0 &&
        input.amenities != null
          ? {
              update: {
                amenities: {
                  deleteMany: {},
                  connectOrCreate: input.amenities?.map((amenity) => ({
                    where: { name: amenity },
                    create: { name: amenity },
                  })),
                },
              },
            }
          : undefined,
      restaurant:
        type === 'Restaurant' &&
        input.atmospheres != undefined &&
        input.atmospheres!.length > 0 &&
        input.atmospheres != null
          ? {
              update: {
                atmospheres: {
                  set: input.atmospheres as string[],
                },
              },
            }
          : undefined,
    },
  });
};

export const deletePoi = async (poiId: string, ctx: Context) => {
  const poi = await ctx.prisma.pointOfInterest.findUniqueOrThrow({
    where: {
      id: poiId,
    },
  });

  if (ctx.userId !== poi?.userId) {
    throw new Error('You are not authorized to delete this point of interest.');
  }

  return await ctx.prisma.pointOfInterest.delete({
    where: {
      id: poiId,
    },
  });
};
