import { NexusGenInputs, NexusGenObjects } from '../../graphql/generated/nexus';
import { tripDuration } from '../utils';
import { getBudgetAllocation } from './budgetAllocation';
import { Chromosome } from './chromosome';
import { Chromosome as Chrom } from './types';
import { calculateAveragePrice, getTotalDesiredTravelHours } from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];
type Place = NexusGenObjects['Place'];

const POPULATION_SIZE = 10;

export function generatePopulation(
  input: CreateTripInput,
  restaurants: Place[],
  attractions: Place[],
) {
  const { budget, adultCount, childCount, preferredTime } = input;

  const rate = getBudgetAllocation(input)!;

  const foodCostThreshold = budget * rate.FOOD;
  const attractionCostThreshold = budget * rate.ATTRACTION;

  const duration = tripDuration(
    new Date(input.startDate),
    new Date(input.endDate),
  );

  const MAX_ITERATIONS = 24; // max number of iterations

  const totalDesiredHours = getTotalDesiredTravelHours(preferredTime);
  const totalTravelers = (adultCount || 0) + (childCount || 0);

  const estimatedTranspoDuration = input.isTransportationIncluded
    ? duration * (totalDesiredHours * rate.TRANSPORT)
    : 0; // assuming 30% of the time will go to transpo
  const durationThreshold =
    duration * totalDesiredHours - estimatedTranspoDuration;

  const newPopulation: Chrom[] = []; // placeholder for initialized population

  for (let i = 0; i < POPULATION_SIZE; i++) {
    let totalDuration = 0;
    let totalFoodCost = 0;
    let totalAttractionCost = 0;

    const chromosome: Place[] = []; // list of destinations within budget and timeframe

    const restaurantIndexes: number[] = [];
    const attractionIndexes: number[] = [];

    while (
      totalDuration <= durationThreshold &&
      (totalFoodCost <= foodCostThreshold ||
        totalAttractionCost <= attractionCostThreshold) &&
      chromosome.length < MAX_ITERATIONS
    ) {
      const restaurantIndex = Math.floor(
        Math.random() * (restaurants.length - 1),
      );
      const attractionIndex = Math.floor(
        Math.random() * (attractions.length - 1),
      );

      if (
        input.isFoodIncluded &&
        !restaurantIndexes.includes(restaurantIndex)
      ) {
        const restaurant = restaurants[restaurantIndex]!;

        const averagePrice = calculateAveragePrice(restaurant.price);
        const foodCost = averagePrice * totalTravelers;
        const placeDuration = restaurant.visitDuration / 60;

        totalFoodCost += foodCost;
        totalDuration += placeDuration;
        restaurantIndexes.push(restaurantIndex);
        chromosome.push(restaurant);
      }

      if (!attractionIndexes.includes(attractionIndex)) {
        const attraction = attractions[attractionIndex]!;
        const attractionCost = parseFloat(attraction.price) * totalTravelers;
        const placeDuration = attraction.visitDuration / 60;

        totalAttractionCost += attractionCost;
        totalDuration += placeDuration;
        attractionIndexes.push(attractionIndex);
        chromosome.push(attraction);
      }

      if (
        totalDuration > durationThreshold &&
        (totalFoodCost > foodCostThreshold ||
          totalAttractionCost > attractionCostThreshold)
      ) {
        break;
      }
    }
    console.log(chromosome.length);
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
