import React, { useState } from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import GradientButton from '~/components/Button/GradientButton';

const MAX_IMAGES = 4;

const BusinessPhotos: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<
    ImagePicker.ImagePickerResult[]
  >([]);

  const pickPhotos = async () => {
    try {
      if (selectedFiles.length < MAX_IMAGES) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
        });

        if (!result.canceled) {
          setSelectedFiles([...selectedFiles, result]);
        }
      } else {
        Alert.alert('Maximum number of images reached');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deletePhoto = (index: number) => {
    const updatedFiles = [...selectedFiles];
    updatedFiles.splice(index, 1);
    setSelectedFiles(updatedFiles);
  };

  const uploadPhotos = async () => {
    if (selectedFiles.length > 0) {
      try {
        for (const file of selectedFiles) {
          const fileContent = await FileSystem.readAsStringAsync(file.uri);
          console.log('File Content:', fileContent);
          router.push('/business/create/verificationPage');
        }
        setSelectedFiles([]);
      } catch (error) {
        console.error('Error reading file:', error);
      }
    } else {
      console.log('Please select at least one file before uploading.');
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: 'white' }}>
      <CreateBusinessHeader title={'Business Photos'} />
      <ScrollView>
        <View style={{ margin: 20 }}>
          <Text
            style={{
              fontFamily: 'Poppins',
              fontSize: 25,
              marginBottom: 10,
              color: '#FF8439',
              fontWeight: '500',
            }}
          >
            Show us your place!
          </Text>
          <Text style={{ fontFamily: 'Poppins', fontSize: 15, color: 'gray' }}>
            Please upload a images of you establishment (up to 4 images)
          </Text>
          {selectedFiles.length < 1 ? (
            <GradientButton
              onPress={pickPhotos}
              title={'Upload Image'}
              isSubmitting={false}
            />
          ) : (
            <TouchableOpacity onPress={pickPhotos}>
              <View
                style={{
                  flexDirection: 'row',
                  marginTop: 20,
                  alignItems: 'center',
                }}
              >
                <Ionicons name="add-circle-outline" size={24} color="orange" />

                <Text style={{ fontFamily: 'Poppins', color: 'orange' }}>
                  ADD MORE PHOTOS
                </Text>
              </View>
            </TouchableOpacity>
          )}
        </View>

        <ScrollView contentContainerStyle={styles.imageContainer}>
          {selectedFiles.map((file, index) => (
            <TouchableOpacity
              key={index}
              onLongPress={() => deletePhoto(index)}
              style={styles.imageWrapper}
            >
              <Image source={{ uri: file.uri }} style={styles.image} />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deletePhoto(index)}
              >
                <Ionicons name="ios-close" size={24} color="#FF8439" />
              </TouchableOpacity>
            </TouchableOpacity>
          ))}
        </ScrollView>
        {selectedFiles.length > 0 && (
          <GradientButton
            title={'Upload files'}
            onPress={uploadPhotos}
            isSubmitting={false}
          />
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 10,
  },
  imageWrapper: {
    width: '48%',
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 200,
    borderRadius: 10,
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: 'transparent',
    padding: 5,
  },
});

export default BusinessPhotos;
