import React, { useState } from 'react';
import { Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import AdmissionFee from '~/components/BusinessOperator/PriceRange/AdmissionFeeContainer';
import PriceRangeCheckBox from '~/components/BusinessOperator/PriceRange/PriceRangeCheckbox';
import Questions from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';

const AdmissionFeeScreen = () => {
  const [admissionFee, setAdmissionFee] = useState<number>(0);
  const [showAdmissionFeeInput, setShowAdmissionFeeInput] =
    useState<boolean>(true);

  const handleAdmissionFeeOptionSelect = (selectedOption: string | null) => {
    setShowAdmissionFeeInput(selectedOption !== 'NO');
  };
  const handleNextButton = () => {
    router.push('/business/create/establishmentType');
  };

  function handleAdmissionFeeChange(value: number): void {
    console.log('Admission Fee changed:', value);
    setAdmissionFee(value);
  }

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <CreateBusinessHeader title={'Price Range'} />
      <SafeAreaView>
        <Questions question={'Admission Fee'} />
        <Text
          style={{ fontFamily: 'Poppins', marginBottom: 15, color: 'gray' }}
        >
          Is there a fee for visiting this place?
        </Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 50,
          }}
        >
          {showAdmissionFeeInput && (
            <AdmissionFee
              admissionFee={admissionFee.toString()}
              admissionFeeOnChange={handleAdmissionFeeChange}
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
export default AdmissionFeeScreen;
