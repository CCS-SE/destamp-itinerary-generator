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
    const costScore = calculateCostScore(2_500, 0, 750, 450, 2, 2, 345);

    expect(costScore).toBe(0.0245);
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
    const costScore = calculateCostScore(2_500, 0, 750, 450, 2, 2, 345);
    const durationScore = calculateDurationScore(480, 2, 12_600, 9);

    const fitnessScore = calculateFitnessScore(costScore, durationScore);

    expect(fitnessScore).toBe(0.1532684496896314);
  });
});

describe('getCoordinates', () => {
  it('should get the coordinates of places', () => {
    const coordinates = getCoordinates(places);

    expect(coordinates).toStrictEqual([
      [places[0]?.longitude, places[0]?.latitude],
      [places[1]?.longitude, places[1]?.latitude],
    ]);
  });
});

describe('getCoordinatesParam', () => {
  it('should get the coordinates params of places', () => {
    const coordinates = getCoordinates(places);
    const coordsParams = getCoordinatesParam(coordinates);

    expect(coordsParams).toBe('122.5706695,10.711599;122.5538653,10.7026051');
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
