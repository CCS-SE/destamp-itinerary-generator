import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  View,
} from 'react-native';
import { useMutation } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import CategoryList from '~/components/List/CategoryList';
import {
  ExpenseCategory,
  GetTransactionsDocument,
  UpdateExpenseDocument,
} from '~/graphql/generated';
import GradientButton from '../Button/GradientButton';
import { CustomTextInput } from '../FormField/CustomTextInput';
import {
  EditSpendingSchema,
  editSpendingSchema,
} from './schema/editSpendingSchema';

interface EditSpendingFormProps {
  closeModal: () => void;
  itineraryId: number;
  id: number;
  amount: string;
  date: string;
  note: string;
  category: ExpenseCategory;
  minDate: Date;
  maxDate: Date;
}

export default function EditSpendingForm({
  closeModal,
  itineraryId,
  id,
  amount,
  date,
  category,
  note,
  minDate,
  maxDate,
}: EditSpendingFormProps) {
  const [datePicker, setDatePicker] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const initialData = {
    amount: amount,
    category: category,
    note: note || '',
    date: new Date(date),
  };

  const [expenseData, setExpenseData] = useState(initialData);

  const onCategoryChange = (category: ExpenseCategory) => {
    setExpenseData({ ...expenseData, category: category });
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

        setExpenseData({ ...expenseData, date: newDate });
      } else {
        toggleDatePicker();
      }
    } else {
      toggleDatePicker();
    }
  };

  const { handleSubmit, control } = useForm<EditSpendingSchema>({
    mode: 'onChange',
    resolver: zodResolver(editSpendingSchema),
  });

  const [updateExpense] = useMutation(UpdateExpenseDocument);

  const onSubmit: SubmitHandler<EditSpendingSchema> = async (data) => {
    setIsSubmitting(true);

    const hasChanged =
      JSON.stringify(expenseData) !== JSON.stringify(initialData);

    if (!hasChanged) {
      setIsSubmitting(false);
      closeModal();
    }

    await updateExpense({
      variables: {
        updateExpenseId: id,
        data: {
          amount: parseFloat(data.amount),
          category: expenseData.category,
          date: new Date(expenseData.date),
          note: expenseData.note,
        },
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
          Edit Spending
        </Text>
      </View>
      <Controller
        control={control}
        name="amount"
        defaultValue={amount}
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
      <CategoryList
        category={expenseData.category}
        onCategoryChange={onCategoryChange}
      />
      {datePicker && (
        <View>
          <View>
            <DateTimePicker
              value={expenseData.date}
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
            placeholder={expenseData.date.toDateString()}
            value={expenseData.date.toDateString()}
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
          onChangeText={(value) =>
            setExpenseData({ ...expenseData, note: value })
          }
          value={expenseData.note}
          className="p-1.5 font-poppins text-base text-gray-700"
        />
      </View>
      <GradientButton
        title="Save"
        onPress={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
        size={280}
        className="mb-10"
      />
    </View>
  );
}
