import React, { useContext, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { router } from 'expo-router';
import { useQuery } from '@apollo/client';
import LottieView from 'lottie-react-native';
import moment from 'moment';

import AbsoluteButton from '~/components/Button/AbsoluteButton';
import ClaimStampCard from '~/components/Card/traveler/ClaimStampCard';
import TripCard from '~/components/Card/traveler/TripCard';
import MyTripEmptyState from '~/components/EmptyState/MyTripEmptyState';
import TripScreenSkeleton from '~/components/Skeleton/TripScreenSkeleton';
import { AuthContext } from '~/context/AuthProvider';
import {
  GetTripsDocument,
  GetUnclaimedStampsDocument,
} from '~/graphql/generated';

export default function MyTrip() {
  const { user } = useContext(AuthContext);

  const [isDeleting, setIsDeleting] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);

  const { loading, error, data } = useQuery(GetTripsDocument, {
    variables: {
      userId: user ? user.id : '',
    },
  });

  const unclaimedStampsQuery = useQuery(GetUnclaimedStampsDocument, {
    variables: {
      userId: user ? user.id : '',
    },
  });

  const handleCreateTrip = () => router.push('/traveler/trip/create');

  const isUnclaimedStampsInclude = (destination: string) => {
    return (
      unclaimedStampsQuery &&
      unclaimedStampsQuery.data?.unclaimedStamps.some(
        (stamp) =>
          stamp.title.toLowerCase().trim() === destination.toLowerCase().trim(),
      )
    );
  };

  const isBefore = (endDate: Date) => moment(endDate).isBefore(new Date());

  const unclaimedStamp = (destination: string) => {
    return unclaimedStampsQuery.data?.unclaimedStamps.find(
      (stamp) => stamp.title == destination,
    );
  };

  if (error)
    return (
      <Text testID="my-trip-error">{`Error! ${error.message.toString()}`}</Text>
    );

  if (loading && !data && !unclaimedStampsQuery.data)
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
      <Spinner
        visible={isDeleting}
        overlayColor="rgba(0, 0, 0, 0.50)"
        textStyle={{ color: 'white' }}
        textContent={'Deleting trip...'}
      />
      <Spinner
        visible={isRegenerating}
        overlayColor="rgba(0, 0, 0, 0.50)"
        textStyle={{ color: 'white' }}
        textContent={'Regenerating trip...'}
      />
      {data && (
        <FlatList
          testID="my-trip-list"
          data={data.trips}
          renderItem={({ item }) => {
            return isUnclaimedStampsInclude(item.destination) &&
              isBefore(item.endDate) ? (
              <ClaimStampCard
                id={unclaimedStamp(item.destination)?.id}
                title={unclaimedStamp(item.destination)?.title}
                url={unclaimedStamp(item.destination)?.image.url}
              />
            ) : (
              <TripCard
                id={item.id}
                title={item.title}
                startDate={item.startDate}
                endDate={item.endDate}
                budget={item.budget}
                travelSize={item.travelSize}
                totalTravellers={item.travelerCount}
                setRegenerating={setIsRegenerating}
                setDeleting={setIsDeleting}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <AbsoluteButton title="+" onPress={handleCreateTrip} />
    </View>
  );
}
