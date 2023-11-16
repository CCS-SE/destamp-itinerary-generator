import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import GradientButton from '~/components/Button/GradientButton';

const EmpltyBusinessList = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.pagedisplay}> You dont have any listing yet.</Text>
      <View style={styles.buttonContainer}>
        <GradientButton
          onPress={function (): void {
            throw new Error('Function not implemented.');
          }}
          title={'Get Started'}
          isSubmitting={false}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // margin: 100,
  },
  pagedisplay: {
    fontSize: 20,
    color: '#FC8040',
    margin: 80,
    alignItems: 'center',
    textAlign: 'center',
    fontFamily: 'Poppins',
  },
  buttonContainer: {},
});
export default EmpltyBusinessList;
