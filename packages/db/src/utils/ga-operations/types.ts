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

export interface Chromosome {
  chrom: Chrom;
  fitnessScore: number;
  totalCost: number;
  totalDuration: number; // total duration for the whole trip (travel duration + places duration)
  travelExpenses: number; // transport expenses for the whole trip
  travelDuration: number; // total travel duration (in meter)
  travelDistances: number[]; // travel distance between destinations (in meter)
  travelDurations: number[]; // travel durations between destinations (in second)
}
