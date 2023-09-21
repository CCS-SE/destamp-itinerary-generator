import { intArg, nonNull, queryField } from 'nexus';

import { queryItinerary } from './itinerary.resolver';

const Itinerary = queryField('itinerary', {
  type: nonNull('Itinerary'),
  args: {
    tripId: nonNull(intArg()),
  },
  resolve: (_, args, ctx) => queryItinerary(args.tripId, ctx),
});

export default [Itinerary];
