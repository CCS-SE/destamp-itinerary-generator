import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-svg-charts';
import { SwipeListView } from 'react-native-swipe-list-view';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from '@apollo/client';

import AbsoluteButton from '~/components/Button/AbsoluteButton';
import ExpenseSwipeButton from '~/components/Button/ExpenseSwipeButton';
import ColoredContainer from '~/components/Container/ColoredContainer';
import AddSpendingForm from '~/components/Forms/AddSpendingForm';
import EditSpendingForm from '~/components/Forms/EditSpendingForm';
import TransactionsListItem from '~/components/List/ListItems/TransactionsListItem';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';
import ExpenseScreenSkeleton from '~/components/Skeleton/ExpenseScreenSkeleton';
import {
  DeleteExpenseDocument,
  ExpenseCategory,
  GetTripExpensesDocument,
} from '~/graphql/generated';
import {
  areDatesEqual,
  confirmationAlert,
  getDatesBetween,
  getPieChartData,
} from '~/utils/utils';
import Back from '../../../../../assets/images/back-btn.svg';

const ExpensePage = () => {
  const { id } = useLocalSearchParams();

  const [dateFilter, setDateFilter] = useState<Date | string>('All');
  const [addModal, setAddModal] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const [expenseData, setExpenseData] = useState({
    id: 0,
    amount: 0,
    date: '',
    category: ExpenseCategory.Accommodation,
    note: '',
  });

  const handleBack = () => {
    return router.back();
  };
  const onButtonPress = () => {
    setAddModal(true);
  };

  const { loading, error, data } = useQuery(GetTripExpensesDocument, {
    variables: {
      tripId: parseInt(id as string),
    },
  });

  const [deleteExpense] = useMutation(DeleteExpenseDocument);

  const handleDeleteExpense = async (expenseID: number) => {
    setDeleting(true);
    await deleteExpense({
      variables: {
        expenseId: expenseID,
      },
      refetchQueries: [
        {
          query: GetTripExpensesDocument,
          variables: {
            tripId: parseInt(id as string),
          },
        },
      ],
      onError: (error) => {
        console.log('Error', error.message);
      },
      onCompleted: () => setDeleting(false),
    });
  };

  const onPressDelete = (id: number) => {
    return confirmationAlert(
      'Delete expense',
      'Are you sure you want to delete this expense?',
      'Delete',
      'Cancel',
      async () => await handleDeleteExpense(id),
    );
  };

  const onPressEdit = (
    id: number,
    amount: number,
    date: string,
    note: string,
    category: ExpenseCategory,
  ) => {
    setEditModal(true);
    setExpenseData({
      id: id,
      amount: amount,
      category: category,
      date: date,
      note: note,
    });
  };

  const totalSpending = data?.trip.expenses.reduce(
    (accumulator, current) => accumulator + current.amount,
    0,
  );

  const dropdownData = getDatesBetween(
    new Date(data?.trip.startDate),
    new Date(data?.trip.endDate),
  );

  const dateFilteredExpenses: {
    __typename?: 'Expense' | undefined;
    id: number;
    amount: number;
    category: ExpenseCategory;
    dateSpent: Date;
  }[] = data
    ? data.trip.expenses.filter((item) =>
        areDatesEqual(new Date(item.dateSpent), new Date(dateFilter)),
      )
    : [];

  const pieChartData = data
    ? getPieChartData(
        dateFilter === 'All' ? data.trip.expenses : dateFilteredExpenses,
      )
    : [];

  if (error) return <Text>{`Error! ${error.message.toString()}`}</Text>;

  if (loading) {
    return <ExpenseScreenSkeleton />;
  }

  return (
    <View className="flex-1 bg-white">
      <SafeAreaView edges={['top']} className="flex-">
        <View className="mx-4 flex-row justify-between">
          <Back height={35} width={35} onPress={handleBack} />
        </View>
      </SafeAreaView>
      <View>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="mx-5 flex-row self-center">
          <ColoredContainer
            title="SPENDING"
            content={`₱${totalSpending ? totalSpending?.toFixed(2) : 0}`}
            backgroundColor="#F6CAD4"
            textColor="#DE4D6C"
          />
          <ColoredContainer
            title="BALANCE"
            content={`₱${
              data && totalSpending
                ? (data.trip.budget - totalSpending).toFixed(2)
                : data
                ? data.trip.budget.toFixed(2)
                : 0
            }`}
            backgroundColor={
              data && totalSpending && data.trip.budget - totalSpending < 0
                ? '#FF0000' // Red
                : '#C6F3C7'
            }
            textColor={
              data && totalSpending && data.trip.budget - totalSpending < 0
                ? '#FFFFFF' // White
                : '#13B510'
            }
          />
        </View>
      </View>
      {data?.trip.expenses.length == 0 ? (
        <View className="my-64 items-center justify-center">
          <Text className="font-poppins text-2xl text-[#6A6969]">
            No expenses yet
          </Text>
        </View>
      ) : (
        <>
          <View className="items-center justify-center p-5">
            <PieChart style={{ width: 200, height: 200 }} data={pieChartData} />
          </View>
          <View className="mx-9 flex-row items-center justify-between">
            <Text className="font-poppins text-2xl text-[#5D5D5D]">
              Expenses
            </Text>
            <SelectList
              defaultOption={{ key: 'All', value: 'All' }}
              data={['All', ...dropdownData]}
              setSelected={(val: string) => setDateFilter(val)}
              search={false}
              dropdownStyles={{
                backgroundColor: '#F4F3F3',
                position: 'absolute',
                borderWidth: 0,
                width: 170,
              }}
              boxStyles={{
                backgroundColor: '#F4F3F3',
                alignSelf: 'flex-end',
                width: 170,
                borderWidth: 0,
              }}
              inputStyles={{
                color: '#696969',
                fontFamily: 'Poppins',
                fontSize: 16,
              }}
              fontFamily="Poppins"
              dropdownTextStyles={{
                color: '#696969',
                fontFamily: 'Poppins',
                fontSize: 17,
              }}
            />
          </View>
          <View className="-z-10 mx-1 h-[285]">
            {pieChartData.length == 0 ? (
              <View className="mt-20 items-center justify-center">
                <Text className="font-poppins text-lg text-gray-500">
                  No expense in the given date.
                </Text>
              </View>
            ) : (
              <SwipeListView
                scrollEnabled={true}
                data={
                  dateFilter === 'All'
                    ? data!.trip.expenses
                    : dateFilteredExpenses
                }
                renderItem={({ item }) => (
                  <TransactionsListItem
                    tripId={data!.trip.id}
                    id={item.id}
                    date={item.dateSpent}
                    note={item.note}
                    category={item.category}
                    amount={parseFloat(item.amount.toFixed(2))}
                  />
                )}
                keyExtractor={(item) => item.id.toString()}
                renderHiddenItem={(data, rowMap) => (
                  <ExpenseSwipeButton
                    onPressEdit={() => {
                      rowMap[data.item.id.toString()]!.closeRow();
                      onPressEdit(
                        data.item.id,
                        data.item.amount,
                        data.item.dateSpent,
                        data.item.note || '',
                        data.item.category,
                      );
                    }}
                    onPressDelete={() => onPressDelete(data.item.id)}
                    isDeleting={isDeleting}
                  />
                )}
                leftOpenValue={0}
                rightOpenValue={-130}
              />
            )}
          </View>
        </>
      )}
      <AbsoluteButton
        title="+"
        onPress={onButtonPress}
        className="bottom-8 right-7"
      />
      <BottomHalfModal isVisible={addModal} onClose={() => setAddModal(false)}>
        <AddSpendingForm
          closeModal={() => setAddModal(false)}
          tripId={parseInt(id as string)}
          minDate={data!.trip.startDate as Date}
          maxDate={data!.trip.endDate as Date}
        />
      </BottomHalfModal>
      <BottomHalfModal
        isVisible={editModal}
        onClose={() => setEditModal(false)}
      >
        <EditSpendingForm
          closeModal={() => setEditModal(false)}
          id={expenseData.id}
          amount={expenseData.amount.toString()}
          category={expenseData.category as ExpenseCategory}
          date={expenseData.date}
          note={expenseData.note || ''}
          tripId={parseInt(id as string)}
          minDate={data!.trip.startDate as Date}
          maxDate={data!.trip.endDate as Date}
        />
      </BottomHalfModal>
    </View>
  );
};

export default ExpensePage;
