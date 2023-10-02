import { PlaceType } from '@prisma/client';

import { NexusGenObjects } from '../../graphql/generated/nexus';

type Place = NexusGenObjects['Place'];

export class Chromosome {
  constructor(public genes: Place[]) {}

  parsePrice(price: string): number {
    const [min, max] = price.split('-').map(Number);

    if (min && max) {
      return (min + max) / 2;
    }

    return parseFloat(price);
  }

  sumCost(): number {
    //  calculate total cost of a chromosome (list of destinations)
    return this.genes.reduce(
      (sum, gene) => sum + this.parsePrice(gene.price),
      0,
    );
  }

  sumDuration(): number {
    //  calculate total duration of a chromosome (list of destinations)
    return this.genes.reduce((sum, gene) => sum + gene.visitDuration, 0);
  }

  attractionCost(): number {
    return this.genes
      .filter((gene) => gene.type === PlaceType.ATTRACTION)
      .reduce((sum, gene) => sum + parseInt(gene.price), 0);
  }

  accommodationCost(): number {
    return this.genes
      .filter((gene) => gene.type === PlaceType.ACCOMMODATION)
      .reduce((sum, gene) => sum + parseInt(gene.price), 0);
  }

  foodCostRange(): string {
    const priceRanges = this.genes
      .filter((gene) => gene.type === PlaceType.RESTAURANT)
      .map((restaurant) => restaurant.price);

    const { totalMin, totalMax } = priceRanges.reduce(
      (acc, range) => {
        const [min, max] = range.split('-').map(Number);
        return { totalMin: acc.totalMin + min!, totalMax: acc.totalMax + max! };
      },
      { totalMin: 0, totalMax: 0 },
    );

    const average = (value: number) => value / priceRanges.length;

    return `${Math.floor(average(totalMin))}-${Math.floor(average(totalMax))}`;
  }
}
