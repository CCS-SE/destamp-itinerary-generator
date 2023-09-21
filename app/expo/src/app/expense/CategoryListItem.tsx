import React, { ReactNode, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

import { ExpenseCategory } from '~/graphql/generated';

interface Category {
  icon: ReactNode;
  title: String;
  value: ExpenseCategory;
  key: String;
}

interface CategoryListItemProps {
  item: Category;
  onPress: (key: String) => void;
  selectedCategory: Category;
}
export default function CategoryListItem({
  item,
  onPress,
  selectedCategory,
}: CategoryListItemProps) {
  return (
    <TouchableOpacity
      onPress={() => onPress(item.key)}
      className="mx-1 mt-1 h-20 w-20 items-center"
    >
      <View
        className={`items-center justify-center rounded-lg bg-[#D9D9D9] p-4 ${
          item == selectedCategory ? 'border-2 border-[#F78E48]' : ''
        }`}
      >
        {item.icon}
      </View>
      <Text
        className={`text-xs ${
          item === selectedCategory ? 'text-[#F78E48]' : ''
        }`}
      >
        {item.title}
      </Text>
    </TouchableOpacity>
  );
}
