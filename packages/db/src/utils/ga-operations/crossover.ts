import { PointOfInterest } from '.';
import { NexusGenInputs } from '../../graphql/generated/nexus';
import { getBudgetAllocation } from './budgetAllocation';
import { Chromosome } from './chromosome';
import { calculateAveragePrice } from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

export const crossover = (
  chromosome1: Chromosome,
  chromosome2: Chromosome,
  tripInput: CreateTripInput,
  duration: number,
  desiredTravelHours: number,
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
  const chrom1 = crossoverEval(
    newParent1,
    tripInput,
    duration,
    desiredTravelHours,
  );
  const chrom2 = crossoverEval(
    newParent2,
    tripInput,
    duration,
    desiredTravelHours,
  );

  return { chrom1, chrom2 };
};

export const crossoverEval = (
  pois: PointOfInterest[],
  tripInput: CreateTripInput,
  duration: number,
  desiredTravelHours: number,
) => {
  const { budget, travelerCount } = tripInput;

  const rate = getBudgetAllocation(tripInput)!;
  const dailyBudget = budget / duration;

  const attractionThreshold = dailyBudget * rate.ATTRACTION;
  const foodThreshold = dailyBudget * rate.FOOD;

  const foodMaxDuration = desiredTravelHours * 0.3;
  const estimatedTravelDuration = desiredTravelHours * rate.TRANSPORT;

  const transportationCostThreshold = dailyBudget * rate.TRANSPORT;
  const accommdationCostThreshold = dailyBudget * rate.ACCOMMODATION;

  const targetCost =
    dailyBudget - (accommdationCostThreshold + transportationCostThreshold);
  const targetDuration = desiredTravelHours - estimatedTravelDuration;

  let foodDuration = 0;
  let totalCost = 0;
  let totalDuration = 0;

  const budgets = {
    food: 0,
    attraction: 0,
  };

  const chromosome: PointOfInterest[] = [];

  for (const poi of pois) {
    if (poi.isAttraction) {
      const attractionCost = parseFloat(poi.price) * travelerCount;
      const poiDuration = poi.visitDuration / 60;

      if (
        budgets.attraction + attractionCost <= attractionThreshold &&
        totalDuration + poiDuration <= targetDuration
      ) {
        budgets.attraction += attractionCost;
        totalCost += attractionCost;
        totalDuration += poiDuration;
        chromosome.push(poi);
      }
    }

    if (poi.restaurant) {
      const averagePrice = calculateAveragePrice(poi.price);
      const foodCost = averagePrice * travelerCount;
      const poiDuration = poi.visitDuration / 60;

      if (
        budgets.food + averagePrice <= foodThreshold &&
        foodDuration + poiDuration <= foodMaxDuration
      ) {
        if (totalDuration + poiDuration <= targetDuration) {
          budgets.food += foodCost;
          totalCost += foodCost;
          foodDuration += poiDuration;
          totalDuration += poiDuration;
          chromosome.push(poi);
        }
      }
    }

    if (totalCost > targetCost) {
      return chromosome;
    }
  }

  return chromosome;
};
