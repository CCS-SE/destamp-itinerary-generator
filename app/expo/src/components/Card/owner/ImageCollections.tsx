import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  View,
} from 'react-native';

const ImageCollections = ({ images }: { images: ImageSourcePropType[] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Photos</Text>
      <View>
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <Image source={item} style={styles.image}></Image>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    marginBottom: 10,
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#FC8040',
    marginBottom: 8,
  },
  image: {
    width: 100,
    height: 100,
    marginHorizontal: 5,
  },
});

export default ImageCollections;
