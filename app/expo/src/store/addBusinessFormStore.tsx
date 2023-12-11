import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import {
  AccommodationFacilitesData,
  AttractionFacilitesData,
  BasicInfoData,
  BusinessImagesData,
  EstablishmentTypeData,
  OpeningHoursData,
  RestaurantFacilitesData,
} from './types';

const stepVariant = {
  1: 'basicInfo',
  2: 'openingHours',
  3: 'establishment',
  4: 'accommodationFacilities',
  5: 'attractionFacilities',
  6: 'restaurantFacilities',
  7: 'businessImages',
};

type setDataType =
  | { step: 1; data: BasicInfoData }
  | { step: 2; data: OpeningHoursData }
  | { step: 3; data: EstablishmentTypeData }
  | {
      step: 4;
      data: AccommodationFacilitesData;
    }
  | {
      step: 5;
      data: AttractionFacilitesData;
    }
  | {
      step: 6;
      data: RestaurantFacilitesData;
    }
  | { step: 7; data: BusinessImagesData };

interface FormState {
  basicInfo: BasicInfoData;
  openingHours: OpeningHoursData;
  establishment: EstablishmentTypeData;
  accommodationFacilities: AccommodationFacilitesData;
  attractionFacilities: AttractionFacilitesData;
  restaurantFacilities: RestaurantFacilitesData;
  businessImages: BusinessImagesData;
  setData: ({ step, data }: setDataType) => void;
  reset: () => void;
}

export const initialFormState = {
  basicInfo: {
    name: '',
    description: '',
    contactNumber: '',
    address: 'Iloilo City',
    latitude: 10.720321,
    longitude: 122.562019,
  } as BasicInfoData,
  openingHours: {
    openingHours: [
      {
        day: 1,
        isClosed: false,
        is24Hours: false,
        closingTime: new Date(new Date().setHours(17, 0)),
        openingTime: new Date(new Date().setHours(10, 0)),
      },
      {
        day: 2,
        isClosed: false,
        is24Hours: false,
        closingTime: new Date(new Date().setHours(17, 0)),
        openingTime: new Date(new Date().setHours(10, 0)),
      },
      {
        day: 3,
        isClosed: false,
        is24Hours: false,
        closingTime: new Date(new Date().setHours(17, 0)),
        openingTime: new Date(new Date().setHours(10, 0)),
      },
      {
        day: 4,
        isClosed: false,
        is24Hours: false,
        closingTime: new Date(new Date().setHours(17, 0)),
        openingTime: new Date(new Date().setHours(10, 0)),
      },
      {
        day: 5,
        isClosed: false,
        is24Hours: false,
        closingTime: new Date(new Date().setHours(17, 0)),
        openingTime: new Date(new Date().setHours(10, 0)),
      },
      {
        day: 6,
        isClosed: false,
        is24Hours: false,
        closingTime: new Date(new Date().setHours(17, 0)),
        openingTime: new Date(new Date().setHours(10, 0)),
      },
      {
        day: 0,
        isClosed: false,
        is24Hours: false,
        closingTime: new Date(new Date().setHours(17, 0)),
        openingTime: new Date(new Date().setHours(10, 0)),
      },
    ],
    hour: 1,
    minute: 0,
  } as OpeningHoursData,
  establishment: {
    type: 'Accommodation',
  } as EstablishmentTypeData,
  accommodationFacilities: {
    amenities: [],
    category: 'Hotel',
    price: '1000',
  } as AccommodationFacilitesData,
  attractionFacilities: {
    categories: [],
    price: '0',
  } as AttractionFacilitesData,
  restaurantFacilities: {
    atmpospheres: ['Upscaled'],
    categories: [],
    minPrice: '200',
    maxPrice: '400',
  } as RestaurantFacilitesData,
  businessImages: {
    businessImages: [],
    permit: null,
    permitUrl: null,
    urls: [],
  } as BusinessImagesData,
};

const addBusinessFormStore = create<FormState>()(
  devtools((set) => ({
    ...initialFormState,
    setData: ({ step, data }) =>
      set((state) => ({
        ...state,
        [stepVariant[step]]: data,
      })),
    reset: () => set(() => initialFormState),
  })),
);

export default addBusinessFormStore;
