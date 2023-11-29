import React, { useState } from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import PriceInput from '~/components/BusinessOperator/PriceRange/AdmissionFee';
import PriceRangeInput from '~/components/BusinessOperator/PriceRange/PriceRangeInput';
import Questions from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import CreateBusinessHeader from '.';

const PriceRange = () => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [admissionFee, setAdmissionFee] = useState<number>(0);

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

  const handleNextButton = () => {
    if (minPrice === 0 && maxPrice === 0) {
      Alert.alert('Invalid Price Range', 'Please input a price range.');
    } else if (minPrice >= maxPrice) {
      Alert.alert(
        'Invalid Price Range',
        'Minimum price should be lower than the maximum price.',
      );
    } else {
      router.push('/business/create/restaurantFacilities');
    }
  };

  return (
    <View style={styles.container}>
      <CreateBusinessHeader title={'Price Range'} />
      <SafeAreaView>
        <Questions question={'Average price range per person'} />
        <View style={styles.row}></View>
        <View>
          <PriceRangeInput
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
          />
        </View>
        <Questions question={'Admission Fee'} />
        <Text style={{ fontFamily: 'Poppins' }}>
          Is there a fee for visiting this place?
        </Text>
        <PriceInput admissionFee={admissionFee} />
        <BasicButton title={'Next'} onPress={handleNextButton} />
      </SafeAreaView>
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
