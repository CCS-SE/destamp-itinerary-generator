import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const Companions = ({
  icons,
  color,
  title,
  onPress,
}: {
  icons: React.ReactNode;
  color: string;
  title: string;
  onPress: () => void;
}) => {
  const styles = StyleSheet.create({
    container: {
      backgroundColor: color,
      borderRadius: 15,
      padding: 10,
      width: 130,
      height: 80,
      alignContent: 'center',
      justifyContent: 'center',
      elevation: 5,
      shadowOffset: {
        width: 5,
        height: 2,
      },
      shadowRadius: 10,
    },
    icon: {
      textAlign: 'center',
      color: 'orange',
    },
    title: {
      textAlign: 'center',
      marginTop: 3,
      fontFamily: 'Poppins',
      color: 'orange',
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={[styles.container]}>
        <Text style={styles.icon}>{icons}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Companions;
