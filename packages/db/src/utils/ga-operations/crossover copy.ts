import { PlaceType } from '@prisma/client';

import { NexusGenInputs, NexusGenObjects } from '../../graphql/generated/nexus';
import { tripDuration } from '../utils';
import { getBudgetAllocation } from './budgetAllocation';
import { Chromosome } from './chromosome';
import {
  calculateAveragePrice,
  getRandomInt,
  getTotalDesiredTravelHours,
} from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];
type Place = NexusGenObjects['Place'];

export const crossover = (
  genePool: Place[],
  chromosome1: Chromosome,
  chromosome2: Chromosome,
  tripInput: CreateTripInput,
) => {
  if (chromosome1.genes.length <= 1 || chromosome2.genes.length <= 1) {
    const chrom1 = chromosome1.genes;
    const chrom2 = chromosome2.genes;

    return { chrom1, chrom2 };
  }

  const index = getRandomInt(1, chromosome1.genes.length - 1);
  const index1 = getRandomInt(1, chromosome2.genes.length - 1);

  // combine two parents
  const firstParentHead = chromosome1.genes.slice(0, index);
  const secondParentHead = chromosome2.genes.slice(0, index1);
  const firstParentTail = chromosome1.genes.slice(index);
  const secondParentTail = chromosome2.genes.slice(index1);

  firstParentHead.push(...secondParentTail);
  secondParentHead.push(...firstParentTail);

  // evaluate crossovered parent
  const chrom1 = crossoverEval(firstParentHead, tripInput);
  const chrom2 = crossoverEval(secondParentHead, tripInput);

  return { chrom1, chrom2 };
};

export const crossoverEval = (spots: Place[], tripInput: CreateTripInput) => {
  const { budget, adultCount, childCount } = tripInput;

  const budgetRate = getBudgetAllocation(tripInput)!;

  const attractionThreshold = budget * budgetRate.ATTRACTION;
  const foodThreshold = budget * budgetRate.FOOD;
  const accommodationThreshold = budget * budgetRate.ACCOMMODATION;

  const duration = tripDuration(
    new Date(tripInput.startDate),
    new Date(tripInput.endDate),
  );

  const totalDesiredTravelHours = getTotalDesiredTravelHours(
    tripInput.preferredTime,
  );

  const totalTravelers = (adultCount || 0) + (childCount || 0);
  const durationThreshold = duration * totalDesiredTravelHours * 60;

  const foodMaxDuration = 240 * duration; // max 4 hours of food per day

  let totalDuration = 0;
  let foodDuration = 0;

  const budgets = {
    food: 0,
    attraction: 0,
    accommodation: 0,
  };

  const chromosome: Place[] = [];

  for (const spot of spots) {
    if (spot.type === PlaceType.RESTAURANT && tripInput.isFoodIncluded) {
      if (
        foodDuration + spot.visitDuration <= foodMaxDuration &&
        parseFloat(spot.price) + budgets.food < foodThreshold
      ) {
        const averagePrice = calculateAveragePrice(spot.price);
        const foodCost = averagePrice * totalTravelers;

        budgets.food += foodCost;
        foodDuration += spot.visitDuration;
        totalDuration += spot.visitDuration;
        chromosome.push(spot);
      }
    }
    if (spot.type === PlaceType.ATTRACTION) {
      if (
        spot.visitDuration + totalDuration <= durationThreshold &&
        parseFloat(spot.price) + budgets.attraction < attractionThreshold
      ) {
        const attractionCost = parseFloat(spot.price) * totalTravelers;

        budgets.attraction += attractionCost;
        totalDuration += spot.visitDuration;
        chromosome.push(spot);
      }
    }
    if (
      spot.type === PlaceType.ACCOMMODATION &&
      tripInput.isAccommodationIncluded
    ) {
      const suggestedPrice = Math.round(accommodationThreshold / duration);
      const accommodationCost = parseFloat(spot.price) * duration;

      if (
        suggestedPrice < parseFloat(spot.price) &&
        parseFloat(spot.price) + budgets.accommodation < accommodationThreshold
      ) {
        budgets.accommodation += accommodationCost;
        chromosome.push(spot);
      }
    }
  }
  return chromosome;
};
