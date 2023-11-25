import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const ProfileDescription = ({
  businessName,
  businessAddress,
  description,
}: {
  businessName: string;
  businessAddress: string;
  description: string;
}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, { width: screenWidth * 0.85 }]}>
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
    backgroundColor: '#FDE4C8',
    borderRadius: 18,
    padding: 18,
    marginTop: 25,
  },
  description: {
    fontSize: 12,
    fontFamily: 'Poppins',
    color: 'black',
  },
  businessName: {
    fontSize: 16,
    fontFamily: 'Poppins',
    color: 'black',
    fontWeight: 'bold',
  },
  businessAddress: {
    fontFamily: 'Poppins',
    fontSize: 12,
  },
});

export default ProfileDescription;
