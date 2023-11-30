import { NexusGenInputs } from '../../../graphql/generated/nexus';
import { tripDuration } from '../../utils';
import {
  calculateCostScore,
  calculateDurationScore,
  calculateFitnessScore,
  calculateTravelExpense,
  getDesiredTravelHour,
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
    const desiredTravelHours = tripInput.timeSlots.map(
      (time: [number, number]) => getDesiredTravelHour(time),
    ) as number[];

    const travelHours = desiredTravelHours[0]!;

    const totalDuration = 140;
    const travelDuration = 1_000;

    const durationScore = calculateDurationScore(
      totalDuration,
      travelDuration,
      travelHours,
    );

    expect(durationScore).toBe(0.0023888888888888887);
    // expects a high score if it has big difference from the user's desired travel hours
  });

  it('checks behaviour of duration score if its closer to desired travel hour', () => {
    const desiredTravelHours = tripInput.timeSlots.map(
      (time: [number, number]) => getDesiredTravelHour(time),
    ) as number[];

    const travelHours = desiredTravelHours[0]!;
    const totalDuration = 240;
    const travelDuration = 1_000;

    const durationScore = calculateDurationScore(
      totalDuration,
      travelDuration,
      travelHours,
    );

    expect(durationScore).toBe(0.0007222222222222223);
    // expects a small score if it has small difference from the user's desired travel hours
  });

  it('checks behaviour of duration score if it over time', () => {
    const desiredTravelHours = tripInput.timeSlots.map(
      (time: [number, number]) => getDesiredTravelHour(time),
    ) as number[];

    const travelHours = desiredTravelHours[0]!;
    const totalDuration = 350;
    const travelDuration = 2_500;

    const durationScore = calculateDurationScore(
      totalDuration,
      travelDuration,
      travelHours,
    );

    expect(durationScore).toBe(0.002833333333333333);
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

    expect(costScore).toBe(0.0641);
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
    expect(costScore).toBe(0.2045);
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
    expect(costScore).toBe(0.4472);
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
    const desiredTravelHours = tripInput.timeSlots.map(
      (time: [number, number]) => getDesiredTravelHour(time),
    ) as number[];

    const travelHours = desiredTravelHours[0]!;
    const totalDistance = 10_000; // 10 km
    const travelers = 2;
    const totalDuration = 215; // total duration of chromosome (mins)
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
    expect(fitnessScore).toBe(4.065619092147257);
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
    const desiredTravelHours = tripInput.timeSlots.map(
      (time: [number, number]) => getDesiredTravelHour(time),
    ) as number[];

    const travelHours = desiredTravelHours[0]!;
    const totalDistance = 10_000; // 10 km
    const totalDuration = 350; // total duration of chromosome (mins)
    const travelers = 2;
    const travelDuration = 9_500;

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

    expect(fitnessScore).toBe(4.033071183706393);
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
    const desiredTravelHours = tripInput.timeSlots.map(
      (time: [number, number]) => getDesiredTravelHour(time),
    ) as number[];

    const travelHours = desiredTravelHours[0]!;

    const totalDistance = 10_000; // 10 km
    const totalDuration = 215;
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

    expect(fitnessScore).toBe(2.1278180290021598);
    // expects a lesser value if budget exceeds users constraints
  });
});
