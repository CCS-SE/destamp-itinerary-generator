import { TravelSize } from '@prisma/client';

import { Context } from '../../../context';
import { NexusGenInputs } from '../../../generated/nexus';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

export const createTrip = (args: CreateTripInput, ctx: Context) => {
  return ctx.prisma.trip.create({
    data: {
      budget: args.budget as number,
      endDate: args.endDate as Date,
      startDate: args.startDate as Date,
      title: args.title as string,
      travelSize: args.travelSize as TravelSize,
      adultCount: args.adultCount as number,
      childCount: args.childCount as number,
      destinationId: args.destinationId as number,
    },
  });
};
