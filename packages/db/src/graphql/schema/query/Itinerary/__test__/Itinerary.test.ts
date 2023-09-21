import { MockContext } from '../../../../../types/types';
import { Context, createMockContext } from '../../../../context';
import { queryItinerary } from '../itinerary.resolver';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('itinerary query', () => {
  it('should query trips itinerary', async () => {
    const itinerary = {
      id: 1,
      url: 'test',
      totalCost: 10_000,
      totalDuration: 6.734,
      tripId: 3,
      createdAt: new Date('2023-5-20'),
      updatedAt: new Date('2023-5-20'),
    };

    const tripId = 3;

    mockContext.prisma.itinerary.findUniqueOrThrow.mockResolvedValue(itinerary);

    const result = await queryItinerary(tripId, context);

    expect(mockContext.prisma.itinerary.findUniqueOrThrow).toBeCalledWith({
      where: {
        tripId: tripId,
      },
    });

    expect(result).toEqual(itinerary);
  });
});
