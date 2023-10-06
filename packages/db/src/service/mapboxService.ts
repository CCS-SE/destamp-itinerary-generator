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
    throw new Error(`Error fetching Mapbox Matrix data: ${error}`);
  }
};
