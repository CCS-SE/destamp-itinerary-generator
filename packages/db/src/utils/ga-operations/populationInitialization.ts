import { PlaceType } from '@prisma/client';

import { NexusGenInputs, NexusGenObjects } from '../../graphql/generated/nexus';
import { tripDuration } from '../utils';
import { getBudgetAllocation } from './budgetAllocation';
import { Chromosome } from './chromosome';
import { Chromosome as Chrom } from './types';
import { calculateAveragePrice, getTotalDesiredTravelHours } from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];
type Place = NexusGenObjects['Place'];

const POPULATION_SIZE = 30;

export function generatePopulation(input: CreateTripInput, places: Place[]) {
  const { budget, adultCount, childCount, preferredTime } = input;

  const budgetRate = getBudgetAllocation(input)!;

  const accommodationThreshold = budget * budgetRate.ACCOMMODATION;

  const duration = tripDuration(
    new Date(input.startDate),
    new Date(input.endDate),
  );

  const MAX_ITERATIONS = 25; // max number of iterations

  const totalDesiredHours = getTotalDesiredTravelHours(preferredTime);
  const totalTravelers = (adultCount || 0) + (childCount || 0);

  const durationThreshold = duration * totalDesiredHours * 60;

  const newPopulation: Chrom[] = []; // placeholder for initialized population

  for (let i = 0; i < POPULATION_SIZE; i++) {
    let totalDuration = 0;
    let totalCost = 0;
    let iteration = 0;

    const chromosome: Place[] = []; // list of destinations within budget and timeframe
    const randomIndexes: number[] = [];

    while (
      (totalDuration < durationThreshold ||
        totalCost < budget - accommodationThreshold) &&
      iteration < MAX_ITERATIONS
    ) {
      const randomIndex = Math.floor(Math.random() * (places.length - 1));

      if (!randomIndexes.includes(randomIndex)) {
        // make sure no duplicate
        const place = places[randomIndex];

        if (place?.type === PlaceType.RESTAURANT && input.isFoodIncluded) {
          const averagePrice = calculateAveragePrice(place.price);
          const foodCost = averagePrice * totalTravelers;
          totalCost += foodCost;
          totalDuration += place.visitDuration;
          randomIndexes.push(randomIndex);
          chromosome.push(place);
        }
        if (place?.type === PlaceType.ATTRACTION) {
          const attractionCost = parseFloat(place.price) * totalTravelers;
          totalCost += attractionCost;
          totalDuration += place.visitDuration;
          randomIndexes.push(randomIndex);
          chromosome.push(place);
        }
      }
      iteration++;
    }

    newPopulation.push({
      chrom: new Chromosome(chromosome),
      fitnessScore: 0,
      totalCost: 0,
      totalDuration: 0,
      travelDuration: 0,
      travelExpenses: 0,
      travelDistances: [],
      travelDurations: [],
    });
  }

  return newPopulation;
}
