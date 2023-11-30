import { clusterPois } from '../cluster';
import { pointOfInterests } from './mock/mock';

describe('clusterPois', () => {
  it('should cluster pois', () => {
    const clusteredPois = clusterPois(2, pointOfInterests);

    expect(clusteredPois.length).toBe(2);
  });
});

describe('clusterPois', () => {
  it('should cluster pois without similar genes in the same cluster', () => {
    const clusteredPois = clusterPois(2, pointOfInterests);

    // check that no cluster has the same gene more than once
    const noDuplicateGenes = clusteredPois.every((cluster) => {
      const geneSet = new Set(cluster.genes.map((gene) => gene.id));
      return geneSet.size === cluster.genes.length;
    });

    expect(noDuplicateGenes).toBe(true);
  });
});
