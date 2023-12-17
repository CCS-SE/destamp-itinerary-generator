import shortestPath from '../shortestPath';
import { pointOfInterests } from './mock/mock';

test('shortestPath function', () => {
  const distanceMatrix = [
    [0, 4, 2, 3],
    [4, 0, 3, 2],
    [2, 3, 0, 4],
    [3, 2, 4, 0],
  ];

  const durationMatrix = [
    [0, 10, 20, 30],
    [10, 0, 10, 20],
    [20, 10, 0, 10],
    [30, 20, 10, 0],
  ];

  const src = pointOfInterests[0]!;

  const result = shortestPath(
    pointOfInterests.slice(0, 4),
    distanceMatrix,
    durationMatrix,
    src,
  );

  expect(result.distances).toEqual([0, 2, 3, 4]);
  expect(result.durations).toEqual([0, 20, 30, 10]);
});
