import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface AccommodationTypeCardProps {
  icon: React.ReactNode;
  title: string;
  isSelected: boolean;
  onPress: () => void;
}
const AccommodationTypeCard = ({
  icon,
  title,
  isSelected,
  onPress,
}: AccommodationTypeCardProps) => {
  return isSelected ? (
    <View className="items-center">
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View className=" h-[60] w-[70] items-center justify-center rounded-lg bg-orange-100">
          {icon}
        </View>
      </TouchableOpacity>
      <Text className="font-poppins-medium text-[11.5px] text-orange-500">
        {title}
      </Text>
    </View>
  ) : (
    <View className="items-center">
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <View className=" h-[60] w-[70] items-center justify-center rounded-lg bg-gray-100">
          {icon}
        </View>
      </TouchableOpacity>
      <Text className="font-poppins text-[11.5px] text-gray-500">{title}</Text>
    </View>
  );
};

export default AccommodationTypeCard;
