import { list, nonNull, queryField, stringArg } from 'nexus';

import {
  queryAccommodationCategories,
  queryAllAmenities,
  queryAllCategories,
  queryAttractionCategories,
  queryPoi,
  queryRestaurantCategories,
  queryRestaurantCategoriesMoreThanFive,
} from './poi.resolver';

const Poi = queryField('poi', {
  type: nonNull('Poi'),
  args: {
    poiId: nonNull(stringArg()),
  },
  resolve: (_, args, ctx, info) => queryPoi(args.poiId, ctx, info),
});

const Categories = queryField('categories', {
  type: nonNull(list('Category')),
  resolve: (_, __, ctx) => queryAllCategories(ctx),
});

const Amenities = queryField('amenities', {
  type: nonNull(list('Amenity')),
  resolve: (_, __, ctx) => queryAllAmenities(ctx),
});

const RestaurantCategoriesMoreThanFive = queryField(
  'restaurantCategoriesMoreThanFive',
  {
    type: nonNull(list('Category')),
    resolve: (_, __, ctx) => queryRestaurantCategoriesMoreThanFive(ctx),
  },
);

const RestaurantCategories = queryField('restaurantCategoires', {
  type: list('Category'),
  resolve: (_, __, ctx) => queryRestaurantCategories(ctx),
});

const AttractionCategories = queryField('attractionCategoires', {
  type: list('Category'),
  resolve: (_, __, ctx) => queryAttractionCategories(ctx),
});

const AccommodationCategories = queryField('accommodationCategoires', {
  type: list('Category'),
  resolve: (_, __, ctx) => queryAccommodationCategories(ctx),
});

export default [
  Poi,
  Categories,
  Amenities,
  RestaurantCategoriesMoreThanFive,
  RestaurantCategories,
  AccommodationCategories,
  AttractionCategories,
  Amenities,
];
