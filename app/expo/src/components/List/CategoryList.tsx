import React, { ReactNode, useState } from 'react';
import { FlatList, View } from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

import { ExpenseCategory } from '~/graphql/generated';
import CategoryListItem from './ListItems/CategoryListItem';

interface CategoryListProps {
  onCategoryChange: (category: ExpenseCategory) => void;
}

export default function CategoryList({ onCategoryChange }: CategoryListProps) {
  const [categoryList] = useState<Category[]>(categories);
  const [selectedCategory, setSelectedCategory] = useState<
    Category | undefined
  >(categories[0]);

  const onItemPressed = (key: string) => {
    setSelectedCategory(categoryList.find((category) => category.key === key));
    onCategoryChange(
      categoryList.find((category) => category.key === key)!.value,
    );
  };

  return (
    <View className="h-[180]">
      <FlatList
        numColumns={4}
        data={categoryList}
        renderItem={({ item }) => (
          <CategoryListItem
            onPress={onItemPressed}
            selectedCategory={selectedCategory}
            item={item}
          />
        )}
      />
    </View>
  );
}

interface Category {
  key: string;
  icon: ReactNode;
  title: string;
  value: ExpenseCategory;
}

const categories: Category[] = [
  {
    key: '1',
    icon: <Ionicons name="bed-outline" size={24} color="#F78E48" />,
    title: 'Accomodation',
    value: ExpenseCategory.Accommodation,
  },
  {
    key: '2',
    icon: <MaterialIcons name="local-dining" size={24} color="#F78E48" />,
    title: 'Food',
    value: ExpenseCategory.Food,
  },
  {
    key: '3',
    icon: <Ionicons name="camera-outline" size={24} color="#F78E48" />,
    title: 'Sightseeing',
    value: ExpenseCategory.Sightseeing,
  },
  {
    key: '4',
    icon: <Ionicons name="bus-outline" size={24} color="#F78E48" />,
    title: 'Transportation',
    value: ExpenseCategory.Transportation,
  },
  {
    key: '5',
    icon: (
      <MaterialCommunityIcons
        name="shopping-outline"
        size={24}
        color="#F78E48"
      />
    ),
    title: 'Shopping',
    value: ExpenseCategory.Shopping,
  },
  {
    key: '6',
    icon: <MaterialIcons name="local-activity" size={24} color="#F78E48" />,
    title: 'Activity',
    value: ExpenseCategory.Activity,
  },
  {
    key: '7',
    icon: <MaterialIcons name="receipt" size={24} color="#F78E48" />,
    title: 'Other',
    value: ExpenseCategory.Other,
  },
];
