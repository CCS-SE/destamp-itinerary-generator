import { NexusGenInputs } from '../../graphql/generated/nexus';
import { Chromosome } from './chromosome';
import { crossover } from './crossover';
import { Chromosome as Chrom } from './types';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

const POPULATION_SIZE = 10;

export const selection = (population: Chrom[]) => {
  const selected: Chrom[] = [];

  for (let i = 0; i < POPULATION_SIZE; i++) {
    const randomIndex = Math.floor(Math.random() * population.length);
    let randomIndex1 = Math.floor(Math.random() * population.length);

    while (randomIndex === randomIndex1) {
      randomIndex1 = Math.floor(Math.random() * population.length);
    }

    const ch1 = population[randomIndex]!;
    const ch2 = population[randomIndex1]!;

    if (ch1.fitnessScore > ch2.fitnessScore) {
      selected.push(ch1);
    } else {
      selected.push(ch2);
    }
  }
  return selected;
};

export const selectNextGeneration = (
  tripInput: CreateTripInput,
  population: Chrom[],
) => {
  const nextGeneration: Chrom[] = [];

  for (let i = 0; i < population.length; i += 2) {
    const chromosome1 = population[i]!.chrom;
    const chromosome2 = population[i + 1]!.chrom;

    const { chrom1, chrom2 } = crossover(chromosome1, chromosome2, tripInput);

    nextGeneration.push({
      chrom: new Chromosome(chrom1),
      fitnessScore: 0,
      travelDuration: 0,
      travelExpenses: 0,
      travelDistances: [],
      travelDurations: [],
    });
    nextGeneration.push({
      chrom: new Chromosome(chrom2),
      fitnessScore: 0,
      travelDuration: 0,
      travelExpenses: 0,
      travelDistances: [],
      travelDurations: [],
    });
  }
  return nextGeneration;
};
