import DestinationsQuery from './Destination/destinations.query';
import { Transaction } from './Expense/transaction.query';
import ItineraryQuery from './Itinerary/itinerary.query';
import PlacesQuery from './Place/places.query';
import TravelerTripsQuery from './Traveler/trips.query';
import TripQuery from './Trip/trip.query';

export default [
  TravelerTripsQuery,

  PlacesQuery,

  ItineraryQuery,

  TripQuery,
  Transaction,
  ,
  DestinationsQuery,
];
