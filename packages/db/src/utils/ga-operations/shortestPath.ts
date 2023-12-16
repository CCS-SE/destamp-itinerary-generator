import { PointOfInterest } from '.';

export default function shortestPath(
  pois: PointOfInterest[],
  distanceMatrix: number[][],
  duractionMatrix: number[][],
  src: PointOfInterest,
) {
  const distances = new Array(pois.length).fill(Infinity);
  const durations = new Array(pois.length).fill(Infinity);
  const visited = new Array(pois.length).fill(false);
  const visitedPois = new Array(pois.length).fill(null);

  distances[0] = 0;
  durations[0] = 0;
  visitedPois[0] = src;

  for (let count = 0; count < pois.length - 1; count++) {
    let currentIndex = -1; // start with unvisited node
    for (let poiIndex = 0; poiIndex < pois.length; poiIndex++) {
      if (
        !visited[poiIndex] &&
        (currentIndex === -1 || distances[poiIndex] < distances[currentIndex])
      ) {
        currentIndex = poiIndex;
      }
    }

    visited[currentIndex] = true;

    for (let poiIndex = 0; poiIndex < pois.length; poiIndex++) {
      const distance = distanceMatrix[currentIndex]![poiIndex]!;
      const duration = duractionMatrix[currentIndex]![poiIndex];

      if (
        distance != 0 && // distance is not equal to itself
        distances[currentIndex] != Infinity && // distance is unvisited
        distance < distances[poiIndex]
      ) {
        distances[poiIndex] = distance;
        durations[poiIndex] = duration;
        visitedPois[poiIndex] = pois[poiIndex];
      }
    }
  }

  const poisWithDurationsDistances = pois
    .map((poi, index) => ({
      poi,
      duration: durations[index],
      distance: distances[index],
    }))
    .filter((item) => item.poi.id !== 'start');

  // Sort the array based on the distance
  poisWithDurationsDistances.sort((a, b) => a.distance - b.distance);

  // Extract the sorted POIs and their corresponding distances and durations
  const orderedPOIs = poisWithDurationsDistances.map(({ poi }) => poi);
  const orderedDistances = poisWithDurationsDistances.map(
    ({ distance }) => distance,
  );
  const orderedDurations = poisWithDurationsDistances.map(
    ({ duration }) => duration,
  );

  return {
    distances: orderedDistances,
    durations: orderedDurations,
    orderedPOIs,
  };
}
