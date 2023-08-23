import {  list, nonNull, queryField } from 'nexus';
import { queryTrips } from './trips.resolver';

const Trips = queryField('trips', {
  type: nonNull(list('Trip')),
  resolve: (_, __, ctx) => queryTrips(ctx),
});

export default [Trips];
