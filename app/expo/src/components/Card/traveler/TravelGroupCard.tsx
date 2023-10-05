import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';

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
  const cardWidth = Dimensions.get('window').width * 0.36;

  return isSelected ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        className="m-2 h-[65] items-center justify-center rounded-lg bg-orange-100 pt-2"
        style={{ width: cardWidth }}
      >
        {icon}
        <Text className="text-small font-poppins-medium text-orange-500">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View
        className="m-2 h-[65] items-center justify-center rounded-lg bg-gray-100 pt-2"
        style={{ width: cardWidth }}
      >
        {icon}
        <Text className="text-small font-poppins text-gray-500">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default TravelGroupCard;
