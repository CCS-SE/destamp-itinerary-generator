import axios from 'axios';

export interface Location {
  name: string;
  location: [number, number];
  distance: number;
}

export interface MapboxMatrixResponse {
  code: string;
  durations: number[][];
  distances: number[][];
  destinations: Location[];
  sources: Location[];
}

export const fetchMapboxMatrix = async (
  profile: string,
  coordinates: string,
): Promise<MapboxMatrixResponse> => {
  try {
    const MAPBOX_API_KEY = process.env.MAPBOX_API_KEY;

    const response = await axios.get(
      `https://api.mapbox.com/directions-matrix/v1/${profile}/${coordinates}?annotations=distance,duration&access_token=${MAPBOX_API_KEY}`,
    );

    const data = (await response.data) as MapboxMatrixResponse;
    return data;
  } catch (error) {
    // console.log(error.response.data.message)

    if (error.response.data.message === 'Too Many Requests') {
      throw new Error('Too many requests. Please try again later.');
    } else if (
      error.response.data.message ===
      'Too many coordinates; maximum number of coordinates is 25.'
    ) {
      throw new Error('Invalid input length. Too many coordinates');
    } else if (
      error.response.data.message ===
      'Not enough input coordinates given; minimum number of coordinates is 2.'
    ) {
      throw new Error(
        'Invalid input length. Not enough input coordinates given.',
      );
    }

    throw new Error(
      `Error fetching Mapbox Matrix data: ${error.response.data.message}`,
    );
  }
};
