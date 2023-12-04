import React, { useState } from 'react';
import { Text, TextInput, View, ViewStyle } from 'react-native';

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
  const [showErrorMessage, setShowErrorMessage] = useState<boolean>(false);
  const handleMinPriceChange = (value: string) => {
    setShowErrorMessage(false);
    if (value === '') {
      onMinPriceChange('0');
    } else {
      onMinPriceChange(value);
    }
  };
  const handleMaxPriceChange = (value: string) => {
    setShowErrorMessage(false);
    if (value === '') {
      onMaxPriceChange('0');
    } else {
      onMaxPriceChange(value);
    }
  };
  const handleBlur = () => {
    if (minPrice === 0 && maxPrice === 0) {
      setShowErrorMessage(true);
    }
  };
  const textBoxStyle: ViewStyle = {
    height: 50,
    borderColor: 'transparent',
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'space-around',
    padding: 5,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 1,
    elevation: 3,
  };

  return (
    <View style={{ marginBottom: 40 }}>
      <View
        className=" h-[60] w-[70] items-center justify-center rounded-lg bg-gray-100"
        style={{
          alignItems: 'center',
          borderRadius: 10,
          width: 280,
          height: 70,
          padding: 10,
          flexDirection: 'row',
          // backgroundColor: '#FF8439',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 3,
        }}
      >
        <Text
          style={{
            fontFamily: 'Poppins',
            fontSize: 20,
            fontWeight: 'bold',
            marginRight: 20,
            paddingLeft: 8,
            color: 'gray',
          }}
        >
          ₱
        </Text>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', width: 200 }}
        >
          <TextInput
            style={{
              ...textBoxStyle,
              fontFamily: 'Poppins',
              fontSize: 20,
              textAlign: 'center',
            }}
            keyboardType="numeric"
            maxLength={9} // Limit maxPrice to 9 digits
            value={minPrice !== 0 ? minPrice.toString() : ''}
            onChangeText={handleMinPriceChange}
            onBlur={handleBlur}
          />
          <Text style={{ fontSize: 25, marginHorizontal: 5, color: 'gray' }}>
            -
          </Text>
          <TextInput
            style={{
              ...textBoxStyle,
              fontFamily: 'Poppins',
              fontSize: 20,
              textAlign: 'center',
            }}
            keyboardType="numeric"
            maxLength={9} // Limit maxPrice to 9 digits
            value={maxPrice !== 0 ? maxPrice.toString() : ''}
            onChangeText={handleMaxPriceChange}
            onBlur={handleBlur}
          />
        </View>
      </View>
      {showErrorMessage && (
        <Text style={{ color: 'red', marginLeft: 10, marginTop: 5 }}>
          Please input a price range.
        </Text>
      )}
    </View>
  );
};
export default PriceRangeInput;
