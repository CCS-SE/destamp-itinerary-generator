import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import SimpleButton from '~/components/Button/simpleButton';
import AuthenticationStatement from '~/components/Card/authStatement';
import UserInformation from '~/components/Forms/UserInfoForm';

const PhoneNumberVerification = ({
  businessName,
  businessAddress,
}: {
  businessName: string;
  businessAddress: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.businessInfo}>
        <Text style={styles.businessName}>{businessName}</Text>
        <Text style={styles.businessAddress}>{businessAddress}</Text>
      </View>
      <View>
        <UserInformation userInfo={'First Name'}></UserInformation>
        <UserInformation userInfo={'Last Name'}></UserInformation>
        <UserInformation userInfo={'Role at Business'}></UserInformation>
      </View>
      <AuthenticationStatement />
      <SimpleButton
        title={'Continue'}
        onPress={() => router.push('/verificationScreen/phoneVerification')}
      ></SimpleButton>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    color: '#FC8040',
    fontFamily: 'Poppins',
  },
  businessName: {
    fontSize: 18,
    color: '#DE4D6C',
    fontWeight: 'bold',
    margin: 5,
    fontFamily: 'Poppins',
  },
  businessAddress: {
    width: 230,
    color: '#EA561F',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  businessInfo: {
    alignItems: 'center',
    marginBottom: 10,
    marginTop: 10,
  },
});
export default PhoneNumberVerification;
