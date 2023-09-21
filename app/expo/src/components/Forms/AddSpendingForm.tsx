import React, { useState } from 'react';
import { Platform, Pressable, Text, TextInput, View } from 'react-native';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

import CategoryList from '~/app/expense/CategoryList';
import { ExpenseCategory } from '~/graphql/generated';
import GradientButton from '../Button/GradientButton';

interface AddSpendingFormProps {
  onSubmit: () => void;
}

export default function AddSpendingForm({ onSubmit }: AddSpendingFormProps) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date());
  const [datePicker, setDatePicker] = useState(false);
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
      if (Platform.OS === 'android') {
        toggleDatePicker();
        setDate(newDate!);
      } else {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
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
              minimumDate={new Date(2023, 8, 20)}
              maximumDate={new Date(2023, 8, 23)}
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
        size={290}
        title="Add"
        onPress={onSubmit}
        isSubmitting={false}
      />
    </View>
  );
}
