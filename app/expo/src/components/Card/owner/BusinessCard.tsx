import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const BusinessProfileCard = ({
  businessName,
  businessAddress,
  onPress,
}: {
  businessName: string;
  businessAddress: string;
  onPress: () => void;
}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.businessName}> {businessName}</Text>
          <Text style={styles.businessAddress}>{businessAddress}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 311,
    height: 96,
    backgroundColor: '#F4E8E8',
    borderRadius: 10,
    padding: 15,
    margin: 20,
  },
  content: {
    marginLeft: 10,
  },
  businessName: {
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    fontSize: 15,
  },
  businessAddress: {
    width: 200,
    fontSize: 10,
    fontFamily: 'Poppins',
    marginLeft: 15,
  },
});
export default BusinessProfileCard;
