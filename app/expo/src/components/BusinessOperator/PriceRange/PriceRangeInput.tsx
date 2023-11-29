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
    // Check if both min and max prices are empty
    if (minPrice === 0 && maxPrice === 0) {
      setShowErrorMessage(true);
    }
  };
  const textBoxStyle: ViewStyle = {
    height: 40,
    borderColor: 'transparent',
    borderRadius: 5,
    backgroundColor: 'white',
    borderWidth: 1,
    flex: 1,
    justifyContent: 'space-around',
    padding: 5,
  };
  return (
    <View style={{ margin: 15, marginBottom: 40 }}>
      <View
        style={{
          alignItems: 'center',
          borderRadius: 10,
          width: 260,
          padding: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          backgroundColor: '#FFA053',
          shadowColor: '#000',
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}
      >
        <Text
          style={{
            fontFamily: 'Poppins',
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
            style={textBoxStyle}
            keyboardType="numeric"
            maxLength={9} // Limit maxPrice to 9 digits
            value={minPrice !== 0 ? minPrice.toString() : ''}
            onChangeText={handleMinPriceChange}
            onBlur={handleBlur}
          />
          <Text style={{ fontSize: 18, marginHorizontal: 5, color: 'white' }}>
            -
          </Text>
          <TextInput
            style={textBoxStyle}
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
