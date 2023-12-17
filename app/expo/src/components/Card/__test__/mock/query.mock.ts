import { DeleteTripDocument, TravelSize } from '~/graphql/generated';

// Calculate the days difference
const startDate = new Date(2023, 5, 9);
const endDate = new Date(2023, 5, 12);
const daysDifference = Math.ceil(
  (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
);

export const tripCardData = {
  budget: 10_000,
  title: 'Iloilo City',
  endDate: new Date(2023, 5, 12),
  id: 1,
  startDate: new Date(2023, 5, 9),
  travelSize: TravelSize.Group,
  imgSrc:
    'https://lh5.googleusercontent.com/p/AF1QipM3no0xRNR49mLdCGlRknEdhi7oFruc4gAVyNKc=w675-h390-n-k-no',
  totalTravellers: 10,
  stampId: 1,
  stampUrl: 'test',
  isPremium: false,
  stampTitle: 'Iloilo City',
  isStampClaimed: true,
  daysDifference, // Assign the calculated value
  setRegenerating: () => {},
  setDeleting: () => {},
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
