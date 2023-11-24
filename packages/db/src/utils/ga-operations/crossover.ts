import { PointOfInterest } from '.';
import { NexusGenInputs } from '../../graphql/generated/nexus';
import { tripDuration } from '../utils';
import { getBudgetAllocation } from './budgetAllocation';
import { Chromosome } from './chromosome';
import { calculateAveragePrice, getTotalDesiredTravelHours } from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

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

export const crossoverEval = (
  spots: PointOfInterest[],
  tripInput: CreateTripInput,
) => {
  const { budget, travelerCount } = tripInput;

  const duration = tripDuration(
    new Date(tripInput.startDate),
    new Date(tripInput.endDate),
  );

  const rate = getBudgetAllocation(tripInput)!;

  const attractionThreshold = budget * rate.ATTRACTION;
  const foodThreshold = budget * rate.FOOD;

  const totalDesiredTravelHours = getTotalDesiredTravelHours(
    tripInput.timeSlots,
  );

  const estimatedTranspoDuration = tripInput.isTransportationIncluded
    ? duration * (totalDesiredTravelHours * rate.TRANSPORT)
    : 0;

  const durationThreshold =
    duration * totalDesiredTravelHours - estimatedTranspoDuration;

  const foodMaxDuration = durationThreshold * 0.3;

  let foodDuration = 0;
  let totalDuration = 0;

  const budgets = {
    food: 0,
    attraction: 0,
  };

  const chromosome: PointOfInterest[] = [];

  for (const spot of spots) {
    if (totalDuration >= durationThreshold) {
      return chromosome;
    } else {
      if (spot.isAttraction) {
        const attractionCost = parseFloat(spot.price) * travelerCount;
        const spotDuration = spot.visitDuration / 60;

        if (
          budgets.attraction + attractionCost <= attractionThreshold &&
          totalDuration + spotDuration <= durationThreshold
        ) {
          budgets.attraction += attractionCost;
          totalDuration += spotDuration;
          chromosome.push(spot);
        }
      }

      if (spot.restaurant) {
        const averagePrice = calculateAveragePrice(spot.price);
        const foodCost = averagePrice * travelerCount;
        const spotDuration = spot.visitDuration / 60;

        if (
          budgets.food + averagePrice <= foodThreshold &&
          foodDuration + spotDuration <= foodMaxDuration &&
          totalDuration + spotDuration <= durationThreshold
        ) {
          budgets.food += foodCost;
          foodDuration += spotDuration;
          totalDuration += spotDuration;
          chromosome.push(spot);
        }
      }
    }
  }
  return chromosome;
};
