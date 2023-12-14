import {
  NexusGenFieldTypes,
  NexusGenInputs,
} from '../../graphql/generated/nexus';
import { clusterPois } from './cluster';
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

export async function generateItinerary(
  isPremium: boolean,
  hasPreference: boolean,
  input: CreateTripInput,
  pois: PointOfInterest[],
  duration: number,
  desiredTravelHours: number[],
) {
  const bestChromosomesPerCluster: Array<Array<Chromosome>> = new Array(
    duration,
  )
    .fill(null)
    .map(() => []);

  const clusteredPois = clusterPois(duration, pois);

  for (let cluster = 0; cluster < clusteredPois.length; cluster++) {
    const population: Chromosome[] = generatePopulation(
      isPremium,
      hasPreference,
      input,
      clusteredPois[cluster]!.genes,
      duration,
      desiredTravelHours[cluster]!,
    ); // initialize population

    await evaluateFitness(
      input,
      population,
      duration,
      desiredTravelHours[cluster]!,
    ); // perform fitness evaluation

    bestChromosomesPerCluster[cluster]!.push(population[0]!);

    const selected = selection(population);
    const nextGeneration = selectNextGeneration(
      input,
      selected,
      duration,
      desiredTravelHours[cluster]!,
    );
    await evaluateFitness(
      input,
      nextGeneration,
      duration,
      desiredTravelHours[cluster]!,
    );

    nextGeneration.sort((a, b) => b.fitnessScore - a.fitnessScore);
    bestChromosomesPerCluster[cluster]!.push(nextGeneration[0]!);
    bestChromosomesPerCluster[cluster]!.sort(
      (a, b) => b.fitnessScore - a.fitnessScore,
    );
  }
  // best chromosome per cluster
  const bestSoFar = bestChromosomesPerCluster.map((best) => best[0]!);

  return bestSoFar;
}
