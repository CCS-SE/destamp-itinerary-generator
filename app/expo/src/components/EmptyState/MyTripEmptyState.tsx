import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';

import userStore from '~/store/userStore';
import NoTripIcon from '../../../assets/images/empty-trip.svg';
import BasicButton from '../Button/BasicButton';
import FancyModal from '../Modal/FancyModal';

export default function MyTripEmptyState() {
  const { isPremium, tripCount } = userStore();
  const [showPremiummodal, setShowPremiumModal] = useState(false);

  const premiumModalOpen = () => {
    setShowPremiumModal(true);
  };

  const premiumModalClose = () => {
    setShowPremiumModal(false);
  };

  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    if (!isPremium && tripCount >= 3) {
      premiumModalOpen();
    } else {
      router.push('/traveler/trip/create/');
    }
  };

  return (
    <View testID="my-trip-empty-state" className="flex-1 items-center bg-white">
      <View className="my-7">
        <NoTripIcon height={300} width={500} />
      </View>
      <View className="text-center"></View>
      <Text
        testID="empty-state-title"
        className="pt-3 font-poppins text-lg font-normal text-slate-600"
      >
        You have no trips yet
      </Text>
      <Text
        testID="empty-state-subtitle"
        className="px-2 pb-5 font-poppins text-base font-normal text-slate-500"
      >
        Start planning your adventure!
      </Text>
      <TouchableOpacity
        accessibilityRole="button"
        activeOpacity={0.8}
        onPress={onPress}
      >
        <LinearGradient
          colors={['#fd8139', '#f65a82']}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0.8, y: 0 }}
          className="rounded-lg shadow-lg"
        >
          <Text
            testID="empty-state-create-btn"
            className="mx-6 p-2.5 font-poppins text-lg font-medium text-zinc-100"
          >
            Create a Trip
          </Text>
        </LinearGradient>
      </TouchableOpacity>
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
