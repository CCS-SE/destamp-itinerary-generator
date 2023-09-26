import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

const UserInformation = ({ userInfo }: { userInfo: string }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{userInfo}</Text>
      <TextInput style={styles.form} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
    marginBottom: 10,
  },
  title: {
    color: 'black',
    fontFamily: 'Poppins',
    fontSize: 13,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  form: {
    borderWidth: 1,
    borderColor: '#7D8082',
    width: 305,
    height: 35,
    borderRadius: 10,
    padding: 3,
    marginTop: 5,

    alignSelf: 'center',
  },
});
export default UserInformation;
