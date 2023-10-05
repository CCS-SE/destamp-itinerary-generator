import {
  calculateCostScore,
  calculateDurationScore,
  calculateFitnessScore,
  calculateTravelExpense,
  getTotalDesiredTravelHours,
} from '../utils';

describe('evaluateFitness', () => {
  it('should evaluate fitness score of chromosome within budget and time', () => {
    const duration = 2;
    const travelHours = getTotalDesiredTravelHours([
      '10:00-15:00',
      '13:00-17:00',
    ]); // 9 hours
    const totalDistance = 10_000; // 10 km
    const totalDuration = 300; // total duration of chromosome (mins)
    const travelDuration = 120; // total travel duration of the trip (mins)

    const budget = 3_000;
    const accommodationCost = 0;
    const foodCost = 750;
    const attractionCost = 250;
    const totalTravelers = 2;
    const travelExpenses = calculateTravelExpense(totalDistance);

    const durationScore = calculateDurationScore(
      totalDuration,
      duration,
      travelDuration,
      travelHours,
    );

    const costScore = calculateCostScore(
      budget,
      accommodationCost,
      foodCost,
      attractionCost,
      totalTravelers,
      duration,
      travelExpenses,
    );

    const fitnessScore = calculateFitnessScore(costScore, durationScore);

    expect(fitnessScore).toBe(0.07663324605658088);
  });

  it('should evaluate fitness score of chromosome within budget and but over time', () => {
    const duration = 2;
    const travelHours = getTotalDesiredTravelHours([
      '10:00-15:00',
      '13:00-17:00',
    ]); // 9 hours
    const totalDistance = 10_000; // 10 km
    const totalDuration = 420; // 7 hours
    const travelDuration = 240; // 4 hours
    // this would be total of 11 hours

    const budget = 3_000;
    const accommodationCost = 0;
    const foodCost = 750;
    const attractionCost = 250;
    const totalTravelers = 2;
    const travelExpenses = calculateTravelExpense(totalDistance);

    const durationScore = calculateDurationScore(
      totalDuration,
      duration,
      travelDuration,
      travelHours,
    );

    const costScore = calculateCostScore(
      budget,
      accommodationCost,
      foodCost,
      attractionCost,
      totalTravelers,
      duration,
      travelExpenses,
    );

    const fitnessScore = calculateFitnessScore(costScore, durationScore);

    expect(fitnessScore).toBe(0.09077842499432635);
  });

  it('should evaluate fitness score of chromosome over budget and within time', () => {
    const duration = 2;
    const travelHours = getTotalDesiredTravelHours([
      '10:00-14:00',
      '13:00-16:00',
    ]); // 7 hours
    const totalDistance = 10_000; // 10 km
    const totalDuration = 300; // 6 hours
    const travelDuration = 120; // 2 hours

    const budget = 3_000;
    const accommodationCost = 650;
    const foodCost = 750;
    const attractionCost = 250;
    const totalTravelers = 2;
    const travelExpenses = calculateTravelExpense(totalDistance);

    // totalCost is around 3700

    const durationScore = calculateDurationScore(
      totalDuration,
      duration,
      travelDuration,
      travelHours,
    );

    const costScore = calculateCostScore(
      budget,
      accommodationCost,
      foodCost,
      attractionCost,
      totalTravelers,
      duration,
      travelExpenses,
    );

    const fitnessScore = calculateFitnessScore(costScore, durationScore);

    expect(fitnessScore).toBe(0.11093648886012758);
  });
});
