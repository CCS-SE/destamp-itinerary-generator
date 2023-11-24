import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';

import VerificationOptionCard from '~/components/Card/owner/VerificationOptionCard';

const VerificationOption = () => {
  return (
    <View>
      <Text style={styles.instruction}>Select a way to get verified</Text>
      <VerificationOptionCard
        title={'Get verification through phone number'}
        description={
          'To confirm your identity, the phone number listed for this business will receive a text with verification code.'
        }
        icon={[require('../../../../assets/images/SMS.svg')]}
        onPress={() => router.push('/business/verfication/1')}
      />
      <VerificationOptionCard
        title={
          'Get verified by uploading business permit or other proof of ownership'
        }
        description={
          'To confirm your identity, submit a copy of your business permit or any valid proof of ownership. This process may take approximately 1-2 days to complete.'
        }
        icon={[require('../../../../assets/images/documents.svg')]}
        onPress={() => {}}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 301,
    height: 116,
    backgroundColor: '#FAFAFA66',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
  },
  content: {
    alignContent: 'center',
    width: 200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Poppins',
    color: '#FC8040',
  },
  description: {
    fontSize: 11,
    fontFamily: 'Poppins',
    color: '#818181',
  },
  instruction: {
    fontSize: 20,
    // height: 800,
    color: '#FC8040',
    fontFamily: 'Poppins',
    margin: 15,
  },
});
export default VerificationOption;
