import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MealPrice = ({ price }: { price: number }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Average meal price per person</Text>
      <View style={styles.mealPriceBorder}>
        <Text>{price} PHP</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    marginTop: 10,
  },
  title: {
    margin: 10,
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#FC8040',
  },
  mealPriceBorder: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ECB476',
    borderRadius: 10,
    width: 200,
    marginLeft: 10,
    backgroundColor: 'white',
    elevation: 4,
  },
});

export default MealPrice;
