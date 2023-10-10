import React from 'react';
import { Text, View } from 'react-native';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

import { ExpenseCategory } from '~/graphql/generated';

interface TransactionsListItemProps {
  category: ExpenseCategory;
  amount: number;
}

const TransactionsListItem = ({
  category,
  amount,
}: TransactionsListItemProps) => {
  return (
    <View className="mt-1 flex-row items-center justify-between bg-[#ffffff] px-9 py-3">
      <View className="flex-row items-center justify-center">
        <View
          className="h-8 w-8 items-center justify-center rounded-full"
          style={{ backgroundColor: categoryIcon[category]?.color }}
        >
          {categoryIcon[category]?.icon}
        </View>
        <Text className="ml-2.5 font-poppins text-base text-gray-600">
          {category.charAt(0) + category.slice(1).toLowerCase()}
        </Text>
      </View>
      <View className="ml-10 mt-1">
        <Text className="font-poppins text-lg text-gray-600">-₱{amount}</Text>
      </View>
    </View>
  );
};

interface CategoryIcon {
  [key: string]: {
    color: string;
    icon: React.JSX.Element;
  };
}

const categoryIcon: CategoryIcon = {
  ACCOMMODATION: {
    color: '#C79BFF',
    icon: <Ionicons name="bed-outline" size={20} color="#FFFFFF" />,
  },
  FOOD: {
    color: '#FCA172',
    icon: <MaterialIcons name="local-dining" size={20} color="#FFFFFF" />,
  },
  SIGHTSEEING: {
    color: '#7EC2DF',
    icon: <Ionicons name="camera-outline" size={20} color="#FFFFFF" />,
  },
  TRANSPORTATION: {
    color: '#DF7E96',
    icon: <Ionicons name="bus-outline" size={20} color="#FFFFFF" />,
  },
  SHOPPING: {
    color: '#C2C38A',
    icon: (
      <MaterialCommunityIcons
        name="shopping-outline"
        size={20}
        color="#FFFFFF"
      />
    ),
  },
  ACTIVITY: {
    color: '#30E96D',
    icon: <MaterialIcons name="local-activity" size={20} color="#FFFFFF" />,
  },
  OTHER: {
    color: '#BE7B75',
    icon: <MaterialIcons name="receipt" size={20} color="#FFFFFF" />,
  },
};

export default TransactionsListItem;
