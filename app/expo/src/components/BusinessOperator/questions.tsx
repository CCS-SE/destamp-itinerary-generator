import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const Questions = ({ question }: { question: string }) => {
  return (
    <View>
      <Text style={styles.text}> {question}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Poppins',
    color: 'orange',
    fontWeight: 'bold',
    fontSize: 25,
  },
});

export default Questions;
