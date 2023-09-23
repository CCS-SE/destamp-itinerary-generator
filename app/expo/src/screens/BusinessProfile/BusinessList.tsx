import React from 'react';
import { View } from 'react-native';

import BusinessProfileCard from '~/components/Card/BusinessCard';

const BusinessListScreen = () => {
  return (
    <View>
      <BusinessProfileCard
        businessName={'Teepee'}
        businessAddress={'something'}
        onPress={function (): void {
          throw new Error('Function not implemented.');
        }}
      />
    </View>
  );
};

export default BusinessListScreen;
