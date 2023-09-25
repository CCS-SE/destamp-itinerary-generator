import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ContactInformation = ({
  contactNumber,
  location,
}: {
  contactNumber: string;
  location: string;
}) => {
  return (
    <View style={styles.contactInfoBox}>
      <Text style={styles.title}> Contact Details </Text>
      <View style={styles.container}>
        <View style={styles.row}>
          <Text style={styles.infoCategory}> Phone Number: </Text>
          <Text style={styles.infoInput}>{contactNumber} </Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.infoCategory}> Location: </Text>
          <Text style={styles.infoInputLoc}>{location}</Text>
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
    marginLeft: 13,
    width: 200,
  },
  infoInputLoc: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#EB4335',
    marginLeft: 50,
    width: 200,
  },
});

export default ContactInformation;
