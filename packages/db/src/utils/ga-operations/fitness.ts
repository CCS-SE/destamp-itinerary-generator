import { NexusGenInputs } from '../../graphql/generated/nexus';
import { fetchMapboxMatrix } from '../../service/mapboxService';
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
} from './utils';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

export async function evaluateFitness(
  tripInput: CreateTripInput,
  population: Chromosome[],
  duration: number,
  desiredTravelHours: number,
) {
  const { travelerCount } = tripInput;

  let totalTravelDuration = 0;

  for (let i = 0; i < population.length; i++) {
    const currentPopulation = population[i]!;

    const chromosome = currentPopulation.chrom;
    const genes = chromosome.genes;

    // minimun coordinates to create matrix is 2 --> avoid not enought input error
    if (genes.length < 2) {
      continue;
    }

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
      totalTravelDuration,
      desiredTravelHours,
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
