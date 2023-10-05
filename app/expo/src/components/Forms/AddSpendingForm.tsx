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
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import CategoryList from '~/components/List/CategoryList';
import {
  CreateExpenseDocument,
  ExpenseCategory,
  GetTransactionsDocument,
  MutationCreateExpenseArgs,
} from '~/graphql/generated';
import GradientButton from '../Button/GradientButton';
import { CustomTextInput } from '../FormField/CustomTextInput';
import {
  AddSpendingSchema,
  addSpendingSchema,
} from './schema/addSpendingSchema';

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
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date(minDate));
  const [category, setCategory] = useState<ExpenseCategory>(
    ExpenseCategory.Accommodation,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const { handleSubmit, control } = useForm<AddSpendingSchema>({
    mode: 'onChange',
    resolver: zodResolver(addSpendingSchema),
  });

  const [createExpense] = useMutation(CreateExpenseDocument);

  const onSubmit: SubmitHandler<AddSpendingSchema> = async (data) => {
    setIsSubmitting(true);

    const createExpenseInput: MutationCreateExpenseArgs = {
      data: {
        amount: parseFloat(data.amount),
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

    setTimeout(() => setIsSubmitting(false), 1000);
  };

  return (
    <View className="items-center">
      <View className="mt-3">
        <Text className="font-poppins text-2xl text-[#4C4C4C]">
          Add Spending
        </Text>
      </View>
      <Controller
        control={control}
        name="amount"
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => {
          return (
            <View>
              <CustomTextInput
                testID="amount-input"
                placeholder="Amount"
                value={value}
                onChangeText={onChange}
                onBlur={onBlur}
                keyboardType="numeric"
                errorMessage={error?.message}
                className="p-.5 mt-2 w-[320] font-poppins text-base text-gray-700"
              />
            </View>
          );
        }}
      />
      <Text className="-mt-2 ml-10 self-start font-poppins text-lg text-[#4C4C4C]">
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
        onPress={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        size={290}
        className="mb-10"
      />
    </View>
  );
}
