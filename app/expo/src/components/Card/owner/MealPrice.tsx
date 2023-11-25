import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const MealPrice = ({ price }: { price: string }) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, { width: screenWidth * 0.85 }]}>
      <Text style={styles.title}>Average meal price per person</Text>
      <View style={styles.mealPriceBorder}>
        <Text>{price} PHP</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 15,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#FC8040',
    marginBottom: 10,
  },
  mealPriceBorder: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ECB476',
    borderRadius: 10,
    width: 200,
    backgroundColor: 'white',
    elevation: 4,
  },
});

export default MealPrice;
