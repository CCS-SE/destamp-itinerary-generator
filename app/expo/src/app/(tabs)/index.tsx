import React from "react";
import {
  FlatList,
  Text,
  View,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import AbsoluteButton from "~/components/Button/AbsoluteButton";
import TripCard from "~/components/Card/TripCard";
import { GetAllTripsDocument } from "~/graphql/generated";
import MyTripEmptyState from "~/screens/MyTrip/EmptyState";

export const GetAllTripsQuery = gql(
  `query GetAllTrips {
    trips {
      id
      title
      budget
      destination {
        name
        image {
          url
        }
      }
      travelSize
      startDate
      endDate
    }
  }`,
);

export default function MyTripScreen() {

  const { loading, error, data } = useQuery(GetAllTripsDocument);

  if (error) return <Text>{`Error! ${error}`}</Text>;

  if (loading) return <Text>{"Loading..."}</Text>;

  if (data?.trips.length === 0) {
    return <MyTripEmptyState />;
  }

  return (
    <View className="flex-1 items-center bg-gray-50">
      {data && (
        <FlatList
          data={data.trips}
          renderItem={({ item }) => (
            <TripCard
              id={item.id}
              imgSrc={item.destination.image.url}
              destination={item.destination.name}
              startDate={item.startDate}
              endDate={item.endDate}
              budget={item.budget}
              travelSize={item.travelSize}
            />
          )}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
        />
      )}
      <AbsoluteButton title="+" />
    </View>
  );
}
