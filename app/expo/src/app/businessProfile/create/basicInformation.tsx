import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Question from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import CustomContainer from '~/components/Container/CustomContainer';

const BusinessBasicInformation = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <SafeAreaView>
        <Question question={'About'} />
        <CustomContainer
          placeholder={'Business Name'}
          height={50}
          width={300}
        />
        <CustomContainer placeholder={'Description'} height={50} width={300} />

        <Question question={'Contact Information'} />
        <CustomContainer placeholder={'Phone Number'} height={50} width={300} />

        <Question question={'Address'} />
        <CustomContainer placeholder={'Province'} height={50} width={300} />
        <CustomContainer placeholder={'City'} height={50} width={300} />
        <CustomContainer
          placeholder={'Street Address'}
          height={50}
          width={300}
        />

        <BasicButton
          title={'Next'}
          onPress={function (): void {
            throw new Error('Function not implemented.');
          }}
        />
      </SafeAreaView>
    </View>
  );
};
export default BusinessBasicInformation;
