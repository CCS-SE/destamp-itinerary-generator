import React, { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { useMutation } from '@apollo/client';
import {
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from '@expo/vector-icons';

import {
  ExpenseCategory,
  GetTransactionsDocument,
  UpdateExpenseDocument,
} from '~/graphql/generated';
import { confirmationAlert } from '~/utils/utils';

interface TransactionsListItemProps {
  itineraryId: number;
  id: number;
  category: ExpenseCategory;
  date: string;
  note?: string | null;
  amount: number;
}

const TransactionsListItem = ({
  itineraryId,
  id,
  date,
  note,
  category,
  amount,
}: TransactionsListItemProps) => {
  const initial = {
    amount: amount.toString(),
  };
  const [isEditting, setIsEditting] = useState(false);
  const [value, setValue] = useState(initial);

  const handleEdittable = () => setIsEditting(true);

  const [updateAmount] = useMutation(UpdateExpenseDocument);

  const handleUpdateExpense = async (
    itineraryId: number,
    id: number,
    amount: string,
    category: ExpenseCategory,
    date: string,
    note: string,
  ) => {
    await updateAmount({
      variables: {
        updateExpenseId: id,
        data: {
          amount: parseFloat(amount),
          category: category,
          date: new Date(date),
          note: note,
        },
      },
      onCompleted: () => {
        setIsEditting(false);
      },
      refetchQueries: [
        {
          query: GetTransactionsDocument,
          variables: {
            itineraryId: itineraryId,
          },
        },
      ],
      onError: (err) => {
        setIsEditting(false);
        console.log(err.message);
      },
    });
  };

  const handleOnBlur = () => {
    if (initial.amount !== value.amount) {
      confirmationAlert(
        'Update amount',
        'Are you sure you want to save this changes?',
        'Yes',
        'Cancel',
        async () =>
          await handleUpdateExpense(
            itineraryId,
            id,
            value.amount,
            category,
            date,
            note || '',
          ),
      );
    } else {
      setIsEditting(false);
    }
  };

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
        {isEditting ? (
          <TextInput
            className="w-20 justify-center rounded-lg border border-gray-300 px-1 pb-1 text-right font-poppins text-lg text-gray-700"
            onBlur={handleOnBlur}
            onChangeText={(value) => setValue({ amount: value })}
            value={value.amount}
            inputMode="numeric"
          ></TextInput>
        ) : (
          <Text
            className="font-poppins text-lg text-gray-600"
            onPress={handleEdittable}
          >
            -₱{amount}
          </Text>
        )}
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
