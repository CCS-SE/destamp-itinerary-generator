import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { gql, useMutation } from '@apollo/client';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import CategoryList from '~/components/List/CategoryList';
import {
  CreateExpenseDocument,
  ExpenseCategory,
  GetTransactionsDocument,
  MutationCreateExpenseArgs,
} from '~/graphql/generated';
import GradientButton from '../Button/GradientButton';

interface AddSpendingFormProps {
  closeModal: () => void;
  itineraryId: number;
  minDate: Date;
  maxDate: Date;
}

export const createExpense = gql(
  `mutation CreateExpense($data: CreateExpenseInput!) {
  createExpense(data: $data) {
      amount,
      category,
      date,
      note,
  }
}`,
);

export default function AddSpendingForm({
  closeModal,
  itineraryId,
  minDate,
  maxDate,
}: AddSpendingFormProps) {
  const [datePicker, setDatePicker] = useState(false);
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date(minDate));
  const [category, setCategory] = useState<ExpenseCategory>(
    ExpenseCategory.Accommodation,
  );

  const onCategoryChange = (newCategory: ExpenseCategory) => {
    setCategory(newCategory);
  };

  const toggleDatePicker = () => {
    setDatePicker(!datePicker);
  };

  const onDateChange = (
    { type }: DateTimePickerEvent,
    selectedDate: Date | undefined,
  ) => {
    if (type == 'set') {
      const newDate = selectedDate;
      if (Platform.OS === 'android' && newDate) {
        toggleDatePicker();
        setDate(newDate!);
      } else {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };

  const [createExpense] = useMutation(CreateExpenseDocument);

  const onSubmit = async () => {
    const createExpenseInput: MutationCreateExpenseArgs = {
      data: {
        amount: parseFloat(amount),
        category: category,
        itineraryId: itineraryId,
        date: date,
        note: note,
      },
    };

    await createExpense({
      variables: {
        data: createExpenseInput.data,
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
        Alert.alert('Err', err.message);
      },
    });
    closeModal();
  };

  return (
    <View className="items-center">
      <View className="mt-3">
        <Text className="text-2xl ">Add Spending</Text>
      </View>
      <View className="mt-3 h-12 w-72 rounded-xl border-2 border-[#F78E48] p-2">
        <TextInput
          keyboardType="numeric"
          placeholder="Amount"
          onChangeText={setAmount}
          value={amount}
        />
      </View>
      <Text className="mt-2 text-base font-bold">Category</Text>

      <CategoryList onCategoryChange={onCategoryChange} />

      {datePicker && (
        <View>
          <View>
            <DateTimePicker
              value={date}
              mode="date"
              onChange={onDateChange}
              minimumDate={new Date(minDate)}
              maximumDate={new Date(maxDate)}
            />
          </View>
        </View>
      )}

      <View className="mt-1 h-auto w-72 rounded-xl border-2 border-[#F78E48] p-2">
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            className="text-black"
            placeholder={date.toDateString()}
            value={date.toDateString()}
            editable={false}
          />
        </Pressable>
      </View>

      <View className="mt-2 h-auto w-72 rounded-xl border-2 border-[#F78E48] p-2">
        <TextInput
          placeholder="Note"
          maxLength={25}
          onChangeText={setNote}
          value={note}
        />
      </View>
      <GradientButton
        title="Add"
        onPress={onSubmit}
        isSubmitting={false}
        size={290}
      />
    </View>
  );
}
