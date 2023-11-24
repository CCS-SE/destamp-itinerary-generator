import { NexusGenInputs } from '../../../graphql/generated/nexus';
import { tripDuration } from '../../utils';
import {
  calculateCostScore,
  calculateDurationScore,
  calculateFitnessScore,
  calculateTravelExpense,
  getTotalDesiredTravelHours,
} from '../utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

describe('durationScore', () => {
  const tripInput: CreateTripInput = {
    budget: 2_500,
    endDate: new Date('2023-08-11'),
    isAccommodationIncluded: false,
    isFoodIncluded: true,
    isTransportationIncluded: true,
    startDate: new Date('2023-08-10'),
    title: 'Iloilo City Trip',
    timeSlots: [
      [10, 15],
      [13, 17],
    ],
    travelerCount: 2,
    startingLocation: {},
    travelSize: 'COUPLE',
  };

  it('checks behaviour of duration score if its under time', () => {
    const duration = tripDuration(tripInput.startDate, tripInput.endDate);
    const travelHours = getTotalDesiredTravelHours(tripInput.timeSlots);

    const totalDuration = 400;
    const travelDuration = 1_000;

    const durationScore = calculateDurationScore(
      totalDuration,
      duration,
      travelDuration,
      travelHours,
    );

    expect(durationScore).toBe(11.055555555555555);
    // expects a high score if it has big difference from the user's desired travel hours
  });

  it('checks behaviour of duration score if its closer to desired travel hour', () => {
    const duration = tripDuration(tripInput.startDate, tripInput.endDate);
    const travelHours = getTotalDesiredTravelHours(tripInput.timeSlots);

    const totalDuration = 900;
    const travelDuration = 1_000;

    const durationScore = calculateDurationScore(
      totalDuration,
      duration,
      travelDuration,
      travelHours,
    );

    expect(durationScore).toBe(2.7222222222222214);
    // expects a small score if it has small difference from the user's desired travel hours
  });

  it('checks behaviour of duration score if it over time', () => {
    const duration = tripDuration(tripInput.startDate, tripInput.endDate);
    const travelHours = getTotalDesiredTravelHours(tripInput.timeSlots);

    const totalDuration = 850;
    const travelDuration = 16_000;

    const durationScore = calculateDurationScore(
      totalDuration,
      duration,
      travelDuration,
      travelHours,
    );

    expect(durationScore).toBe(8.694444444444445);
    // expects a high score if total duration exceed user's desired travel hours
  });
});

describe('costScore', () => {
  const tripInput: CreateTripInput = {
    budget: 2_500,
    endDate: new Date('2023-08-11'),
    isAccommodationIncluded: false,
    isFoodIncluded: true,
    isTransportationIncluded: true,
    startDate: new Date('2023-08-10'),
    title: 'Iloilo City Trip',
    timeSlots: [
      [10, 15],
      [13, 17],
    ],
    travelerCount: 2,
    startingLocation: {},
    travelSize: 'COUPLE',
  };

  it('checks behaviour of cost score if budget was underutilized', () => {
    const totalDistance = 10_000; // 10 km
    const totalDuration = 3_600;
    const travelers = 2;
    const duration = tripDuration(tripInput.startDate, tripInput.endDate);

    const accommodationCost = 0;
    const foodCost = 299;
    const attractionCost = 100;
    const totalTravelers = 2;
    const travelExpenses = calculateTravelExpense(
      totalDistance,
      totalDuration,
      travelers,
    );

    const costScore = calculateCostScore(
      tripInput,
      accommodationCost,
      foodCost,
      attractionCost,
      totalTravelers,
      duration,
      travelExpenses,
    );

    expect(costScore).toBe(0.1108);
    // expects a higher score if budget was not maximized
  });

  it('checks behaviour of cost score if total cost is close to budget', () => {
    const totalDistance = 10_000; // 10 km
    const totalDuration = 3_600;
    const travelers = 2;
    const duration = tripDuration(tripInput.startDate, tripInput.endDate);

    const accommodationCost = 0;
    const foodCost = 500;
    const attractionCost = 250;
    const totalTravelers = 2;
    const travelExpenses = calculateTravelExpense(
      totalDistance,
      totalDuration,
      travelers,
    );

    const costScore = calculateCostScore(
      tripInput,
      accommodationCost,
      foodCost,
      attractionCost,
      totalTravelers,
      duration,
      travelExpenses,
    );
    expect(costScore).toBe(0.0205);
    // expects a lesser score if total cost is closer to budget
  });

  it('checks behaviour of cost score if total cost exceeds budget', () => {
    const totalDistance = 12_000; // 10 km
    const totalDuration = 3_600;
    const travelers = 2;
    const duration = tripDuration(tripInput.startDate, tripInput.endDate);

    const accommodationCost = 0;
    const foodCost = 950;
    const attractionCost = 400;
    const totalTravelers = 2;
    const travelExpenses = calculateTravelExpense(
      totalDistance,
      totalDuration,
      travelers,
    );

    const costScore = calculateCostScore(
      tripInput,
      accommodationCost,
      foodCost,
      attractionCost,
      totalTravelers,
      duration,
      travelExpenses,
    );
    expect(costScore).toBe(0.1872);
    // expects a higher score if total cost exceeds budget
  });
});

describe('evaluateFitness', () => {
  it('should evaluate fitness score of chromosome within budget and time', () => {
    const tripInput: CreateTripInput = {
      budget: 2_500,
      endDate: new Date('2023-08-11'),
      isAccommodationIncluded: false,
      isFoodIncluded: true,
      isTransportationIncluded: true,
      startDate: new Date('2023-08-10'),
      title: 'Iloilo City Trip',
      timeSlots: [
        [10, 15],
        [13, 17],
      ],
      travelerCount: 2,
      startingLocation: {},
      travelSize: 'COUPLE',
    };

    const duration = tripDuration(tripInput.startDate, tripInput.endDate);
    const travelHours = getTotalDesiredTravelHours(tripInput.timeSlots);
    const totalDistance = 10_000; // 10 km
    const travelers = 2;
    const totalDuration = 800; // total duration of chromosome (mins)
    const travelDuration = 3_600; // total travel duration of the trip (sec)

    const accommodationCost = 0;
    const foodCost = 700;
    const attractionCost = 400;
    const totalTravelers = 2;
    const travelExpenses = calculateTravelExpense(
      totalDistance,
      totalDuration,
      travelers,
    );

    const durationScore = calculateDurationScore(
      totalDuration,
      duration,
      travelDuration,
      travelHours,
    );

    const costScore = calculateCostScore(
      tripInput,
      accommodationCost,
      foodCost,
      attractionCost,
      totalTravelers,
      duration,
      travelExpenses,
    );

    const fitnessScore = calculateFitnessScore(costScore, durationScore);
    expect(fitnessScore).toBe(0.8546497218115156);
    // expects a higher value if budget and time duration is within user's constraints
  });

  it('should evaluate fitness score of chromosome within budget and but over time', () => {
    const tripInput: CreateTripInput = {
      budget: 2_500,
      endDate: new Date('2023-08-11'),
      isAccommodationIncluded: false,
      isFoodIncluded: true,
      isTransportationIncluded: true,
      startDate: new Date('2023-08-10'),
      title: 'Iloilo City Trip',
      timeSlots: [
        [10, 15],
        [13, 17],
      ],
      travelerCount: 2,
      startingLocation: {},
      travelSize: 'COUPLE',
    };

    const duration = tripDuration(tripInput.startDate, tripInput.endDate);
    const travelHours = getTotalDesiredTravelHours(tripInput.timeSlots);
    const totalDistance = 10_000; // 10 km
    const totalDuration = 1000; // total duration of chromosome (mins)
    const travelers = 2;
    const travelDuration = 9500;

    const accommodationCost = 0;
    const foodCost = 700;
    const attractionCost = 400;
    const totalTravelers = 2;
    const travelExpenses = calculateTravelExpense(
      totalDistance,
      totalDuration,
      travelers,
    );

    const durationScore = calculateDurationScore(
      totalDuration,
      duration,
      travelDuration,
      travelHours,
    );

    const costScore = calculateCostScore(
      tripInput,
      accommodationCost,
      foodCost,
      attractionCost,
      totalTravelers,
      duration,
      travelExpenses,
    );

    const fitnessScore = calculateFitnessScore(costScore, durationScore);

    expect(fitnessScore).toBe(0.38840130140329393);
    // expects a lesser value if time duration exceeds user's constraints
  });

  it('should evaluate fitness score of chromosome over budget and within time', () => {
    const tripInput: CreateTripInput = {
      budget: 2_500,
      endDate: new Date('2023-08-11'),
      isAccommodationIncluded: false,
      isFoodIncluded: true,
      isTransportationIncluded: true,
      startDate: new Date('2023-08-10'),
      title: 'Iloilo City Trip',
      timeSlots: [
        [10, 15],
        [13, 17],
      ],
      travelerCount: 2,
      startingLocation: {},
      travelSize: 'COUPLE',
    };

    const duration = tripDuration(tripInput.startDate, tripInput.endDate);
    const travelHours = getTotalDesiredTravelHours(tripInput.timeSlots);

    const totalDistance = 10_000; // 10 km
    const totalDuration = 800;
    const travelDuration = 3_600;
    const travelers = 2;

    const accommodationCost = 0;
    const foodCost = 1000;
    const attractionCost = 900;
    const totalTravelers = 2;
    const travelExpenses = calculateTravelExpense(
      totalDistance,
      totalDuration,
      travelers,
    );

    const durationScore = calculateDurationScore(
      totalDuration,
      duration,
      travelDuration,
      travelHours,
    );

    const costScore = calculateCostScore(
      tripInput,
      accommodationCost,
      foodCost,
      attractionCost,
      totalTravelers,
      duration,
      travelExpenses,
    );

    const fitnessScore = calculateFitnessScore(costScore, durationScore);

    expect(fitnessScore).toBe(0.7473450566861226);
    // expects a lesser value if budget exceeds users constraints
  });
});
