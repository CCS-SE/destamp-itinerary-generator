import { enumType } from 'nexus';

export const UserType = enumType({
  name: 'UserType',
  members: ['TRAVELER', 'BUSINESS_OPERATOR'],
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

export const SubscriptionStatus = enumType({
  name: 'SubscriptionStatus',
  members: ['ACTIVE', 'EXPIRED', 'CANCELLED'],
});

export default [UserType, TravelSize, ExpenseCategory, SubscriptionStatus];
