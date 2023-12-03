import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

import { ExpenseCategory, TravelSize } from '~/graphql/generated';
import { CreateTripData, ReviewTripData, TripPreferenceData } from './types';

const stepVariant = {
  1: 'tripData',
  2: 'preferenceData',
  3: 'reviewData',
};

const destinations = [
  {
    id: '1',
    title: 'Iloilo City',
  },
];

type setDataType =
  | { step: 1; data: CreateTripData }
  | { step: 2; data: TripPreferenceData }
  | { step: 3; data: ReviewTripData };

interface FormState {
  activeSection: number;
  activeSections: number[];
  completedSteps: number[];
  visitedSteps: number[];
  tripData: CreateTripData;
  preferenceData: TripPreferenceData;
  reviewData: ReviewTripData;
  setData: ({ step, data }: setDataType) => void;
  setActiveSection: (section: number) => void;
  setActiveSections: (sections: number[]) => void;
  setCompletedSteps: (steps: number[]) => void;
  setVisitedSteps: (steps: number[]) => void;
  reset: () => void;
}

export const initialFormState = {
  activeSection: 0,
  activeSections: [0],
  completedSteps: [],
  visitedSteps: [0],
  tripData: {
    budget: '',
    budgetInclusions: [ExpenseCategory.Accommodation] as [ExpenseCategory],
    destination: destinations[0]!,
    endDate: null,
    startDate: null,
    startingLocation: {
      center: [0, 0] as [number, number],
      name: '',
      place_name: '',
    },
    timeslots: [[10, 18]] as [number, number][],
    groupCount: 3,
    adultCount: 1,
    childCount: 1,
    travelSize: TravelSize.Solo,
  },
  preferenceData: {
    accommodationType: 'Hotel',
    amenities: [],
    activities: {
      Sightseeing: 0,
      Museum: 0,
      Outdoor: 0,
      Arts: 0,
      Shopping: 0,
      Landmarks: 0,
    },
    diningStyles: ['Fine'],
    cuisines: ['American'],
  },
  reviewData: {
    title: 'Iloilo City Trip',
  },
};

const useFormstore = create<FormState>()(
  devtools((set) => ({
    ...initialFormState,
    setData: ({ step, data }) =>
      set((state) => ({
        ...state,
        [stepVariant[step]]: data,
      })),
    setActiveSection: (section: number) => set({ activeSection: section }),
    setActiveSections: (sections: number[]) =>
      set({ activeSections: sections }),
    setCompletedSteps: (steps: number[]) => set({ completedSteps: steps }),
    setVisitedSteps: (steps: number[]) => set({ visitedSteps: steps }),
    reset: () => set(() => initialFormState),
  })),
);

export default useFormstore;
