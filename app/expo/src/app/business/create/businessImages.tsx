import React from 'react';
import {
  Alert,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import BasicButton from '~/components/Button/BasicButton';
import StepperButton from '~/components/Button/StepperButton';
import addBusinessFormStore from '~/store/addBusinessFormStore';

const MAX_IMAGES = 5;

const BusinessPhotos: React.FC = () => {
  const { setData, businessImages } = addBusinessFormStore();

  const pickImages = async () => {
    try {
      if (businessImages.urls.length < MAX_IMAGES) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          selectionLimit: MAX_IMAGES - businessImages.urls.length,
          quality: 1,
          allowsMultipleSelection: true,
        });
        if (!result.canceled) {
          setData({
            step: 7,
            data: {
              ...businessImages,
              businessImages: [
                ...businessImages.businessImages,
                ...result.assets,
              ],
              urls: [
                ...businessImages.urls,
                ...result.assets.map((asset) => asset.uri),
              ],
            },
          });
        }
      } else {
        Alert.alert('Maximum number of images reached');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = (index: number) => {
    const updatedImages = [...businessImages.businessImages];
    const updatedImageUrls = [...businessImages.urls];
    updatedImages.splice(index, 1);
    updatedImageUrls.splice(index, 1);
    setData({
      step: 7,
      data: {
        ...businessImages,
        businessImages: updatedImages,
        urls: updatedImageUrls,
      },
    });
  };

  const handleNext = () => router.push('/business/create/businessPermit');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
      }}
    >
      <CreateBusinessHeader title={'Create Business'} />
      <View
        className="rounded-xl bg-gray-100 p-5"
        style={styles.imageContainer}
      >
        {Array.from(Array(5).keys()).map((index) => {
          const image = businessImages.urls[index]!;
          return image ? (
            <TouchableOpacity
              key={index}
              style={styles.imageWrapper}
              activeOpacity={0.9}
            >
              <Image source={{ uri: image }} style={styles.image} />
              <TouchableOpacity
                style={styles.deleteButton}
                onPress={() => deleteImage(index)}
                activeOpacity={0.9}
              >
                <View className="rounded-full bg-orange-500 p-0.5">
                  <Ionicons name="ios-close" size={22} color="white" />
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              key={index}
              onPress={pickImages}
              activeOpacity={0.9}
              disabled={
                businessImages.urls?.length === MAX_IMAGES ? true : false
              }
            >
              <View className="mb-2 h-[130] w-[140] items-center justify-center rounded-sm border border-gray-400">
                <Text className="font-poppins text-xs text-gray-400">
                  Select image
                </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
      <Text
        style={{
          fontFamily: 'Poppins',
          textAlign: 'center',
          fontSize: 15,
          color: 'gray',
          marginBottom: -5,
        }}
      >
        Please upload images of your business
      </Text>
      <BasicButton
        onPress={pickImages}
        title={'Select Images'}
        color="#F65A82"
      />
      <StepperButton
        label="Next"
        onPress={handleNext}
        disabled={businessImages.urls.length === 0}
        className="top-24"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  imageWrapper: {
    width: '42%',
    marginBottom: 10,
    position: 'relative',
  },
  image: {
    width: '100%',
    height: 130,
    borderRadius: 2,
  },
  deleteButton: {
    position: 'absolute',
    top: 2,
    right: 5,
    backgroundColor: 'transparent',
    padding: 5,
  },
});

export default BusinessPhotos;
