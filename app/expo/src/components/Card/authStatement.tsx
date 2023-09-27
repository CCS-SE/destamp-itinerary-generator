import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Checkbox from 'expo-checkbox';

const AuthenticationStatement = () => {
  const [isChecked, setChecked] = useState(false);
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <View>
          <Checkbox
            style={styles.checkbox}
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? '#FC8040' : undefined}
          />
        </View>
        <View>
          <Text style={styles.statement}>
            I certify that I am an authorized representative or affiliate of
            this establishment and have the authority to register as a business
            representative. The information I have entered into this form is
            neither false nor fraudulent. I also understand that Destamp may
            disclose my name and affiliation to other verified representatives
            of this establishment.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    alignContent: 'center',
    alignItems: 'center',
    width: 280,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  statement: {
    color: 'black',

    fontFamily: 'Poppins',
    fontSize: 11,
    alignContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  checkbox: {
    margin: 5,
  },
});
export default AuthenticationStatement;
