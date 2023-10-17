import { NexusGenInputs } from '../../../graphql/generated/nexus';
import {
  calculateAveragePrice,
  calculateCostScore,
  calculateDurationScore,
  calculateFitnessScore,
  calculateTotalCost,
  calculateTotalDuration,
  calculateTravelDuration,
  calculateTravelExpense,
  calculateTravelExpenses,
  getCoordinates,
  getCoordinatesParam,
  getDesiredTravelHour,
  getMatrixAvg,
  getTotalDesiredTravelHours,
  multiplyRangeByPeople,
} from '../utils';
import { places } from './mock/mock';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

describe('multiplyRangeByPeople', () => {
  it('should get get a total range if multiplied by number of travelers', () => {
    const total = multiplyRangeByPeople('366-650', 3);

    expect(total).toBe('1098-1950');
  });
});

describe('calculateAveragePrice', () => {
  it('should get the average price of a price range', () => {
    const avgPrice = calculateAveragePrice('400-600');

    expect(avgPrice).toBe(500);
  });
});

describe('calculateCostScore', () => {
  it('should get the cost score', () => {
    const tripInput: CreateTripInput = {
      budget: 2_500,
      endDate: new Date('2023-08-12'),
      isAccommodationIncluded: false,
      isFoodIncluded: true,
      isTransportationIncluded: true,
      startDate: new Date('2023-08-10'),
      title: 'Iloilo City Trip',
      preferredTime: ['10:00-13:00', '14:00-16:00'],
      adultCount: 2,
      childCount: 0,
      destinationId: 1,
      travelerId: 1,
      travelSize: 'COUPLE',
    };
    const costScore = calculateCostScore(tripInput, 0, 750, 450, 2, 2, 345);

    expect(costScore).toBe(0.1445);
  });
});

describe('calculateDurationScore', () => {
  it('should get the duration score', () => {
    const durationScore = calculateDurationScore(480, 2, 12_600, 9);

    expect(durationScore).toBe(6.5);
  });
});

describe('calculateFitnessScore', () => {
  it('should get the fitness score', () => {
    const tripInput: CreateTripInput = {
      budget: 2_500,
      endDate: new Date('2023-08-12'),
      isAccommodationIncluded: false,
      isFoodIncluded: true,
      isTransportationIncluded: true,
      startDate: new Date('2023-08-10'),
      title: 'Iloilo City Trip',
      preferredTime: ['10:00-13:00', '14:00-16:00'],
      adultCount: 2,
      childCount: 0,
      destinationId: 1,
      travelerId: 1,
      travelSize: 'COUPLE',
    };

    const costScore = calculateCostScore(tripInput, 0, 750, 450, 2, 2, 345);
    const durationScore = calculateDurationScore(480, 2, 12_600, 9);

    const fitnessScore = calculateFitnessScore(costScore, durationScore);

    expect(fitnessScore).toBe(0.48753138483289865);
  });
});

describe('getCoordinates', () => {
  it('should get the coordinates of places', () => {
    const coordinates = getCoordinates(places);

    expect(coordinates).toStrictEqual([
      [places[0]?.longitude, places[0]?.latitude],
      [places[1]?.longitude, places[1]?.latitude],
      [places[2]?.longitude, places[2]?.latitude],
      [places[3]?.longitude, places[3]?.latitude],
      [places[4]?.longitude, places[4]?.latitude],
      [places[5]?.longitude, places[5]?.latitude],
      [places[6]?.longitude, places[6]?.latitude],
    ]);
  });
});

describe('getCoordinatesParam', () => {
  it('should get the coordinates params of places', () => {
    const coordinates = getCoordinates(places);
    const coordsParams = getCoordinatesParam(coordinates);

    expect(coordsParams).toBe(
      '122.5706695,10.711599;122.5538653,10.7026051;122.5703695,10.6921669;122.539675,10.7183491;122.5478876,10.7170505;122.568212,10.7014032;122.5508008,10.7025543',
    );
  });
});

describe('calculateTotalCost', () => {
  it('should get the total cost of trip', () => {
    const totalCost = calculateTotalCost(890, 2, 95);

    expect(totalCost).toBe(1875);
  });
});

describe('calculateTotalDuration', () => {
  it('should get the total duration of trip in mins', () => {
    const totalDuration = calculateTotalDuration(375, 5_400);

    expect(totalDuration).toBe(465);
  });
});

describe('calculateTravelDuration', () => {
  it('should get the travel duration of trip in hours', () => {
    const travelDuration = calculateTravelDuration(5_400);

    expect(travelDuration).toBe(1.5);
  });
});

describe('getAvg', () => {
  it('should get the average of a matrix', () => {
    const avg = getMatrixAvg([
      [3, 5],
      [10, 5],
      [7, 8],
    ]);

    expect(avg).toBe(6.333333333333333);
  });
});

describe('calculateTravelExpense', () => {
  it('should get the estimated travel expenses', () => {
    const travelExpense = calculateTravelExpense(5_000);

    expect(travelExpense).toBe(108);
  });
});

describe('getTotalDesiredTravelHours', () => {
  it('should get the total desired travel hours', () => {
    const travelHours = getTotalDesiredTravelHours([
      '10:00-15:00',
      '9:00-13:00',
    ]);

    expect(travelHours).toBe(9);
  });
});

describe('getDesiredTravelHour', () => {
  it('should get the desired travel hour', () => {
    const travelHours = getDesiredTravelHour('10:00-15:00');
    expect(travelHours).toBe(5);
  });
});

describe('calculateTravelExpenses', () => {
  it('should calculate expenses of travel distances', () => {
    const travelExpense = calculateTravelExpenses([
      896.4, 4686.5, 8725.6, 7080,
    ]);
    expect(travelExpense).toBe(449);
  });
});
