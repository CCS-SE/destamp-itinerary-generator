import { PlaceType } from '@prisma/client';

import { NexusGenInputs, NexusGenObjects } from '../../graphql/generated/nexus';
import { fetchMapboxMatrix } from '../../service/mapboxService';
import { tripDuration } from '../utils';
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

  console.log('suggestion', genes.length);
  const dailyPlans: Chrom[] = [];
  const accommodationPlan: Place[] = [];

  const duration = tripDuration(
    new Date(tripInput.startDate),
    new Date(tripInput.endDate),
  );

  // const foodDurationThreshold = 2.5;

  let currentDayIndex = 0;
  let currentDayDuration = 0;
  // let foodDuration = 0;
  let currentPlans: Place[] = [];
  let currentDailyPlan: Place[] = []; // New array to store genes for the current daily plan

  const desiredTime = preferredTime.map((time) => getDesiredTravelHour(time));

  for (const gene of genes) {
    const geneDuration =
      gene.type !== PlaceType.ACCOMMODATION ? gene.visitDuration / 60 : 0; // only get the duration of restaus and attractions

    if (currentDayDuration + geneDuration > desiredTime[currentDayIndex]! - 2) {
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
      // foodDuration = 0;
      currentPlans = [];
      currentDailyPlan = []; // Reset the current daily plan
    }

    if (
      currentDayDuration < desiredTime[currentDayIndex]! - 2 &&
      dailyPlans.length <= duration
    ) {
      if (gene.type === PlaceType.RESTAURANT) {
        currentPlans.push(gene);
        currentDayDuration += geneDuration;
        // foodDuration += geneDuration;
      } else if (gene.type === PlaceType.ATTRACTION) {
        currentPlans.push(gene);
        currentDayDuration += geneDuration;
      } else if (gene.type === PlaceType.ACCOMMODATION) {
        accommodationPlan.push(gene);
      }
    }
  }

  // Include the first accommodation place in the first daily plan
  if (accommodationPlan.length > 0) {
    dailyPlans[0]?.chrom.genes.push(accommodationPlan[0]!);
  }

  // Include any remaining places in the last daily plan
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
) => {
  const dailyPlan: Chrom[] = [];

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

    dailyPlan.push({
      ...plan,
      travelExpenses: tripInput.isTransportationIncluded
        ? calculateTravelExpenses(travelDistances)
        : 0,
      travelDurations: travelDurations,
      travelDistances: travelDistances,
    });
  }
  return dailyPlan;
};
