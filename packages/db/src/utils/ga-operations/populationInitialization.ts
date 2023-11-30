import { PointOfInterest } from '.';
import { NexusGenInputs } from '../../graphql/generated/nexus';
import { getBudgetAllocation } from './budgetAllocation';
import { Chromosome } from './chromosome';
import { Chromosome as Chrom } from './types';
import { calculateAveragePrice } from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

const POPULATION_SIZE = 10;
const MAX_ITERATIONS = 24; // max number of iterations

export function generatePopulation(
  input: CreateTripInput,
  pois: PointOfInterest[],
  desiredTravelHours: number,
) {
  const { budget, travelerCount, isFoodIncluded } = input;

  const rate = getBudgetAllocation(input)!;

  const foodCostThreshold = budget * rate.FOOD;
  const attractionCostThreshold = budget * rate.ATTRACTION;

  const newPopulation: Chrom[] = []; // placeholder for initialized population

  for (let i = 0; i < POPULATION_SIZE; i++) {
    let totalDuration = 0;
    let totalFoodCost = 0;
    let totalAttractionCost = 0;

    const chromosome: PointOfInterest[] = []; // list of destinations within budget and timeframe
    // const poiIndexes: number[] = [];

    while (
      totalDuration <= desiredTravelHours &&
      (totalFoodCost <= foodCostThreshold ||
        totalAttractionCost <= attractionCostThreshold) &&
      chromosome.length < MAX_ITERATIONS
    ) {
      // disable random selection
      // const poiIndex = Math.floor(Math.random() * (pois.length - 1));
      // const poi = pois[poiIndex]!;

      const poi = pois.shift(); // remove the first element from the array

      if (poi) {
        if (isFoodIncluded && poi.restaurant) {
          const averagePrice = calculateAveragePrice(poi.price);
          const foodCost = averagePrice * travelerCount;
          const poiDuration = poi.visitDuration / 60;

          totalFoodCost += foodCost;
          totalDuration += poiDuration;
          // poiIndexes.push(poiIndex);
          chromosome.push(poi);
        }

        if (poi.isAttraction) {
          const attractionCost = parseFloat(poi.price) * travelerCount;
          const poiDuration = poi.visitDuration / 60;

          totalAttractionCost += attractionCost;
          totalDuration += poiDuration;
          // poiIndexes.push(poiIndex);
          chromosome.push(poi);
        }
      }

      if (
        totalFoodCost > foodCostThreshold &&
        totalAttractionCost > attractionCostThreshold
      ) {
        break;
      }
    }
    newPopulation.push({
      chrom: new Chromosome(chromosome),
      fitnessScore: 0,
      travelDuration: 0,
      travelExpenses: 0,
      travelDistances: [],
      travelDurations: [],
    });
  }
  return newPopulation;
}
