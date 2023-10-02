import { GetTravelerTripsDocument, TravelSize } from '~/graphql/generated';

export const TripsQueryMock = {
  request: {
    query: GetTravelerTripsDocument,
    variables: {
      userId: '',
    },
  },
  result: {
    data: {
      travelerTrips: [
        {
          id: 13,
          title: 'Baguio Trip',
          budget: 10_000,
          destination: {
            name: 'Baguio',
            image: {
              url: 'https://picsum.photos/seed/2gDf7Zl4/640/480',
            },
          },
          travelSize: TravelSize.Family,
          startDate: new Date(2023, 6, 12),
          endDate: new Date(2023, 6, 15),
        },
      ],
    },
  },
};

export const EmptyTripsQueryMock = {
  request: {
    query: GetTravelerTripsDocument,
    variables: {
      userId: '',
    },
  },
  result: {
    data: {
      travelerTrips: [],
    },
  },
};

export const ErrorTripsQueryMock = {
  request: {
    query: GetTravelerTripsDocument,
    variables: {
      userId: '',
    },
  },
  error: new Error('Something went wrong'),
};
