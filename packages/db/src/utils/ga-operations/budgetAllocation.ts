import { NexusGenInputs } from '../../graphql/generated/nexus';

type CreateTripInput = NexusGenInputs['CreateTripInput'];

const budgetAllocation = {
  allIncluded: {
    ACCOMMODATION: 0.25,
    ATTRACTION: 0.2,
    FOOD: 0.3,
    TRANSPORT: 0.25,
  },
  noTransport: {
    ACCOMMODATION: 0.33,
    ATTRACTION: 0.24,
    FOOD: 0.43,
    TRANSPORT: 0,
  },
  noAccommodation: {
    ACCOMMODATION: 0,
    FOOD: 0.45,
    ATTRACTION: 0.275,
    TRANSPORT: 0.275,
  },
  noFood: {
    ACCOMMODATION: 0.355,
    FOOD: 0.45,
    ATTRACTION: 0.34,
    TRANSPORT: 0.305,
  },
  noTransportAndAccommodation: {
    ACCOMMODATION: 0,
    FOOD: 0.6,
    ATTRACTION: 0.4,
    TRANSPORT: 0,
  },
  noTransportAndFood: {
    FOOD: 0,
    ATTRACTION: 0.5,
    ACCOMMODATION: 0.5,
    TRANSPORT: 0,
  },
  noAccommodationAndFood: {
    FOOD: 0,
    ATTRACTION: 0.4,
    ACCOMMODATION: 0,
    TRANSPORT: 0.6,
  },
  noTransportAccommodationAndFood: {
    ATTRACTION: 1,
    FOOD: 0,
    ACCOMMODATION: 0,
    TRANSPORT: 0,
  },
};

export const getBudgetAllocation = (input: CreateTripInput) => {
  const { isAccommodationIncluded, isFoodIncluded, isTransportationIncluded } =
    input;

  if (isAccommodationIncluded && isFoodIncluded && isTransportationIncluded) {
    return budgetAllocation.allIncluded;
  }

  if (isAccommodationIncluded && isFoodIncluded && !isTransportationIncluded) {
    return budgetAllocation.noTransport;
  }

  if (!isAccommodationIncluded && isFoodIncluded && isTransportationIncluded) {
    return budgetAllocation.noAccommodation;
  }

  if (isAccommodationIncluded && !isFoodIncluded && isTransportationIncluded) {
    return budgetAllocation.noFood;
  }

  if (!isAccommodationIncluded && isFoodIncluded && !isTransportationIncluded) {
    return budgetAllocation.noTransportAndAccommodation;
  }

  if (isAccommodationIncluded && !isFoodIncluded && !isTransportationIncluded) {
    return budgetAllocation.noTransportAndFood;
  }

  if (!isAccommodationIncluded && !isFoodIncluded && isTransportationIncluded) {
    return budgetAllocation.noAccommodationAndFood;
  }

  if (
    !isAccommodationIncluded &&
    !isFoodIncluded &&
    !isTransportationIncluded
  ) {
    return budgetAllocation.noTransportAccommodationAndFood;
  }
};
