import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface BudgetCategoryCardProps {
  icon: React.ReactNode;
  title: string;
  isSelected: boolean;
  onPress: () => void;
}
const BudgetCategoryCard = ({
  icon,
  title,
  isSelected,
  onPress,
}: BudgetCategoryCardProps) => {
  return isSelected ? (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className="mx-2 my-2 h-[75] w-[88] items-center justify-center rounded-lg bg-orange-100">
        {icon}
        <Text className="font-poppins-medium text-[9px] text-orange-500">
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
      <View className="mx-2 my-2 h-[75] w-[88] items-center justify-center rounded-lg bg-gray-100">
        {icon}
        <Text className="font-poppins text-[9px] text-gray-500">{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BudgetCategoryCard;
