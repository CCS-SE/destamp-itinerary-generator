import { NexusGenInputs } from '../../graphql/generated/nexus';
import { fetchMapboxMatrix } from '../../service/mapboxService';
import { tripDuration } from '../utils';
import { Chromosome } from './types';
import {
  calculateAveragePrice,
  calculateCostScore,
  calculateDurationScore,
  calculateFitnessScore,
  calculateTravelDuration,
  calculateTravelExpenses,
  getCoordinates,
  getCoordinatesParam,
  getMatrixAvg,
  getTotalDesiredTravelHours,
} from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

export async function evaluateFitness(
  tripInput: CreateTripInput,
  population: Chromosome[],
) {
  const { travelerCount, timeSlots } = tripInput;

  let totalTravelDuration = 0;

  const duration = tripDuration(
    new Date(tripInput.startDate),
    new Date(tripInput.endDate),
  );

  const totalDesiredTravelHours = getTotalDesiredTravelHours(timeSlots);

  for (let i = 0; i < population.length; i++) {
    const currentPopulation = population[i]!;

    const chromosome = currentPopulation.chrom;
    const genes = chromosome.genes;

    const coordinatePairs = getCoordinatesParam(getCoordinates(genes));

    const matrix = await fetchMapboxMatrix('mapbox/driving', coordinatePairs);

    const avgDistance = getMatrixAvg(matrix.distances);
    const avgDuration = getMatrixAvg(matrix.durations);

    const travelDistances: number[] = [];
    const travelDurations: number[] = [];

    for (let x = 0; x < genes?.length - 1; x++) {
      const placeDistance = matrix.distances[x]![x + 1];
      const placeDuration = matrix.durations[x]![x + 1];

      if (placeDistance == null || placeDistance <= 0) {
        travelDistances.push(avgDistance);
      } else {
        travelDistances.push(placeDistance);
      }
      if (placeDuration == null || placeDuration <= 0) {
        totalTravelDuration += avgDuration;
        travelDurations.push(avgDuration);
      } else {
        totalTravelDuration += placeDuration;
        travelDurations.push(placeDuration);
      }
    }

    const estimatedTravelExpense = tripInput.isTransportationIncluded
      ? calculateTravelExpenses(
          travelDistances.splice(0, -1),
          travelDurations.slice(0, -1),
          travelerCount,
        )
      : 0;

    const accommodationCost = chromosome?.accommodationCost();
    const foodCostRange = chromosome?.foodCostRange();
    const attractionCost = chromosome?.attractionCost();
    const sumDuration = chromosome?.sumDuration();

    const costScore = calculateCostScore(
      tripInput,
      accommodationCost,
      calculateAveragePrice(foodCostRange),
      attractionCost,
      travelerCount,
      duration,
      estimatedTravelExpense,
    );

    const durationScore = calculateDurationScore(
      sumDuration,
      duration,
      totalTravelDuration,
      totalDesiredTravelHours,
    );
    currentPopulation.fitnessScore = calculateFitnessScore(
      costScore,
      durationScore,
    );
    currentPopulation.travelDuration =
      calculateTravelDuration(totalTravelDuration);
    currentPopulation.travelExpenses = estimatedTravelExpense;
    currentPopulation.travelDistances = travelDistances;
    currentPopulation.travelDurations = travelDurations;
  }
}
