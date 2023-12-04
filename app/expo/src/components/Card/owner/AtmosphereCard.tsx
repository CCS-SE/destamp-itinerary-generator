import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface AtmosphereCardProps {
  title: string;
  isSelected: boolean;
  onPress: () => void;
}
const AtmosphereCard = ({
  title,
  isSelected,
  onPress,
}: AtmosphereCardProps) => {
  return isSelected ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className="h-[35] w-auto items-center justify-center rounded-lg bg-orange-100">
        <Text className="px-3 font-poppins-medium text-[13px] text-orange-500">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className="h-[35] w-auto items-center justify-center rounded-lg bg-gray-100">
        <Text className="px-3 font-poppins text-[13px] text-gray-500">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default AtmosphereCard;
