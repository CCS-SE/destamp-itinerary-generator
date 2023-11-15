import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { Image } from 'expo-image';

interface DiningStyleCardProps {
  uri: string;
  title: string;
  isSelected: boolean;
  onPress: () => void;
}
const DiningStyleCard = ({
  uri,
  title,
  isSelected,
  onPress,
}: DiningStyleCardProps) => {
  return isSelected ? (
    <View className="items-center">
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View className=" h-[85] w-[120] flex-row items-center justify-center rounded-lg bg-orange-100">
          <View className="h-16 w-24">
            <Image
              className="h-16 rounded-lg"
              source={uri}
              contentFit="fill"
            ></Image>
          </View>
        </View>
      </TouchableOpacity>
      <Text className="font-poppins-medium text-[13px] text-orange-500">
        {title}
      </Text>
    </View>
  ) : (
    <View className="items-center">
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View className=" h-[85] w-[120] flex-row items-center justify-center rounded-lg bg-gray-100">
          <View className="h-16 w-24">
            <Image
              className="h-16 rounded-lg"
              source={uri}
              contentFit="fill"
            ></Image>
          </View>
        </View>
      </TouchableOpacity>
      <Text className="font-poppins text-[13px] text-gray-500">{title}</Text>
    </View>
  );
};

export default DiningStyleCard;
