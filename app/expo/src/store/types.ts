import { Moment } from 'moment';

import { DayValue } from '~/constant/constant';
import { ExpenseCategory, TravelSize } from '~/graphql/generated';

export type Activities = {
  Sightseeing?: number;
  Museum?: number;
  Outdoor?: number;
  Arts?: number;
  Shopping?: number;
  Landmarks?: number;
};

interface OpeningHour {
  day: DayValue;
  isClosed: boolean;
  is24Hours: boolean;
  openingTime: Date;
  closingTime: Date;
}

type EstablishmentType = 'Attraction' | 'Accommodation' | 'Restaurant';

export interface CreateTripData {
  destination: { id: string; title: string };
  startingLocation: {
    place_name: string;
    name: string;
    center: [number, number];
  } | null;
  travelSize: TravelSize;
  startDate: Moment | null;
  endDate: Moment | null;
  timeslots: [number, number][];
  budgetInclusions: [ExpenseCategory];
  groupCount: number;
  adultCount: number;
  childCount: number;
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

export interface BasicInfoData {
  name: string;
  description?: string;
  contactNumber: string;
  address: string;
  latitude?: number;
  longitude?: number;
}

export interface OpeningHoursData {
  openingHours: OpeningHour[];
  hour: string;
  minute: string;
}

export interface EstablishmentTypeData {
  type: EstablishmentType;
}

export interface AccommodationFacilitesData {
  category: string;
  amenities: string[];
  price: string;
}

export interface RestaurantFacilitesData {
  categories: string[];
  atmpospheres: string[];
  minPrice: string;
  maxPrice: string;
}

export interface AttractionFacilitesData {
  categories: string[];
  price: string;
}

export interface BusinessImagesData {
  urls: string[];
  permitUrl: string;
}
