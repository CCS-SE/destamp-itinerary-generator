import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TransportationStyleCardProps {
  icon: React.ReactNode;
  title: string;
  isSelected: boolean;
  onPress: () => void;
}
const TransportationStyleCard = ({
  icon,
  title,
  isSelected,
  onPress,
}: TransportationStyleCardProps) => {
  return isSelected ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className="my-1.5  h-[50] w-[230] items-center justify-center rounded-lg bg-orange-100">
        <View className="flex-row items-center justify-center">
          {icon}
          <View className="mx-3">
            <Text className="font-poppins-medium text-[14px] text-orange-500">
              {title}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className="my-1.5  h-[50] w-[230] items-center justify-center rounded-lg bg-gray-100">
        <View className="flex-row items-center justify-center">
          {icon}
          <View className="mx-3">
            <Text className="font-poppins text-[14px] text-gray-500">
              {title}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default TransportationStyleCard;
