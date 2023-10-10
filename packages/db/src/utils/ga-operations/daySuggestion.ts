import { PlaceType } from '@prisma/client';

import { NexusGenInputs, NexusGenObjects } from '../../graphql/generated/nexus';
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
} from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];
type Place = NexusGenObjects['Place'];

export const getDaySuggestions = (
  chromosome: Chrom,
  tripInput: CreateTripInput,
) => {
  const { preferredTime } = tripInput;
  const genes = chromosome.chrom.genes;
  const dailyPlans: Chrom[] = [];

  const duration = tripDuration(
    new Date(tripInput.startDate),
    new Date(tripInput.endDate),
  );

  let currentDayIndex = 0;
  let currentDayDuration = 0;
  let currentPlans: Place[] = [];
  let currentDailyPlan: Place[] = []; // New array to store genes for the current daily plan

  const desiredTime = preferredTime.map((time) => getDesiredTravelHour(time));

  for (const gene of genes) {
    const geneDuration = gene.visitDuration / 60;

    if (
      currentDayDuration + geneDuration >
      desiredTime[currentDayIndex]! - 1.5
    ) {
      // Push the current plans to the current daily plan
      currentDailyPlan.push(...currentPlans);

      // Check if it's time to create a new daily plan
      if (currentDailyPlan.length > 0) {
        dailyPlans.push({
          ...chromosome,
          chrom: new Chromosome(currentDailyPlan),
        });
      }
      currentDayIndex++;
      currentDayDuration = 0;
      currentPlans = [];
      currentDailyPlan = []; // Reset the current daily plan
    }

    if (
      currentDayDuration < desiredTime[currentDayIndex]! - 1.5 &&
      dailyPlans.length <= duration
    ) {
      if (gene.type === PlaceType.RESTAURANT) {
        currentPlans.push(gene);
        currentDayDuration += geneDuration;
      }
      if (gene.type === PlaceType.ATTRACTION) {
        currentPlans.push(gene);
        currentDayDuration += geneDuration;
      }
    }
  }

  if (currentPlans.length > 0) {
    currentDailyPlan.push(...currentPlans);
  }

  // Push the current daily plan to the daily plans array
  if (currentDailyPlan.length > 0) {
    dailyPlans.push({ ...chromosome, chrom: new Chromosome(currentDailyPlan) });
  }

  return dailyPlans;
};

export const getDailyPlans = async (
  plans: Chrom[],
  tripInput: CreateTripInput,
  places: Place[],
) => {
  const { budget, isAccommodationIncluded } = tripInput;
  const dailyPlan: Chrom[] = [];

  const duration = tripDuration(
    new Date(tripInput.startDate),
    new Date(tripInput.endDate),
  );

  const budgetRate = getBudgetAllocation(tripInput)!;

  const accommodationThreshold = budget * budgetRate.ACCOMMODATION;

  const suggestedAccommodationPricePerDay = Math.ceil(
    accommodationThreshold / duration,
  );

  const accommodation = places.find(
    (place) =>
      place.type === PlaceType.ACCOMMODATION &&
      parseFloat(place.price) <= suggestedAccommodationPricePerDay,
  );

  if (isAccommodationIncluded && accommodation) {
    plans[0]?.chrom.genes.push(accommodation);
  }

  for (const plan of plans) {
    console.log('plan', plan.chrom.genes.length);

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

    dailyPlan.push({
      ...plan,
      travelExpenses: tripInput.isTransportationIncluded
        ? calculateTravelExpenses(validDistances)
        : 0,
      travelDurations: travelDurations,
      travelDistances: travelDistances,
    });
  }
  return dailyPlan;
};
