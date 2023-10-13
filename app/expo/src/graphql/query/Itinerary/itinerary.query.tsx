import { gql } from '@apollo/client';

export const GetTravelersItineraryQuery = gql(
  `query GetTravelerItinerary($tripId: Int!) {
        itinerary(tripId: $tripId) {
          id
          totalCost
          dailyItineraries {
            id
            foodCost
            attractionCost
            transportationCost
            accommodationCost
            travelDistances
            travelDurations
            dayIndex
            destinations {
              id
              name
              price
              type
              visitDuration
              contactNumber
              address
              isClaimed
              images {
                url
              }
              openingHours {
                day
                openTime
                closeTime
              }
            }
          }
        }
      
        trip(id: $tripId) {
          budget
          startDate
          endDate
          preferredTime
          isAccommodationIncluded
          isTransportationIncluded
          departingLocation {
            name
          }
        }
      }`,
);
