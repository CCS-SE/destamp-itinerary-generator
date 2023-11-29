import React from 'react';
import { Text, View } from 'react-native';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';

const ReviewBusiness = ({ title }: { title: string }) => {
  return (
    <View style={{ alignContent: 'center' }}>
      <CreateBusinessHeader title={'Review Business'} />
      <Text> REVIEW</Text>
    </View>
  );
};

export default ReviewBusiness;
