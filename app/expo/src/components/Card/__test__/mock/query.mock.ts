import { DeleteTripDocument, TravelSize } from '~/graphql/generated';

export const tripCardData = {
  budget: 10_000,
  destination: 'Iloilo City',
  endDate: new Date(2023, 5, 12),
  id: 1,
  startDate: new Date(2023, 5, 9),
  travelSize: TravelSize.Group,
  imgSrc: 'https://loremflickr.com/640/480?lock=407702771597312',
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
