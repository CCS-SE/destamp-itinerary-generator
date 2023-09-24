import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const SimpleButton = ({
  title,
  onPress,
}: {
  title: string;
  onPress: () => void;
}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
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
    backgroundColor: '#FC8040',
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
export default SimpleButton;
