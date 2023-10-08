import { NexusGenObjects } from '../../graphql/generated/nexus';

type Place = NexusGenObjects['Place'];

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
  budget: number,
  accommodationCost: number,
  foodCost: number,
  attractionCost: number,
  totalTravelers: number,
  duration: number,
  travelExpenses: number,
) => {
  // Calculate the overall cost score
  return (
    Math.abs(
      budget -
        (accommodationCost * duration +
          attractionCost * totalTravelers +
          foodCost * totalTravelers +
          travelExpenses),
    ) / 10_000
  );
};

export const calculateDurationScore = (
  totalDuration: number,
  duration: number,
  travelDuration: number,
  totalDesiredTravelHours: number,
) => {
  return Math.abs(
    totalDuration / 60 +
      calculateTravelDuration(travelDuration) -
      duration * totalDesiredTravelHours,
  );
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
  return 1 / (costScore + durationScore);
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
