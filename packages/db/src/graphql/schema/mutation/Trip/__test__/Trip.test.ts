import { TravelSize } from '@prisma/client';

import { MockContext } from '../../../../../types/types';
import { Context, createMockContext } from '../../../../context';
import { createTrip } from '../Trip.resolver';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('createTrip mutation', () => {
  it('should create a trip with valid input', async () => {
    const trip = {
      budget: 20_000,
      destinationId: 2,
      travelerId: 3,
      endDate: new Date('2023-9-21'),
      startDate: new Date('2023-9-23'),
      title: 'Iloilo City Trip',
      travelSize: TravelSize.COUPLE,
      adultCount: null,
      childCount: null,
      createdAt: new Date('2023-9-20'),
      updatedAt: new Date('2023-9-20'),
    };

    const tripInput = {
      budget: 20_000,
      destinationId: 2,
      endDate: new Date('2023-9-21'),
      startDate: new Date('2023-9-23'),
      title: 'Iloilo City Trip',
      adultCount: null,
      childCount: null,
      travelSize: TravelSize.COUPLE,
    };

    mockContext.prisma.trip.create.mockResolvedValue({
      id: 2,
      ...trip,
    });

    const expectedResult = {
      id: 2,
      ...trip,
    };

    const result = await createTrip(tripInput, context);

    expect(mockContext.prisma.trip.create).toBeCalledWith({
      data: {
        ...tripInput,
      },
    });

    expect(result).toEqual(expectedResult);
  });
});
