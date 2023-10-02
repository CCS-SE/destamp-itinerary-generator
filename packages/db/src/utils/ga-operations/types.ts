import { PlaceType } from '@prisma/client';

import { Chromosome as Chrom } from './chromosome';

interface Geolocation {
  latitude: number;
  longitude: number;
}

export interface Gene {
  id: string;
  name: string;
  price: string;
  visitDuration: number;
  geolocation?: Geolocation | null;
  type: PlaceType;
}

export interface FitnessInput {
  population: Chromosome[];
  duration: number;
  budget: number;
  numOfPeople: number;
}

export interface Chromosome {
  chrom: Chrom;
  fitnessScore: number;
  totalCost: number;
  totalDuration: number;
  travelExpenses: number;
  travelDuration: number;
}
