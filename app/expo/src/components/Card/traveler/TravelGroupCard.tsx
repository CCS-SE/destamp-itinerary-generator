import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TravelGroupCardProps {
  icon: React.ReactNode;
  title: string;
  isSelected: boolean;
  onPress: () => void;
}
const TravelGroupCard = ({
  icon,
  title,
  isSelected,
  onPress,
}: TravelGroupCardProps) => {
  return isSelected ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className="m-3 h-[75] w-36 items-center justify-center rounded-lg  bg-orange-100">
        {icon}
        <Text className="font-poppins-medium text-base text-orange-500">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className="m-3 h-[75] w-36 items-center justify-center rounded-lg bg-gray-100">
        {icon}
        <Text className="font-poppins text-base text-gray-500">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TravelGroupCard;
