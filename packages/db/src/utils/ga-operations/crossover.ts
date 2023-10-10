import { PlaceType } from '@prisma/client';

import { NexusGenInputs, NexusGenObjects } from '../../graphql/generated/nexus';
import { tripDuration } from '../utils';
import { getBudgetAllocation } from './budgetAllocation';
import { Chromosome } from './chromosome';
import { calculateAveragePrice, getTotalDesiredTravelHours } from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];
type Place = NexusGenObjects['Place'];

export const crossover = (
  chromosome1: Chromosome,
  chromosome2: Chromosome,
  tripInput: CreateTripInput,
) => {
  if (chromosome1.genes.length <= 1 || chromosome2.genes.length <= 1) {
    const chrom1 = chromosome1.genes;
    const chrom2 = chromosome2.genes;

    return { chrom1, chrom2 };
  }

  const middleIndex1 = Math.floor(chromosome1.genes.length / 2);
  const middleIndex2 = Math.floor(chromosome2.genes.length / 2);

  // combine two parents
  const firstParentHead = chromosome1.genes.slice(0, middleIndex1);
  const secondParentHead = chromosome2.genes.slice(0, middleIndex2);
  const firstParentTail = chromosome1.genes.slice(middleIndex1);
  const secondParentTail = chromosome2.genes.slice(middleIndex2);

  const newParent1 = firstParentHead.concat(secondParentTail);
  const newParent2 = secondParentHead.concat(firstParentTail);

  // evaluate crossovered parent
  const chrom1 = crossoverEval(newParent1, tripInput);
  const chrom2 = crossoverEval(newParent2, tripInput);

  return { chrom1, chrom2 };
};

export const crossoverEval = (spots: Place[], tripInput: CreateTripInput) => {
  const { budget, adultCount, childCount } = tripInput;

  const duration = tripDuration(
    new Date(tripInput.startDate),
    new Date(tripInput.endDate),
  );

  const budgetRate = getBudgetAllocation(tripInput)!;

  const accommodationThreshold = budget * budgetRate.ACCOMMODATION;
  const foodThreshold = budget * budgetRate.FOOD;

  const totalDesiredTravelHours = getTotalDesiredTravelHours(
    tripInput.preferredTime,
  );

  const totalTravelers = (adultCount || 0) + (childCount || 0);
  const durationThreshold = duration * totalDesiredTravelHours * 60;

  const foodMaxDuration = 150 * duration; // max 3 hours of food per day

  let foodDuration = 0;
  let totalCost = 0;
  let totalDuration = 0;

  const budgets = {
    food: 0,
    attraction: 0,
    accommodation: 0,
  };

  const chromosome: Place[] = [];

  for (const spot of spots) {
    if (
      totalDuration >= durationThreshold &&
      totalCost >= budget - accommodationThreshold
    ) {
      return chromosome;
    }

    if (spot.type === PlaceType.ATTRACTION) {
      const attractionCost = parseFloat(spot.price) * totalTravelers;

      budgets.attraction += attractionCost;
      totalDuration += spot.visitDuration;
      totalCost += attractionCost;
      chromosome.push(spot);
    }

    if (spot.type === PlaceType.RESTAURANT && tripInput.isFoodIncluded) {
      const averagePrice = calculateAveragePrice(spot.price);
      const foodCost = averagePrice * totalTravelers;

      if (
        foodDuration + spot.visitDuration <= foodMaxDuration &&
        budgets.food + averagePrice <= foodThreshold
      ) {
        budgets.food += foodCost;
        foodDuration += spot.visitDuration;
        totalCost += foodCost;
        totalDuration += spot.visitDuration;
        chromosome.push(spot);
      }
    }
  }
  return chromosome;
};
