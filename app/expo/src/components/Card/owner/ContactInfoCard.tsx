import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const ContactInformation = ({ contactNumber }: { contactNumber: string }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.contactInfoBox, { width: screenWidth * 0.85 }]}>
      <Text style={styles.title}> Contact Details </Text>
      <View>
        <View style={styles.row}>
          <Text style={styles.infoCategory}> Phone Number: </Text>
          <Text style={styles.infoInput}>{contactNumber} </Text>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  contactInfoBox: {
    marginTop: 15,
  },
  row: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#FC8040',
  },
  infoCategory: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#DE4D6C',
    marginBottom: 3,
    marginLeft: 2,
  },
  infoInput: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: '#DE4D6C',
    marginLeft: 13,
  },
});

export default ContactInformation;
