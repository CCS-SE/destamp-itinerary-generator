import React, { useState } from 'react';
import { FlatList, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { PieChart } from 'react-native-svg-charts';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { gql, useQuery } from '@apollo/client';

import AbsoluteButton from '~/components/Button/AbsoluteButton';
import ColoredContainer from '~/components/Container/ColoredContainer';
import AddSpendingForm from '~/components/Forms/AddSpendingForm';
import TransactionsListItem from '~/components/List/ListItems/TransactionsListItem';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';
import {
  GetTransactionsDocument,
  GetTravelerItineraryDocument,
} from '~/graphql/generated';
import { getPieChartData } from '~/utils/utils';
import Back from '../../../assets/images/back-icon.svg';

export const GetTransactionsQuery = gql(
  `query GetTransactions($itineraryId: Int!){
    getTransaction(itineraryId: $itineraryId) {
      amount
      category
      date
    }
  }`,
);

const ExpensePage = () => {
  const { id } = useLocalSearchParams();

  const [modal, setModal] = useState(false);

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

  const totalSpending = data?.getTransaction.reduce(
    (accumulator, current) => accumulator + current.amount,
    0,
  );

  const pieChartData = getPieChartData(data ? data.getTransaction : []);

  if (error) return <Text>{`Error! ${error.message.toString()}`}</Text>;

  if (loading) {
    return (
      <View>
        <Stack.Screen options={{ title: 'Expense' }} />
        <Text>{'Loading...'}</Text>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView edges={['top']} className="flex-0">
        <View className="mx-4 flex-row justify-between">
          <Back height={45} width={45} onPress={handleBack} />
        </View>
      </SafeAreaView>
      <View>
        <Stack.Screen options={{ headerShown: false }} />
        <View className="mx-5 flex-row">
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
                : 0
            }`}
            backgroundColor="#C6F3C7"
            textColor="#13B510"
          />
        </View>
      </View>
      {data?.getTransaction.length == 0 ? (
        <View className="my-64 items-center justify-center">
          <Text className="text-xl">No expenses yet</Text>
        </View>
      ) : (
        <>
          <View className="items-center justify-center p-5">
            <PieChart style={{ width: 200, height: 200 }} data={pieChartData} />
          </View>
          <View className="mx-9 justify-between">
            <Text className="text-lg">Expenses</Text>
          </View>
          <View className="mx-1 h-80">
            {data && (
              <FlatList
                persistentScrollbar={true}
                data={data.getTransaction}
                renderItem={({ item }) => (
                  <TransactionsListItem
                    category={item.category}
                    amount={parseFloat(item.amount.toFixed(2))}
                  />
                )}
              />
            )}
          </View>
        </>
      )}

      <AbsoluteButton title="+" onPress={onButtonPress} />
      <BottomHalfModal isVisible={modal} onClose={() => setModal(false)}>
        <AddSpendingForm
          closeModal={() => setModal(false)}
          itineraryId={itinerary.data!.itinerary.id}
          minDate={itinerary.data!.trip.startDate as Date}
          maxDate={itinerary.data!.trip.endDate as Date}
        />
      </BottomHalfModal>
    </>
  );
};

export default ExpensePage;
