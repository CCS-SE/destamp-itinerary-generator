import { PlaceType } from '@prisma/client';

import { NexusGenInputs, NexusGenObjects } from '../../graphql/generated/nexus';
import { getBudgetAllocation } from './budgetAllocation';

type Place = NexusGenObjects['Place'];
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

  const budgetRate = getBudgetAllocation(tripInput);

  const foodBudgetRate = budgetRate?.FOOD || 0;
  const attractionBudgetRate = budgetRate?.ATTRACTION || 0;
  const accommodationBudgetRate = budgetRate?.ACCOMMODATION || 0;
  const transporationBudgetRate = budgetRate?.TRANSPORT || 0;

  const totalCost =
    accommodationCost * duration +
    attractionCost * totalTravelers +
    foodCost * totalTravelers +
    travelExpenses;

  let costDifference = tripInput.budget - totalCost;

  const actualFoodRate = (foodCost * totalTravelers) / budget;
  const actualAccommodationRate = (accommodationCost * duration) / budget;
  const actualAttractionRate = (attractionCost * totalTravelers) / budget;
  const actualTransportRate = travelExpenses / budget;

  // check if each category exceeds allocated budget rate
  if (actualFoodRate > accommodationBudgetRate && foodBudgetRate !== 0) {
    costDifference -= (budget * actualFoodRate) / duration;
  }
  if (
    actualAccommodationRate > accommodationBudgetRate &&
    accommodationBudgetRate !== 0
  ) {
    costDifference -= (budget * actualAccommodationRate) / duration;
  }
  if (
    actualAttractionRate > attractionBudgetRate &&
    attractionBudgetRate !== 0
  ) {
    costDifference -= (budget * actualAttractionRate) / duration;
  }
  if (
    actualTransportRate > transporationBudgetRate &&
    transporationBudgetRate !== 0
  ) {
    costDifference -= (budget * actualTransportRate) / duration;
  }

  const costScore = Math.abs(costDifference) / 10_000;

  return costScore;
};

export const calculateDurationScore = (
  totalPlaceDuration: number,
  duration: number,
  travelDuration: number,
  totalDesiredTravelHours: number,
) => {
  const totalDuration =
    totalPlaceDuration / 60 + calculateTravelDuration(travelDuration);
  const desiredDuration = duration * totalDesiredTravelHours;
  let durationDifference = desiredDuration - totalDuration;

  if (durationDifference < 0) {
    // if duration differenc is negative
    durationDifference += totalDuration / duration; // penalize overtime
  }

  const durationScore = Math.abs(durationDifference);

  return durationScore;
};

export const getCoordinates = (places: Place[]): [number, number][] => {
  return places.map((place) => {
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

export const calculateTotalCost = (
  placesTotalCost: number,
  totalTravelers: number,
  travelExpeses: number,
) => {
  return placesTotalCost * totalTravelers + travelExpeses;
};

export const calculateTotalDuration = (
  placesTotalDuration: number,
  travelDuration: number,
) => {
  return placesTotalDuration + travelDuration / 60;
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

export const calculateTravelExpense = (distance: number) => {
  const travelDistanceInKilometers = distance / 1000;
  const flagDown = 40;
  const additionalCostPerKm = 13.5;

  return Math.round(
    flagDown + travelDistanceInKilometers * additionalCostPerKm,
  );
};

export const calculateTravelExpenses = (distances: number[]) => {
  return distances.reduce(
    (totalExpense, distance) => totalExpense + calculateTravelExpense(distance),
    0,
  );
};

export const getTotalDesiredTravelHours = (preferredTime: string[]): number => {
  return preferredTime.reduce((total, range) => {
    return total + getDesiredTravelHour(range);
  }, 0);
};

export const getDesiredTravelHour = (time: string) => {
  const [startTime, endTime] = time.split('-').map((time) => parseInt(time));
  return endTime! - startTime!;
};

export const getCoordinatesParam = (coordinates: number[][]) => {
  return coordinates.map((coord) => coord.join(',')).join(';');
};

export const getRandomInt = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const randomChoices = (genePool: Place[]) => {
  return genePool[Math.floor(Math.random() * genePool.length)];
};

export const getDuplicateIndex = (list: Place[]) => {
  const unique: Place[] = [];
  const duplicateIndex = [];

  for (let i = 0; i < list.length; i++) {
    if (!unique.includes(list[i]!)) {
      unique.push(list[i]!);
    } else if (unique.includes(list[i]!)) {
      duplicateIndex.push(i);
    }
  }
  return duplicateIndex;
};
