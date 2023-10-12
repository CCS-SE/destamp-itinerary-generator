import React, { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ExpenseCategory } from '~/graphql/generated';

interface Category {
  icon: ReactNode;
  title: string;
  value: ExpenseCategory;
  key: string;
}

interface CategoryListItemProps {
  item: Category;
  onPress: (value: ExpenseCategory) => void;
  selectedCategory: ExpenseCategory;
}
export default function CategoryListItem({
  item,
  onPress,
  selectedCategory,
}: CategoryListItemProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.value)}
      className="mx-1 mt-1 h-20 w-20 items-center"
    >
      <View
        className={`items-center justify-center rounded-lg bg-[#efeeee] p-4 ${
          item.value == selectedCategory ? 'border-2 border-[#F78E48]' : ''
        }`}
      >
        {item.icon}
      </View>
      <Text
        className={`text-xs text-gray-600  ${
          item.value === selectedCategory ? 'text-[#F78E48]' : ''
        }`}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}
