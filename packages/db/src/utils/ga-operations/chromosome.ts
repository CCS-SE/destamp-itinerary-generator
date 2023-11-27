import { PointOfInterest } from '.';

export class Chromosome {
  constructor(public genes: PointOfInterest[]) {}

  sumCost(): number {
    //  calculate total cost of a chromosome (list of destinations)
    return this.genes.reduce(
      (sum, gene) => sum + this.parsePrice(gene.price),
      0,
    );
  }

  sumDuration(): number {
    //  calculate total duration of a chromosome (list of destinations)
    return this.genes.reduce((sum, gene) => {
      if (!gene.accommodation && (gene.isAttraction || gene.restaurant)) {
        sum += gene.visitDuration;
      }
      return sum;
    }, 0);
  }

  attractionCost(): number {
    return this.genes
      .filter((gene) => gene.isAttraction)
      .reduce((sum, gene) => sum + parseInt(gene.price), 0);
  }

  accommodationCost(): number {
    return this.genes
      .filter((gene) => gene.accommodation)
      .reduce((sum, gene) => sum + parseInt(gene.price), 0);
  }

  foodCostRange(): string {
    const priceRanges = this.genes
      .filter((gene) => gene.restaurant)
      .map((restaurant) => restaurant.price);

    const { totalMin, totalMax } = priceRanges.reduce(
      (acc, range) => {
        const [min, max] = range.split('-').map(Number);
        return { totalMin: acc.totalMin + min!, totalMax: acc.totalMax + max! };
      },
      { totalMin: 0, totalMax: 0 },
    );

    return `${Math.floor(totalMin)}-${Math.floor(totalMax)}`;
  }

  parsePrice(price: string): number {
    const [min, max] = price.split('-').map(Number);

    if (min && max) {
      return (min + max) / 2;
    }

    return parseFloat(price);
  }
}
