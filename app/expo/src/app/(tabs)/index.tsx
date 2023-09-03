import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import AbsoluteButton from '~/components/Button/AbsoluteButton';
import TripCard from '~/components/Card/TripCard';
import { AuthContext } from '~/context/AuthProvider';
import { GetTravelerTripsDocument } from '~/graphql/generated';
import MyTripEmptyState from '~/screens/MyTrip/EmptyState';

export const GetTravelerTripsQuery = gql(
  `query GetTravelerTrips($userId: String!) {
    travelerTrips(userId: $userId) {
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
  }
  `,
);

export default function MyTripScreen() {
  const { session } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GetTravelerTripsDocument, {
    variables: {
      userId: session ? session.user.id : '',
    },
  });

  if (error)
    return (
      <Text testID="my-trip-error">{`Error! ${error.message.toString()}`}</Text>
    );

  if (loading && !data)
    return <Text testID="my-trip-loading">{'Loading...'}</Text>;

  if (data?.travelerTrips.length === 0) {
    return <MyTripEmptyState />;
  }

  return (
    <View testID="my-trip" className="flex-1 items-center bg-gray-50">
      {data && (
        <FlatList
          testID="my-trip-list"
          data={data.travelerTrips}
          renderItem={({ item }) => (
            <TripCard
              id={item.id}
              imgSrc={item.destination!.image!.url}
              destination={item.destination!.name}
              startDate={item.startDate}
              endDate={item.endDate}
              budget={item.budget}
              travelSize={item.travelSize}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <AbsoluteButton title="+" />
    </View>
  );
}
