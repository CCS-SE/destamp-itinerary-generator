import React from 'react';
import { StyleSheet, View } from 'react-native';

import PhoneNumberVerification from '~/screens/BusinessUser/PhoneNumberVerification';

const VerificationScreen = () => {
  return (
    <View style={styles.container}>
      <PhoneNumberVerification
        businessName={'Teepee'}
        businessAddress={
          'TeePee, Iloilo City, Philippines PGHW+3JV, Jaro, Iloilo City, Iloilo'
        }
      ></PhoneNumberVerification>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
export default VerificationScreen;
