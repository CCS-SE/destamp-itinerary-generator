import React, { useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import PriceOption from '~/components/BusinessOperator/PriceRangeInput';
import Questions from '~/components/BusinessOperator/Question';

const PriceRange = () => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);

  return (
    <View style={styles.container}>
      <ScrollView>
        <SafeAreaView>
          <Questions question={'Average price range per person'} />
          <View style={styles.row}></View>
          <View>
            <PriceOption
              minPrice={minPrice}
              maxPrice={maxPrice}
              onMinPriceChange={(value: string) => {
                const parsedValue = parseFloat(value);
                if (!isNaN(parsedValue)) {
                  setMinPrice(parsedValue);
                }
              }}
              onMaxPriceChange={(value: string) => {
                const parsedValue = parseFloat(value);
                if (!isNaN(parsedValue)) {
                  setMaxPrice(parsedValue);
                }
              }}
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
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default PriceRange;
