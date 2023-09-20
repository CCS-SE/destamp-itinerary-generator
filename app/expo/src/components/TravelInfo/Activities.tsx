import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const Activities = ({
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
      alignItems: 'center',
      marginBottom: 16,
    },
    circle: {
      backgroundColor: color,
      borderRadius: 50,
      padding: 10,
      width: 80,
      height: 80,
      alignContent: 'center',
      justifyContent: 'center',
      elevation: 5,
      shadowOffset: {
        width: 5,
        height: 2,
      },
      shadowRadius: 10,
      margin: 5,
    },
    icon: {
      textAlign: 'center',
      // color: 'orange'
    },
    title: {
      textAlign: 'center',
      marginTop: 3,
      fontFamily: 'Poppins',
      maxWidth: 80,
      fontSize: 10,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.circle]}>
          <Text style={styles.icon}>{icons}</Text>
        </View>
        <Text style={styles.title}>{title}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default Activities;
