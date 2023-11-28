import { NexusGenFieldTypes } from '../../graphql/generated/nexus';
import { PointOfInterest } from '../ga-operations';

interface Activities {
  Sightseeing?: number;
  Museum?: number;
  Outdoor?: number;
  Arts?: number;
  Shopping?: number;
  Landmarks?: number;
}

interface Preference {
  accommodationType: string;
  amenities: string[];
  activities: Activities;
  diningStyles: string[];
  cuisines: string[];
}

function calculateSimilarityScore(
  userFeatures: string[],
  placeFeatures: string[],
): number {
  const dotProduct = userFeatures.reduce(
    (acc, val) => acc + (placeFeatures.includes(val) ? 1 : 0),
    0,
  );
  const magnitude1 = Math.sqrt(userFeatures.length);
  const magnitude2 = Math.sqrt(placeFeatures.length);
  return dotProduct / (magnitude1 * magnitude2);
}

export function contentBasedFiltering(
  places: PointOfInterest[],
  preference: Preference,
): PointOfInterest[] {
  const nonZeroActivities: string[] = Object.entries(preference.activities)
    .filter(([_, value]) => value !== undefined && value !== 0)
    .map(([key]) => key);

  const userPreferences = preference.amenities.concat(
    preference.cuisines,
    preference.diningStyles,
    [preference.accommodationType],
    nonZeroActivities,
  );

  const similarityScores = places.map((place: PointOfInterest) => {
    const placeFeatures: string[] = place.categories
      .map((category) => category.name)
      .concat(
        place.restaurant?.atmospheres || [],
        place.accommodation?.amenities.map((amenity) => amenity.name) || [],
      );

    return {
      name: place.name as string,
      score: calculateSimilarityScore(userPreferences, placeFeatures),
    };
  });

  const sortedScores = similarityScores.sort((a, b) => b.score - a.score);
  const filteredScores = sortedScores.filter((score) => score.score > 0);

  const sortedPlaces: PointOfInterest[] = filteredScores.map((score) => {
    return places.find((place) => place.name === score.name)!;
  });

  return sortedPlaces;
}
