import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// import textIcon from '../../../assets/images/textMessageIcon';

const VerificationOption = () => {
  // const textIcon = require('../../../assets/images/textMessageIcon.png');
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.content}>
              <Text style={styles.title}>
                Get verification through phone number
              </Text>
              <Text style={styles.description}>
                To confirm your identity, the phone number listed for this
                business will receive a text with verification code.{' '}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
  textMessageIcon: {},
});
export default VerificationOption;
