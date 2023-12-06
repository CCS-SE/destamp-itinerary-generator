import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PriceRangeInput from '~/components/BusinessOperator/PriceRange/PriceRangeInput';
import Questions from '~/components/BusinessOperator/Question';

const PriceRange = ({ title }: { title: string }) => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const handleMinPriceChange = (value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      setMinPrice(parsedValue);
    }
  };
  const handleMaxPriceChange = (value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      setMaxPrice(parsedValue);
    }
  };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <SafeAreaView>
        <Questions question={title} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}></View>
        <View style={{ alignItems: 'center', margin: 10 }}>
          <PriceRangeInput
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
export default PriceRange;
