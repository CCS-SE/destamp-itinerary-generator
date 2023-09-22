import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ContactInformation = ({
  contactNumber,
  emailAddress,
}: {
  contactNumber: number;
  emailAddress: string;
}) => {
  return (
    <View style={styles.contactInfoBox}>
      <Text style={styles.title}> Contact Details </Text>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.infoCategory}> Phone Number: </Text>
          <Text style={styles.infoInput}> +63 {contactNumber} </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoCategory}> Email Address: </Text>
          <Text style={styles.infoInput}>
            {' '}
            {'  '}
            {emailAddress}{' '}
          </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contactInfoBox: {
    marginTop: 25,
  },
  container: {
    width: 322,
    paddingLeft: 20,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#FC8040',
    margin: 5,
  },
  infoCategory: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#DE4D6C',
    marginLeft: 10,
    marginBottom: 3,
  },
  infoInput: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#EB4335',
    marginLeft: 10,
  },
});

export default ContactInformation;
