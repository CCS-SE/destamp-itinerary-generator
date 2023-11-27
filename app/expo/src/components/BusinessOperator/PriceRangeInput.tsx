import React from 'react';
import { Text, TextInput, View } from 'react-native';

import BasicButton from '../Button/BasicButton';

const PriceRangeInput = ({
  minPrice,
  maxPrice,
  onMinPriceChange,
  onMaxPriceChange,
}: {
  minPrice: number;
  maxPrice: number;
  onMinPriceChange: (value: string) => void;
  onMaxPriceChange: (value: string) => void;
}) => {
  return (
    <View>
      <View
        style={{
          alignItems: 'center',
          borderColor: '#5A5A5A',
          borderRadius: 10,
          width: 280,
          padding: 10,
          margin: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#EB4586',
        }}
      >
        <Text
          style={{
            fontSize: 20,
            fontWeight: 'bold',
            paddingRight: 8,
            paddingLeft: 8,
            color: 'white',
          }}
        >
          ₱
        </Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', width: 200 }}
        >
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderRadius: 5,
              backgroundColor: 'white',
              flex: 1,
              justifyContent: 'space-around',
              padding: 5,
            }}
            keyboardType="numeric"
            value={minPrice.toString()}
            onChangeText={onMinPriceChange}
          />
          <Text style={{ fontSize: 18, marginHorizontal: 5, color: 'white' }}>
            -
          </Text>
          <TextInput
            style={{
              height: 40,
              borderColor: 'gray',
              borderRadius: 5,
              backgroundColor: 'white',
              flex: 1,
              justifyContent: 'space-around',
              padding: 5,
            }}
            keyboardType="numeric"
            value={maxPrice.toString()}
            onChangeText={onMaxPriceChange}
          />
        </View>
      </View>
      <BasicButton
        title={'Next'}
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
};

export default PriceRangeInput;
