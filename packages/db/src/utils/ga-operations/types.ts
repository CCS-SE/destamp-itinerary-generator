import { Chromosome as Chrom } from './chromosome';

export interface Gene {
  id: string;
  name: string;
  price: string;
  visitDuration: number;
}

export interface Chromosome {
  chrom: Chrom;
  fitnessScore: number;
  travelExpenses: number; // transport expenses for the whole trip
  travelDuration: number; // total travel duration (in meter)
  travelDistances: number[]; // travel distances between destinations (in meter)
  travelDurations: number[]; // travel durations between destinations (in second)
}
