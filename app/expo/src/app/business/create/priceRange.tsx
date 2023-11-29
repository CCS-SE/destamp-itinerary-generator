import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import PriceInput from '~/components/BusinessOperator/PriceRange/AdmissionFee';
import PriceRangeCheckBox from '~/components/BusinessOperator/PriceRange/PriceRangeCheckbox';
import PriceRangeInput from '~/components/BusinessOperator/PriceRange/PriceRangeInput';
import Questions from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';

const PriceRange = () => {
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(0);
  const [admissionFee, setAdmissionFee] = useState<number>(0);
  const [showAdmissionFeeInput, setShowAdmissionFeeInput] =
    useState<boolean>(true);

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

  const handleAdmissionFeeOptionSelect = (selectedOption: string | null) => {
    setShowAdmissionFeeInput(selectedOption !== 'NO');
  };
  const handleNextButton = () => {
    console.log('minPrice:', minPrice);
    console.log('maxPrice:', maxPrice);
    console.log('admissionFee:', admissionFee);
    console.log('showAdmissionFeeInput:', showAdmissionFeeInput);
    if (minPrice === 0 && maxPrice === 0) {
      console.log('Invalid Price Range');
      window.alert('Invalid Price Range: Please input a price range.');
    } else if (minPrice >= maxPrice) {
      console.log('Invalid Price Range');
      window.alert(
        'Invalid Price Range: Minimum price should be lower than the maximum price.',
      );
    } else {
      console.log('Navigating to the next screen');
      router.push('/business/create/establishmentType');
    }
  };
  function handleAdmissionFeeChange(): void {
    console.log('Function not implemented.');
    // console.log(value);
  }

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <CreateBusinessHeader title={'Price Range'} />
      <SafeAreaView>
        <Questions question={'Average price range per person'} />
        <View style={{ flexDirection: 'row', alignItems: 'center' }}></View>
        <View>
          <PriceRangeInput
            minPrice={minPrice}
            maxPrice={maxPrice}
            onMinPriceChange={handleMinPriceChange}
            onMaxPriceChange={handleMaxPriceChange}
          />
        </View>
        <Questions question={'Admission Fee'} />
        <Text style={{ fontFamily: 'Poppins', marginBottom: 15 }}>
          Is there a fee for visiting this place?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 15,
          }}
        >
          {showAdmissionFeeInput && (
            <PriceInput
              admissionFee={admissionFee.toString()}
              admissionFeeOnChange={handleAdmissionFeeChange}
              onChangeText={(value: string) => {
                const parsedValue = parseFloat(value);
                if (!isNaN(parsedValue)) {
                  setAdmissionFee(parsedValue);
                }
              }}
            />
          )}
          <PriceRangeCheckBox
            option={'NO'}
            onSelect={handleAdmissionFeeOptionSelect}
          />
        </View>
        <BasicButton title={'Next'} onPress={handleNextButton} />
      </SafeAreaView>
    </View>
  );
};
export default PriceRange;
