import React, { useContext, useState } from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import * as FileSystem from 'expo-file-system';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { decode } from 'base64-arraybuffer';
import { supabase } from 'config/initSupabase';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import BasicButton from '~/components/Button/BasicButton';
import GradientButton from '~/components/Button/GradientButton';
import { AuthContext } from '~/context/AuthProvider';
import { EditPoiDocument, GetPoiImagesDocument } from '~/graphql/generated';

const MAX_IMAGES = 5;

const BusinessPhotos: React.FC = () => {
  const { poiId, placeType, imageList } = useLocalSearchParams();
  const { user } = useContext(AuthContext);

  const [images, setImages] = useState(
    JSON.parse(imageList as string) as string[],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const uploadedUrls = [] as string[];

  const oldImages = JSON.parse(imageList as string) as string[];

  const [editPoi] = useMutation(EditPoiDocument);

  const onSubmit = async () => {
    if (JSON.stringify(images) == JSON.stringify(oldImages)) {
      Alert.alert('Error', 'No changes detected.');
      return;
    }
    setIsSubmitting(true);
    for (const image of images) {
      if (oldImages.includes(image)) {
        const { error } = await supabase.storage
          .from('poi_images')
          .download(image.slice(77));
        if (error) {
          Alert.alert('Error', error.message);
          setIsSubmitting(false);
          return;
        }

        const { data: urlData } = await supabase.storage
          .from('poi_images')
          .getPublicUrl(image.slice(77));

        if (urlData) {
          uploadedUrls.push(urlData.publicUrl);
        }
      } else {
        const base64 = await FileSystem.readAsStringAsync(image, {
          encoding: 'base64',
        });

        const filePath = `${user?.id}/${new Date().getTime()}.jpeg`;
        const contentType = 'image/jpeg';

        await supabase.storage
          .from('poi_images')
          .upload(filePath, decode(base64), { contentType });

        const { data } = await supabase.storage
          .from('poi_images')
          .getPublicUrl(filePath);

        if (data) {
          uploadedUrls.push(data.publicUrl);
        }
      }
    }
    await editPoi({
      variables: {
        poiId: poiId as string,
        type: placeType as string,
        input: {
          imageUrls: uploadedUrls,
        },
      },
      refetchQueries: [
        {
          query: GetPoiImagesDocument,
          variables: {
            poiId: poiId as string,
          },
        },
      ],
      onCompleted: () => {
        setTimeout(() => {
          router.push('/business/(tabs)');
          setIsSubmitting(false);
          ToastAndroid.show('Successfully edited.', 2000);
        }, 3000);
      },
      onError: (err) => {
        setIsSubmitting(false);
        Alert.alert('Error', err.message);
      },
    });
  };

  const pickImages = async () => {
    try {
      if (images.length < MAX_IMAGES) {
        const result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          selectionLimit: MAX_IMAGES - images.length,
          quality: 1,
          allowsMultipleSelection: true,
        });
        if (!result.canceled) {
          setImages([...images, ...result.assets.map((asset) => asset.uri)]);
        }
      } else {
        Alert.alert('Maximum number of images reached');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = (index: number) => {
    const updatedImageUrls = [...images];
    updatedImageUrls.splice(index, 1);
    setImages(updatedImageUrls);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
      }}
    >
      <CreateBusinessHeader title={'Edit Business'} />
      <View
        className="rounded-xl bg-gray-100 p-5"
        style={styles.imageContainer}
      >
        {Array.from(Array(5).keys()).map((index) => {
          const image = images[index]!;
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
              disabled={images.length === MAX_IMAGES ? true : false}
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
      <GradientButton
        disabled={images.length === 0}
        isSubmitting={isSubmitting}
        onPress={onSubmit}
        title="Save"
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
