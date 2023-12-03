import React, { useContext } from 'react';
import { FlatList, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useQuery } from '@apollo/client';

import AbsoluteButton from '~/components/Button/AbsoluteButton';
import TripCard from '~/components/Card/traveler/TripCard';
import MyTripEmptyState from '~/components/EmptyState/MyTripEmptyState';
import TripScreenSkeleton from '~/components/Skeleton/TripScreenSkeleton';
import { AuthContext } from '~/context/AuthProvider';
import { GetStampDocument, GetTripsDocument } from '~/graphql/generated';

export default function MyTrip() {
  const { user } = useContext(AuthContext);

  const stamp = useQuery(GetStampDocument, {
    variables: {
      stampId: 1,
    },
  });

  const { loading, error, data } = useQuery(GetTripsDocument, {
    variables: {
      userId: user ? user.id : '',
      stampId: stamp.data ? stamp.data?.stamp.id : 0,
    },
  });

  const handleCreateTrip = () => {
    router.push('/traveler/trip/create');
  };

  if (error)
    return (
      <Text testID="my-trip-error">{`Error! ${error.message.toString()}`}</Text>
    );

  if (loading && !data)
    return (
      <View className="flex-1 items-center" testID="my-trip-loading">
        <TripScreenSkeleton />
      </View>
    );

  if (!loading && data?.trips.length === 0) {
    return <MyTripEmptyState />;
  }

  return (
    <View testID="my-trip" className="flex-1 items-center bg-gray-50">
      {data && (
        <FlatList
          testID="my-trip-list"
          data={data.trips}
          renderItem={({ item }) => (
            <TripCard
              id={item.id}
              title={item.title}
              startDate={item.startDate}
              endDate={item.endDate}
              budget={item.budget}
              travelSize={item.travelSize}
              totalTravellers={item.travelerCount}
              stampId={stamp.data?.stamp.id || 0}
              stampUrl={stamp.data?.stamp.image.url || ''}
              stampTitle={stamp.data?.stamp.title || ''}
              isStampClaimed={data.isStampedClaimed}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <AbsoluteButton title="+" onPress={handleCreateTrip} />
    </View>
  );
}
