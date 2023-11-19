import React from 'react';
import { Dimensions, Text, View } from 'react-native';

import Stamp from '../../../assets/images/stamp.svg';

export default function StampDisplayEmptyState() {
  const cardWidth = Dimensions.get('window').width * 0.88;

  return (
    <View
      className="h-44 items-center rounded-2xl bg-gray-100 p-10"
      style={{ width: cardWidth }}
    >
      <View className="-mt-2">
        <Stamp height={50} width={50} />
      </View>
      <Text
        testID="no-stamps-subtitle"
        className="text-small mt-3 text-center font-poppins text-slate-500"
      >
        Start planning your trip and collect stamps as you go. ✨
      </Text>
    </View>
  );
}
