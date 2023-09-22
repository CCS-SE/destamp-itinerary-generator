import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const MealPrice = ({
  minPrice,
  maxPrice,
}: {
  minPrice: number;
  maxPrice: number;
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Average meal price per person</Text>
      <View>
        <Text style={styles.mealPrice}>
          {minPrice} PHP - {maxPrice} PHP
        </Text>
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
  mealPrice: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ECB476',
    borderRadius: 10,
    width: 200,
    shadow: {
      elevation: 4,
    },
    marginLeft: 20,
    backgroundColor: 'White',
    fontFamily: 'Poppins',
  },
});

export default MealPrice;
