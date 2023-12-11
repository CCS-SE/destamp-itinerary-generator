import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BasicButton = ({
  title,
  color,
  onPress,
}: {
  title: string;
  color?: string;
  onPress: () => void;
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: color || '#FC8040' }]}
        onPress={onPress}
        activeOpacity={0.9}
      >
        <Text style={styles.title}>{title} </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 30,
    alignItems: 'center',
  },
  button: {
    borderRadius: 10,
    width: 229,
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins',
    color: 'white',
  },
});
export default BasicButton;
