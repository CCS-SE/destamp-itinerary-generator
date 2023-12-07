import { PointOfInterest } from '.';
import { NexusGenInputs } from '../../graphql/generated/nexus';
import { getBudgetAllocation } from './budgetAllocation';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

export const multiplyRangeByPeople = (
  range: string,
  totalTravelers: number,
) => {
  const [min, max] = range.split('-').map(Number); // Split the range and convert to numbers

  if (min && max) {
    const minResult = min! * totalTravelers;
    const maxResult = max! * totalTravelers;

    return `${minResult}-${maxResult}`;
  }
  return '0';
};

export const calculateAveragePrice = (priceRange: string) => {
  const [min, max] = priceRange.split('-').map(Number);
  return (min! + max!) / 2;
};

export const calculateCostScore = (
  tripInput: CreateTripInput,
  accommodationCost: number,
  foodCost: number,
  attractionCost: number,
  totalTravelers: number,
  duration: number,
  travelExpenses: number,
) => {
  const { budget } = tripInput;

  const dailyBudget = budget / duration;

  const budgetRate = getBudgetAllocation(tripInput);

  const foodBudgetRate = budgetRate?.FOOD || 0;
  const attractionBudgetRate = budgetRate?.ATTRACTION || 0;
  const accommodationBudgetRate = budgetRate?.ACCOMMODATION || 0;
  const transporationBudgetRate = budgetRate?.TRANSPORT || 0;

  const totalDailyCost =
    accommodationCost +
    attractionCost * totalTravelers +
    foodCost * totalTravelers +
    travelExpenses;

  let costDifference = dailyBudget - totalDailyCost;

  if (totalDailyCost === 0) {
    return 0;
  }

  const actualFoodRate = (foodCost * totalTravelers) / dailyBudget;
  const actualAccommodationRate = accommodationCost / dailyBudget;
  const actualAttractionRate = (attractionCost * totalTravelers) / dailyBudget;
  const actualTransportRate = travelExpenses / dailyBudget;

  // check if each category exceeds allocated budget rate or below 50%
  if (
    foodBudgetRate !== 0 &&
    (actualFoodRate > foodBudgetRate || actualFoodRate < foodBudgetRate / 2)
  ) {
    costDifference -= dailyBudget * actualFoodRate; // penalize cost over budget
  }
  if (
    accommodationBudgetRate !== 0 &&
    actualAccommodationRate > accommodationBudgetRate
  ) {
    costDifference -= dailyBudget * actualAccommodationRate;
  }
  if (
    attractionBudgetRate !== 0 &&
    actualAttractionRate > attractionBudgetRate
  ) {
    costDifference -= dailyBudget * actualAttractionRate;
  }
  if (
    transporationBudgetRate !== 0 &&
    actualTransportRate > transporationBudgetRate
  ) {
    costDifference -= dailyBudget * actualTransportRate;
  }

  const costScore = Math.abs(costDifference) / 10_000;

  return costScore;
};

export const calculateDurationScore = (
  totalPlaceDuration: number,
  travelDuration: number,
  desiredTravelHours: number,
) => {
  const totalDuration =
    totalPlaceDuration / 60 + calculateTravelDuration(travelDuration);
  let durationDifference = desiredTravelHours - totalDuration;

  // checks if overtime or duration is below 50%
  if (
    durationDifference < 0 || // below or negative difference means over time
    durationDifference > desiredTravelHours / 2 // greater difference over half of the desired hour is under time
  ) {
    durationDifference -= totalDuration / desiredTravelHours;
  }

  const durationScore = Math.abs(durationDifference) / 1_000;

  return durationScore;
};

export const getCoordinates = (pois: PointOfInterest[]): [number, number][] => {
  return pois.map((place) => {
    if (place.latitude && place.longitude) {
      return [place.longitude, place.latitude];
    } else {
      return [-1, -1];
    }
  });
};

export const calculateFitnessScore = (
  costScore: number,
  durationScore: number,
) => {
  const COST_RATE = 0.7;
  const DURATION_RATE = 0.3;

  return 1 / (costScore * COST_RATE + durationScore * DURATION_RATE);
};

export const calculateTravelDuration = (travelDuration: number) => {
  return travelDuration / 3600; // convert sec to hrs
};

export const getMatrixAvg = (matrix: number[][]): number => {
  const totalElements = matrix.length * matrix[0]!.length; // Calculate the total number of elements
  const sum = matrix.reduce(
    (sum, row) => sum + row.reduce((rowSum, value) => rowSum + value, 0),
    0,
  );
  return sum / totalElements; // Calculate the average of the matrix
};

export const calculateTravelExpense = (
  distance: number,
  duration: number,
  travelerCount: number,
) => {
  const travelDistanceInKilometers = Math.floor(distance / 1_000);
  const flagDown = 40;
  const additionalCostPerKm = 13.5;
  const durationMinutes = Math.floor(duration / 60);
  const additionalCostPerMin = 2;

  return travelDistanceInKilometers > 1
    ? Math.round(
        flagDown +
          travelDistanceInKilometers * additionalCostPerKm +
          durationMinutes * additionalCostPerMin,
      ) * taxisNeeded(travelerCount)
    : 0;
};

export const calculateTravelExpenses = (
  distances: number[],
  durations: number[],
  travelerCount: number,
) => {
  return distances.reduce(
    (totalExpense, distance, index) =>
      totalExpense +
      calculateTravelExpense(distance, durations[index]!, travelerCount),
    0,
  );
};

export const getDesiredTravelHour = (timeslot: [number, number]) => {
  const [startTime, endTime] = timeslot;
  return endTime! - startTime!;
};

export const getCoordinatesParam = (coordinates: number[][]) => {
  return coordinates.map((coord) => coord.join(',')).join(';');
};

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const taxisNeeded = (travelerCount: number) => {
  if (travelerCount < 1) {
    return 0;
  } else if (travelerCount <= 4) {
    return 1;
  } else {
    const taxisNeeded = (travelerCount - 1) / 4;
    return Math.floor(taxisNeeded) + 1;
  }
};

export const findPoiWithNearestPrice = (
  pois: PointOfInterest[],
  targetPrice: number,
) => {
  return pois.reduce((nearestPlace, currentPlace) => {
    const nearestDiff = Math.abs(parseFloat(nearestPlace.price) - targetPrice);
    const currentDiff = Math.abs(parseFloat(currentPlace.price) - targetPrice);

    return currentDiff < nearestDiff ? currentPlace : nearestPlace;
  });
};
