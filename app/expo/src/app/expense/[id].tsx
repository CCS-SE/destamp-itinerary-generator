import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SelectList } from 'react-native-dropdown-select-list';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-svg-charts';
import { SwipeListView } from 'react-native-swipe-list-view';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { gql, useMutation, useQuery } from '@apollo/client';

import AbsoluteButton from '~/components/Button/AbsoluteButton';
import ExpenseDeleteButton from '~/components/Button/ExpenseDeleteButton';
import ColoredContainer from '~/components/Container/ColoredContainer';
import AddSpendingForm from '~/components/Forms/AddSpendingForm';
import TransactionsListItem from '~/components/List/ListItems/TransactionsListItem';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';
import ExpenseScreenSkeleton from '~/components/Skeleton/ExpenseScreenSkeleton';
import {
  DeleteExpenseDocument,
  ExpenseCategory,
  GetTransactionsDocument,
  GetTravelerItineraryDocument,
} from '~/graphql/generated';
import {
  areDatesEqual,
  confirmationAlert,
  getDatesBetween,
  getPieChartData,
} from '~/utils/utils';
import Back from '../../../assets/images/back-btn.svg';

export const GetTransactionsQuery = gql(
  `query GetTransactions($itineraryId: Int!){
    getTransaction(itineraryId: $itineraryId) {
      id
      amount
      category
      date
    }
  }`,
);

export const DeleteExpense = gql(
  `mutation DeleteExpense($deleteExpenseId: Int!) {
    deleteExpense(id: $deleteExpenseId) {
      id
    }
  }`,
);

const ExpensePage = () => {
  const { id } = useLocalSearchParams();
  const [dateFilter, setDateFilter] = useState<Date | string>('All');
  const [modal, setModal] = useState(false);
  const [isDeleting, setDeleting] = useState(false);

  const handleBack = () => {
    return router.back();
  };
  const onButtonPress = () => {
    setModal(true);
  };

  const itinerary = useQuery(GetTravelerItineraryDocument, {
    variables: {
      tripId: parseInt(id as string),
    },
  });

  const { loading, error, data } = useQuery(GetTransactionsDocument, {
    variables: {
      itineraryId: itinerary.data!.itinerary.id,
    },
  });

  const [deleteExpense] = useMutation(DeleteExpenseDocument);

  const handleDeleteExpense = async (expenseID: number) => {
    setDeleting(true);
    await deleteExpense({
      variables: {
        deleteExpenseId: expenseID,
      },
      refetchQueries: [
        {
          query: GetTransactionsDocument,
          variables: {
            itineraryId: itinerary.data?.itinerary.id,
          },
        },
      ],
      onError: (error) => {
        console.log('Error', error.message);
      },
      onCompleted: () => setDeleting(false),
    });
  };

  const totalSpending = data?.getTransaction.reduce(
    (accumulator, current) => accumulator + current.amount,
    0,
  );

  const dropdownData = getDatesBetween(
    new Date(itinerary.data?.trip.startDate),
    new Date(itinerary.data?.trip.endDate),
  );

  const dateFilteredExpenses: {
    __typename?: 'Expense' | undefined;
    id: number;
    amount: number;
    category: ExpenseCategory;
    date: Date;
  }[] = data
    ? data.getTransaction.filter((item) =>
        areDatesEqual(new Date(item.date), new Date(dateFilter)),
      )
    : [];

  const pieChartData = data
    ? getPieChartData(
        dateFilter === 'All' ? data.getTransaction : dateFilteredExpenses,
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
              itinerary.data && totalSpending
                ? (itinerary.data.trip.budget - totalSpending).toFixed(2)
                : itinerary.data
                ? itinerary.data.trip.budget.toFixed(2)
                : 0
            }`}
            backgroundColor="#C6F3C7"
            textColor="#13B510"
          />
        </View>
      </View>
      {data?.getTransaction.length == 0 ? (
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
          <View className="mx-9 flex-row justify-between">
            <Text className="font-poppins text-2xl text-[#5D5D5D]">
              Expenses
            </Text>
            <SelectList
              defaultOption={{ key: 'All', value: 'All' }}
              data={['All', ...dropdownData]}
              setSelected={(val: string) => setDateFilter(val)}
              search={false}
              dropdownStyles={{
                backgroundColor: '#EDEBEB',
                position: 'absolute',
                borderWidth: 0,
                width: 150,
              }}
              boxStyles={{
                backgroundColor: '#EDEBEB',
                width: 150,
                borderWidth: 0,
              }}
              dropdownTextStyles={{ color: '#696969' }}
            />
          </View>
          <View className="-z-10 mx-1 h-[285]">
            {pieChartData.length == 0 ? (
              <View className="mt-20 items-center justify-center">
                <Text className="text-lg">No expense in the given date.</Text>
              </View>
            ) : (
              <SwipeListView
                scrollEnabled={true}
                data={
                  dateFilter === 'All'
                    ? data!.getTransaction
                    : dateFilteredExpenses
                }
                renderItem={({ item }) => (
                  <TransactionsListItem
                    category={item.category}
                    amount={parseFloat(item.amount.toFixed(2))}
                  />
                )}
                renderHiddenItem={(item) => (
                  <ExpenseDeleteButton
                    onPress={() =>
                      confirmationAlert(
                        'Delete expense',
                        'Are you sure you want to delete this expense?',
                        'Delete',
                        'Cancel',
                        () => handleDeleteExpense(item.item.id),
                      )
                    }
                    isDeleting={isDeleting}
                  />
                )}
                leftOpenValue={0}
                rightOpenValue={-75}
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
      <BottomHalfModal isVisible={modal} onClose={() => setModal(false)}>
        <AddSpendingForm
          closeModal={() => setModal(false)}
          itineraryId={itinerary.data!.itinerary.id}
          minDate={itinerary.data!.trip.startDate as Date}
          maxDate={itinerary.data!.trip.endDate as Date}
        />
      </BottomHalfModal>
    </View>
  );
};

export default ExpensePage;
