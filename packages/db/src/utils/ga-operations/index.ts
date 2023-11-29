import {
  NexusGenFieldTypes,
  NexusGenInputs,
} from '../../graphql/generated/nexus';
import { evaluateFitness } from './fitness';
import { generatePopulation } from './populationInitialization';
import { selection, selectNextGeneration } from './selection';
import { Chromosome } from './types';

type CreateTripInput = NexusGenInputs['CreateTripInput'];
export type Restaurant = NexusGenFieldTypes['Restaurant'];
export type Accommodation = NexusGenFieldTypes['Accommodation'];
export type Category = NexusGenFieldTypes['Category'];

export type PointOfInterest = {
  id: string;
  name: string;
  price: string;
  isAttraction: boolean;
  visitDuration: number;
  latitude: number;
  longitude: number;
  restaurant: Restaurant | null;
  accommodation: Accommodation | null;
  categories: Category[];
};

const REPETITION_RATE = 1;

export async function generateItinerary(
  tripInput: CreateTripInput,
  restaurants: PointOfInterest[],
  attractions: PointOfInterest[],
) {
  const bestSoFar: Chromosome[] = [];
  let counter = 0;

  const population = generatePopulation(tripInput, restaurants, attractions); // initialize population
  await evaluateFitness(tripInput, population); // perform fitness evaluation
  bestSoFar.push(population[0]!);

  let currentGeneration = population;

  while (counter < REPETITION_RATE) {
    const selected = selection(currentGeneration);
    const nextGeneration = selectNextGeneration(tripInput, selected);
    await evaluateFitness(tripInput, nextGeneration);
    nextGeneration.sort((a, b) => b.fitnessScore - a.fitnessScore);
    bestSoFar.push(nextGeneration[0]!);
    currentGeneration = nextGeneration;
    counter += 1;
  }
  bestSoFar.sort((a, b) => b.fitnessScore - a.fitnessScore);
  return bestSoFar;
}
