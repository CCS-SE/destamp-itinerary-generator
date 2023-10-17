import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

import NoTripIcon from '../../../../assets/images/empty-trip.svg';

export default function MyTripEmptyState() {
  const onPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/trip/create/');
  };
  return (
    <View testID="my-trip-empty-state" className="flex-1 items-center bg-white">
      <View className="my-7">
        <NoTripIcon height={300} width={500} />
      </View>
      <Text
        testID="empty-state-title"
        className="-my-3 font-poppins text-2xl font-normal text-slate-700"
      >
        No trips yet
      </Text>
      <Text
        testID="empty-state-subtitle"
        className="my-5 font-poppins text-lg font-normal text-slate-500"
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
    </View>
  );
}
