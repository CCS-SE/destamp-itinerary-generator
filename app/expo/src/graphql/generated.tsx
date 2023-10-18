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
  JSON: { input: any; output: any };
};

export type Amenity = {
  __typename?: 'Amenity';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type BusinessOwner = {
  __typename?: 'BusinessOwner';
  firstName: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  lastName: Scalars['String']['output'];
  listings: Array<Place>;
  role: BusinessRole;
};

export enum BusinessRole {
  Manager = 'MANAGER',
  Owner = 'OWNER',
}

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CreateDepartingLocationInput = {
  address: Scalars['String']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  name: Scalars['String']['input'];
};

export type CreateExpenseInput = {
  amount: Scalars['Float']['input'];
  category: ExpenseCategory;
  date: Scalars['DateTime']['input'];
  itineraryId: Scalars['Int']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type CreateTravelerInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type CreateTripInput = {
  adultCount?: InputMaybe<Scalars['Int']['input']>;
  budget: Scalars['Float']['input'];
  childCount?: InputMaybe<Scalars['Int']['input']>;
  destinationId: Scalars['Int']['input'];
  endDate: Scalars['DateTime']['input'];
  isAccommodationIncluded: Scalars['Boolean']['input'];
  isFoodIncluded: Scalars['Boolean']['input'];
  isTransportationIncluded: Scalars['Boolean']['input'];
  preferredTime: Array<Scalars['JSON']['input']>;
  startDate: Scalars['DateTime']['input'];
  title: Scalars['String']['input'];
  travelSize: TravelSize;
  travelerId: Scalars['Int']['input'];
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  id: Scalars['String']['input'];
  password: Scalars['String']['input'];
  userType: UserType;
};

export type DailyItinerary = {
  __typename?: 'DailyItinerary';
  accommodationCost: Scalars['Float']['output'];
  attractionCost: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  dayIndex: Scalars['Int']['output'];
  destinations: Array<Place>;
  foodCost: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  transportationCost: Scalars['Float']['output'];
  travelDistances: Scalars['JSON']['output'];
  travelDurations: Scalars['JSON']['output'];
  updatedAt: Scalars['DateTime']['output'];
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
  id: Scalars['Int']['output'];
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
  dailyItineraries: Array<DailyItinerary>;
  expenses: Array<Expense>;
  id: Scalars['Int']['output'];
  totalCost: Scalars['Float']['output'];
  totalDuration: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createExpense: Expense;
  createTrip: Trip;
  createUser: User;
  deleteExpense: Expense;
  deleteTrip: Trip;
  updateExpense: Expense;
};

export type MutationCreateExpenseArgs = {
  data: CreateExpenseInput;
};

export type MutationCreateTripArgs = {
  data: CreateTripInput;
  locationData: CreateDepartingLocationInput;
};

export type MutationCreateUserArgs = {
  travelerInput: CreateTravelerInput;
  userInput: CreateUserInput;
};

export type MutationDeleteExpenseArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeleteTripArgs = {
  id: Scalars['Int']['input'];
};

export type MutationUpdateExpenseArgs = {
  data: UpdateExpenseInput;
  id: Scalars['Int']['input'];
};

export type OpeningHour = {
  __typename?: 'OpeningHour';
  closeTime?: Maybe<Scalars['DateTime']['output']>;
  day: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  openTime?: Maybe<Scalars['DateTime']['output']>;
};

export type Place = {
  __typename?: 'Place';
  address: Scalars['String']['output'];
  amenities: Array<Amenity>;
  businessOwnerId?: Maybe<Scalars['Int']['output']>;
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
  isClaimed: Scalars['Boolean']['output'];
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
  destinations: Array<Destination>;
  getTransaction: Array<Expense>;
  itinerary: Itinerary;
  place: Place;
  places: Array<Place>;
  traveler: Traveler;
  travelerTrips: Array<Trip>;
  trip: Trip;
  user: User;
};

export type QueryGetTransactionArgs = {
  itineraryId: Scalars['Int']['input'];
};

export type QueryItineraryArgs = {
  tripId: Scalars['Int']['input'];
};

export type QueryPlaceArgs = {
  placeId: Scalars['String']['input'];
};

export type QueryTravelerArgs = {
  userId: Scalars['String']['input'];
};

export type QueryTravelerTripsArgs = {
  userId: Scalars['String']['input'];
};

export type QueryTripArgs = {
  id: Scalars['Int']['input'];
};

export type QueryUserArgs = {
  id: Scalars['String']['input'];
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
  preferredTime: Scalars['JSON']['output'];
  startDate: Scalars['DateTime']['output'];
  title: Scalars['String']['output'];
  travelSize: TravelSize;
  updatedAt: Scalars['DateTime']['output'];
};

export type UpdateExpenseInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<ExpenseCategory>;
  date?: InputMaybe<Scalars['DateTime']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
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
  BusinessOwner: ResolverTypeWrapper<BusinessOwner>;
  BusinessRole: BusinessRole;
  Category: ResolverTypeWrapper<Category>;
  CreateDepartingLocationInput: CreateDepartingLocationInput;
  CreateExpenseInput: CreateExpenseInput;
  CreateTravelerInput: CreateTravelerInput;
  CreateTripInput: CreateTripInput;
  CreateUserInput: CreateUserInput;
  DailyItinerary: ResolverTypeWrapper<DailyItinerary>;
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
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  OpeningHour: ResolverTypeWrapper<OpeningHour>;
  Place: ResolverTypeWrapper<Place>;
  PlaceType: PlaceType;
  Query: ResolverTypeWrapper<{}>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  TravelSize: TravelSize;
  Traveler: ResolverTypeWrapper<Traveler>;
  Trip: ResolverTypeWrapper<Trip>;
  UpdateExpenseInput: UpdateExpenseInput;
  User: ResolverTypeWrapper<User>;
  UserType: UserType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Amenity: Amenity;
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  BusinessOwner: BusinessOwner;
  Category: Category;
  CreateDepartingLocationInput: CreateDepartingLocationInput;
  CreateExpenseInput: CreateExpenseInput;
  CreateTravelerInput: CreateTravelerInput;
  CreateTripInput: CreateTripInput;
  CreateUserInput: CreateUserInput;
  DailyItinerary: DailyItinerary;
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
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  OpeningHour: OpeningHour;
  Place: Place;
  Query: {};
  String: Scalars['String']['output'];
  Traveler: Traveler;
  Trip: Trip;
  UpdateExpenseInput: UpdateExpenseInput;
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

export type BusinessOwnerResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BusinessOwner'] = ResolversParentTypes['BusinessOwner'],
> = {
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  listings?: Resolver<Array<ResolversTypes['Place']>, ParentType, ContextType>;
  role?: Resolver<ResolversTypes['BusinessRole'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type CategoryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Category'] = ResolversParentTypes['Category'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailyItineraryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DailyItinerary'] = ResolversParentTypes['DailyItinerary'],
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
  foodCost?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  transportationCost?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  travelDistances?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  travelDurations?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
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
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
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
  dailyItineraries?: Resolver<
    Array<ResolversTypes['DailyItinerary']>,
    ParentType,
    ContextType
  >;
  expenses?: Resolver<
    Array<ResolversTypes['Expense']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  totalCost?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  totalDuration?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  url?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface JsonScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['JSON'], any> {
  name: 'JSON';
}

export type MutationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation'],
> = {
  createExpense?: Resolver<
    ResolversTypes['Expense'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateExpenseArgs, 'data'>
  >;
  createTrip?: Resolver<
    ResolversTypes['Trip'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateTripArgs, 'data' | 'locationData'>
  >;
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'travelerInput' | 'userInput'>
  >;
  deleteExpense?: Resolver<
    ResolversTypes['Expense'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteExpenseArgs, 'id'>
  >;
  deleteTrip?: Resolver<
    ResolversTypes['Trip'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTripArgs, 'id'>
  >;
  updateExpense?: Resolver<
    ResolversTypes['Expense'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateExpenseArgs, 'data' | 'id'>
  >;
};

export type OpeningHourResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OpeningHour'] = ResolversParentTypes['OpeningHour'],
> = {
  closeTime?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  day?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  openTime?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
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
  businessOwnerId?: Resolver<
    Maybe<ResolversTypes['Int']>,
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
  isClaimed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
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
  destinations?: Resolver<
    Array<ResolversTypes['Destination']>,
    ParentType,
    ContextType
  >;
  getTransaction?: Resolver<
    Array<ResolversTypes['Expense']>,
    ParentType,
    ContextType,
    RequireFields<QueryGetTransactionArgs, 'itineraryId'>
  >;
  itinerary?: Resolver<
    ResolversTypes['Itinerary'],
    ParentType,
    ContextType,
    RequireFields<QueryItineraryArgs, 'tripId'>
  >;
  place?: Resolver<
    ResolversTypes['Place'],
    ParentType,
    ContextType,
    RequireFields<QueryPlaceArgs, 'placeId'>
  >;
  places?: Resolver<Array<ResolversTypes['Place']>, ParentType, ContextType>;
  traveler?: Resolver<
    ResolversTypes['Traveler'],
    ParentType,
    ContextType,
    RequireFields<QueryTravelerArgs, 'userId'>
  >;
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
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
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
  preferredTime?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
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
  BusinessOwner?: BusinessOwnerResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  DailyItinerary?: DailyItineraryResolvers<ContextType>;
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
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  OpeningHour?: OpeningHourResolvers<ContextType>;
  Place?: PlaceResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Traveler?: TravelerResolvers<ContextType>;
  Trip?: TripResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type CreateExpenseMutationVariables = Exact<{
  data: CreateExpenseInput;
}>;

export type CreateExpenseMutation = {
  __typename?: 'Mutation';
  createExpense: {
    __typename?: 'Expense';
    amount: number;
    category: ExpenseCategory;
    date: any;
    note?: string | null;
  };
};

export type UpdateExpenseMutationVariables = Exact<{
  updateExpenseId: Scalars['Int']['input'];
  data: UpdateExpenseInput;
}>;

export type UpdateExpenseMutation = {
  __typename?: 'Mutation';
  updateExpense: { __typename?: 'Expense'; id: number };
};

export type DeleteExpenseMutationVariables = Exact<{
  deleteExpenseId: Scalars['Int']['input'];
}>;

export type DeleteExpenseMutation = {
  __typename?: 'Mutation';
  deleteExpense: { __typename?: 'Expense'; id: number };
};

export type CreateTripMutationVariables = Exact<{
  data: CreateTripInput;
  locationData: CreateDepartingLocationInput;
}>;

export type CreateTripMutation = {
  __typename?: 'Mutation';
  createTrip: {
    __typename?: 'Trip';
    id: number;
    itinerary?: {
      __typename?: 'Itinerary';
      id: number;
      dailyItineraries: Array<{
        __typename?: 'DailyItinerary';
        id: number;
        destinations: Array<{ __typename?: 'Place'; id: string }>;
      }>;
    } | null;
  };
};

export type DeleteTripMutationVariables = Exact<{
  deleteTripId: Scalars['Int']['input'];
}>;

export type DeleteTripMutation = {
  __typename?: 'Mutation';
  deleteTrip: { __typename?: 'Trip'; id: number; title: string };
};

export type CreateUserMutationVariables = Exact<{
  userInput: CreateUserInput;
  travelerInput: CreateTravelerInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: { __typename?: 'User'; id: string };
};

export type GetBusinessDetailsQueryVariables = Exact<{
  placeId: Scalars['String']['input'];
}>;

export type GetBusinessDetailsQuery = {
  __typename?: 'Query';
  place: {
    __typename?: 'Place';
    name: string;
    address: string;
    contactNumber?: string | null;
    description?: string | null;
    website?: string | null;
    price: string;
    visitDuration: number;
    categories: Array<{ __typename?: 'Category'; id: number; name: string }>;
    images: Array<{ __typename?: 'Image'; url: string }>;
    openingHours: Array<{
      __typename?: 'OpeningHour';
      closeTime?: any | null;
      day: number;
      openTime?: any | null;
    }>;
    amenities: Array<{ __typename?: 'Amenity'; id: number; name: string }>;
    diningAtmospheres: Array<{
      __typename?: 'DiningAtmosphere';
      id: number;
      name: string;
    }>;
    diningCuisines: Array<{
      __typename?: 'DiningCuisine';
      id: number;
      name: string;
    }>;
    diningOfferings: Array<{
      __typename?: 'DiningOffering';
      id: number;
      name: string;
    }>;
    diningOptions: Array<{
      __typename?: 'DiningOption';
      id: number;
      name: string;
    }>;
  };
};

export type GetBusinessListQueryVariables = Exact<{
  placeId: Scalars['String']['input'];
}>;

export type GetBusinessListQuery = {
  __typename?: 'Query';
  place: { __typename?: 'Place'; name: string; address: string };
};

export type GetDestinationsQueryQueryVariables = Exact<{
  [key: string]: never;
}>;

export type GetDestinationsQueryQuery = {
  __typename?: 'Query';
  destinations: Array<{ __typename?: 'Destination'; id: number; name: string }>;
};

export type GetTransactionsQueryVariables = Exact<{
  itineraryId: Scalars['Int']['input'];
}>;

export type GetTransactionsQuery = {
  __typename?: 'Query';
  getTransaction: Array<{
    __typename?: 'Expense';
    id: number;
    amount: number;
    category: ExpenseCategory;
    date: any;
    note?: string | null;
  }>;
};

export type GetTravelerItineraryQueryVariables = Exact<{
  tripId: Scalars['Int']['input'];
}>;

export type GetTravelerItineraryQuery = {
  __typename?: 'Query';
  itinerary: {
    __typename?: 'Itinerary';
    id: number;
    totalCost: number;
    dailyItineraries: Array<{
      __typename?: 'DailyItinerary';
      id: number;
      foodCost: string;
      attractionCost: number;
      transportationCost: number;
      accommodationCost: number;
      travelDistances: any;
      travelDurations: any;
      dayIndex: number;
      destinations: Array<{
        __typename?: 'Place';
        id: string;
        name: string;
        price: string;
        type: PlaceType;
        visitDuration: number;
        latitude: number;
        longitude: number;
        contactNumber?: string | null;
        address: string;
        isClaimed: boolean;
        images: Array<{ __typename?: 'Image'; url: string }>;
        openingHours: Array<{
          __typename?: 'OpeningHour';
          day: number;
          openTime?: any | null;
          closeTime?: any | null;
        }>;
      }>;
    }>;
  };
  trip: {
    __typename?: 'Trip';
    budget: number;
    startDate: any;
    endDate: any;
    preferredTime: any;
    isAccommodationIncluded: boolean;
    isTransportationIncluded: boolean;
    adultCount?: number | null;
    childCount?: number | null;
    departingLocation?: {
      __typename?: 'DepartingLocation';
      name: string;
    } | null;
  };
};

export type GetTravelerInfoQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetTravelerInfoQuery = {
  __typename?: 'Query';
  traveler: {
    __typename?: 'Traveler';
    id: number;
    firstName?: string | null;
    lastName?: string | null;
  };
  user: { __typename?: 'User'; email: string };
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
    adultCount?: number | null;
    childCount?: number | null;
    destination?: {
      __typename?: 'Destination';
      name: string;
      image?: { __typename?: 'Image'; url: string } | null;
    } | null;
  }>;
};

export const CreateExpenseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateExpense' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateExpenseInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createExpense' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'note' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  CreateExpenseMutation,
  CreateExpenseMutationVariables
>;
export const UpdateExpenseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'UpdateExpense' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'updateExpenseId' },
          },
          type: {
            kind: 'NonNullType',
            type: { kind: 'NamedType', name: { kind: 'Name', value: 'Int' } },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'UpdateExpenseInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'updateExpense' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'updateExpenseId' },
                },
              },
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
} as unknown as DocumentNode<
  UpdateExpenseMutation,
  UpdateExpenseMutationVariables
>;
export const DeleteExpenseDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeleteExpense' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'deleteExpenseId' },
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
            name: { kind: 'Name', value: 'deleteExpense' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'deleteExpenseId' },
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
} as unknown as DocumentNode<
  DeleteExpenseMutation,
  DeleteExpenseMutationVariables
>;
export const CreateTripDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreateTrip' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'data' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateTripInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'locationData' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateDepartingLocationInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createTrip' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'data' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'data' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'locationData' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'locationData' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'itinerary' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dailyItineraries' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'destinations' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'id' },
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
        ],
      },
    },
  ],
} as unknown as DocumentNode<CreateTripMutation, CreateTripMutationVariables>;
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
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'userInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateUserInput' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'travelerInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateTravelerInput' },
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
                name: { kind: 'Name', value: 'userInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userInput' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'travelerInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'travelerInput' },
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
export const GetBusinessDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBusinessDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'placeId' },
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
            name: { kind: 'Name', value: 'place' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'placeId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'placeId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contactNumber' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'website' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'openingHours' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'closeTime' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'day' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'openTime' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'amenities' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'diningAtmospheres' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'diningCuisines' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'diningOfferings' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'diningOptions' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'visitDuration' },
                },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetBusinessDetailsQuery,
  GetBusinessDetailsQueryVariables
>;
export const GetBusinessListDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBusinessList' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'placeId' },
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
            name: { kind: 'Name', value: 'place' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'placeId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'placeId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetBusinessListQuery,
  GetBusinessListQueryVariables
>;
export const GetDestinationsQueryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDestinationsQuery' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'destinations' },
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetDestinationsQueryQuery,
  GetDestinationsQueryQueryVariables
>;
export const GetTransactionsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTransactions' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'itineraryId' },
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
            name: { kind: 'Name', value: 'getTransaction' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'itineraryId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'itineraryId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'amount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'category' } },
                { kind: 'Field', name: { kind: 'Name', value: 'date' } },
                { kind: 'Field', name: { kind: 'Name', value: 'note' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetTransactionsQuery,
  GetTransactionsQueryVariables
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'totalCost' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dailyItineraries' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
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
                        name: { kind: 'Name', value: 'accommodationCost' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'travelDistances' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'travelDurations' },
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
                              name: { kind: 'Name', value: 'id' },
                            },
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
                              name: { kind: 'Name', value: 'latitude' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'longitude' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'contactNumber' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'address' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'isClaimed' },
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
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'openingHours' },
                              selectionSet: {
                                kind: 'SelectionSet',
                                selections: [
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'day' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'openTime' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'closeTime' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'budget' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'preferredTime' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isAccommodationIncluded' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isTransportationIncluded' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'adultCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'childCount' } },
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
export const GetTravelerInfoDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTravelerInfo' },
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
            name: { kind: 'Name', value: 'traveler' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
              ],
            },
          },
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'user' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetTravelerInfoQuery,
  GetTravelerInfoQueryVariables
>;
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
                { kind: 'Field', name: { kind: 'Name', value: 'adultCount' } },
                { kind: 'Field', name: { kind: 'Name', value: 'childCount' } },
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
