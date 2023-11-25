import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

const CustomContainer = ({
  content,
  height,
  width,
}: {
  content: string;
  height: number;
  width: number;
}) => {
  return (
    <View style={[styles.container, { height, width }]}>
      <TextInput>{content}</TextInput>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#5A5A5A',
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});

export default CustomContainer;
