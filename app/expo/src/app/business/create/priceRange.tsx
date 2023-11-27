import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PriceOption from '~/components/BusinessOperator/PriceRangeInput';
import Questions from '~/components/BusinessOperator/Question';
import CreateBusinessHeader from '.';

const PriceRange = () => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  const handleMinPriceChange = (value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      setMinPrice(parsedValue);

      // Check if the new min price is greater than current max price
      if (parsedValue > maxPrice) {
        // If yes, update max price to match min price
        setMaxPrice(parsedValue);
      }
    }
  };

  const handleMaxPriceChange = (value: string) => {
    const parsedValue = parseFloat(value);
    if (!isNaN(parsedValue)) {
      // Check if the new max price is less than current min price
      if (parsedValue < minPrice) {
        // If yes, update min price to match max price
        setMinPrice(parsedValue);
      }

      setMaxPrice(parsedValue);
    }
  };

  return (
    <View style={styles.container}>
      <CreateBusinessHeader />
      <ScrollView>
        <SafeAreaView>
          <Questions question={'Average price range per person'} />
          <View style={styles.row}></View>
          <View>
            <PriceOption
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={handleMinPriceChange}
              onMaxPriceChange={handleMaxPriceChange}
            />
          </View>
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: 'white',
    flex: 1,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PriceRange;
