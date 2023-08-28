import { enumType } from 'nexus';

export const UserType = enumType({
  name: 'UserType',
  members: ['TRAVELER', 'BUSINESS_OPERATOR'],
});

export const TravelSize = enumType({
  name: 'TravelSize',
  members: ['SOLO', 'COUPLE', 'FAMILY', 'GROUP'],
});

export default [UserType, TravelSize];
