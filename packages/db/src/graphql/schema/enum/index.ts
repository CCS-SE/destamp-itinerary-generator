import { enumType } from 'nexus';

export const UserType = enumType({
  name: 'UserType',
  members: ['TRAVELER', 'BUSINESS_OPERATOR'],
});

export const PlaceType = enumType({
  name: 'PlaceType',
  members: ['ACCOMMODATION', 'RESTAURANT', 'ATTRACTION'],
});

export const TravelSize = enumType({
  name: 'TravelSize',
  members: ['SOLO', 'COUPLE', 'FAMILY', 'GROUP'],
});

export const ExpenseCategory = enumType({
  name: 'ExpenseCategory',
  members: [
    'ACCOMMODATION',
    'FOOD',
    'TRANSPORTATION',
    'SIGHTSEEING',
    'SHOPPING',
    'ACTIVITY',
    'OTHER',
  ],
});

export default [UserType, TravelSize, PlaceType, ExpenseCategory];
