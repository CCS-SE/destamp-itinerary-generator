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
      const distance = distanceMatrix[currentIndex]![poiIndex];
      const duration = duractionMatrix[currentIndex]![poiIndex];

      const newDistance = (distances[currentIndex] + distance) as number;
      const newDuration = (durations[currentIndex] + duration) as number;

      if (
        distance != 0 && // distance is not equal to itself
        distances[currentIndex] != Infinity && // distance is unvisited
        newDistance < distances[poiIndex]
      ) {
        distances[poiIndex] = newDistance;
        durations[poiIndex] = newDuration;
        visitedPois[poiIndex] = pois[poiIndex];
      }
    }
  }

  const orderedPOIs: PointOfInterest[] = visitedPois.sort(
    (a, b) =>
      distances[visitedPois.indexOf(a)] - distances[visitedPois.indexOf(b)],
  );

  return {
    distances,
    durations,
    orderedPOIs,
  };
}
