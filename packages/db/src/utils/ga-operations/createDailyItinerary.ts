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
  getRandomInt,
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

  const suggestedAccommodations = accommodations.filter(
    (accommodation) =>
      parseFloat(accommodation.price) <= suggestedAccommodationPricePerDay,
  );

  const selectedAccommodation =
    suggestedAccommodations[getRandomInt(0, accommodations.length - 1)];

  if (input.isAccommodationIncluded) {
    if (selectedAccommodation) {
      const updatedDailyItineraries = dailyItineraries.map((itinerary) => {
        const updatedItinerary = { ...itinerary };
        updatedItinerary.chrom.genes.unshift(selectedAccommodation);
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
  itinerary: Chrom,
  input: CreateTripInput,
) => {
  const { chrom } = itinerary;

  const coordinatePairs = getCoordinatesParam(getCoordinates(chrom.genes));

  const matrix = await fetchMapboxMatrix('mapbox/driving', coordinatePairs);

  const travelDistances = [];
  const travelDurations = [];

  const avgDistance = getMatrixAvg(matrix.distances);
  const avgDuration = getMatrixAvg(matrix.durations);

  for (let i = 0; i < chrom.genes.length; i++) {
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

  const validDistances = travelDistances.slice(0, -1);
  const validDurations = travelDurations.slice(0, -1);

  const updatedItinerary: Chrom = {
    ...itinerary,
    travelExpenses: input.isTransportationIncluded
      ? calculateTravelExpenses(
          validDistances,
          validDurations,
          input.travelerCount,
        )
      : 0,
    travelDurations: travelDurations,
    travelDistances: travelDistances,
  };

  return updatedItinerary;
};
