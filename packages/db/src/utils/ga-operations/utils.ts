import { PlaceType } from '@prisma/client';

import { NexusGenInputs, NexusGenObjects } from '../../graphql/generated/nexus';
import { tripDuration } from '../utils';
import { Chromosome } from './chromosome';
import { Chromosome as Chrom } from './types';

type CreateTripInput = NexusGenInputs['CreateTripInput'];
type Place = NexusGenObjects['Place'];

const POPULATION_SIZE = 15;
const FOOD_RATE = 0.3; // 30%  goes to food
const ATTRACTION_RATE = 0.25; // 25%  goes to food
const ACCOMMODATION_RATE = 0.25; // 25% goes to accommodation --> the rest transpo
const TRAVEL_DURATION = 8; //  assuming 8 hours of travel per day --> use user's preferred time

export function generatePopulation(input: CreateTripInput, places: Place[]) {
  const { budget, adultCount, childCount } = input;

  const duration = tripDuration(
    new Date(input.startDate),
    new Date(input.endDate),
  );

  const numOfPeople = (adultCount || 0) + (childCount || 0);

  const foodMaxDuration = 120 * duration; // max 2 hours of food per day
  const durationThreshold = duration * TRAVEL_DURATION * 60;

  const attractionThreshold = budget * ATTRACTION_RATE; // 20% of the budget will goes to attractions
  const foodThreshold = budget * FOOD_RATE; // 35% of the budget will goes to food
  const accommodationThreshold = budget * ACCOMMODATION_RATE; // 25% of the budget will goes to accommodation

  const newPopulation: Chrom[] = []; // placeholder for initialized population

  for (let i = 0; i < POPULATION_SIZE; i++) {
    let totalDuration = 0;
    let foodDuration = 0;
    let foodBudget = 0;
    let attractionBudget = 0;
    let accommodationBuget = 0;

    const chromosome: Place[] = []; // list of destinations within budget and timeframe
    const randomIndexes: number[] = []; // list of used random number

    while (
      totalDuration < durationThreshold &&
      (foodBudget < foodThreshold ||
        attractionBudget < attractionThreshold ||
        accommodationBuget < accommodationThreshold)
    ) {
      const randomIndex = Math.floor(Math.random() * (places.length - 1));

      // to make sure no duplicate places
      if (!randomIndexes.includes(randomIndex)) {
        const place = places[randomIndex];
        if (place?.type === PlaceType.RESTAURANT) {
          const averagePrice = calculateAveragePrice(place.price);
          const foodCost = averagePrice * numOfPeople;
          if (foodDuration + place.visitDuration <= foodMaxDuration) {
            foodBudget += foodCost;
            foodDuration += place.visitDuration;
            totalDuration += place.visitDuration;
            randomIndexes.push(randomIndex);
            chromosome.push(place);
          }
        } else if (place?.type === PlaceType.ATTRACTION) {
          const attractionCost = parseFloat(place.price) * numOfPeople;
          if (parseInt(place.price) + totalDuration <= durationThreshold) {
            attractionBudget += attractionCost;
            totalDuration += place.visitDuration;
            randomIndexes.push(randomIndex);
            chromosome.push(place);
          }
        } else if (place?.type === PlaceType.ACCOMMODATION) {
          const accommodationCost = parseFloat(place.price) * duration;
          accommodationBuget += accommodationCost;
          randomIndexes.push(randomIndex);
          chromosome.push(place);
        }
      }
    }

    newPopulation.push({
      chrom: new Chromosome(chromosome),
      fitnessScore: 0,
      totalCost: 0,
      totalDuration: 0,
      travelDuration: 0,
      travelExpenses: 0,
    });
  }
  return newPopulation;
}

const createDailyPlan = (genes: Place[]): Chrom => {
  const chrom = new Chromosome(genes);
  return {
    chrom,
    fitnessScore: 0,
    totalCost: 0,
    totalDuration: 0,
    travelDuration: 0,
    travelExpenses: 0,
  };
};

export function daySuggestions(chromosome: Chrom, numDays: number): Chrom[] {
  const genes = chromosome.chrom.genes;

  const dailyPlans: Chrom[] = [];

  const avgGenesPerDay = Math.ceil(genes.length / numDays);

  let currentDayIndex = 0;
  let currentDayDuration = 0;
  let currentPlan: Place[] = [];

  for (const gene of genes) {
    const geneDuration = gene.visitDuration / 60;

    if (currentDayDuration + geneDuration > TRAVEL_DURATION - 3.5) {
      if (currentPlan.length > 0) {
        dailyPlans.push(createDailyPlan(currentPlan));
      }
      currentDayIndex++;
      currentDayDuration = 0;
      currentPlan = [];
    }

    if (currentDayIndex <= numDays && dailyPlans.length < numDays) {
      currentPlan.push(gene);
      currentDayDuration += geneDuration;

      // Check if we have reached the desired number of genes for the current day
      if (
        currentPlan.length === avgGenesPerDay &&
        dailyPlans.length < numDays
      ) {
        dailyPlans.push(createDailyPlan(currentPlan));
        currentPlan = [];
        currentDayIndex++;
        currentDayDuration = 0;
      }
    }
  }
  return dailyPlans;
}

export const multiplyRangeByPeople = (
  range: string,
  numberOfPeople: number,
) => {
  const [min, max] = range.split('-').map(Number); // Split the range and convert to numbers

  if (min && max) {
    const minResult = min! * numberOfPeople;
    const maxResult = max! * numberOfPeople;

    return `${minResult}-${maxResult}`;
  }

  return '0';
};

export const calculateAveragePrice = (priceRange: string) => {
  const [min, max] = priceRange.split('-').map(Number);
  return (min! + max!) / 2;
};
