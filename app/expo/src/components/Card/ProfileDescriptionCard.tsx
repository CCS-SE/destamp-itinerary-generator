import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const ProfileDescription = ({
  businessName,
  businessAddress,
  description,
}: {
  businessName: string;
  businessAddress: String;
  description: String;
}) => {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.businessName}>{businessName}</Text>
      </View>
      <View>
        <Text style={styles.businessAddress}>
          {businessAddress}
          {'\n'}
        </Text>
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
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 25,
    paddingRight: 25,
    marginTop: 25,
  },
  description: {
    fontSize: 10,
    fontFamily: 'Poppins',
    color: 'black',
  },
  businessName: {
    fontSize: 15,
    fontFamily: 'Poppins',
    color: 'black',
    fontWeight: 'bold',
  },
  businessAddress: {
    fontFamily: 'Poppins',
    fontSize: 11,
  },
});

export default ProfileDescription;
