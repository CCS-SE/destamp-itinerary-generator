import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Image } from 'expo-image';

export default function StampDisplayEmptyState() {
  const cardWidth = Dimensions.get('window').width * 0.88;

  return (
    <View
      className="h-44 items-center rounded-2xl bg-gray-100 p-10"
      style={{ width: cardWidth }}
    >
      <Image
        source={require('../../../../assets/images/stamp.png')}
        contentFit="scale-down"
        className="-mt-3 h-14 w-72"
      />
      <Text
        testID="no-stamps-subtitle"
        className="text-small mt-3 text-center font-poppins text-slate-500"
      >
        Start planning your trip and collect stamps as you go. ✨
      </Text>
    </View>
  );
}
