import React from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const ReviewForms = ({
  icons,
  title,
  onPress,
}: {
  icons: React.ReactNode;
  title: string;
  onPress: () => void;
}) => {
  const styles = StyleSheet.create({
    container: {
      marginTop: 20,
      marginLeft: 10,
    },
    form: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 10,
      width: 280,
      height: 60,
      elevation: 5,
      flexDirection: 'row',
      shadowOffset: {
        width: 5,
        height: 2,
      },
      shadowRadius: 10,
    },
    icon: {
      textAlign: 'left',
      marginTop: 3,
      fontFamily: 'Poppins',
      fontSize: 10,
    },
    title: {
      textAlign: 'left',
      marginTop: 3,
      fontFamily: 'Poppins',
      fontSize: 10,
    },
  });

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={[styles.form]}>
          <Text style={styles.icon}>{icons}</Text>
          <Text style={styles.title}>{title}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ReviewForms;
