/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */

import type { core } from 'nexus';
import type { ValidateResolver } from 'nexus-validate';

import type { Context } from './../context';

declare global {
  interface NexusGenCustomInputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>,
    ): void; // "DateTime";
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     */
    bigInt<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>,
    ): void; // "BigInt";
    /**
     * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(
      fieldName: FieldName,
      opts?: core.CommonInputFieldConfig<TypeName, FieldName>,
    ): void; // "JSON";
  }
}
declare global {
  interface NexusGenCustomOutputMethods<TypeName extends string> {
    /**
     * A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the `date-time` format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
     */
    date<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "DateTime";
    /**
     * The `BigInt` scalar type represents non-fractional signed whole numeric values.
     */
    bigInt<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "BigInt";
    /**
     * The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf).
     */
    json<FieldName extends string>(
      fieldName: FieldName,
      ...opts: core.ScalarOutSpread<TypeName, FieldName>
    ): void; // "JSON";
  }
}

declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  CreateExpenseInput: {
    // input type
    amount: number; // Float!
    category: NexusGenEnums['ExpenseCategory']; // ExpenseCategory!
    dateSpent: NexusGenScalars['DateTime']; // DateTime!
    note?: string | null; // String
  };
  CreatePoiInput: {
    // input type
    address: string; // String!
    amenities?: string[] | null; // [String!]
    atmospheres?: string[] | null; // [String!]
    categories: string[]; // [String!]!
    contactNumber: string; // String!
    description?: string | null; // String
    imageUrls: string[]; // [String!]!
    isAttraction: boolean; // Boolean!
    latitude: number; // Float!
    longitude: number; // Float!
    name: string; // String!
    operatingHours: NexusGenInputs['OperatingHoursInput'][]; // [OperatingHoursInput!]!
    permitUrl: string; // String!
    price: string; // String!
    visitDuration: number; // Int!
  };
  CreateTripInput: {
    // input type
    budget: number; // Float!
    destination: string; // String!
    endDate?: NexusGenScalars['DateTime'] | null; // DateTime
    isAccommodationIncluded: boolean; // Boolean!
    isFoodIncluded: boolean; // Boolean!
    isTransportationIncluded: boolean; // Boolean!
    startDate: NexusGenScalars['DateTime']; // DateTime!
    startingLocation: NexusGenScalars['JSON']; // JSON!
    timeSlots: NexusGenScalars['JSON']; // JSON!
    title: string; // String!
    travelSize: NexusGenEnums['TravelSize']; // TravelSize!
    travelerCount: number; // Int!
  };
  CreateTripPreferenceInput: {
    // input type
    accommodationType: string; // String!
    activities: NexusGenScalars['JSON']; // JSON!
    amenities: string[]; // [String!]!
    cuisines: string[]; // [String!]!
    diningStyles: string[]; // [String!]!
  };
  CreateUserInput: {
    // input type
    email: string; // String!
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
    password: string; // String!
    type: NexusGenEnums['UserType']; // UserType!
  };
  EditUserInput: {
    // input type
    firstName: string; // String!
    lastName: string; // String!
  };
  OperatingHoursInput: {
    // input type
    closeTime?: NexusGenScalars['DateTime'] | null; // DateTime
    day: number; // Int!
    is24hours: boolean; // Boolean!
    isClosed: boolean; // Boolean!
    openTime?: NexusGenScalars['DateTime'] | null; // DateTime
  };
  UpdateExpenseInput: {
    // input type
    amount?: number | null; // Float
    category?: NexusGenEnums['ExpenseCategory'] | null; // ExpenseCategory
    dateSpent?: NexusGenScalars['DateTime'] | null; // DateTime
    note?: string | null; // String
  };
}

export interface NexusGenEnums {
  ExpenseCategory:
    | 'ACCOMMODATION'
    | 'ACTIVITY'
    | 'FOOD'
    | 'OTHER'
    | 'SHOPPING'
    | 'SIGHTSEEING'
    | 'TRANSPORTATION';
  SubscriptionStatus: 'ACTIVE' | 'CANCELLED' | 'EXPIRED';
  TravelSize: 'COUPLE' | 'FAMILY' | 'GROUP' | 'SOLO';
  UserType: 'BUSINESS_OPERATOR' | 'TRAVELER';
}

export interface NexusGenScalars {
  String: string;
  Int: number;
  Float: number;
  Boolean: boolean;
  ID: string;
  BigInt: any;
  DateTime: any;
  JSON: any;
}

export interface NexusGenObjects {
  Accommodation: {
    // root type
    id: number; // Int!
    poiId: string; // String!
  };
  Account: {
    // root type
    isPremium: boolean; // Boolean!
    user?: NexusGenRootTypes['User'] | null; // User
  };
  Amenity: {
    // root type
    id: number; // Int!
    name: string; // String!
  };
  BusinessPermit: {
    // root type
    id: string; // String!
    imageId: string; // String!
    isVerified: boolean; // Boolean!
    poiId: string; // String!
    userId: string; // String!
  };
  Category: {
    // root type
    id: number; // Int!
    name: string; // String!
  };
  DailyItinerary: {
    // root type
    accommodationCost: number; // Float!
    attractionCost: number; // Float!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    dayIndex: number; // Int!
    foodCost: string; // String!
    id: number; // Int!
    transportationCost: number; // Float!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  DailyItineraryPoi: {
    // root type
    dailyItineraryId: number; // Int!
    distance: number; // Float!
    duration: number; // Float!
    id: number; // Int!
    order: number; // Int!
  };
  Expense: {
    // root type
    amount: number; // Float!
    category: NexusGenEnums['ExpenseCategory']; // ExpenseCategory!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    dateSpent: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    note: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  Image: {
    // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    url: string; // String!
  };
  Mutation: {};
  OperatingHour: {
    // root type
    closeTime?: NexusGenScalars['DateTime'] | null; // DateTime
    day: number; // Int!
    id: number; // Int!
    is24Hours: boolean; // Boolean!
    isClosed: boolean; // Boolean!
    openTime?: NexusGenScalars['DateTime'] | null; // DateTime
  };
  Poi: {
    // root type
    address: string; // String!
    contactNumber: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description?: string | null; // String
    id: string; // String!
    isAttraction: boolean; // Boolean!
    latitude: number; // Float!
    longitude: number; // Float!
    name: string; // String!
    price: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId?: string | null; // String
    visitDuration: number; // Float!
  };
  PoiImage: {
    // root type
    id: number; // Int!
    imageId: string; // String!
    poiId: string; // String!
  };
  Query: {};
  Restaurant: {
    // root type
    atmospheres: string[]; // [String!]!
    id: number; // Int!
    poiId: string; // String!
  };
  Stamp: {
    // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  Subscription: {
    // root type
    amount: number; // Float!
    endDate: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    startDate: NexusGenScalars['DateTime']; // DateTime!
    status: NexusGenEnums['SubscriptionStatus']; // SubscriptionStatus!
    userId: string; // String!
  };
  Trip: {
    // root type
    budget: number; // Float!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    destination: string; // String!
    endDate: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    isAccommodationIncluded: boolean; // Boolean!
    isFoodIncluded: boolean; // Boolean!
    isTransportationIncluded: boolean; // Boolean!
    startDate: NexusGenScalars['DateTime']; // DateTime!
    startingLocation: NexusGenScalars['JSON']; // JSON!
    timeSlots: NexusGenScalars['JSON']; // JSON!
    title: string; // String!
    travelSize: NexusGenEnums['TravelSize']; // TravelSize!
    travelerCount: number; // Int!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  TripPreference: {
    // root type
    accommodationType: string; // String!
    activities: NexusGenScalars['JSON']; // JSON!
    amenities: string[]; // [String!]!
    cuisines: string[]; // [String!]!
    diningStyles: string[]; // [String!]!
    id: number; // Int!
    tripId: number; // Int!
  };
  User: {
    // root type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
    password: string; // String!
    tripCount: number; // Int!
    type: NexusGenEnums['UserType']; // UserType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
}

export interface NexusGenInterfaces {}

export interface NexusGenUnions {}

export type NexusGenRootTypes = NexusGenObjects;

export type NexusGenAllTypes = NexusGenRootTypes &
  NexusGenScalars &
  NexusGenEnums;

export interface NexusGenFieldTypes {
  Accommodation: {
    // field return type
    amenities: NexusGenRootTypes['Amenity'][]; // [Amenity!]!
    id: number; // Int!
    poiId: string; // String!
  };
  Account: {
    // field return type
    isPremium: boolean; // Boolean!
    user: NexusGenRootTypes['User'] | null; // User
  };
  Amenity: {
    // field return type
    id: number; // Int!
    name: string; // String!
  };
  BusinessPermit: {
    // field return type
    id: string; // String!
    image: NexusGenRootTypes['Image']; // Image!
    imageId: string; // String!
    isVerified: boolean; // Boolean!
    poiId: string; // String!
    userId: string; // String!
  };
  Category: {
    // field return type
    id: number; // Int!
    name: string; // String!
  };
  DailyItinerary: {
    // field return type
    accommodationCost: number; // Float!
    attractionCost: number; // Float!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    dailyItineraryPois: NexusGenRootTypes['DailyItineraryPoi'][]; // [DailyItineraryPoi!]!
    dayIndex: number; // Int!
    foodCost: string; // String!
    id: number; // Int!
    transportationCost: number; // Float!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  DailyItineraryPoi: {
    // field return type
    dailyItineraryId: number; // Int!
    distance: number; // Float!
    duration: number; // Float!
    id: number; // Int!
    order: number; // Int!
    poi: NexusGenRootTypes['Poi']; // Poi!
  };
  Expense: {
    // field return type
    amount: number; // Float!
    category: NexusGenEnums['ExpenseCategory']; // ExpenseCategory!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    dateSpent: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    note: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  Image: {
    // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    url: string; // String!
  };
  Mutation: {
    // field return type
    claimStamp: NexusGenRootTypes['User']; // User!
    createExpense: NexusGenRootTypes['Expense']; // Expense!
    createPoi: NexusGenRootTypes['Poi']; // Poi!
    createTrip: NexusGenRootTypes['Trip']; // Trip!
    createUser: NexusGenRootTypes['User']; // User!
    deleteExpense: NexusGenRootTypes['Expense']; // Expense!
    deletePoi: NexusGenRootTypes['Poi']; // Poi!
    deleteTrip: NexusGenRootTypes['Trip']; // Trip!
    editUser: NexusGenRootTypes['User']; // User!
    regenerateTrip: NexusGenRootTypes['Trip']; // Trip!
    updateExpense: NexusGenRootTypes['Expense']; // Expense!
  };
  OperatingHour: {
    // field return type
    closeTime: NexusGenScalars['DateTime'] | null; // DateTime
    day: number; // Int!
    id: number; // Int!
    is24Hours: boolean; // Boolean!
    isClosed: boolean; // Boolean!
    openTime: NexusGenScalars['DateTime'] | null; // DateTime
  };
  Poi: {
    // field return type
    accommodation: NexusGenRootTypes['Accommodation'] | null; // Accommodation
    address: string; // String!
    businessPermit: NexusGenRootTypes['BusinessPermit'] | null; // BusinessPermit
    categories: NexusGenRootTypes['Category'][]; // [Category!]!
    contactNumber: string; // String!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    description: string | null; // String
    id: string; // String!
    images: NexusGenRootTypes['PoiImage'][]; // [PoiImage!]!
    isAttraction: boolean; // Boolean!
    latitude: number; // Float!
    longitude: number; // Float!
    name: string; // String!
    operatingHours: NexusGenRootTypes['OperatingHour'][]; // [OperatingHour!]!
    price: string; // String!
    restaurant: NexusGenRootTypes['Restaurant'] | null; // Restaurant
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
    userId: string | null; // String
    visitDuration: number; // Float!
  };
  PoiImage: {
    // field return type
    id: number; // Int!
    image: NexusGenRootTypes['Image']; // Image!
    imageId: string; // String!
    poiId: string; // String!
  };
  Query: {
    // field return type
    accommodationCategoires: NexusGenRootTypes['Category'][]; // [Category!]!
    amenities: NexusGenRootTypes['Amenity'][]; // [Amenity!]!
    attractionCategoires: NexusGenRootTypes['Category'][]; // [Category!]!
    categories: NexusGenRootTypes['Category'][]; // [Category!]!
    poi: NexusGenRootTypes['Poi']; // Poi!
    pois: NexusGenRootTypes['Poi'][]; // [Poi!]!
    restaurantCategoires: NexusGenRootTypes['Category'][]; // [Category!]!
    restaurantCategoriesMoreThanFive: NexusGenRootTypes['Category'][]; // [Category!]!
    travelerAccount: NexusGenRootTypes['Account']; // Account!
    trip: NexusGenRootTypes['Trip']; // Trip!
    trips: NexusGenRootTypes['Trip'][]; // [Trip!]!
    unclaimedStamps: NexusGenRootTypes['Stamp'][]; // [Stamp!]!
    user: NexusGenRootTypes['User']; // User!
  };
  Restaurant: {
    // field return type
    atmospheres: string[]; // [String!]!
    id: number; // Int!
    poiId: string; // String!
  };
  Stamp: {
    // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    id: number; // Int!
    image: NexusGenRootTypes['Image']; // Image!
    title: string; // String!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  Subscription: {
    // field return type
    amount: number; // Float!
    endDate: NexusGenScalars['DateTime']; // DateTime!
    id: string; // String!
    startDate: NexusGenScalars['DateTime']; // DateTime!
    status: NexusGenEnums['SubscriptionStatus']; // SubscriptionStatus!
    userId: string; // String!
  };
  Trip: {
    // field return type
    budget: number; // Float!
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    dailyItineraries: NexusGenRootTypes['DailyItinerary'][]; // [DailyItinerary!]!
    destination: string; // String!
    endDate: NexusGenScalars['DateTime']; // DateTime!
    expenses: NexusGenRootTypes['Expense'][]; // [Expense!]!
    id: number; // Int!
    isAccommodationIncluded: boolean; // Boolean!
    isFoodIncluded: boolean; // Boolean!
    isTransportationIncluded: boolean; // Boolean!
    startDate: NexusGenScalars['DateTime']; // DateTime!
    startingLocation: NexusGenScalars['JSON']; // JSON!
    timeSlots: NexusGenScalars['JSON']; // JSON!
    title: string; // String!
    travelSize: NexusGenEnums['TravelSize']; // TravelSize!
    travelerCount: number; // Int!
    tripPreference: NexusGenRootTypes['TripPreference'] | null; // TripPreference
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
  TripPreference: {
    // field return type
    accommodationType: string; // String!
    activities: NexusGenScalars['JSON']; // JSON!
    amenities: string[]; // [String!]!
    cuisines: string[]; // [String!]!
    diningStyles: string[]; // [String!]!
    id: number; // Int!
    tripId: number; // Int!
  };
  User: {
    // field return type
    createdAt: NexusGenScalars['DateTime']; // DateTime!
    email: string; // String!
    firstName: string; // String!
    id: string; // String!
    lastName: string; // String!
    password: string; // String!
    pois: NexusGenRootTypes['Poi'][]; // [Poi!]!
    stamps: NexusGenRootTypes['Stamp'][]; // [Stamp!]!
    subscription: NexusGenRootTypes['Subscription'] | null; // Subscription
    tripCount: number; // Int!
    trips: NexusGenRootTypes['Trip'][]; // [Trip!]!
    type: NexusGenEnums['UserType']; // UserType!
    updatedAt: NexusGenScalars['DateTime']; // DateTime!
  };
}

export interface NexusGenFieldTypeNames {
  Accommodation: {
    // field return type name
    amenities: 'Amenity';
    id: 'Int';
    poiId: 'String';
  };
  Account: {
    // field return type name
    isPremium: 'Boolean';
    user: 'User';
  };
  Amenity: {
    // field return type name
    id: 'Int';
    name: 'String';
  };
  BusinessPermit: {
    // field return type name
    id: 'String';
    image: 'Image';
    imageId: 'String';
    isVerified: 'Boolean';
    poiId: 'String';
    userId: 'String';
  };
  Category: {
    // field return type name
    id: 'Int';
    name: 'String';
  };
  DailyItinerary: {
    // field return type name
    accommodationCost: 'Float';
    attractionCost: 'Float';
    createdAt: 'DateTime';
    dailyItineraryPois: 'DailyItineraryPoi';
    dayIndex: 'Int';
    foodCost: 'String';
    id: 'Int';
    transportationCost: 'Float';
    updatedAt: 'DateTime';
  };
  DailyItineraryPoi: {
    // field return type name
    dailyItineraryId: 'Int';
    distance: 'Float';
    duration: 'Float';
    id: 'Int';
    order: 'Int';
    poi: 'Poi';
  };
  Expense: {
    // field return type name
    amount: 'Float';
    category: 'ExpenseCategory';
    createdAt: 'DateTime';
    dateSpent: 'DateTime';
    id: 'Int';
    note: 'String';
    updatedAt: 'DateTime';
  };
  Image: {
    // field return type name
    createdAt: 'DateTime';
    id: 'String';
    updatedAt: 'DateTime';
    url: 'String';
  };
  Mutation: {
    // field return type name
    claimStamp: 'User';
    createExpense: 'Expense';
    createPoi: 'Poi';
    createTrip: 'Trip';
    createUser: 'User';
    deleteExpense: 'Expense';
    deletePoi: 'Poi';
    deleteTrip: 'Trip';
    editUser: 'User';
    regenerateTrip: 'Trip';
    updateExpense: 'Expense';
  };
  OperatingHour: {
    // field return type name
    closeTime: 'DateTime';
    day: 'Int';
    id: 'Int';
    is24Hours: 'Boolean';
    isClosed: 'Boolean';
    openTime: 'DateTime';
  };
  Poi: {
    // field return type name
    accommodation: 'Accommodation';
    address: 'String';
    businessPermit: 'BusinessPermit';
    categories: 'Category';
    contactNumber: 'String';
    createdAt: 'DateTime';
    description: 'String';
    id: 'String';
    images: 'PoiImage';
    isAttraction: 'Boolean';
    latitude: 'Float';
    longitude: 'Float';
    name: 'String';
    operatingHours: 'OperatingHour';
    price: 'String';
    restaurant: 'Restaurant';
    updatedAt: 'DateTime';
    userId: 'String';
    visitDuration: 'Float';
  };
  PoiImage: {
    // field return type name
    id: 'Int';
    image: 'Image';
    imageId: 'String';
    poiId: 'String';
  };
  Query: {
    // field return type name
    accommodationCategoires: 'Category';
    amenities: 'Amenity';
    attractionCategoires: 'Category';
    categories: 'Category';
    poi: 'Poi';
    pois: 'Poi';
    restaurantCategoires: 'Category';
    restaurantCategoriesMoreThanFive: 'Category';
    travelerAccount: 'Account';
    trip: 'Trip';
    trips: 'Trip';
    unclaimedStamps: 'Stamp';
    user: 'User';
  };
  Restaurant: {
    // field return type name
    atmospheres: 'String';
    id: 'Int';
    poiId: 'String';
  };
  Stamp: {
    // field return type name
    createdAt: 'DateTime';
    id: 'Int';
    image: 'Image';
    title: 'String';
    updatedAt: 'DateTime';
  };
  Subscription: {
    // field return type name
    amount: 'Float';
    endDate: 'DateTime';
    id: 'String';
    startDate: 'DateTime';
    status: 'SubscriptionStatus';
    userId: 'String';
  };
  Trip: {
    // field return type name
    budget: 'Float';
    createdAt: 'DateTime';
    dailyItineraries: 'DailyItinerary';
    destination: 'String';
    endDate: 'DateTime';
    expenses: 'Expense';
    id: 'Int';
    isAccommodationIncluded: 'Boolean';
    isFoodIncluded: 'Boolean';
    isTransportationIncluded: 'Boolean';
    startDate: 'DateTime';
    startingLocation: 'JSON';
    timeSlots: 'JSON';
    title: 'String';
    travelSize: 'TravelSize';
    travelerCount: 'Int';
    tripPreference: 'TripPreference';
    updatedAt: 'DateTime';
  };
  TripPreference: {
    // field return type name
    accommodationType: 'String';
    activities: 'JSON';
    amenities: 'String';
    cuisines: 'String';
    diningStyles: 'String';
    id: 'Int';
    tripId: 'Int';
  };
  User: {
    // field return type name
    createdAt: 'DateTime';
    email: 'String';
    firstName: 'String';
    id: 'String';
    lastName: 'String';
    password: 'String';
    pois: 'Poi';
    stamps: 'Stamp';
    subscription: 'Subscription';
    tripCount: 'Int';
    trips: 'Trip';
    type: 'UserType';
    updatedAt: 'DateTime';
  };
}

export interface NexusGenArgTypes {
  Mutation: {
    claimStamp: {
      // args
      stampId: number; // Int!
      userId: string; // String!
    };
    createExpense: {
      // args
      data: NexusGenInputs['CreateExpenseInput']; // CreateExpenseInput!
      tripId: number; // Int!
    };
    createPoi: {
      // args
      input: NexusGenInputs['CreatePoiInput']; // CreatePoiInput!
      type: string; // String!
      userId: string; // String!
    };
    createTrip: {
      // args
      tripInput: NexusGenInputs['CreateTripInput']; // CreateTripInput!
      tripPreferenceInput: NexusGenInputs['CreateTripPreferenceInput']; // CreateTripPreferenceInput!
      userId: string; // String!
    };
    createUser: {
      // args
      input: NexusGenInputs['CreateUserInput']; // CreateUserInput!
    };
    deleteExpense: {
      // args
      id: number; // Int!
    };
    deletePoi: {
      // args
      poiId: string; // String!
    };
    deleteTrip: {
      // args
      id: number; // Int!
    };
    editUser: {
      // args
      input: NexusGenInputs['EditUserInput']; // EditUserInput!
      userId: string; // String!
    };
    regenerateTrip: {
      // args
      id: number; // Int!
    };
    updateExpense: {
      // args
      data: NexusGenInputs['UpdateExpenseInput']; // UpdateExpenseInput!
      id: number; // Int!
    };
  };
  Query: {
    poi: {
      // args
      poiId: string; // String!
    };
    pois: {
      // args
      userId: string; // String!
    };
    travelerAccount: {
      // args
      id: string; // String!
    };
    trip: {
      // args
      id: number; // Int!
    };
    trips: {
      // args
      userId: string; // String!
    };
    unclaimedStamps: {
      // args
      userId: string; // String!
    };
    user: {
      // args
      id: string; // String!
    };
  };
}

export interface NexusGenAbstractTypeMembers {}

export interface NexusGenTypeInterfaces {}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false;
    resolveType: true;
    __typename: false;
  };
};

export interface NexusGenTypes {
  context: Context;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes:
    | NexusGenTypes['inputNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['scalarNames'];
  allOutputTypes:
    | NexusGenTypes['objectNames']
    | NexusGenTypes['enumNames']
    | NexusGenTypes['unionNames']
    | NexusGenTypes['interfaceNames']
    | NexusGenTypes['scalarNames'];
  allNamedTypes:
    | NexusGenTypes['allInputTypes']
    | NexusGenTypes['allOutputTypes'];
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}

declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {}
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {}
  interface NexusGenPluginFieldConfig<
    TypeName extends string,
    FieldName extends string,
  > {
    /**
     * Validate mutation arguments.
     */
    validate?: ValidateResolver<TypeName, FieldName>;
  }
  interface NexusGenPluginInputFieldConfig<
    TypeName extends string,
    FieldName extends string,
  > {}
  interface NexusGenPluginSchemaConfig {}
  interface NexusGenPluginArgConfig {}
}
