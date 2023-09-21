import { TravelSize } from '@prisma/client';

import { MockContext } from '../../../../../types/types';
import { Context, createMockContext } from '../../../../context';
import { queryTravelerTrips } from '../trips.resolver';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('travelerTrips query', () => {
  it('should query traveler trips', async () => {
    const trips = [
      {
        id: 3,
        budget: 20_000,
        destinationId: 2,
        departingLocationId: 5,
        travelerId: 3,
        endDate: new Date('2023-9-21'),
        startDate: new Date('2023-9-23'),
        title: 'Iloilo City Trip',
        adultCount: null,
        childCount: null,
        travelSize: TravelSize.COUPLE,
        isAccommodationIncluded: false,
        isFoodIncluded: true,
        isTransportationIncluded: true,
        createdAt: new Date('2023-9-20'),
        updatedAt: new Date('2023-9-20'),
      },
      {
        id: 2,
        budget: 60_000,
        destinationId: 1,
        departingLocationId: 3,
        travelerId: 2,
        endDate: new Date('2023-2-18'),
        startDate: new Date('2023-2-21'),
        title: 'Cebu Trip',
        adultCount: 2,
        childCount: 2,
        travelSize: TravelSize.FAMILY,
        isAccommodationIncluded: false,
        isFoodIncluded: true,
        isTransportationIncluded: true,
        createdAt: new Date('2023-1-20'),
        updatedAt: new Date('2023-1-20'),
      },
    ];

    const userId = 'test';

    mockContext.prisma.trip.findMany.mockResolvedValue(trips);

    const result = await queryTravelerTrips(userId, context);

    expect(mockContext.prisma.trip.findMany).toBeCalledWith({
      where: {
        traveler: {
          userId: userId,
        },
      },
    });

    expect(result).toEqual(trips);
  });
});
