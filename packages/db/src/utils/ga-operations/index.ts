import { Place } from '@prisma/client';

import { NexusGenInputs } from '../../graphql/generated/nexus';
import { evaluateFitness } from './fitness';
import { generatePopulation } from './populationInitialization';
import { selection, selectNextGeneration } from './selection';
import { Chromosome } from './types';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

const REPETITION_RATE = 1;

export async function generateItinerary(
  tripInput: CreateTripInput,
  places: Place[],
) {
  const bestSoFar: Chromosome[] = [];
  let counter = 0;

  const population = generatePopulation(tripInput, places); // initialize population
  await evaluateFitness(tripInput, population); // perform fitness evaluation
  bestSoFar.push(population[0]!);

  let currentGeneration = population;

  while (counter < REPETITION_RATE) {
    const selected = selection(currentGeneration); // select random two chromosomes as new parents
    const nextGeneration = selectNextGeneration(tripInput, selected); // create a new generation by combining two parents children
    await evaluateFitness(tripInput, nextGeneration);
    nextGeneration.sort((a, b) => a.fitnessScore - b.fitnessScore); // the closer the score to 0 the fitter the chromosome
    bestSoFar.push(nextGeneration[0]!);
    currentGeneration = nextGeneration;
    counter += 1;
  }
  bestSoFar.sort((a, b) => a.fitnessScore - b.fitnessScore);
  return bestSoFar;
}
