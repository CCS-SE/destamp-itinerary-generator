import { list, nonNull, queryField, stringArg } from 'nexus';

import { queryTravelerTrips } from './trips.resolver';

const TravelerTrips = queryField('travelerTrips', {
  type: nonNull(list('Trip')),
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx) => queryTravelerTrips(args.userId, ctx),
});

const Traveler = queryField('traveler', {
  type: 'Traveler',
  args: {
    userId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx) =>
    ctx.prisma.traveler.findUniqueOrThrow({
      where: {
        userId: args.userId as string,
      },
    }),
});

export default [TravelerTrips, Traveler];
