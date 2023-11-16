import React from 'react';
import { StyleSheet, View } from 'react-native';

import OperatorInformation from '../../components/BusinessOperator/operatorInformation';

const VerificationScreen = () => {
  return (
    <View style={styles.container}>
      <OperatorInformation
        businessName={'Teepee'}
        businessAddress={
          'TeePee, Iloilo City, Philippines PGHW+3JV, Jaro, Iloilo City, Iloilo'
        }
      ></OperatorInformation>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default VerificationScreen;
