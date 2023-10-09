import { PlaceType } from '@prisma/client';

import { NexusGenInputs, NexusGenObjects } from '../../graphql/generated/nexus';
import { tripDuration } from '../utils';
import { getBudgetAllocation } from './budgetAllocation';
import { Chromosome } from './chromosome';
import { Chromosome as Chrom } from './types';
import { calculateAveragePrice, getTotalDesiredTravelHours } from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];
type Place = NexusGenObjects['Place'];

const POPULATION_SIZE = 40;

export function generatePopulation(input: CreateTripInput, places: Place[]) {
  const { budget, adultCount, childCount, preferredTime } = input;

  const budgetRate = getBudgetAllocation(input)!;

  const attractionThreshold = budget * budgetRate.ATTRACTION;
  const foodThreshold = budget * budgetRate.FOOD;
  const accommodationThreshold = budget * budgetRate.ACCOMMODATION;

  const duration = tripDuration(
    new Date(input.startDate),
    new Date(input.endDate),
  );

  // const MAX_ITERATIONS = 20; // max number of iterations

  const totalDesiredHours = getTotalDesiredTravelHours(preferredTime);
  const totalTravelers = (adultCount || 0) + (childCount || 0);

  const foodMaxDuration = 240 * duration;
  const durationThreshold = duration * totalDesiredHours * 60;

  const newPopulation: Chrom[] = []; // placeholder for initialized population

  for (let i = 0; i < POPULATION_SIZE; i++) {
    let totalDuration = 0;
    let foodDuration = 0;
    let foodBudget = 0;
    let attractionBudget = 0;
    let accommodationBuget = 0;
    // let iteration = 0;

    let totalCost = 0;

    const chromosome: Place[] = []; // list of destinations within budget and timeframe
    const randomIndexes: number[] = [];

    while (totalDuration < durationThreshold && totalCost < budget) {
      const randomIndex = Math.floor(Math.random() * (places.length - 1));

      console.log(totalDuration);
      if (!randomIndexes.includes(randomIndex)) {
        // make sure no duplicate
        const place = places[randomIndex];

        if (place?.type === PlaceType.RESTAURANT && input.isFoodIncluded) {
          const averagePrice = calculateAveragePrice(place.price);
          const foodCost = averagePrice * totalTravelers;

          if (
            place.visitDuration + foodDuration <= foodMaxDuration &&
            parseFloat(place.price) + foodBudget < foodThreshold
          ) {
            totalCost += foodCost;
            foodBudget += foodCost;
            foodDuration += place.visitDuration;
            totalDuration += place.visitDuration;

            randomIndexes.push(randomIndex);
            chromosome.push(place);
          }
        }

        if (place?.type === PlaceType.ATTRACTION) {
          const attractionCost = parseFloat(place.price) * totalTravelers;

          if (
            place.visitDuration + totalDuration <= durationThreshold &&
            parseFloat(place.price) + attractionBudget < attractionThreshold
          ) {
            totalCost += attractionCost;
            attractionBudget += attractionCost;
            totalDuration += place.visitDuration;
            randomIndexes.push(randomIndex);
            chromosome.push(place);
          }
        }

        if (
          place?.type === PlaceType.ACCOMMODATION &&
          input.isAccommodationIncluded
        ) {
          const suggestedPrice = Math.round(accommodationThreshold / duration);
          const accommodationCost = parseFloat(place.price) * duration;

          if (
            suggestedPrice <= parseFloat(place.price) &&
            parseFloat(place.price) + accommodationBuget <
              accommodationThreshold
          ) {
            totalCost += accommodationCost;
            accommodationBuget += accommodationCost;
            randomIndexes.push(randomIndex);
            chromosome.push(place);
          }
        }
      }
      // iteration++;
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
