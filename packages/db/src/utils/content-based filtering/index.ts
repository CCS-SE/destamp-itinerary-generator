import { NexusGenFieldTypes } from '../../graphql/generated/nexus';

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

type Place = NexusGenFieldTypes['Place'];

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
  places: Place[],
  preference: Preference,
): Place[] {
  const nonZeroActivities: string[] = Object.entries(preference.activities)
    .filter(([_, value]) => value !== undefined && value !== 0)
    .map(([key]) => key);

  const userPreferences = preference.amenities.concat(
    preference.cuisines,
    preference.diningStyles,
    [preference.accommodationType],
    nonZeroActivities,
  );

  const similarityScores = places.map((place: Place) => {
    const placeFeatures: string[] = place.amenities
      .map((amenity) => amenity.name)
      .concat(
        place.diningCuisines.map((cuisine) => cuisine.name),
        place.diningAtmospheres.map((atmosphere) => atmosphere.name),
        place.categories.map((category) => category.name),
      );

    return {
      name: place.name,
      score: calculateSimilarityScore(userPreferences, placeFeatures),
    };
  });

  const sortedScores = similarityScores.sort((a, b) => b.score - a.score);
  const filteredScores = sortedScores.filter((score) => score.score > 0);

  const sortedPlaces: Place[] = filteredScores.map((score) => {
    return places.find((place) => place.name === score.name)!;
  });

  return sortedPlaces;
}
