import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ContactVerification = ({ phoneNumber }: { phoneNumber: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.firstPar}>
        Identity verification ensures the highest levels of security and helps
        us to prevent fraud.
      </Text>
      <Text style={styles.secondPar}>We will text this phone number:</Text>
      <View style={styles.box}>
        <Text style={styles.phoneNumber}>{phoneNumber}</Text>
      </View>
      <Text style={styles.thirdPar}>
        The phone number listed for this business will receive an SMS with a
        verification code.
      </Text>
      <Text style={styles.fourthPar}>
        To confirm you as a representative of this property, we will send a
        confirmation code to your phone.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
  firstPar: {
    width: 267,
    fontSize: 15,
    fontFamily: 'Poppins',
    alignSelf: 'center',
    textAlign: 'center',
    margin: 40,
    marginBottom: 50,
  },
  secondPar: {
    fontSize: 14,
    fontFamily: 'Poppins',
    alignContent: 'flex-start',
    marginLeft: 38,
    marginBottom: 5,
    width: 217,
  },
  box: {
    width: 252,
    height: 37,
    borderWidth: 3,
    borderColor: '#FFC98B',
    borderRadius: 10,
    padding: 3,
    alignSelf: 'center',
    marginBottom: 40,
  },
  phoneNumber: {
    color: '#DE4D6C',
    alignSelf: 'center',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
  },
  thirdPar: {
    fontFamily: 'Poppins',
    fontSize: 14,
    fontWeight: 'bold',
    width: 262,
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 50,
  },

  fourthPar: {
    width: 236,
    fontSize: 10,
    fontFamily: 'Poppins',
    alignSelf: 'center',
    textAlign: 'center',
    marginBottom: 30,
  },
});
export default ContactVerification;
