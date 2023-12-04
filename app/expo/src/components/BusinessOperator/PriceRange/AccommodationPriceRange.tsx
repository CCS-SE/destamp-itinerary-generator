import React, { useState } from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import PriceRangeInput from '~/components/BusinessOperator/PriceRange/PriceRangeInput';
import Questions from '~/components/BusinessOperator/Question';

const AccommodationPriceRange = () => {
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

  // const handleNextButton = () => {
  //   console.log('minPrice:', minPrice);
  //   console.log('maxPrice:', maxPrice);
  //   console.log('admissionFee:', admissionFee);
  //   console.log('showAdmissionFeeInput:', showAdmissionFeeInput);
  //   if (minPrice === 0 && maxPrice === 0) {
  //     console.log('Invalid Price Range');
  //     window.alert('Invalid Price Range: Please input a price range.');
  //   } else if (minPrice >= maxPrice) {
  //     console.log('Invalid Price Range');
  //     window.alert(
  //       'Invalid Price Range: Minimum price should be lower than the maximum price.',
  //     );
  //   } else {
  //     console.log('Navigating to the next screen');
  //     router.push('/business/create/establishmentType');
  //   }
  // };

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <SafeAreaView>
        <Questions question={'Average price range of room per night'} />
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
export default AccommodationPriceRange;
