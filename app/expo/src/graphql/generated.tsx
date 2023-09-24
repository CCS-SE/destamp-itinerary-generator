import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
import {
  GraphQLResolveInfo,
  GraphQLScalarType,
  GraphQLScalarTypeConfig,
} from 'graphql';

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]?: Maybe<T[SubKey]>;
};
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & {
  [SubKey in K]: Maybe<T[SubKey]>;
};
export type MakeEmpty<
  T extends { [key: string]: unknown },
  K extends keyof T,
> = { [_ in K]?: never };
export type Incremental<T> =
  | T
  | {
      [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never;
    };
export type RequireFields<T, K extends keyof T> = Omit<T, K> & {
  [P in K]-?: NonNullable<T[P]>;
};
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string };
  String: { input: string; output: string };
  Boolean: { input: boolean; output: boolean };
  Int: { input: number; output: number };
  Float: { input: number; output: number };
  BigInt: { input: any; output: any };
  DateTime: { input: any; output: any };
};

export type Amenity = {
  __typename?: 'Amenity';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CreateTripInput = {
  adultCount?: InputMaybe<Scalars['Int']['input']>;
  budget: Scalars['Float']['input'];
  childCount?: InputMaybe<Scalars['Int']['input']>;
  destinationId: Scalars['Int']['input'];
  endDate: Scalars['DateTime']['input'];
  startDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
  travelSize: TravelSize;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userType: UserType;
};

export type DepartingLocation = {
  __typename?: 'DepartingLocation';
  address: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
};

export type Destination = {
  __typename?: 'Destination';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  image?: Maybe<Image>;
  name: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DiningAtmosphere = {
  __typename?: 'DiningAtmosphere';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type DiningCuisine = {
  __typename?: 'DiningCuisine';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type DiningOffering = {
  __typename?: 'DiningOffering';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type DiningOption = {
  __typename?: 'DiningOption';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Float']['output'];
  category: ExpenseCategory;
  createdAt: Scalars['DateTime']['output'];
  date: Scalars['DateTime']['output'];
  note?: Maybe<Scalars['String']['output']>;
  updatedAt: Scalars['DateTime']['output'];
};

export enum ExpenseCategory {
  Accommodation = 'ACCOMMODATION',
  Activity = 'ACTIVITY',
  Food = 'FOOD',
  Other = 'OTHER',
  Shopping = 'SHOPPING',
  Sightseeing = 'SIGHTSEEING',
  Transportation = 'TRANSPORTATION',
}

export type Image = {
  __typename?: 'Image';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['ID']['output'];
  name?: Maybe<Scalars['String']['output']>;
  size?: Maybe<Scalars['Int']['output']>;
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type Itinerary = {
  __typename?: 'Itinerary';
  createdAt: Scalars['DateTime']['output'];
  expenses: Array<Expense>;
  id: Scalars['Int']['output'];
  itineraryDays: Array<ItineraryDay>;
  totalCost: Scalars['Float']['output'];
  totalDuration: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type ItineraryDay = {
  __typename?: 'ItineraryDay';
  accommodationCost: Scalars['Float']['output'];
  attractionCost: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  dayIndex: Scalars['Int']['output'];
  destinations: Array<Place>;
  foodCost: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  transportationCost: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createTrip: Trip;
  createUser: User;
  deleteTrip: Trip;
};

export type MutationCreateTripArgs = {
  data: CreateTripInput;
};

export type MutationCreateUserArgs = {
  data: CreateUserInput;
};

export type MutationDeleteTripArgs = {
  id: Scalars['Int']['input'];
};

export type OpeningHour = {
  __typename?: 'OpeningHour';
  closeTime: Scalars['DateTime']['output'];
  day: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  openTime: Scalars['DateTime']['output'];
};

export type Place = {
  __typename?: 'Place';
  address: Scalars['String']['output'];
  amenities: Array<Amenity>;
  categories: Array<Category>;
  contactNumber?: Maybe<Scalars['String']['output']>;
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  diningAtmospheres: Array<DiningAtmosphere>;
  diningCuisines: Array<DiningCuisine>;
  diningOfferings: Array<DiningOffering>;
  diningOptions: Array<DiningOption>;
  id: Scalars['String']['output'];
  images: Array<Image>;
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  openingHours: Array<OpeningHour>;
  price: Scalars['String']['output'];
  type: PlaceType;
  updatedAt: Scalars['DateTime']['output'];
  url?: Maybe<Scalars['String']['output']>;
  visitDuration: Scalars['Float']['output'];
  website?: Maybe<Scalars['String']['output']>;
};

export enum PlaceType {
  Accommodation = 'ACCOMMODATION',
  Attraction = 'ATTRACTION',
  Restaurant = 'RESTAURANT',
}

export type Query = {
  __typename?: 'Query';
  itinerary: Itinerary;
  places: Array<Place>;
  travelerTrips: Array<Trip>;
  trip: Trip;
};

export type QueryItineraryArgs = {
  tripId: Scalars['Int']['input'];
};

export type QueryTravelerTripsArgs = {
  userId: Scalars['String']['input'];
};

export type QueryTripArgs = {
  id: Scalars['Int']['input'];
};

export enum TravelSize {
  Couple = 'COUPLE',
  Family = 'FAMILY',
  Group = 'GROUP',
  Solo = 'SOLO',
}

export type Traveler = {
  __typename?: 'Traveler';
  contactNumber?: Maybe<Scalars['String']['output']>;
  firstName?: Maybe<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  lastName?: Maybe<Scalars['String']['output']>;
  trips: Array<Trip>;
};

export type Trip = {
  __typename?: 'Trip';
  adultCount?: Maybe<Scalars['Int']['output']>;
  budget: Scalars['Float']['output'];
  childCount?: Maybe<Scalars['Int']['output']>;
  createdAt: Scalars['DateTime']['output'];
  departingLocation?: Maybe<DepartingLocation>;
  destination?: Maybe<Destination>;
  endDate: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  isAccommodationIncluded: Scalars['Boolean']['output'];
  isFoodIncluded: Scalars['Boolean']['output'];
  isTransportationIncluded: Scalars['Boolean']['output'];
  itinerary?: Maybe<Itinerary>;
  startDate: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  travelSize: TravelSize;
  updatedAt: Scalars['DateTime']['output'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String']['output'];
  id: Scalars['String']['output'];
  password: Scalars['String']['output'];
  traveler?: Maybe<Traveler>;
  userType: UserType;
};

export enum UserType {
  BusinessOperator = 'BUSINESS_OPERATOR',
  Traveler = 'TRAVELER',
}

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverWithResolve<TResult, TParent, TContext, TArgs> = {
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | ResolverWithResolve<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => AsyncIterable<TResult> | Promise<AsyncIterable<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> {
  subscribe: SubscriptionSubscribeFn<
    { [key in TKey]: TResult },
    TParent,
    TContext,
    TArgs
  >;
  resolve?: SubscriptionResolveFn<
    TResult,
    { [key in TKey]: TResult },
    TContext,
    TArgs
  >;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<
  TResult,
  TKey extends string,
  TParent,
  TContext,
  TArgs,
> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<
  TResult,
  TKey extends string,
  TParent = {},
  TContext = {},
  TArgs = {},
> =
  | ((
      ...args: any[]
    ) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo,
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (
  obj: T,
  context: TContext,
  info: GraphQLResolveInfo,
) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {},
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Amenity: ResolverTypeWrapper<Amenity>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  Category: ResolverTypeWrapper<Category>;
  CreateTripInput: CreateTripInput;
  CreateUserInput: CreateUserInput;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  DepartingLocation: ResolverTypeWrapper<DepartingLocation>;
  Destination: ResolverTypeWrapper<Destination>;
  DiningAtmosphere: ResolverTypeWrapper<DiningAtmosphere>;
  DiningCuisine: ResolverTypeWrapper<DiningCuisine>;
  DiningOffering: ResolverTypeWrapper<DiningOffering>;
  DiningOption: ResolverTypeWrapper<DiningOption>;
  Expense: ResolverTypeWrapper<Expense>;
  ExpenseCategory: ExpenseCategory;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  ID: ResolverTypeWrapper<Scalars['ID']['output']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  Itinerary: ResolverTypeWrapper<Itinerary>;
  ItineraryDay: ResolverTypeWrapper<ItineraryDay>;
  Mutation: ResolverTypeWrapper<{}>;
  OpeningHour: ResolverTypeWrapper<OpeningHour>;
  Place: ResolverTypeWrapper<Place>;
  PlaceType: PlaceType;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TravelSize: TravelSize;
  Traveler: ResolverTypeWrapper<Traveler>;
  Trip: ResolverTypeWrapper<Trip>;
  User: ResolverTypeWrapper<User>;
  UserType: UserType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Amenity: Amenity;
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  Category: Category;
  CreateTripInput: CreateTripInput;
  CreateUserInput: CreateUserInput;
  DateTime: Scalars['DateTime']['output'];
  DepartingLocation: DepartingLocation;
  Destination: Destination;
  DiningAtmosphere: DiningAtmosphere;
  DiningCuisine: DiningCuisine;
  DiningOffering: DiningOffering;
  DiningOption: DiningOption;
  Expense: Expense;
  Float: Scalars['Float']['output'];
  ID: Scalars['ID']['output'];
  Image: Image;
  Int: Scalars['Int']['output'];
  Itinerary: Itinerary;
  ItineraryDay: ItineraryDay;
  Mutation: {};
  OpeningHour: OpeningHour;
  Place: Place;
  Query: {};
  String: Scalars['String']['output'];
  Traveler: Traveler;
  Trip: Trip;
  User: User;
};

export type AmenityResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Amenity'] = ResolversParentTypes['Amenity'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface BigIntScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['BigInt'], any> {
  name: 'BigInt';
}

export type CategoryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Category'] = ResolversParentTypes['Category'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

export type DepartingLocationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DepartingLocation'] = ResolversParentTypes['DepartingLocation'],
> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DestinationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Destination'] = ResolversParentTypes['Destination'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<Maybe<ResolversTypes['Image']>, ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiningAtmosphereResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DiningAtmosphere'] = ResolversParentTypes['DiningAtmosphere'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiningCuisineResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DiningCuisine'] = ResolversParentTypes['DiningCuisine'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiningOfferingResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DiningOffering'] = ResolversParentTypes['DiningOffering'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DiningOptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DiningOption'] = ResolversParentTypes['DiningOption'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ExpenseResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Expense'] = ResolversParentTypes['Expense'],
> = {
  amount?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  category?: Resolver<
    ResolversTypes['ExpenseCategory'],
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  date?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  note?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Image'] = ResolversParentTypes['Image'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>;
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  size?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItineraryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Itinerary'] = ResolversParentTypes['Itinerary'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  expenses?: Resolver<
    Array<ResolversTypes['Expense']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  itineraryDays?: Resolver<
    Array<ResolversTypes['ItineraryDay']>,
    ParentType,
    ContextType
  >;
  totalCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalDuration?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ItineraryDayResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['ItineraryDay'] = ResolversParentTypes['ItineraryDay'],
> = {
  accommodationCost?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  attractionCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dayIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  destinations?: Resolver<
    Array<ResolversTypes['Place']>,
    ParentType,
    ContextType
  >;
  foodCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  transportationCost?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  createTrip?: Resolver<
    ResolversTypes['Trip'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTripArgs, 'data'>
  >;
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'data'>
  >;
  deleteTrip?: Resolver<
    ResolversTypes['Trip'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTripArgs, 'id'>
  >;
};

export type OpeningHourResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OpeningHour'] = ResolversParentTypes['OpeningHour'],
> = {
  closeTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  day?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  openTime?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PlaceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Place'] = ResolversParentTypes['Place'],
> = {
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  amenities?: Resolver<
    Array<ResolversTypes['Amenity']>,
    ParentType,
    ContextType
  >;
  categories?: Resolver<
    Array<ResolversTypes['Category']>,
    ParentType,
    ContextType
  >;
  contactNumber?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  diningAtmospheres?: Resolver<
    Array<ResolversTypes['DiningAtmosphere']>,
    ParentType,
    ContextType
  >;
  diningCuisines?: Resolver<
    Array<ResolversTypes['DiningCuisine']>,
    ParentType,
    ContextType
  >;
  diningOfferings?: Resolver<
    Array<ResolversTypes['DiningOffering']>,
    ParentType,
    ContextType
  >;
  diningOptions?: Resolver<
    Array<ResolversTypes['DiningOption']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['Image']>, ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  openingHours?: Resolver<
    Array<ResolversTypes['OpeningHour']>,
    ParentType,
    ContextType
  >;
  price?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  type?: Resolver<ResolversTypes['PlaceType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  visitDuration?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  website?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  itinerary?: Resolver<
    ResolversTypes['Itinerary'],
    ParentType,
    ContextType,
    RequireFields<QueryItineraryArgs, 'tripId'>
  >;
  places?: Resolver<Array<ResolversTypes['Place']>, ParentType, ContextType>;
  travelerTrips?: Resolver<
    Array<ResolversTypes['Trip']>,
    ParentType,
    ContextType,
    RequireFields<QueryTravelerTripsArgs, 'userId'>
  >;
  trip?: Resolver<
    ResolversTypes['Trip'],
    ParentType,
    ContextType,
    RequireFields<QueryTripArgs, 'id'>
  >;
};

export type TravelerResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Traveler'] = ResolversParentTypes['Traveler'],
> = {
  contactNumber?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  firstName?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  trips?: Resolver<Array<ResolversTypes['Trip']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TripResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Trip'] = ResolversParentTypes['Trip'],
> = {
  adultCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  budget?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  childCount?: Resolver<Maybe<ResolversTypes['Int']>, ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  departingLocation?: Resolver<
    Maybe<ResolversTypes['DepartingLocation']>,
    ParentType,
    ContextType
  >;
  destination?: Resolver<
    Maybe<ResolversTypes['Destination']>,
    ParentType,
    ContextType
  >;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  isAccommodationIncluded?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  isFoodIncluded?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isTransportationIncluded?: Resolver<
    ResolversTypes['Boolean'],
    ParentType,
    ContextType
  >;
  itinerary?: Resolver<
    Maybe<ResolversTypes['Itinerary']>,
    ParentType,
    ContextType
  >;
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  travelSize?: Resolver<ResolversTypes['TravelSize'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  traveler?: Resolver<
    Maybe<ResolversTypes['Traveler']>,
    ParentType,
    ContextType
  >;
  userType?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Amenity?: AmenityResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  Category?: CategoryResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  DepartingLocation?: DepartingLocationResolvers<ContextType>;
  Destination?: DestinationResolvers<ContextType>;
  DiningAtmosphere?: DiningAtmosphereResolvers<ContextType>;
  DiningCuisine?: DiningCuisineResolvers<ContextType>;
  DiningOffering?: DiningOfferingResolvers<ContextType>;
  DiningOption?: DiningOptionResolvers<ContextType>;
  Expense?: ExpenseResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  Itinerary?: ItineraryResolvers<ContextType>;
  ItineraryDay?: ItineraryDayResolvers<ContextType>;
  Mutation?: MutationResolvers<ContextType>;
  OpeningHour?: OpeningHourResolvers<ContextType>;
  Place?: PlaceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Traveler?: TravelerResolvers<ContextType>;
  Trip?: TripResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type GetTravelerTripsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetTravelerTripsQuery = {
  __typename?: 'Query';
  travelerTrips: Array<{
    __typename?: 'Trip';
    id: number;
    title: string;
    budget: number;
    travelSize: TravelSize;
    startDate: any;
    endDate: any;
    destination?: {
      __typename?: 'Destination';
      name: string;
      image?: { __typename?: 'Image'; url: string } | null;
    } | null;
  }>;
};

export type GetTravelerItineraryQueryVariables = Exact<{
  tripId: Scalars['Int']['input'];
}>;

export type GetTravelerItineraryQuery = {
  __typename?: 'Query';
  itinerary: {
    __typename?: 'Itinerary';
    itineraryDays: Array<{
      __typename?: 'ItineraryDay';
      foodCost: number;
      attractionCost: number;
      transportationCost: number;
      dayIndex: number;
      destinations: Array<{
        __typename?: 'Place';
        name: string;
        price: string;
        type: PlaceType;
        visitDuration: number;
        images: Array<{ __typename?: 'Image'; url: string }>;
      }>;
    }>;
  };
  trip: {
    __typename?: 'Trip';
    startDate: any;
    endDate: any;
    departingLocation?: {
      __typename?: 'DepartingLocation';
      name: string;
    } | null;
  };
};

export type CreateUserMutationVariables = Exact<{
  data: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: { __typename?: 'User'; id: string };
};

export type DeleteTripMutationVariables = Exact<{
  deleteTripId: Scalars['Int']['input'];
}>;

export type DeleteTripMutation = {
  __typename?: 'Mutation';
  deleteTrip: { __typename?: 'Trip'; id: number; title: string };
};

export const GetTravelerTripsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTravelerTrips' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userId' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'travelerTrips' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
                { kind: 'Field', name: { kind: 'Name', value: 'budget' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'destination' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'url' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'travelSize' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetTravelerTripsQuery,
  GetTravelerTripsQueryVariables
>;
export const GetTravelerItineraryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTravelerItinerary' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tripId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'itinerary' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tripId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'tripId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'itineraryDays' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'foodCost' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'attractionCost' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'transportationCost' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dayIndex' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'destinations' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'price' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'type' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'visitDuration' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'images' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'url' },
                                  },
                                ],
                              },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'trip' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'tripId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'departingLocation' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetTravelerItineraryQuery,
  GetTravelerItineraryQueryVariables
>;
export const CreateUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateUser' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateUserMutation, CreateUserMutationVariables>;
export const DeleteTripDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteTrip' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'deleteTripId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'deleteTrip' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'deleteTripId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'title' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteTripMutation, DeleteTripMutationVariables>;
