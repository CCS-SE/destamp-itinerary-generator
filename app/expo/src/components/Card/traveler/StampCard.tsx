import React from 'react';
import { Dimensions, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { router } from 'expo-router';

export default function StampCard({ url }: { url: string }) {
  const cardWidth = Dimensions.get('window').width * 0.88;

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => router.push('/traveler/stamp')}
    >
      <View
        className="h-44 items-center rounded-2xl bg-gray-100 p-10"
        style={{ width: cardWidth }}
      >
        <View className="-mt-5 rounded-full bg-gray-200 p-3.5">
          <Image source={{ uri: url }} className=" h-24 w-24 rounded-md" />
        </View>
      </View>
    </TouchableOpacity>
  );
}
