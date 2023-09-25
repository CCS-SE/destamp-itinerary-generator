import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileDescription = ({
  businessName,
  description,
}: {
  businessName: string;
  description: string;
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.businessName}>{businessName}</Text>
      </View>
      <View>
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
    padding: 25,
    marginTop: 25,
  },
  description: {
    fontSize: 10,
    fontFamily: 'Poppins',
    color: 'black',
  },
  businessName: {
    fontSize: 13,
    fontFamily: 'Poppins',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default ProfileDescription;
