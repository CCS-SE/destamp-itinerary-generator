import { clustersKmeans, featureCollection, point } from '@turf/turf';

import { PointOfInterest } from '.';

export const clusterPois = (
  numberOfClusters: number,
  genes: PointOfInterest[],
) => {
  const points = genes.map((gene) =>
    point([gene.latitude, gene.longitude], { gene: gene }),
  ); // array of [latitude, longitude]

  const pointCollection = featureCollection(points);

  // cluster points
  const clusters = clustersKmeans(pointCollection, {
    numberOfClusters: numberOfClusters,
  });

  const clusteredGenes: { cluster: number; genes: PointOfInterest[] }[] = [];

  clusters.features.forEach((cluster) => {
    const clusterIndex = cluster.properties.cluster as number;
    const gene = cluster.properties.gene as PointOfInterest;

    const existingCluster = clusteredGenes.find(
      (c) => c.cluster === clusterIndex,
    );

    if (existingCluster) {
      existingCluster.genes.push(gene);
    } else {
      clusteredGenes.push({ cluster: clusterIndex, genes: [gene] });
    }
  });

  return clusteredGenes;
};
