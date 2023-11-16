import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface ImageItem {
  url: string;
}

const BusinessProfileCard = ({
  businessName,
  businessImages,
  businessAddress,
  onPress,
}: {
  businessName: string;
  businessImages: ImageItem[];
  businessAddress: string;
  onPress: () => void;
}) => {
  const firstImage = businessImages.length > 0 ? businessImages[0] : null;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {firstImage && (
          <Image source={{ uri: firstImage.url }} style={styles.image} />
        )}
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
    flexDirection: 'row',
  },
  image: {
    width: 64,
    height: 64,
    borderRadius: 10,
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
    marginLeft: 5,
  },
});

export default BusinessProfileCard;
