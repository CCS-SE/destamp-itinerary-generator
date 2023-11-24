import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import BottomHalfModal from '~/components/Modal/BottomHalfModal';

interface ImageItem {
  id: string;
  url: string;
}

const ImageCollections = ({ images }: { images: ImageItem[] }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selectedImage, setSelectedImage] = useState<ImageItem | null>(null);

  const screenWidth = Dimensions.get('window').width;

  const openModal = (image: ImageItem) => {
    setSelectedImage(image); // Set the selected image
    setModalVisible(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, { width: screenWidth * 0.85 }]}>
      <Text style={styles.title}>Photos</Text>
      <View>
        <FlatList
          data={images}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => openModal(item)}
              activeOpacity={0.8}
            >
              <Image source={{ uri: item.url }} style={styles.image} />
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true}
        />
      </View>
      {selectedImage && (
        <BottomHalfModal isVisible={isModalVisible} onClose={closeModal}>
          <Image
            source={{ uri: selectedImage.url }}
            style={styles.modalImage}
          />
        </BottomHalfModal>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
  modalImage: {
    width: '100%', // Adjust the size as needed
    height: 300,
  },
});

export default ImageCollections;
