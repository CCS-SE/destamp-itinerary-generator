import { MockContext } from '../../../../../types/types';
import { Context, createMockContext } from '../../../../context';
import { pointOfInterests } from '../../Trip/__test__/mock/mock';
import { createPoi, deletePoi } from '../PointOfInterest.resolver';

let mockContext: MockContext;
let context: Context;

beforeEach(() => {
  mockContext = createMockContext();
  context = mockContext as unknown as Context;
});

afterEach(() => {
  jest.clearAllMocks();
});

describe('createPoi mutation', () => {
  it('should create POI', async () => {
    const poi = {
      id: 'test',
      userId: 'user1',
      name: 'Baliwag',
      description: '',
      address: 'Jaro Iloilo City',
      price: '0-200',
      contactNumber: '09998018540',
      latitude: 10.21921,
      longitude: 122.12912,
      visitDuration: 60,
      isAttraction: false,
      isVerified: true,
      categories: ['Family Restuarant'],
      imageUrls: ['image1-url', 'image2-url'],
      operatingHours: [],
      permitUrl: 'permit-url',
      createdAt: new Date('2023-11-25'),
      updatedAt: new Date('2023-11-25'),
    };

    mockContext.prisma.pointOfInterest.create.mockResolvedValue(poi);

    const mockArgs = {
      type: 'Restaurant',
      userId: 'user1',
      data: {
        name: 'Baliwag',
        description: '',
        address: 'Jaro Iloilo City',
        price: '0-200',
        contactNumber: '09998018540',
        latitude: 10.21921,
        longitude: 122.12912,
        visitDuration: 60,
        isAttraction: false,
        categories: ['Family Restuarant'],
        imageUrls: ['image1-url', 'image2-url'],
        operatingHours: [],
        permitUrl: 'permit-url',
        createdAt: new Date('2023-11-25'),
        updatedAt: new Date('2023-11-25'),
      },
    };

    const result = createPoi(
      mockArgs.type,
      mockArgs.userId,
      mockArgs.data,
      context,
    );

    await expect(result).resolves.toEqual(poi);
  });
});

describe('deletePoi mutation', () => {
  it('should delete POI', async () => {
    const poi = pointOfInterests[1]!;

    mockContext.prisma.pointOfInterest.delete.mockResolvedValue(poi);

    await expect(deletePoi(poi.id, context)).resolves.toEqual(poi);
  });
});
