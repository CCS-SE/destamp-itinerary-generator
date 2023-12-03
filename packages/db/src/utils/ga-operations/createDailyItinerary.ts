import { PointOfInterest } from '.';
import { NexusGenInputs } from '../../graphql/generated/nexus';
import { fetchMapboxMatrix } from '../../service/mapboxService';
import { getBudgetAllocation } from './budgetAllocation';
import { Chromosome as Chrom } from './types';
import {
  calculateTravelExpenses,
  findPoiWithNearestPrice,
  getCoordinates,
  getCoordinatesParam,
  getMatrixAvg,
} from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

export const assignAccommodation = (
  dailyItineraries: Chrom[],
  input: CreateTripInput,
  pois: PointOfInterest[],
  duration: number,
): Chrom[] => {
  const { budget } = input;

  const budgetRate = getBudgetAllocation(input)!;

  const suggestedAccommodationPricePerDay = Math.ceil(
    (budget * budgetRate.ACCOMMODATION) / duration,
  );

  const accommodations = pois.filter((poi) => poi.accommodation);

  if (input.isAccommodationIncluded) {
    if (accommodations) {
      const updatedDailyItineraries = dailyItineraries.map((itinerary) => {
        const updatedItinerary = { ...itinerary };

        // assign the first accommodation
        updatedItinerary.chrom.genes.unshift(accommodations[0]!);
        return updatedItinerary;
      });
      return updatedDailyItineraries;
    } else {
      const accommodationWithNearestPrice = findPoiWithNearestPrice(
        accommodations,
        suggestedAccommodationPricePerDay,
      );
      const updatedDailyItineraries = dailyItineraries.map((itinerary) => {
        const updatedItinerary = { ...itinerary };
        updatedItinerary.chrom.genes.unshift(accommodationWithNearestPrice);
        return updatedItinerary;
      });
      return updatedDailyItineraries;
    }
  } else {
    return dailyItineraries;
  }
};

export const createDailyItinerary = async (
  chromosome: Chrom,
  input: CreateTripInput,
) => {
  const { genes } = chromosome.chrom;

  const startingLocation: PointOfInterest = {
    ...genes[0]!,
    latitude: input.startingLocation.center[1] as number,
    longitude: input.startingLocation.center[0] as number,
  };

  // add starting location to matrix if accommodation is not included
  const pois = input.isAccommodationIncluded
    ? genes
    : [startingLocation].concat(genes);

  console.log(pois.length);

  if (pois.length > 1) {
    const coordinatePairs = getCoordinatesParam(getCoordinates(pois));
    const matrix = await fetchMapboxMatrix('mapbox/driving', coordinatePairs);

    const distances = new Array(pois.length).fill(Infinity) as number[];
    const durations = new Array(pois.length).fill(Infinity) as number[];

    const avgDistance = getMatrixAvg(matrix.distances);
    const avgDuration = getMatrixAvg(matrix.durations);

    const visited = new Set<number>();

    distances[0] = 0;
    durations[0] = 0;

    while (visited.size < pois.length) {
      const index = Array.from(distances.keys()).find(
        (i) => !visited.has(i) && distances[i] !== Infinity,
      );

      if (index === undefined) break;

      visited.add(index);

      for (let i = 0; i < pois.length; i++) {
        const distance = matrix.distances[index]![i]!;
        const duration = matrix.durations[index]![i]!;

        if (distance !== null && distance > 0) {
          const newDistance = distances[index]! + distance;

          if (newDistance < distances[i]!) {
            distances[i] = distance;
            durations[i] = duration;
          }
        }
      }
    }

    // sort genes according to shortest path
    const sortedGenes = pois.sort(
      (a, b) =>
        distances[pois.indexOf(a)]! +
        durations[pois.indexOf(a)]! -
        (distances[pois.indexOf(b)]! + durations[pois.indexOf(b)]!),
    );

    // removed initialized 0 distance / duration
    distances.shift();
    durations.shift();

    distances.push(avgDistance);
    durations.push(avgDuration);

    // return the sorted genes if accommodation is included remove the starting location from the genes otherwise
    const orderedGenes = input.isAccommodationIncluded
      ? sortedGenes
      : sortedGenes.slice(1);

    // update the chrosome with ordered genes
    const updatedChoromosome: Chrom = {
      ...chromosome,
      travelExpenses: input.isTransportationIncluded
        ? calculateTravelExpenses(distances, durations, input.travelerCount)
        : 0,
      travelDurations: durations,
      travelDistances: distances,
    };

    updatedChoromosome.chrom.genes = orderedGenes;

    return updatedChoromosome;
  } else {
    const orderedGenes = input.isAccommodationIncluded ? pois : pois.slice(1);

    const updatedChoromosome: Chrom = {
      ...chromosome,
      travelDistances: [0],
      travelDurations: [0],
    };

    updatedChoromosome.chrom.genes = orderedGenes;

    const gene = orderedGenes[0];

    updatedChoromosome.chrom.accommodationCost = () =>
      gene?.accommodation ? parseFloat(gene.price) : 0;
    updatedChoromosome.chrom.attractionCost = () =>
      gene?.isAttraction ? parseFloat(gene.price) : 0;
    updatedChoromosome.chrom.foodCostRange = () =>
      gene?.restaurant ? gene.price : '0-0';
    updatedChoromosome.travelExpenses = 0;

    return updatedChoromosome;
  }
};
