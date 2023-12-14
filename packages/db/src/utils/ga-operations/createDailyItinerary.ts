import { PointOfInterest } from '.';
import { NexusGenInputs } from '../../graphql/generated/nexus';
import { fetchMapboxMatrix } from '../../service/mapboxService';
import { getBudgetAllocation } from './budgetAllocation';
import shortestPath from './shortestPath';
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

  const updateDailyItineraries = (
    dailyItineraries: Chrom[],
    accommodation: PointOfInterest,
  ): Chrom[] => {
    return dailyItineraries.map((itinerary) => {
      const updatedItinerary = { ...itinerary };
      updatedItinerary.chrom.genes.unshift(accommodation);
      return updatedItinerary;
    });
  };

  if (input.isAccommodationIncluded) {
    const accommodationWithNearestPrice = findPoiWithNearestPrice(
      accommodations,
      suggestedAccommodationPricePerDay,
    );
    return updateDailyItineraries(
      dailyItineraries,
      accommodationWithNearestPrice,
    );
  } else {
    return dailyItineraries;
  }
};

export const createDailyItinerary = async (
  isPremium: boolean,
  chromosome: Chrom,
  input: CreateTripInput,
) => {
  const { genes } = chromosome.chrom;

  const startingLocation: PointOfInterest = {
    id: 'start',
    name: 'Starting Location',
    price: '0',
    isAttraction: false,
    visitDuration: 0,
    latitude: input.startingLocation.center[1] as number,
    longitude: input.startingLocation.center[0] as number,
    restaurant: {
      id: 0,
      atmospheres: [],
      poiId: '',
    },
    accommodation: {
      id: 0,
      amenities: [],
      poiId: '',
    },
    categories: [],
  };

  // add starting location to matrix if accommodation is not included
  const pois = input.isAccommodationIncluded
    ? genes
    : [startingLocation].concat(genes);

  const coordinatePairs = getCoordinatesParam(getCoordinates(pois));
  const matrix = await fetchMapboxMatrix('mapbox/driving', coordinatePairs);

  console.log(pois.length);

  if (pois.length > 1) {
    if (isPremium) {
      const { distances, durations, orderedPOIs } = shortestPath(
        pois,
        matrix.distances,
        matrix.durations,
        pois[0]!,
      );

      // removed initialized 0 distance / duration
      distances.push(distances.shift());
      durations.push(durations.shift());

      // return the sorted genes if accommodation is included remove the starting location from the genes otherwise
      const orderedGenes = input.isAccommodationIncluded
        ? orderedPOIs
        : orderedPOIs.slice(1);

      // update the chrosome with ordered genes
      const updatedChoromosome: Chrom = {
        ...chromosome,
        travelExpenses: input.isTransportationIncluded
          ? calculateTravelExpenses(distances, durations, input.travelerCount)
          : 0,
        travelDurations: durations as number[],
        travelDistances: distances as number[],
      };

      updatedChoromosome.chrom.genes = orderedGenes;

      return updatedChoromosome;
    } else {
      const travelDistances = [];
      const travelDurations = [];

      const avgDistance = getMatrixAvg(matrix.distances);
      const avgDuration = getMatrixAvg(matrix.durations);

      for (let i = 0; i < pois.length; i++) {
        const placeDistance = matrix.distances[i]![i + 1];
        const placeDuration = matrix.durations[i]![i + 1];

        if (placeDistance == null || placeDistance <= 0) {
          travelDistances.push(avgDistance);
        } else {
          travelDistances.push(placeDistance);
        }
        if (placeDuration == null || placeDuration <= 0) {
          travelDurations.push(avgDuration);
        } else {
          travelDurations.push(placeDuration);
        }
      }

      const validDistances = input.isAccommodationIncluded
        ? travelDistances
        : travelDistances.slice(0, -1);
      const validDurations = input.isAccommodationIncluded
        ? travelDurations
        : travelDurations.slice(0, -1);

      // return the sorted genes if accommodation is included remove the starting location from the genes otherwise
      const genes = input.isAccommodationIncluded ? pois : pois.slice(1);

      // update the chrosome with ordered genes
      const updatedChoromosome: Chrom = {
        ...chromosome,
        travelExpenses: input.isTransportationIncluded
          ? calculateTravelExpenses(
              validDistances,
              validDurations,
              input.travelerCount,
            )
          : 0,
        travelDurations: validDurations as number[],
        travelDistances: validDistances as number[],
      };

      updatedChoromosome.chrom.genes = genes;

      return updatedChoromosome;
    }
  } else {
    const onlyPoi = input.isAccommodationIncluded ? pois : pois.slice(1);

    const updatedChoromosome: Chrom = {
      ...chromosome,
      travelDistances: [0],
      travelDurations: [0],
    };

    updatedChoromosome.chrom.genes = onlyPoi;

    const gene = onlyPoi[0];

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
