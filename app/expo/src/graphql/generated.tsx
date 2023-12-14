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

export type Accommodation = {
  __typename?: 'Accommodation';
  amenities: Array<Amenity>;
  id: Scalars['Int']['output'];
  poiId: Scalars['String']['output'];
};

export type Account = {
  __typename?: 'Account';
  isPremium: Scalars['Boolean']['output'];
  user?: Maybe<User>;
};

export type Amenity = {
  __typename?: 'Amenity';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type BusinessPermit = {
  __typename?: 'BusinessPermit';
  id: Scalars['String']['output'];
  image: Image;
  imageId: Scalars['String']['output'];
  isVerified: Scalars['Boolean']['output'];
  poiId: Scalars['String']['output'];
  userId: Scalars['String']['output'];
};

export type Category = {
  __typename?: 'Category';
  id: Scalars['Int']['output'];
  name: Scalars['String']['output'];
};

export type CreateExpenseInput = {
  amount: Scalars['Float']['input'];
  category: ExpenseCategory;
  dateSpent: Scalars['DateTime']['input'];
  note?: InputMaybe<Scalars['String']['input']>;
};

export type CreatePoiInput = {
  address: Scalars['String']['input'];
  amenities?: InputMaybe<Array<Scalars['String']['input']>>;
  atmospheres?: InputMaybe<Array<Scalars['String']['input']>>;
  categories: Array<Scalars['String']['input']>;
  contactNumber: Scalars['String']['input'];
  description?: InputMaybe<Scalars['String']['input']>;
  imageUrls: Array<Scalars['String']['input']>;
  isAttraction: Scalars['Boolean']['input'];
  latitude: Scalars['Float']['input'];
  longitude: Scalars['Float']['input'];
  name: Scalars['String']['input'];
  operatingHours: Array<OperatingHoursInput>;
  permitUrl: Scalars['String']['input'];
  price: Scalars['String']['input'];
  visitDuration: Scalars['Int']['input'];
};

export type CreateTripInput = {
  budget: Scalars['Float']['input'];
  destination: Scalars['String']['input'];
  endDate?: InputMaybe<Scalars['DateTime']['input']>;
  isAccommodationIncluded: Scalars['Boolean']['input'];
  isFoodIncluded: Scalars['Boolean']['input'];
  isTransportationIncluded: Scalars['Boolean']['input'];
  startDate: Scalars['DateTime']['input'];
  startingLocation: Scalars['JSON']['input'];
  timeSlots: Scalars['JSON']['input'];
  title: Scalars['String']['input'];
  travelSize: TravelSize;
  travelerCount: Scalars['Int']['input'];
};

export type CreateTripPreferenceInput = {
  accommodationType: Scalars['String']['input'];
  activities: Scalars['JSON']['input'];
  amenities: Array<Scalars['String']['input']>;
  cuisines: Array<Scalars['String']['input']>;
  diningStyles: Array<Scalars['String']['input']>;
};

export type CreateUserInput = {
  email: Scalars['String']['input'];
  firstName: Scalars['String']['input'];
  id: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
  password: Scalars['String']['input'];
  type: UserType;
};

export type DailyItinerary = {
  __typename?: 'DailyItinerary';
  accommodationCost: Scalars['Float']['output'];
  attractionCost: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  dailyItineraryPois: Array<DailyItineraryPoi>;
  dayIndex: Scalars['Int']['output'];
  foodCost: Scalars['String']['output'];
  id: Scalars['Int']['output'];
  transportationCost: Scalars['Float']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type DailyItineraryPoi = {
  __typename?: 'DailyItineraryPoi';
  dailyItineraryId: Scalars['Int']['output'];
  distance: Scalars['Float']['output'];
  duration: Scalars['Float']['output'];
  id: Scalars['Int']['output'];
  order: Scalars['Int']['output'];
  poi: Poi;
};

export type EditUserInput = {
  firstName: Scalars['String']['input'];
  lastName: Scalars['String']['input'];
};

export type Expense = {
  __typename?: 'Expense';
  amount: Scalars['Float']['output'];
  category: ExpenseCategory;
  createdAt: Scalars['DateTime']['output'];
  dateSpent: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  note: Scalars['String']['output'];
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
  id: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
  url: Scalars['String']['output'];
};

export type Mutation = {
  __typename?: 'Mutation';
  claimStamp: User;
  createExpense: Expense;
  createPoi: Poi;
  createTrip: Trip;
  createUser: User;
  deleteExpense: Expense;
  deletePoi: Poi;
  deleteTrip: Trip;
  editUser: User;
  regenerateTrip: Trip;
  updateExpense: Expense;
};

export type MutationClaimStampArgs = {
  stampId: Scalars['Int']['input'];
  userId: Scalars['String']['input'];
};

export type MutationCreateExpenseArgs = {
  data: CreateExpenseInput;
  tripId: Scalars['Int']['input'];
};

export type MutationCreatePoiArgs = {
  input: CreatePoiInput;
  type: Scalars['String']['input'];
  userId: Scalars['String']['input'];
};

export type MutationCreateTripArgs = {
  isPremium: Scalars['Boolean']['input'];
  tripInput: CreateTripInput;
  tripPreferenceInput: CreateTripPreferenceInput;
  userId: Scalars['String']['input'];
};

export type MutationCreateUserArgs = {
  input: CreateUserInput;
};

export type MutationDeleteExpenseArgs = {
  id: Scalars['Int']['input'];
};

export type MutationDeletePoiArgs = {
  poiId: Scalars['String']['input'];
};

export type MutationDeleteTripArgs = {
  id: Scalars['Int']['input'];
};

export type MutationEditUserArgs = {
  input: EditUserInput;
  userId: Scalars['String']['input'];
};

export type MutationRegenerateTripArgs = {
  id: Scalars['Int']['input'];
  isPremium: Scalars['Boolean']['input'];
};

export type MutationUpdateExpenseArgs = {
  data: UpdateExpenseInput;
  id: Scalars['Int']['input'];
};

export type OperatingHour = {
  __typename?: 'OperatingHour';
  closeTime?: Maybe<Scalars['DateTime']['output']>;
  day: Scalars['Int']['output'];
  id: Scalars['Int']['output'];
  is24Hours: Scalars['Boolean']['output'];
  isClosed: Scalars['Boolean']['output'];
  openTime?: Maybe<Scalars['DateTime']['output']>;
};

export type OperatingHoursInput = {
  closeTime?: InputMaybe<Scalars['DateTime']['input']>;
  day: Scalars['Int']['input'];
  is24hours: Scalars['Boolean']['input'];
  isClosed: Scalars['Boolean']['input'];
  openTime?: InputMaybe<Scalars['DateTime']['input']>;
};

export type Poi = {
  __typename?: 'Poi';
  accommodation?: Maybe<Accommodation>;
  address: Scalars['String']['output'];
  businessPermit?: Maybe<BusinessPermit>;
  categories: Array<Category>;
  contactNumber: Scalars['String']['output'];
  createdAt: Scalars['DateTime']['output'];
  description?: Maybe<Scalars['String']['output']>;
  id: Scalars['String']['output'];
  images: Array<PoiImage>;
  isAttraction: Scalars['Boolean']['output'];
  latitude: Scalars['Float']['output'];
  longitude: Scalars['Float']['output'];
  name: Scalars['String']['output'];
  operatingHours: Array<OperatingHour>;
  price: Scalars['String']['output'];
  restaurant?: Maybe<Restaurant>;
  updatedAt: Scalars['DateTime']['output'];
  userId?: Maybe<Scalars['String']['output']>;
  visitDuration: Scalars['Float']['output'];
};

export type PoiImage = {
  __typename?: 'PoiImage';
  id: Scalars['Int']['output'];
  image: Image;
  imageId: Scalars['String']['output'];
  poiId: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  accommodationCategoires: Array<Category>;
  amenities: Array<Amenity>;
  attractionCategoires: Array<Category>;
  categories: Array<Category>;
  poi: Poi;
  pois: Array<Poi>;
  restaurantCategoires: Array<Category>;
  restaurantCategoriesMoreThanFive: Array<Category>;
  travelerAccount: Account;
  trip: Trip;
  trips: Array<Trip>;
  unclaimedStamps: Array<Stamp>;
  user: User;
};

export type QueryPoiArgs = {
  poiId: Scalars['String']['input'];
};

export type QueryPoisArgs = {
  userId: Scalars['String']['input'];
};

export type QueryTravelerAccountArgs = {
  id: Scalars['String']['input'];
};

export type QueryTripArgs = {
  id: Scalars['Int']['input'];
};

export type QueryTripsArgs = {
  userId: Scalars['String']['input'];
};

export type QueryUnclaimedStampsArgs = {
  userId: Scalars['String']['input'];
};

export type QueryUserArgs = {
  id: Scalars['String']['input'];
};

export type Restaurant = {
  __typename?: 'Restaurant';
  atmospheres: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  poiId: Scalars['String']['output'];
};

export type Stamp = {
  __typename?: 'Stamp';
  createdAt: Scalars['DateTime']['output'];
  id: Scalars['Int']['output'];
  image: Image;
  title: Scalars['String']['output'];
  updatedAt: Scalars['DateTime']['output'];
};

export type Subscription = {
  __typename?: 'Subscription';
  amount: Scalars['Float']['output'];
  endDate: Scalars['DateTime']['output'];
  id: Scalars['String']['output'];
  startDate: Scalars['DateTime']['output'];
  status: SubscriptionStatus;
  userId: Scalars['String']['output'];
};

export enum SubscriptionStatus {
  Active = 'ACTIVE',
  Cancelled = 'CANCELLED',
  Expired = 'EXPIRED',
}

export enum TravelSize {
  Couple = 'COUPLE',
  Family = 'FAMILY',
  Group = 'GROUP',
  Solo = 'SOLO',
}

export type Trip = {
  __typename?: 'Trip';
  budget: Scalars['Float']['output'];
  createdAt: Scalars['DateTime']['output'];
  dailyItineraries: Array<DailyItinerary>;
  destination: Scalars['String']['output'];
  endDate: Scalars['DateTime']['output'];
  expenses: Array<Expense>;
  id: Scalars['Int']['output'];
  isAccommodationIncluded: Scalars['Boolean']['output'];
  isFoodIncluded: Scalars['Boolean']['output'];
  isTransportationIncluded: Scalars['Boolean']['output'];
  startDate: Scalars['DateTime']['output'];
  startingLocation: Scalars['JSON']['output'];
  timeSlots: Scalars['JSON']['output'];
  title: Scalars['String']['output'];
  travelSize: TravelSize;
  travelerCount: Scalars['Int']['output'];
  tripPreference?: Maybe<TripPreference>;
  updatedAt: Scalars['DateTime']['output'];
};

export type TripPreference = {
  __typename?: 'TripPreference';
  accommodationType: Scalars['String']['output'];
  activities: Scalars['JSON']['output'];
  amenities: Array<Scalars['String']['output']>;
  cuisines: Array<Scalars['String']['output']>;
  diningStyles: Array<Scalars['String']['output']>;
  id: Scalars['Int']['output'];
  tripId: Scalars['Int']['output'];
};

export type UpdateExpenseInput = {
  amount?: InputMaybe<Scalars['Float']['input']>;
  category?: InputMaybe<ExpenseCategory>;
  dateSpent?: InputMaybe<Scalars['DateTime']['input']>;
  note?: InputMaybe<Scalars['String']['input']>;
};

export type User = {
  __typename?: 'User';
  createdAt: Scalars['DateTime']['output'];
  email: Scalars['String']['output'];
  firstName: Scalars['String']['output'];
  id: Scalars['String']['output'];
  lastName: Scalars['String']['output'];
  password: Scalars['String']['output'];
  pois: Array<Poi>;
  stamps: Array<Stamp>;
  subscription?: Maybe<Subscription>;
  tripCount: Scalars['Int']['output'];
  trips: Array<Trip>;
  type: UserType;
  updatedAt: Scalars['DateTime']['output'];
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
  Accommodation: ResolverTypeWrapper<Accommodation>;
  Account: ResolverTypeWrapper<Account>;
  Amenity: ResolverTypeWrapper<Amenity>;
  BigInt: ResolverTypeWrapper<Scalars['BigInt']['output']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']['output']>;
  BusinessPermit: ResolverTypeWrapper<BusinessPermit>;
  Category: ResolverTypeWrapper<Category>;
  CreateExpenseInput: CreateExpenseInput;
  CreatePoiInput: CreatePoiInput;
  CreateTripInput: CreateTripInput;
  CreateTripPreferenceInput: CreateTripPreferenceInput;
  CreateUserInput: CreateUserInput;
  DailyItinerary: ResolverTypeWrapper<DailyItinerary>;
  DailyItineraryPoi: ResolverTypeWrapper<DailyItineraryPoi>;
  DateTime: ResolverTypeWrapper<Scalars['DateTime']['output']>;
  EditUserInput: EditUserInput;
  Expense: ResolverTypeWrapper<Expense>;
  ExpenseCategory: ExpenseCategory;
  Float: ResolverTypeWrapper<Scalars['Float']['output']>;
  Image: ResolverTypeWrapper<Image>;
  Int: ResolverTypeWrapper<Scalars['Int']['output']>;
  JSON: ResolverTypeWrapper<Scalars['JSON']['output']>;
  Mutation: ResolverTypeWrapper<{}>;
  OperatingHour: ResolverTypeWrapper<OperatingHour>;
  OperatingHoursInput: OperatingHoursInput;
  Poi: ResolverTypeWrapper<Poi>;
  PoiImage: ResolverTypeWrapper<PoiImage>;
  Query: ResolverTypeWrapper<{}>;
  Restaurant: ResolverTypeWrapper<Restaurant>;
  Stamp: ResolverTypeWrapper<Stamp>;
  String: ResolverTypeWrapper<Scalars['String']['output']>;
  Subscription: ResolverTypeWrapper<{}>;
  SubscriptionStatus: SubscriptionStatus;
  TravelSize: TravelSize;
  Trip: ResolverTypeWrapper<Trip>;
  TripPreference: ResolverTypeWrapper<TripPreference>;
  UpdateExpenseInput: UpdateExpenseInput;
  User: ResolverTypeWrapper<User>;
  UserType: UserType;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Accommodation: Accommodation;
  Account: Account;
  Amenity: Amenity;
  BigInt: Scalars['BigInt']['output'];
  Boolean: Scalars['Boolean']['output'];
  BusinessPermit: BusinessPermit;
  Category: Category;
  CreateExpenseInput: CreateExpenseInput;
  CreatePoiInput: CreatePoiInput;
  CreateTripInput: CreateTripInput;
  CreateTripPreferenceInput: CreateTripPreferenceInput;
  CreateUserInput: CreateUserInput;
  DailyItinerary: DailyItinerary;
  DailyItineraryPoi: DailyItineraryPoi;
  DateTime: Scalars['DateTime']['output'];
  EditUserInput: EditUserInput;
  Expense: Expense;
  Float: Scalars['Float']['output'];
  Image: Image;
  Int: Scalars['Int']['output'];
  JSON: Scalars['JSON']['output'];
  Mutation: {};
  OperatingHour: OperatingHour;
  OperatingHoursInput: OperatingHoursInput;
  Poi: Poi;
  PoiImage: PoiImage;
  Query: {};
  Restaurant: Restaurant;
  Stamp: Stamp;
  String: Scalars['String']['output'];
  Subscription: {};
  Trip: Trip;
  TripPreference: TripPreference;
  UpdateExpenseInput: UpdateExpenseInput;
  User: User;
};

export type AccommodationResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Accommodation'] = ResolversParentTypes['Accommodation'],
> = {
  amenities?: Resolver<
    Array<ResolversTypes['Amenity']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  poiId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type AccountResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Account'] = ResolversParentTypes['Account'],
> = {
  isPremium?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  user?: Resolver<Maybe<ResolversTypes['User']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
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

export type BusinessPermitResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['BusinessPermit'] = ResolversParentTypes['BusinessPermit'],
> = {
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  imageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  isVerified?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  poiId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  userId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  dailyItineraryPois?: Resolver<
    Array<ResolversTypes['DailyItineraryPoi']>,
    ParentType,
    ContextType
  >;
  dayIndex?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  foodCost?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  transportationCost?: Resolver<
    ResolversTypes['Float'],
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type DailyItineraryPoiResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['DailyItineraryPoi'] = ResolversParentTypes['DailyItineraryPoi'],
> = {
  dailyItineraryId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  distance?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  duration?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  order?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  poi?: Resolver<ResolversTypes['Poi'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface DateTimeScalarConfig
  extends GraphQLScalarTypeConfig<ResolversTypes['DateTime'], any> {
  name: 'DateTime';
}

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
  dateSpent?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  note?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type ImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Image'] = ResolversParentTypes['Image'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
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
  claimStamp?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationClaimStampArgs, 'stampId' | 'userId'>
  >;
  createExpense?: Resolver<
    ResolversTypes['Expense'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateExpenseArgs, 'data' | 'tripId'>
  >;
  createPoi?: Resolver<
    ResolversTypes['Poi'],
    ParentType,
    ContextType,
    RequireFields<MutationCreatePoiArgs, 'input' | 'type' | 'userId'>
  >;
  createTrip?: Resolver<
    ResolversTypes['Trip'],
    ParentType,
    ContextType,
    RequireFields<
      MutationCreateTripArgs,
      'isPremium' | 'tripInput' | 'tripPreferenceInput' | 'userId'
    >
  >;
  createUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationCreateUserArgs, 'input'>
  >;
  deleteExpense?: Resolver<
    ResolversTypes['Expense'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteExpenseArgs, 'id'>
  >;
  deletePoi?: Resolver<
    ResolversTypes['Poi'],
    ParentType,
    ContextType,
    RequireFields<MutationDeletePoiArgs, 'poiId'>
  >;
  deleteTrip?: Resolver<
    ResolversTypes['Trip'],
    ParentType,
    ContextType,
    RequireFields<MutationDeleteTripArgs, 'id'>
  >;
  editUser?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<MutationEditUserArgs, 'input' | 'userId'>
  >;
  regenerateTrip?: Resolver<
    ResolversTypes['Trip'],
    ParentType,
    ContextType,
    RequireFields<MutationRegenerateTripArgs, 'id' | 'isPremium'>
  >;
  updateExpense?: Resolver<
    ResolversTypes['Expense'],
    ParentType,
    ContextType,
    RequireFields<MutationUpdateExpenseArgs, 'data' | 'id'>
  >;
};

export type OperatingHourResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['OperatingHour'] = ResolversParentTypes['OperatingHour'],
> = {
  closeTime?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  day?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  is24Hours?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  isClosed?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  openTime?: Resolver<
    Maybe<ResolversTypes['DateTime']>,
    ParentType,
    ContextType
  >;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PoiResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes['Poi'] = ResolversParentTypes['Poi'],
> = {
  accommodation?: Resolver<
    Maybe<ResolversTypes['Accommodation']>,
    ParentType,
    ContextType
  >;
  address?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  businessPermit?: Resolver<
    Maybe<ResolversTypes['BusinessPermit']>,
    ParentType,
    ContextType
  >;
  categories?: Resolver<
    Array<ResolversTypes['Category']>,
    ParentType,
    ContextType
  >;
  contactNumber?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  description?: Resolver<
    Maybe<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  images?: Resolver<Array<ResolversTypes['PoiImage']>, ParentType, ContextType>;
  isAttraction?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  latitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  longitude?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  name?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  operatingHours?: Resolver<
    Array<ResolversTypes['OperatingHour']>,
    ParentType,
    ContextType
  >;
  price?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  restaurant?: Resolver<
    Maybe<ResolversTypes['Restaurant']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  userId?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  visitDuration?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type PoiImageResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['PoiImage'] = ResolversParentTypes['PoiImage'],
> = {
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  imageId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  poiId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Query'] = ResolversParentTypes['Query'],
> = {
  accommodationCategoires?: Resolver<
    Array<ResolversTypes['Category']>,
    ParentType,
    ContextType
  >;
  amenities?: Resolver<
    Array<ResolversTypes['Amenity']>,
    ParentType,
    ContextType
  >;
  attractionCategoires?: Resolver<
    Array<ResolversTypes['Category']>,
    ParentType,
    ContextType
  >;
  categories?: Resolver<
    Array<ResolversTypes['Category']>,
    ParentType,
    ContextType
  >;
  poi?: Resolver<
    ResolversTypes['Poi'],
    ParentType,
    ContextType,
    RequireFields<QueryPoiArgs, 'poiId'>
  >;
  pois?: Resolver<
    Array<ResolversTypes['Poi']>,
    ParentType,
    ContextType,
    RequireFields<QueryPoisArgs, 'userId'>
  >;
  restaurantCategoires?: Resolver<
    Array<ResolversTypes['Category']>,
    ParentType,
    ContextType
  >;
  restaurantCategoriesMoreThanFive?: Resolver<
    Array<ResolversTypes['Category']>,
    ParentType,
    ContextType
  >;
  travelerAccount?: Resolver<
    ResolversTypes['Account'],
    ParentType,
    ContextType,
    RequireFields<QueryTravelerAccountArgs, 'id'>
  >;
  trip?: Resolver<
    ResolversTypes['Trip'],
    ParentType,
    ContextType,
    RequireFields<QueryTripArgs, 'id'>
  >;
  trips?: Resolver<
    Array<ResolversTypes['Trip']>,
    ParentType,
    ContextType,
    RequireFields<QueryTripsArgs, 'userId'>
  >;
  unclaimedStamps?: Resolver<
    Array<ResolversTypes['Stamp']>,
    ParentType,
    ContextType,
    RequireFields<QueryUnclaimedStampsArgs, 'userId'>
  >;
  user?: Resolver<
    ResolversTypes['User'],
    ParentType,
    ContextType,
    RequireFields<QueryUserArgs, 'id'>
  >;
};

export type RestaurantResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Restaurant'] = ResolversParentTypes['Restaurant'],
> = {
  atmospheres?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  poiId?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type StampResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Stamp'] = ResolversParentTypes['Stamp'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  image?: Resolver<ResolversTypes['Image'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type SubscriptionResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Subscription'] = ResolversParentTypes['Subscription'],
> = {
  amount?: SubscriptionResolver<
    ResolversTypes['Float'],
    'amount',
    ParentType,
    ContextType
  >;
  endDate?: SubscriptionResolver<
    ResolversTypes['DateTime'],
    'endDate',
    ParentType,
    ContextType
  >;
  id?: SubscriptionResolver<
    ResolversTypes['String'],
    'id',
    ParentType,
    ContextType
  >;
  startDate?: SubscriptionResolver<
    ResolversTypes['DateTime'],
    'startDate',
    ParentType,
    ContextType
  >;
  status?: SubscriptionResolver<
    ResolversTypes['SubscriptionStatus'],
    'status',
    ParentType,
    ContextType
  >;
  userId?: SubscriptionResolver<
    ResolversTypes['String'],
    'userId',
    ParentType,
    ContextType
  >;
};

export type TripResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['Trip'] = ResolversParentTypes['Trip'],
> = {
  budget?: Resolver<ResolversTypes['Float'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  dailyItineraries?: Resolver<
    Array<ResolversTypes['DailyItinerary']>,
    ParentType,
    ContextType
  >;
  destination?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  endDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  expenses?: Resolver<
    Array<ResolversTypes['Expense']>,
    ParentType,
    ContextType
  >;
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
  startDate?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  startingLocation?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  timeSlots?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  title?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  travelSize?: Resolver<ResolversTypes['TravelSize'], ParentType, ContextType>;
  travelerCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tripPreference?: Resolver<
    Maybe<ResolversTypes['TripPreference']>,
    ParentType,
    ContextType
  >;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TripPreferenceResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['TripPreference'] = ResolversParentTypes['TripPreference'],
> = {
  accommodationType?: Resolver<
    ResolversTypes['String'],
    ParentType,
    ContextType
  >;
  activities?: Resolver<ResolversTypes['JSON'], ParentType, ContextType>;
  amenities?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  cuisines?: Resolver<Array<ResolversTypes['String']>, ParentType, ContextType>;
  diningStyles?: Resolver<
    Array<ResolversTypes['String']>,
    ParentType,
    ContextType
  >;
  id?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  tripId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type UserResolvers<
  ContextType = any,
  ParentType extends
    ResolversParentTypes['User'] = ResolversParentTypes['User'],
> = {
  createdAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  email?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  firstName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  id?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  lastName?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  password?: Resolver<ResolversTypes['String'], ParentType, ContextType>;
  pois?: Resolver<Array<ResolversTypes['Poi']>, ParentType, ContextType>;
  stamps?: Resolver<Array<ResolversTypes['Stamp']>, ParentType, ContextType>;
  subscription?: Resolver<
    Maybe<ResolversTypes['Subscription']>,
    ParentType,
    ContextType
  >;
  tripCount?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  trips?: Resolver<Array<ResolversTypes['Trip']>, ParentType, ContextType>;
  type?: Resolver<ResolversTypes['UserType'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['DateTime'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type Resolvers<ContextType = any> = {
  Accommodation?: AccommodationResolvers<ContextType>;
  Account?: AccountResolvers<ContextType>;
  Amenity?: AmenityResolvers<ContextType>;
  BigInt?: GraphQLScalarType;
  BusinessPermit?: BusinessPermitResolvers<ContextType>;
  Category?: CategoryResolvers<ContextType>;
  DailyItinerary?: DailyItineraryResolvers<ContextType>;
  DailyItineraryPoi?: DailyItineraryPoiResolvers<ContextType>;
  DateTime?: GraphQLScalarType;
  Expense?: ExpenseResolvers<ContextType>;
  Image?: ImageResolvers<ContextType>;
  JSON?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  OperatingHour?: OperatingHourResolvers<ContextType>;
  Poi?: PoiResolvers<ContextType>;
  PoiImage?: PoiImageResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Restaurant?: RestaurantResolvers<ContextType>;
  Stamp?: StampResolvers<ContextType>;
  Subscription?: SubscriptionResolvers<ContextType>;
  Trip?: TripResolvers<ContextType>;
  TripPreference?: TripPreferenceResolvers<ContextType>;
  User?: UserResolvers<ContextType>;
};

export type CreateExpenseMutationVariables = Exact<{
  tripId: Scalars['Int']['input'];
  data: CreateExpenseInput;
}>;

export type CreateExpenseMutation = {
  __typename?: 'Mutation';
  createExpense: { __typename?: 'Expense'; id: number };
};

export type UpdateExpenseMutationVariables = Exact<{
  expenseId: Scalars['Int']['input'];
  data: UpdateExpenseInput;
}>;

export type UpdateExpenseMutation = {
  __typename?: 'Mutation';
  updateExpense: { __typename?: 'Expense'; id: number };
};

export type DeleteExpenseMutationVariables = Exact<{
  expenseId: Scalars['Int']['input'];
}>;

export type DeleteExpenseMutation = {
  __typename?: 'Mutation';
  deleteExpense: { __typename?: 'Expense'; id: number };
};

export type CreatePoiMutationVariables = Exact<{
  type: Scalars['String']['input'];
  userId: Scalars['String']['input'];
  input: CreatePoiInput;
}>;

export type CreatePoiMutation = {
  __typename?: 'Mutation';
  createPoi: { __typename?: 'Poi'; id: string };
};

export type DeletePoiMutationVariables = Exact<{
  poiId: Scalars['String']['input'];
}>;

export type DeletePoiMutation = {
  __typename?: 'Mutation';
  deletePoi: { __typename?: 'Poi'; id: string };
};

export type CreateTripMutationVariables = Exact<{
  isPremium: Scalars['Boolean']['input'];
  userId: Scalars['String']['input'];
  tripInput: CreateTripInput;
  tripPreferenceInput: CreateTripPreferenceInput;
}>;

export type CreateTripMutation = {
  __typename?: 'Mutation';
  createTrip: { __typename?: 'Trip'; id: number };
};

export type DeleteTripMutationVariables = Exact<{
  tripId: Scalars['Int']['input'];
}>;

export type DeleteTripMutation = {
  __typename?: 'Mutation';
  deleteTrip: { __typename?: 'Trip'; id: number };
};

export type RegenerateTripMutationVariables = Exact<{
  isPremium: Scalars['Boolean']['input'];
  regenerateTripId: Scalars['Int']['input'];
}>;

export type RegenerateTripMutation = {
  __typename?: 'Mutation';
  regenerateTrip: { __typename?: 'Trip'; id: number };
};

export type CreateUserMutationVariables = Exact<{
  input: CreateUserInput;
}>;

export type CreateUserMutation = {
  __typename?: 'Mutation';
  createUser: { __typename?: 'User'; id: string };
};

export type EditUserMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  input: EditUserInput;
}>;

export type EditUserMutation = {
  __typename?: 'Mutation';
  editUser: { __typename?: 'User'; id: string };
};

export type ClaimStampMutationVariables = Exact<{
  userId: Scalars['String']['input'];
  stampId: Scalars['Int']['input'];
}>;

export type ClaimStampMutation = {
  __typename?: 'Mutation';
  claimStamp: { __typename?: 'User'; id: string };
};

export type GetBusinessesQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetBusinessesQuery = {
  __typename?: 'Query';
  pois: Array<{
    __typename?: 'Poi';
    id: string;
    name: string;
    address: string;
    images: Array<{
      __typename?: 'PoiImage';
      image: { __typename?: 'Image'; id: string; url: string };
    }>;
    businessPermit?: {
      __typename?: 'BusinessPermit';
      id: string;
      isVerified: boolean;
    } | null;
  }>;
};

export type GetBusinessDetailsQueryVariables = Exact<{
  poiId: Scalars['String']['input'];
}>;

export type GetBusinessDetailsQuery = {
  __typename?: 'Query';
  poi: {
    __typename?: 'Poi';
    id: string;
    name: string;
    address: string;
    contactNumber: string;
    description?: string | null;
    price: string;
    visitDuration: number;
    accommodation?: {
      __typename?: 'Accommodation';
      id: number;
      amenities: Array<{ __typename?: 'Amenity'; name: string }>;
    } | null;
    restaurant?: {
      __typename?: 'Restaurant';
      id: number;
      atmospheres: Array<string>;
    } | null;
    categories: Array<{ __typename?: 'Category'; name: string }>;
    operatingHours: Array<{
      __typename?: 'OperatingHour';
      id: number;
      day: number;
      closeTime?: any | null;
      openTime?: any | null;
      isClosed: boolean;
      is24Hours: boolean;
    }>;
  };
};

export type GetAllCategoriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetAllCategoriesQuery = {
  __typename?: 'Query';
  categories: Array<{ __typename?: 'Category'; id: number; name: string }>;
};

export type GetPoiFeaturesQueryVariables = Exact<{ [key: string]: never }>;

export type GetPoiFeaturesQuery = {
  __typename?: 'Query';
  amenities: Array<{ __typename?: 'Amenity'; id: number; name: string }>;
  restaurantCategoriesMoreThanFive: Array<{
    __typename?: 'Category';
    id: number;
    name: string;
  }>;
};

export type GetPoiFacilitiesQueryVariables = Exact<{ [key: string]: never }>;

export type GetPoiFacilitiesQuery = {
  __typename?: 'Query';
  restaurantCategoires: Array<{
    __typename?: 'Category';
    id: number;
    name: string;
  }>;
  attractionCategoires: Array<{
    __typename?: 'Category';
    id: number;
    name: string;
  }>;
  accommodationCategoires: Array<{
    __typename?: 'Category';
    id: number;
    name: string;
  }>;
  amenities: Array<{ __typename?: 'Amenity'; id: number; name: string }>;
};

export type GetTripsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetTripsQuery = {
  __typename?: 'Query';
  travelerAccount: {
    __typename?: 'Account';
    isPremium: boolean;
    user?: {
      __typename?: 'User';
      tripCount: number;
      trips: Array<{
        __typename?: 'Trip';
        id: number;
        budget: number;
        endDate: any;
        startDate: any;
        title: string;
        destination: string;
        travelerCount: number;
        travelSize: TravelSize;
      }>;
    } | null;
  };
};

export type GetTripExpensesQueryVariables = Exact<{
  tripId: Scalars['Int']['input'];
}>;

export type GetTripExpensesQuery = {
  __typename?: 'Query';
  trip: {
    __typename?: 'Trip';
    id: number;
    budget: number;
    startDate: any;
    endDate: any;
    expenses: Array<{
      __typename?: 'Expense';
      id: number;
      amount: number;
      category: ExpenseCategory;
      note: string;
      dateSpent: any;
    }>;
  };
};

export type GetTripItineraryQueryVariables = Exact<{
  tripId: Scalars['Int']['input'];
}>;

export type GetTripItineraryQuery = {
  __typename?: 'Query';
  trip: {
    __typename?: 'Trip';
    budget: number;
    startDate: any;
    endDate: any;
    isAccommodationIncluded: boolean;
    isTransportationIncluded: boolean;
    travelerCount: number;
    startingLocation: any;
    timeSlots: any;
    dailyItineraries: Array<{
      __typename?: 'DailyItinerary';
      id: number;
      accommodationCost: number;
      attractionCost: number;
      transportationCost: number;
      foodCost: string;
      dayIndex: number;
      dailyItineraryPois: Array<{
        __typename?: 'DailyItineraryPoi';
        id: number;
        order: number;
        distance: number;
        duration: number;
        poi: {
          __typename?: 'Poi';
          id: string;
          name: string;
          price: string;
          visitDuration: number;
          longitude: number;
          latitude: number;
          isAttraction: boolean;
          restaurant?: { __typename?: 'Restaurant'; id: number } | null;
          accommodation?: { __typename?: 'Accommodation'; id: number } | null;
          images: Array<{
            __typename?: 'PoiImage';
            image: { __typename?: 'Image'; url: string };
          }>;
        };
      }>;
    }>;
  };
};

export type GetDailyItineraryPoiDetailsQueryVariables = Exact<{
  poiId: Scalars['String']['input'];
}>;

export type GetDailyItineraryPoiDetailsQuery = {
  __typename?: 'Query';
  poi: {
    __typename?: 'Poi';
    id: string;
    name: string;
    price: string;
    visitDuration: number;
    description?: string | null;
    address: string;
    contactNumber: string;
    categories: Array<{ __typename?: 'Category'; name: string }>;
    operatingHours: Array<{
      __typename?: 'OperatingHour';
      day: number;
      openTime?: any | null;
      closeTime?: any | null;
      isClosed: boolean;
      is24Hours: boolean;
    }>;
    accommodation?: {
      __typename?: 'Accommodation';
      amenities: Array<{ __typename?: 'Amenity'; name: string }>;
    } | null;
    restaurant?: {
      __typename?: 'Restaurant';
      atmospheres: Array<string>;
    } | null;
  };
};

export type GetUserInfoQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetUserInfoQuery = {
  __typename?: 'Query';
  user: {
    __typename?: 'User';
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    stamps: Array<{
      __typename?: 'Stamp';
      id: number;
      title: string;
      image: { __typename?: 'Image'; url: string };
    }>;
  };
};

export type GetUnclaimedStampsQueryVariables = Exact<{
  userId: Scalars['String']['input'];
}>;

export type GetUnclaimedStampsQuery = {
  __typename?: 'Query';
  unclaimedStamps: Array<{
    __typename?: 'Stamp';
    id: number;
    title: string;
    image: { __typename?: 'Image'; id: string; url: string };
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
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tripId' },
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
                name: { kind: 'Name', value: 'tripId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'tripId' },
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
            name: { kind: 'Name', value: 'expenseId' },
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
                  name: { kind: 'Name', value: 'expenseId' },
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
            name: { kind: 'Name', value: 'expenseId' },
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
                  name: { kind: 'Name', value: 'expenseId' },
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
export const CreatePoiDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'CreatePoi' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: { kind: 'Variable', name: { kind: 'Name', value: 'type' } },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'String' },
            },
          },
        },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreatePoiInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'createPoi' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'type' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'type' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
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
} as unknown as DocumentNode<CreatePoiMutation, CreatePoiMutationVariables>;
export const DeletePoiDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'DeletePoi' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'poiId' },
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
            name: { kind: 'Name', value: 'deletePoi' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'poiId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'poiId' },
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
} as unknown as DocumentNode<DeletePoiMutation, DeletePoiMutationVariables>;
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
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'isPremium' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Boolean' },
            },
          },
        },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'tripInput' },
          },
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
            name: { kind: 'Name', value: 'tripPreferenceInput' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'CreateTripPreferenceInput' },
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
                name: { kind: 'Name', value: 'isPremium' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'isPremium' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tripInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'tripInput' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'tripPreferenceInput' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'tripPreferenceInput' },
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
            name: { kind: 'Name', value: 'deleteTrip' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<DeleteTripMutation, DeleteTripMutationVariables>;
export const RegenerateTripDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'RegenerateTrip' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'isPremium' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'Boolean' },
            },
          },
        },
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'regenerateTripId' },
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
            name: { kind: 'Name', value: 'regenerateTrip' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'isPremium' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'isPremium' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'id' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'regenerateTripId' },
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
  RegenerateTripMutation,
  RegenerateTripMutationVariables
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
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
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
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
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
export const EditUserDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'EditUser' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'input' },
          },
          type: {
            kind: 'NonNullType',
            type: {
              kind: 'NamedType',
              name: { kind: 'Name', value: 'EditUserInput' },
            },
          },
        },
      ],
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'editUser' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'input' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'input' },
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
} as unknown as DocumentNode<EditUserMutation, EditUserMutationVariables>;
export const ClaimStampDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'mutation',
      name: { kind: 'Name', value: 'ClaimStamp' },
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
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'stampId' },
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
            name: { kind: 'Name', value: 'claimStamp' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'userId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'userId' },
                },
              },
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'stampId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'stampId' },
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
} as unknown as DocumentNode<ClaimStampMutation, ClaimStampMutationVariables>;
export const GetBusinessesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetBusinesses' },
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
            name: { kind: 'Name', value: 'pois' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'images' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'image' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'businessPermit' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isVerified' },
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
} as unknown as DocumentNode<GetBusinessesQuery, GetBusinessesQueryVariables>;
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
            name: { kind: 'Name', value: 'poiId' },
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
            name: { kind: 'Name', value: 'poi' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'poiId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'poiId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contactNumber' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'visitDuration' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accommodation' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amenities' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'restaurant' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'atmospheres' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'operatingHours' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'day' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'closeTime' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'openTime' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isClosed' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'is24Hours' },
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
} as unknown as DocumentNode<
  GetBusinessDetailsQuery,
  GetBusinessDetailsQueryVariables
>;
export const GetAllCategoriesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetAllCategories' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
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
        ],
      },
    },
  ],
} as unknown as DocumentNode<
  GetAllCategoriesQuery,
  GetAllCategoriesQueryVariables
>;
export const GetPoiFeaturesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPoiFeatures' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
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
            name: { kind: 'Name', value: 'restaurantCategoriesMoreThanFive' },
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
} as unknown as DocumentNode<GetPoiFeaturesQuery, GetPoiFeaturesQueryVariables>;
export const GetPoiFacilitiesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetPoiFacilities' },
      selectionSet: {
        kind: 'SelectionSet',
        selections: [
          {
            kind: 'Field',
            name: { kind: 'Name', value: 'restaurantCategoires' },
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
            name: { kind: 'Name', value: 'attractionCategoires' },
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
            name: { kind: 'Name', value: 'accommodationCategoires' },
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
            name: { kind: 'Name', value: 'amenities' },
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
  GetPoiFacilitiesQuery,
  GetPoiFacilitiesQueryVariables
>;
export const GetTripsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTrips' },
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
            name: { kind: 'Name', value: 'travelerAccount' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'user' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'tripCount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'trips' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'budget' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'endDate' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'startDate' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'title' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'destination' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'travelerCount' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'travelSize' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'isPremium' } },
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetTripsQuery, GetTripsQueryVariables>;
export const GetTripExpensesDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTripExpenses' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'budget' } },
                { kind: 'Field', name: { kind: 'Name', value: 'startDate' } },
                { kind: 'Field', name: { kind: 'Name', value: 'endDate' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'expenses' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amount' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'category' },
                      },
                      { kind: 'Field', name: { kind: 'Name', value: 'note' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dateSpent' },
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
} as unknown as DocumentNode<
  GetTripExpensesQuery,
  GetTripExpensesQueryVariables
>;
export const GetTripItineraryDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetTripItinerary' },
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
                  name: { kind: 'Name', value: 'isAccommodationIncluded' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'isTransportationIncluded' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'travelerCount' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'startingLocation' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'timeSlots' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'dailyItineraries' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'accommodationCost' },
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
                        name: { kind: 'Name', value: 'foodCost' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dayIndex' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'dailyItineraryPois' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'id' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'order' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'distance' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'duration' },
                            },
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'poi' },
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
                                    name: {
                                      kind: 'Name',
                                      value: 'visitDuration',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'longitude' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'latitude' },
                                  },
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'isAttraction',
                                    },
                                  },
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'restaurant' },
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
                                  {
                                    kind: 'Field',
                                    name: {
                                      kind: 'Name',
                                      value: 'accommodation',
                                    },
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
                                  {
                                    kind: 'Field',
                                    name: { kind: 'Name', value: 'images' },
                                    selectionSet: {
                                      kind: 'SelectionSet',
                                      selections: [
                                        {
                                          kind: 'Field',
                                          name: {
                                            kind: 'Name',
                                            value: 'image',
                                          },
                                          selectionSet: {
                                            kind: 'SelectionSet',
                                            selections: [
                                              {
                                                kind: 'Field',
                                                name: {
                                                  kind: 'Name',
                                                  value: 'url',
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
  GetTripItineraryQuery,
  GetTripItineraryQueryVariables
>;
export const GetDailyItineraryPoiDetailsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetDailyItineraryPoiDetails' },
      variableDefinitions: [
        {
          kind: 'VariableDefinition',
          variable: {
            kind: 'Variable',
            name: { kind: 'Name', value: 'poiId' },
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
            name: { kind: 'Name', value: 'poi' },
            arguments: [
              {
                kind: 'Argument',
                name: { kind: 'Name', value: 'poiId' },
                value: {
                  kind: 'Variable',
                  name: { kind: 'Name', value: 'poiId' },
                },
              },
            ],
            selectionSet: {
              kind: 'SelectionSet',
              selections: [
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                { kind: 'Field', name: { kind: 'Name', value: 'price' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'visitDuration' },
                },
                { kind: 'Field', name: { kind: 'Name', value: 'description' } },
                { kind: 'Field', name: { kind: 'Name', value: 'address' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'contactNumber' },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'categories' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'name' } },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'operatingHours' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'day' } },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'openTime' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'closeTime' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'isClosed' },
                      },
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'is24Hours' },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'accommodation' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'amenities' },
                        selectionSet: {
                          kind: 'SelectionSet',
                          selections: [
                            {
                              kind: 'Field',
                              name: { kind: 'Name', value: 'name' },
                            },
                          ],
                        },
                      },
                    ],
                  },
                },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'restaurant' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      {
                        kind: 'Field',
                        name: { kind: 'Name', value: 'atmospheres' },
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
} as unknown as DocumentNode<
  GetDailyItineraryPoiDetailsQuery,
  GetDailyItineraryPoiDetailsQueryVariables
>;
export const GetUserInfoDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUserInfo' },
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
                { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                { kind: 'Field', name: { kind: 'Name', value: 'email' } },
                { kind: 'Field', name: { kind: 'Name', value: 'firstName' } },
                { kind: 'Field', name: { kind: 'Name', value: 'lastName' } },
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'stamps' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'title' } },
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
              ],
            },
          },
        ],
      },
    },
  ],
} as unknown as DocumentNode<GetUserInfoQuery, GetUserInfoQueryVariables>;
export const GetUnclaimedStampsDocument = {
  kind: 'Document',
  definitions: [
    {
      kind: 'OperationDefinition',
      operation: 'query',
      name: { kind: 'Name', value: 'GetUnclaimedStamps' },
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
            name: { kind: 'Name', value: 'unclaimedStamps' },
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
                {
                  kind: 'Field',
                  name: { kind: 'Name', value: 'image' },
                  selectionSet: {
                    kind: 'SelectionSet',
                    selections: [
                      { kind: 'Field', name: { kind: 'Name', value: 'id' } },
                      { kind: 'Field', name: { kind: 'Name', value: 'url' } },
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
  GetUnclaimedStampsQuery,
  GetUnclaimedStampsQueryVariables
>;
