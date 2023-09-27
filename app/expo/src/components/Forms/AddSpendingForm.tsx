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
        <Text className="font-poppins text-2xl text-[#4C4C4C]">
          Add Spending
        </Text>
      </View>
      <View className="mt-3 h-12 w-[330] rounded-xl border-2 border-[#F78E48] p-2">
        <TextInput
          keyboardType="numeric"
          placeholder="Amount"
          onChangeText={setAmount}
          value={amount}
          className="p-.5 font-poppins text-base text-gray-700"
        />
      </View>
      <Text className="ml-10 mt-2 self-start font-poppins text-lg text-[#4C4C4C]">
        Category
      </Text>
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
      <View className="p.5 mt-1 h-12 w-[330] rounded-xl border-2 border-[#F78E48]">
        <Pressable onPress={toggleDatePicker}>
          <TextInput
            placeholder={date.toDateString()}
            value={date.toDateString()}
            editable={false}
            className="p-1.5 font-poppins text-base text-gray-600"
          />
        </Pressable>
      </View>
      <View className="mt-2 h-16 w-[330] rounded-xl border-2 border-[#F78E48] p-2">
        <TextInput
          placeholder="Note"
          maxLength={25}
          multiline
          onChangeText={setNote}
          value={note}
          className="p-1.5 font-poppins text-base text-gray-700"
        />
      </View>
      <GradientButton
        title="Add"
        onPress={onSubmit}
        isSubmitting={false}
        size={290}
        className="mb-10"
      />
    </View>
  );
}
