import React from 'react';
import { Text, View } from 'react-native';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';

const ReviewBusiness = () => {
  return (
    <View style={{ alignContent: 'center' }}>
      <CreateBusinessHeader title={'Review Business'} />
      <Text> REVIEW</Text>
    </View>
  );
};

export default ReviewBusiness;
