import { gql } from '@apollo/client';

export const GetTripsQuery = gql(
  `query GetTrips($userId: String!) {
    travelerAccount(id: $userId) {
      user {
        tripCount
        trips {
          id
          budget
          endDate
          startDate
          title
          destination
          travelerCount
          travelSize
        }
      }
      isPremium
    }
  }`,
);
export const GetTripExpensesQuery = gql(
  `query GetTripExpenses($tripId: Int!) {
    trip(id: $tripId) {
      id
      budget
      startDate
      endDate
      expenses {
        id
        amount
        category
        note
        dateSpent
      }
    }
  }
  `,
);

export const GetTripItineraryQuery = gql(
  `query GetTripItinerary($tripId: Int!) {
    trip(id: $tripId) {
      budget
      startDate
      endDate
      isAccommodationIncluded
      isTransportationIncluded
      travelerCount
      startingLocation
      timeSlots
      dailyItineraries {
        id
        accommodationCost
        attractionCost
        transportationCost
        foodCost
        dayIndex
        dailyItineraryPois {
          id
          order
          distance
          duration
          poi {
            id
            name
            price
            visitDuration          
            longitude
            latitude
            isAttraction
            restaurant { 
              id
            }
            accommodation {
              id
            }
            images {
              image {
                url
              }
            }
          }
        }
      }
    }
  }
  `,
);

export const GetDailyItineraryPoiDetailsQuery = gql(
  `query GetDailyItineraryPoiDetails($poiId: String!) {
    poi(poiId: $poiId) {
      id
      name
      price
      visitDuration
      description
      address
      contactNumber
      categories {
        name
      }
      operatingHours {
        day
        openTime
        closeTime
        isClosed
        is24Hours
      }
      accommodation {
        amenities {
          name
        }
      }
      restaurant {
        atmospheres
      }
    }
  }
  `,
);
