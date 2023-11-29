import { calculateSimilarityScore, contentBasedFiltering } from '../index';
import { expectedPlaces, places, userPreference } from './mock';

describe('content-based filtering', () => {
  it('should return the correct places', () => {
    expect(contentBasedFiltering(places, userPreference)).toEqual(
      expectedPlaces,
    );
  });
});

describe('similarity score', () => {
  it('should return the correct similarity score', () => {
    expect(
      calculateSimilarityScore(
        [
          'Hotel',
          'Swimming Pool',
          'Free parking',
          'Fast Food',
          'Filipino restaurant',
          'Art museum',
          'Art gallery',
          'Art studio',
        ],
        ['Hotel', 'Free WiFi', 'Swimming Pool'],
      ),
    ).toEqual(0.40824829046386296);
  });
  it('should return 0 similarity score for places with no similar feature to user preference', () => {
    expect(
      calculateSimilarityScore(
        [
          'Hotel',
          'Swimming Pool',
          'Free parking',
          'Fast Food',
          'Filipino restaurant',
          'Art museum',
          'Art gallery',
          'Art studio',
        ],
        ['Inn', 'Free Wifi', 'Air Conditioning'],
      ),
    ).toEqual(0);
  });
});
