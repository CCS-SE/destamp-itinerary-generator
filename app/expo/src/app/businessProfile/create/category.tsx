import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Questions from '~/components/BusinessOperator/questions';
import CustomContainer from '~/components/Container/CustomContainer';

const ChooseCategory = () => {
  return (
    <View>
      <SafeAreaView>
        <Questions question={'Category'} />
        <CustomContainer content={'Accommodation'} height={50} width={300} />
        <CustomContainer content={'Attraction'} height={50} width={300} />
        <CustomContainer content={'Restaurant'} height={50} width={300} />

        <Questions question={'Select Category'} />
      </SafeAreaView>
    </View>
  );
};

export default ChooseCategory;
