import { TravelSize } from '@prisma/client';

import { MockContext } from '../../../../../types/types';
import { Context, createMockContext } from '../../../../context';
import { deleteTrip } from '../Trip.resolver';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

afterEach(() => {
  jest.clearAllMocks();
});

// describe('createTrip mutation', () => {
//   it('should create a trip with valid input', async () => {
//     const dailyPlans: Chromosome[] = [
//       {
//         chrom: {
//           accommodationCost: () => 1000,
//           attractionCost: () => 1000,
//           foodCostRange: () => '200-400',
//           genes: [
//             {
//               address: 'sample',
//               createdAt: new Date('2023-9-21'),
//               id: 'poxkxnk',
//               latitude: 10.2191,
//               longitude: 121.2019,
//               name: 'sample',
//               price: '200',
//               type: PlaceType.RESTAURANT,
//               updatedAt: new Date('2023-9-21'),
//               visitDuration: 60,
//               contactNumber: '',
//               description: '',
//               url: 'sample',
//               website: '',
//             },
//           ],
//           parsePrice: () => 100,
//           sumCost: () => 1000,
//           sumDuration: () => 120,
//         },
//         fitnessScore: 0,
//         totalCost: 0,
//         totalDuration: 0,
//         travelDuration: 0,
//         travelExpenses: 0,
//       },
//     ];

//     const trip = {
//       budget: 20_000,
//       destinationId: 2,
//       travelerId: 3,
//       departingLocationId: 1,
//       endDate: new Date('2023-9-21'),
//       startDate: new Date('2023-9-23'),
//       title: 'Iloilo City Trip',
//       travelSize: TravelSize.COUPLE,
//       isAccommodationIncluded: false,
//       isFoodIncluded: true,
//       isTransportationIncluded: false,
//       preferredTime: ['10:00-14:00'],
//       adultCount: null,
//       childCount: null,
//       createdAt: new Date('2023-9-20'),
//       updatedAt: new Date('2023-9-20'),
//       itinerary: {
//         create: {
//           dailyItineraries: {
//             create: dailyPlans,
//           },
//           totalCost: 0,
//           totalDuration: 0,
//           url: 'test',
//         },
//       },
//     };

//     const tripInput = {
//       budget: 20_000,
//       destinationId: 1,
//       travelerId: 3,
//       departingLocationId: 1,
//       endDate: new Date('2023-9-21'),
//       startDate: new Date('2023-9-23'),
//       title: 'Iloilo City Trip',
//       adultCount: null,
//       childCount: null,
//       travelSize: TravelSize.COUPLE,
//       isAccommodationIncluded: false,
//       isFoodIncluded: true,
//       isTransportationIncluded: false,
//       preferredTime: ['10:00-14:00'],
//       itinerary: {
//         create: {
//           dailyItineraries: {
//             create: [],
//           },
//           totalCost: 0,
//           totalDuration: 0,
//           url: 'sample',
//         },
//       },
//     };

//     const locationInput = {
//       id: 1,
//       name: 'Cpu',
//       address: 'Jaro',
//       longitude: 120.3232,
//       latitude: 10.2313,
//     };

//     mockContext.prisma.departingLocation.create.mockResolvedValue(
//       locationInput,
//     );

//     mockContext.prisma.trip.create.mockResolvedValue({
//       id: 2,
//       ...trip,
//     });

//     const expectedResult = {
//       id: 2,
//       ...trip,
//     };

//     const result = await createTrip(tripInput, locationInput, context);

//     expect(mockContext.prisma.trip.create).toBeCalledWith({
//       data: {
//         ...tripInput,
//       },
//     });

//     expect(result).toEqual(expectedResult);
//   });
// });

describe('deleteTrip mutation', () => {
  it('should delete a trip', async () => {
    const tripId = 1;

    const trip = {
      id: 1,
      budget: 20_000,
      destinationId: 2,
      travelerId: 3,
      endDate: new Date('2023-9-21'),
      startDate: new Date('2023-9-23'),
      title: 'Iloilo City Trip',
      travelSize: TravelSize.COUPLE,
      departingLocationId: 3,
      isAccommodationIncluded: false,
      isFoodIncluded: true,
      isTransportationIncluded: false,
      adultCount: null,
      childCount: null,
      preferredTime: ['10:00-14:00'],
      createdAt: new Date('2023-9-20'),
      updatedAt: new Date('2023-9-20'),
    };

    const itinerary = {
      id: 1,
      url: 'test',
      totalCost: 0,
      totalDuration: 0,
      tripId: trip.id,
      createdAt: new Date('2023-9-20'),
      updatedAt: new Date('2023-9-20'),
    };

    mockContext.prisma.itinerary.findFirstOrThrow.mockResolvedValue(itinerary);
    mockContext.prisma.trip.delete.mockResolvedValue(trip);

    const result = await deleteTrip(tripId, context);

    expect(mockContext.prisma.trip.delete).toBeCalledWith({
      include: {
        departingLocation: true,
      },
      where: {
        id: 1,
      },
    });

    expect(result).toEqual(trip);
  });
});
