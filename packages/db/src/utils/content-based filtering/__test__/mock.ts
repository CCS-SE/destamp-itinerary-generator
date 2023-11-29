// import { PointOfInterest } from '../../ga-operations';

// import { NexusGenFieldTypes } from '../../../graphql/generated/nexus';

type Restaurant = {
  atmospheres: string[];
  id: number;
  poiId: string;
};

type Accommodation = {
  amenities: {
    id: number;
    name: string;
  }[];
  id: number;
  poiId: string;
};

type Category = {
  id: number;
  name: string;
};

type PointOfInterest = {
  id: string;
  name: string;
  price: string;
  isAttraction: boolean;
  visitDuration: number;
  latitude: number;
  longitude: number;
  restaurant: Restaurant | null;
  accommodation: Accommodation | null;
  categories: Category[];
};

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

export const userPreference: Preference = {
  accommodationType: 'Hotel',
  amenities: ['Free WiFi', 'Swimming Pool', 'Free parking'],
  activities: {
    Sightseeing: 33,
    Museum: 0,
    Outdoor: 0,
    Arts: 0,
    Shopping: 66,
    Landmarks: 0,
  },
  diningStyles: ['Fast Food'],
  cuisines: ['Filipino restaurant', 'Western restaurant', 'Korean restaurant'],
};

export const places: PointOfInterest[] = [
  {
    isAttraction: true,
    accommodation: null,
    restaurant: null,
    categories: [
      {
        id: 1,
        name: 'Shopping mall',
      },
    ],
    id: '1',
    latitude: 10.711599,
    longitude: 122.5706695,
    name: 'SM City Iloilo',
    price: '0',
    visitDuration: 45,
  },
  {
    isAttraction: true,
    accommodation: null,
    restaurant: null,
    categories: [
      {
        id: 4,
        name: 'Museum',
      },
      {
        id: 5,
        name: 'History museum',
      },
    ],
    id: '2',
    latitude: 10.7026051,
    longitude: 122.5538653,
    name: 'Iloilo Museum of Contemporary Art',
    price: '0',
    visitDuration: 45,
  },
  {
    isAttraction: true,
    accommodation: null,
    restaurant: null,
    categories: [
      {
        id: 4,
        name: 'Park',
      },
      {
        id: 5,
        name: 'Tourist attraction',
      },
      {
        id: 6,
        name: 'City park',
      },
    ],
    id: '3',
    latitude: 10.7026051,
    longitude: 122.5538653,
    name: 'Iloilo Esplanade 1 Extension & Skateboard Park',
    price: '0',
    visitDuration: 45,
  },
  {
    isAttraction: false,
    accommodation: {
      amenities: [
        {
          id: 1,
          name: 'Free WiFi',
        },
        {
          id: 2,
          name: 'Swimming Pool',
        },
        {
          id: 3,
          name: 'Free parking',
        },
      ],
      id: 1,
      poiId: '1',
    },
    restaurant: null,
    categories: [
      {
        id: 7,
        name: 'Hotel',
      },
    ],
    id: '4',
    latitude: 10.7026051,
    longitude: 122.5538653,
    name: 'Hotel Del Rio',
    price: '0',
    visitDuration: 45,
  },
  {
    isAttraction: false,
    accommodation: {
      amenities: [
        {
          id: 1,
          name: 'Free WiFi',
        },
        {
          id: 2,
          name: 'Swimming Pool',
        },
      ],
      id: 1,
      poiId: '1',
    },
    restaurant: null,
    categories: [
      {
        id: 7,
        name: 'Inn',
      },
    ],
    id: '5',
    latitude: 10.7026051,
    longitude: 122.5538653,
    name: 'Inn',
    price: '0',
    visitDuration: 45,
  },
  {
    isAttraction: false,
    accommodation: null,
    restaurant: {
      atmospheres: ['Fast Food'],
      id: 1,
      poiId: '1',
    },
    categories: [
      {
        id: 8,
        name: 'Filipino restaurant',
      },
    ],
    id: '6',
    latitude: 10.7026051,
    longitude: 122.5538653,
    name: 'Jollibee',
    price: '0',
    visitDuration: 45,
  },
  {
    isAttraction: false,
    accommodation: null,
    restaurant: {
      atmospheres: ['Fine Dining'],
      id: 1,
      poiId: '1',
    },
    categories: [
      {
        id: 8,
        name: 'Japanese restaurant',
      },
    ],
    id: '7',
    latitude: 10.7026051,
    longitude: 122.5538653,
    name: 'Japanese Restaurant',
    price: '0',
    visitDuration: 45,
  },
];

export const expectedPlaces: PointOfInterest[] = [
  {
    isAttraction: false,
    accommodation: {
      amenities: [
        {
          id: 1,
          name: 'Free WiFi',
        },
        {
          id: 2,
          name: 'Swimming Pool',
        },
        {
          id: 3,
          name: 'Free parking',
        },
      ],
      id: 1,
      poiId: '1',
    },
    restaurant: null,
    categories: [
      {
        id: 7,
        name: 'Hotel',
      },
    ],
    id: '4',
    latitude: 10.7026051,
    longitude: 122.5538653,
    name: 'Hotel Del Rio',
    price: '0',
    visitDuration: 45,
  },
  {
    isAttraction: true,
    accommodation: null,
    restaurant: null,
    categories: [
      {
        id: 4,
        name: 'Park',
      },
      {
        id: 5,
        name: 'Tourist attraction',
      },
      {
        id: 6,
        name: 'City park',
      },
    ],
    id: '3',
    latitude: 10.7026051,
    longitude: 122.5538653,
    name: 'Iloilo Esplanade 1 Extension & Skateboard Park',
    price: '0',
    visitDuration: 45,
  },
  {
    isAttraction: false,
    accommodation: null,
    restaurant: {
      atmospheres: ['Fast Food'],
      id: 1,
      poiId: '1',
    },
    categories: [
      {
        id: 8,
        name: 'Filipino restaurant',
      },
    ],
    id: '6',
    latitude: 10.7026051,
    longitude: 122.5538653,
    name: 'Jollibee',
    price: '0',
    visitDuration: 45,
  },

  {
    isAttraction: false,
    accommodation: {
      amenities: [
        {
          id: 1,
          name: 'Free WiFi',
        },
        {
          id: 2,
          name: 'Swimming Pool',
        },
      ],
      id: 1,
      poiId: '1',
    },
    restaurant: null,
    categories: [
      {
        id: 7,
        name: 'Inn',
      },
    ],
    id: '5',
    latitude: 10.7026051,
    longitude: 122.5538653,
    name: 'Inn',
    price: '0',
    visitDuration: 45,
  },
  {
    isAttraction: true,
    accommodation: null,
    restaurant: null,
    categories: [
      {
        id: 1,
        name: 'Shopping mall',
      },
    ],
    id: '1',
    latitude: 10.711599,
    longitude: 122.5706695,
    name: 'SM City Iloilo',
    price: '0',
    visitDuration: 45,
  },
];
