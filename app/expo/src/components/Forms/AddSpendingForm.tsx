import React, { useState } from 'react';
import {
  Alert,
  Platform,
  Pressable,
  Text,
  TextInput,
  ToastAndroid,
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
  CreateExpenseDocument,
  ExpenseCategory,
  GetTransactionsDocument,
  MutationCreateExpenseArgs,
  PlaceType,
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
  noteString?: string;
  amount?: string;
  categoryType?: PlaceType | ExpenseCategory;
}

export default function AddSpendingForm({
  closeModal,
  itineraryId,
  minDate,
  maxDate,
  noteString,
  amount,
  categoryType,
}: AddSpendingFormProps) {
  const defaultCategory = (): ExpenseCategory => {
    if (categoryType === PlaceType.Accommodation) {
      return ExpenseCategory.Accommodation;
    } else if (categoryType === PlaceType.Attraction) {
      return ExpenseCategory.Sightseeing;
    } else if (categoryType === PlaceType.Restaurant) {
      return ExpenseCategory.Food;
    } else if (categoryType === ExpenseCategory.Transportation) {
      return ExpenseCategory.Transportation;
    } else return ExpenseCategory.Accommodation;
  };
  const [datePicker, setDatePicker] = useState(false);
  const [note, setNote] = useState(noteString ? noteString : '');
  const [date, setDate] = useState(new Date(minDate));
  const [category, setCategory] = useState<ExpenseCategory>(
    categoryType ? defaultCategory : ExpenseCategory.Accommodation,
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
    setTimeout(() => setIsSubmitting(false), 500);
    ToastAndroid.show('Expense added.', ToastAndroid.SHORT);
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
        defaultValue={amount ? amount : ''}
        render={({ field: { onChange, onBlur }, fieldState: { error } }) => {
          return (
            <View>
              <CustomTextInput
                testID="amount-input"
                placeholder="Amount"
                defaultValue={amount ? amount : ''}
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
      <CategoryList category={category} onCategoryChange={onCategoryChange} />
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
