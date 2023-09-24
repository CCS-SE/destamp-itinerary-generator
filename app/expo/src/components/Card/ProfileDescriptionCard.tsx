import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileDescription = ({ description }: { description: string }) => {
  return (
    <View style={styles.container}>
      <View style={styles.descriptionBox}>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 322,
    backgroundColor: '#FDE4C8',
    borderRadius: 20,
    padding: 30,
    marginTop: 25,
  },
  descriptionBox: {
    fontSize: 10,
    paddingLeft: 100,
  },
  description: {
    fontSize: 10,
    fontFamily: 'Poppins',
    color: 'black',
  },
});

export default ProfileDescription;
