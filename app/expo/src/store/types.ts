import { Moment } from 'moment';

import { ExpenseCategory, TravelSize } from '~/graphql/generated';

export type Activities = {
  Sightseeing?: number;
  Museum?: number;
  Outdoor?: number;
  Arts?: number;
  Shopping?: number;
  Landmarks?: number;
};

export interface CreateTripData {
  destination: string;
  startingLocation: {
    place_name: string;
    name: string;
    center: [number, number];
  };
  travelSize: TravelSize;
  startDate: Moment | null;
  endDate: Moment | null;
  timeslots: [number, number][];
  budgetInclusions: [ExpenseCategory];
  travelerCount: number;
  budget: string;
}

export interface TripPreferenceData {
  accommodationType: string;
  amenities: string[];
  activities: Activities;
  diningStyles: string[];
  cuisines: string[];
}

export interface ReviewTripData {
  title: string;
}
