import React, { useState } from 'react';
import { View } from 'react-native';
import { gql, useQuery } from '@apollo/client';

import AbsoluteButton from '~/components/Button/AbsoluteButton';
import ColoredContainer from '~/components/Container/ColoredContainer';
import AddSpendingForm from '~/components/Forms/AddSpendingForm';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';
import { GetTransactionsDocument } from '~/graphql/generated';

const GetTransactionsQuery = gql(
  `query GetTransactions($itineraryId: Int!){
    getTransaction(itineraryId: $itineraryId) {
      amount
      category
      date
    }
  }`,
);

export const ExpensePage = () => {
  const [modal, setModal] = useState(false);

  const onButtonPress = () => {
    setModal(true);
  };

  const { loading, error, data } = useQuery(GetTransactionsDocument);

  return (
    <>
      <View>
        <View className="flex-row">
          <ColoredContainer
            title="SPENDING"
            content="P0"
            backgroundColor="#F6CAD4"
            textColor="#FC8040"
          />
          <ColoredContainer
            title="BALANCE"
            content="P0"
            backgroundColor="#C6F3C7"
            textColor="#13B510"
          />
        </View>
      </View>
      <AbsoluteButton title="+" onPress={onButtonPress} />
      <BottomHalfModal isVisible={modal} onClose={() => setModal(false)}>
        <AddSpendingForm onSubmit={() => setModal(false)} />
      </BottomHalfModal>
    </>
  );
};
