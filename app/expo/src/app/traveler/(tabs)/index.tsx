import React, { useContext, useEffect, useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import { router } from 'expo-router';
import { useQuery } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';
import moment from 'moment';

import AbsoluteButton from '~/components/Button/AbsoluteButton';
import BasicButton from '~/components/Button/BasicButton';
import ClaimStampCard from '~/components/Card/traveler/ClaimStampCard';
import TripCard from '~/components/Card/traveler/TripCard';
import MyTripEmptyState from '~/components/EmptyState/MyTripEmptyState';
import FancyModal from '~/components/Modal/FancyModal';
import TripScreenSkeleton from '~/components/Skeleton/TripScreenSkeleton';
import { AuthContext } from '~/context/AuthProvider';
import {
  GetTripsDocument,
  GetUnclaimedStampsDocument,
} from '~/graphql/generated';
import userStore from '~/store/userStore';

export default function MyTrip() {
  const { user } = useContext(AuthContext);
  const { setUser } = userStore();

  const [isDeleting, setIsDeleting] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  const [showPremiummodal, setShowPremiumModal] = useState(false);

  const { loading, error, data } = useQuery(GetTripsDocument, {
    variables: {
      userId: user ? user.id : '',
    },
  });

  useEffect(() => {
    if (data && data.travelerAccount) {
      setUser({
        isPremium: data.travelerAccount.isPremium || false,
        userId: user?.id || '',
      });
    }
  }, [data?.travelerAccount.isPremium]);

  const unclaimedStampsQuery = useQuery(GetUnclaimedStampsDocument, {
    variables: {
      userId: user ? user.id : '',
    },
  });

  const premiumModalOpen = () => {
    setShowPremiumModal(true);
  };

  const premiumModalClose = () => {
    setShowPremiumModal(false);
  };

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

  if (!loading && data?.travelerAccount.user?.trips.length === 0) {
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
          data={data.travelerAccount.user?.trips}
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
                isPremium={data.travelerAccount.isPremium || false}
                setRegenerating={setIsRegenerating}
                setDeleting={setIsDeleting}
              />
            );
          }}
          showsVerticalScrollIndicator={false}
        />
      )}
      <AbsoluteButton
        title="+"
        onPress={
          data &&
          !data.travelerAccount.isPremium &&
          (data?.travelerAccount.user?.tripCount as number) >= 3
            ? premiumModalOpen
            : handleCreateTrip
        }
      />
      <FancyModal isVisible={showPremiummodal} bgColor="#DCDCDC">
        <View className="items-center ">
          <AntDesign
            name="closecircleo"
            size={22}
            color="#263238"
            style={{ alignSelf: 'flex-end', marginRight: 7 }}
            onPress={premiumModalClose}
          />
          <Text className="mt-2 text-center font-poppins-medium text-lg text-gray-600">
            Oops! You've Reached Your Limit!
          </Text>
          <Text className="p-3 text-center font-poppins text-sm text-gray-500">
            You've reached the maximum number of trips. Don't worry, though! You
            can upgrade to our premium feature for unlimited trip creation.
          </Text>
          <BasicButton
            title="Upgrade Now"
            color="#FECF29"
            onPress={() => {
              premiumModalClose();
              router.push('/traveler/subscription/');
            }}
          />
        </View>
      </FancyModal>
    </View>
  );
}
