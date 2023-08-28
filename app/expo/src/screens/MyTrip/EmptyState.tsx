import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';

export default function MyTripEmptyState() {
  return (
    <View className="flex-1 items-center bg-white">
      <Image
        source={require('../../../assets/images/empty-state.png')}
        className="m-14 h-64 w-80"
      />
      <Text className="-my-3 text-2xl font-normal text-slate-700">
        No trips yet
      </Text>
      <Text className="my-5 text-lg font-normal text-slate-500">
        Start planning your adventure!
      </Text>
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)}
      >
        <LinearGradient
          colors={['#F0226C', '#F78E48']}
          start={{ x: 0, y: 0.1 }}
          end={{ x: 0.8, y: 0 }}
          className="rounded-lg shadow-lg"
        >
          <Text className="mx-6 p-2 text-lg font-medium text-zinc-100">
            Create a Trip
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}
