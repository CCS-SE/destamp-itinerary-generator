import React from 'react';
import { Text, View } from 'react-native';
import { Image } from 'expo-image';

export default function StampDisplayEmptyState() {
  return (
    <View className="h-56 w-[360] items-center rounded-2xl bg-gray-100 p-10">
      <Image
        source={require('../../../assets/images/stamp.png')}
        contentFit="scale-down"
        className="-mt-2 h-16 w-80"
      />
      <Text
        testID="no-stamps-title"
        className="mt-3 text-base font-normal text-slate-700"
      >
        You haven't claimed any stamps yet.
      </Text>
      <Text
        testID="no-stamps-subtitle"
        className=" text-center text-base font-normal text-slate-500"
      >
        Start planning your trip and collect stamps as you go. ✨
      </Text>
    </View>
  );
}
