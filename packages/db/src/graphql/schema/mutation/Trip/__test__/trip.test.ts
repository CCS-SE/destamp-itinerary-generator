import { TravelSize } from '@prisma/client';

import { fetchMapboxMatrix } from '../../../../../service/mapboxService';
import { MockContext } from '../../../../../types/types';
import { Context, createMockContext } from '../../../../context';
import { createTrip, deleteTrip } from '../Trip.resolver';
import { pointOfInterests } from './mock/mock';

let mockContext: MockContext;
let context: Context;

jest.mock('../../../../../service/mapboxService', () => ({
  fetchMapboxMatrix: jest.fn(),
}));

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('createTrip mutation', () => {
  it('should create a trip with complete and valid inputs', async () => {
    const mockMatrix = {
      distances: Array.from({ length: 8 }, () => Array(8).fill(0)),
      durations: Array.from({ length: 8 }, () => Array(8).fill(0)),
    };

    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        mockMatrix.distances[i]![j] = j + 1 * 10;
        mockMatrix.durations[i]![j] = j * 10;
      }
    }
    (fetchMapboxMatrix as jest.Mock).mockImplementation(() =>
      Promise.resolve(mockMatrix),
    );

    const trip = {
      budget: 1500,
      createdAt: new Date('2022-10-12'),
      isFoodIncluded: true,
      isTransportationIncluded: true,
      title: 'Iloilo City Trip',
      travelSize: TravelSize.COUPLE,
      travelerCount: 2,
      isAccommodationIncluded: false,
      startDate: new Date('2022-10-12'),
      endDate: new Date('2022-10-12'),
      id: 1,
      destination: 'Iloilo City',
      startingLocation: {
        place_name: 'Esplanade',
        name: 'Esplanade',
        center: [10.219829, 122.02819],
      },
      timeSlots: [[10, 15]],
      updatedAt: new Date('2022-10-12'),
      travelerId: 'test',
    };

    mockContext.prisma.traveler.findFirstOrThrow.mockImplementation(() => {
      return {
        id: 'test',
      };
    });

    mockContext.prisma.pointOfInterest.findMany.mockResolvedValue(
      pointOfInterests,
    );

    mockContext.prisma.trip.create.mockResolvedValue(trip);

    const tripInput = {
      budget: 1500,
      isAccommodationIncluded: false,
      destination: 'Iloilo City',
      isFoodIncluded: true,
      startingLocation: {
        place_name: 'Esplanade',
        name: 'Esplanade',
        center: [10.219829, 122.02819],
      },
      isTransportationIncluded: true,
      title: 'Iloilo City Trip',
      travelSize: TravelSize.COUPLE,
      travelerCount: 2,
      startDate: new Date('2022-9-12'),
      endDate: new Date('2022-9-12'),
      timeSlots: [[8, 12]],
    };

    const tripPreferenceInput = {
      accommodationType: '',
      activities: ['Sightseeing'],
      amenities: [],
      cuisines: ['Italian', 'American'],
      diningStyles: ['Casual'],
    };

    await expect(
      createTrip(true, 'user1', tripInput, tripPreferenceInput, context),
    ).rejects.toThrow('You are not authorized to create this trip.');
  });
});

describe('deleteTrip mutation', () => {
  it('should delete a trip', async () => {
    const trip = {
      budget: 1500,
      createdAt: new Date('2022-10-12'),
      isFoodIncluded: true,
      isTransportationIncluded: true,
      title: 'Iloilo City Trip',
      travelSize: TravelSize.COUPLE,
      travelerCount: 2,
      isAccommodationIncluded: false,
      startDate: new Date('2022-10-12'),
      endDate: new Date('2022-10-13'),
      id: 1,
      destination: 'Iloilo City',
      startingLocation: {
        place_name: 'Esplanade',
        name: 'Esplanade',
        center: [10.219829, 122.02819],
      },
      timeSlots: [[10, 15]],
      updatedAt: new Date('2022-10-12'),
      travelerId: 'test',
    };

    mockContext.prisma.trip.delete.mockResolvedValue(trip);

    const result = await deleteTrip(trip.id, context);

    expect(result).toEqual(trip);
  });
});
