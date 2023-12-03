import { DeleteTripDocument, TravelSize } from '~/graphql/generated';

export const tripCardData = {
  budget: 10_000,
  title: 'Iloilo City',
  endDate: new Date(2023, 5, 12),
  id: 1,
  startDate: new Date(2023, 5, 9),
  travelSize: TravelSize.Group,
  imgSrc:
    'https://gttp.imgix.net/223596/x/0/top-23-iloilo-tourist-spots-home-to-gigantes-islands-amp-old-churches-6.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883',
  totalTravellers: 10,
  stampId: 1,
  stampUrl: 'test',
  stampTitle: 'Iloilo City',
  isStampClaimed: true,
};

const id = 123;

export const TripsQueryMock = [
  {
    request: {
      query: DeleteTripDocument,
      variables: {
        deleteTripId: id,
      },
    },
    result: {
      data: {
        deleteTrip: {
          id,
          title: 'Deleted Trip',
        },
      },
    },
  },
];
