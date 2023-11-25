import { PointOfInterest } from '.';
import { NexusGenInputs } from '../../graphql/generated/nexus';
import { fetchMapboxMatrix } from '../../service/mapboxService';
import { tripDuration } from '../utils';
import { getBudgetAllocation } from './budgetAllocation';
import { Chromosome } from './chromosome';
import { Chromosome as Chrom } from './types';
import {
  calculateTravelExpenses,
  getCoordinates,
  getCoordinatesParam,
  getDesiredTravelHour,
  getMatrixAvg,
  getRandomInt,
} from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

export const getDaySuggestions = (
  chromosome: Chrom,
  tripInput: CreateTripInput,
  accommodations: PointOfInterest[],
) => {
  const { budget } = tripInput;
  const genes = chromosome.chrom.genes;
  const dailyPlans: Chrom[] = [];

  const duration = tripDuration(
    new Date(tripInput.startDate),
    new Date(tripInput.endDate),
  );

  const budgetRate = getBudgetAllocation(tripInput)!;

  const desiredTime = tripInput.timeSlots.map((time: [number, number]) =>
    getDesiredTravelHour(time),
  );
  const accommodationThreshold = budget * budgetRate.ACCOMMODATION;
  const transportRate = tripInput.isTransportationIncluded
    ? budgetRate.TRANSPORT
    : 0;

  const suggestedAccommodationPricePerDay = Math.ceil(
    accommodationThreshold / duration,
  );

  let currentDayIndex = 0;
  let currentDayDuration = 0;
  let currentPlans: PointOfInterest[] = [];

  for (const gene of genes) {
    const geneDuration = gene.visitDuration / 60;
    const totalDailyTravelHour = desiredTime[currentDayIndex]!;
    const travelHour = totalDailyTravelHour * transportRate;

    if (currentDayDuration + geneDuration > totalDailyTravelHour - travelHour) {
      // check if it's time to create a new daily plan
      if (currentPlans.length > 0) {
        dailyPlans.push(createDailyPlan(chromosome, currentPlans));
      }
      currentDayIndex++;
      currentDayDuration = 0;
      currentPlans = [];
    }

    if (
      currentDayDuration < totalDailyTravelHour - travelHour &&
      dailyPlans.length < duration
    ) {
      if (gene.restaurant) {
        currentPlans.push(gene);
        currentDayDuration += geneDuration;
      }
      if (gene.isAttraction) {
        currentPlans.push(gene);
        currentDayDuration += geneDuration;
      }

      if (
        currentDayDuration + geneDuration >
        totalDailyTravelHour - travelHour
      ) {
        if (currentPlans.length > 0) {
          dailyPlans.push(createDailyPlan(chromosome, currentPlans));
        }
        currentDayIndex++;
        currentDayDuration = 0;
        currentPlans = [];
      }
    }
  }

  if (currentPlans.length > 0) {
    dailyPlans.push(createDailyPlan(chromosome, currentPlans));
  }

  const suggestedAccommodations = accommodations.filter(
    (place) => parseFloat(place.price) <= suggestedAccommodationPricePerDay,
  );

  const accommodation =
    suggestedAccommodations[getRandomInt(0, accommodations.length - 1)];

  // insert an accommodation to their daily plan
  if (tripInput.isAccommodationIncluded) {
    if (accommodation) {
      dailyPlans.map((plan) => {
        plan.chrom.genes.unshift(accommodation);
      });
    } else {
      // if no accommodation within suggested price, find a place with a nearest price
      const placeWithNearestPrice = findPlaceWithNearestPrice(
        accommodations,
        suggestedAccommodationPricePerDay,
      );

      dailyPlans.map((plan) => {
        plan.chrom.genes.unshift(placeWithNearestPrice);
      });
    }
  }
  return dailyPlans;
};

const createDailyPlan = (
  chromosome: Chrom,
  currentPlans: PointOfInterest[],
) => {
  return {
    ...chromosome,
    chrom: new Chromosome(currentPlans),
    // no travel expense, distance or duration will be computed
    travelExpenses: 0,
    travelDurations: [],
    travelDistances: [],
  };
};

const findPlaceWithNearestPrice = (
  places: PointOfInterest[],
  targetPrice: number,
) => {
  return places.reduce((nearestPlace, currentPlace) => {
    const nearestDiff = Math.abs(parseFloat(nearestPlace.price) - targetPrice);
    const currentDiff = Math.abs(parseFloat(currentPlace.price) - targetPrice);

    return currentDiff < nearestDiff ? currentPlace : nearestPlace;
  });
};

export const getDailyPlans = async (
  plans: Chrom[],
  tripInput: CreateTripInput,
) => {
  const dailyPlan: Chrom[] = [];

  for (const plan of plans) {
    const { chrom } = plan;

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

    dailyPlan.push({
      ...plan,
      travelExpenses: tripInput.isTransportationIncluded
        ? calculateTravelExpenses(
            validDistances,
            validDurations,
            tripInput.travelerCount,
          )
        : 0,
      travelDurations: travelDurations,
      travelDistances: travelDistances,
    });
  }
  return dailyPlan;
};
