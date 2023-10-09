import { NexusGenInputs } from '../../graphql/generated/nexus';
import { fetchMapboxMatrix } from '../../service/mapboxService';
import { tripDuration } from '../utils';
import { Chromosome } from './types';
import {
  calculateAveragePrice,
  calculateCostScore,
  calculateDurationScore,
  calculateFitnessScore,
  calculateTotalCost,
  calculateTotalDuration,
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
  const {
    budget,
    adultCount,
    childCount,
    preferredTime,
    isTransportationIncluded,
  } = tripInput;

  const totalTravelers = (adultCount || 0) + (childCount || 0);
  let totalTravelDuration = 0;

  const duration = tripDuration(
    new Date(tripInput.startDate),
    new Date(tripInput.endDate),
  );

  const totalDesiredTravelHours = getTotalDesiredTravelHours(preferredTime);

  for (let i = 0; i < population.length - 1; i++) {
    const currentPopulation = population[i]!;

    const chromosome = currentPopulation.chrom;
    const genes = chromosome.genes;

    console.log(population.length);
    console.log(`gene: ${genes.length}`);

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

    const estimatedTravelExpense = isTransportationIncluded
      ? calculateTravelExpenses(travelDistances)
      : 0;

    const accommodationCost = chromosome?.accommodationCost();
    const foodCostRange = chromosome?.foodCostRange();
    const attractionCost = chromosome?.attractionCost();
    const sumDuration = chromosome?.sumDuration();
    const sumCost = chromosome?.sumCost();

    const costScore = calculateCostScore(
      budget,
      accommodationCost,
      calculateAveragePrice(foodCostRange),
      attractionCost,
      totalTravelers,
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
    currentPopulation.totalCost = calculateTotalCost(
      sumCost,
      totalTravelers,
      estimatedTravelExpense,
    );
    currentPopulation.totalDuration = calculateTotalDuration(
      sumDuration,
      totalTravelDuration,
    );
    currentPopulation.travelDuration =
      calculateTravelDuration(totalTravelDuration);
    currentPopulation.travelExpenses = estimatedTravelExpense;
    currentPopulation.travelDistances = travelDistances;
    currentPopulation.travelDurations = travelDurations;
  }
}
