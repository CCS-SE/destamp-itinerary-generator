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
import { router } from 'expo-router';
import { useMutation } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { decode } from 'base64-arraybuffer';
import { supabase } from 'config/initSupabase';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import BasicButton from '~/components/Button/BasicButton';
import GradientButton from '~/components/Button/GradientButton';
import { AuthContext } from '~/context/AuthProvider';
import {
  CreatePoiDocument,
  GetBusinessOperatorBusinessDocument,
  MutationCreatePoiArgs,
} from '~/graphql/generated';
import addBusinessFormStore from '~/store/addBusinessFormStore';

const MAX_IMAGES = 1;

const BusinessVerificationScreen: React.FC = () => {
  const { user } = useContext(AuthContext);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const businessImagesUploadedUrls: string[] = [];
  let businessPermitUploadedUrl = '';

  const {
    establishment,
    basicInfo,
    openingHours,
    accommodationFacilities,
    restaurantFacilities,
    attractionFacilities,
    businessImages,
    setData,
    reset,
  } = addBusinessFormStore();

  const [createBusiness] = useMutation(CreatePoiDocument);

  const pickImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        selectionLimit: MAX_IMAGES,
        quality: 1,
      });

      if (!result.canceled) {
        setData({
          step: 7,
          data: {
            ...businessImages,
            permit: result.assets[0] || null,
            permitUrl: result.assets[0]?.uri || '',
          },
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteImage = () => {
    setData({
      step: 7,
      data: {
        ...businessImages,
        permit: null,
        permitUrl: '',
      },
    });
  };

  const uploadImages = async () => {
    const images = businessImages.businessImages;
    const permit = businessImages.permit;

    for (const image of images) {
      const base64 = await FileSystem.readAsStringAsync(image.uri, {
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
        businessImagesUploadedUrls.push(data.publicUrl);
      }
    }

    const base64 = await FileSystem.readAsStringAsync(permit!.uri, {
      encoding: 'base64',
    });
    const filePath = `${user?.id}/${new Date().getTime()}.jpg`;
    const contentType = 'image/jpg';

    await supabase.storage
      .from('business_permits')
      .upload(filePath, decode(base64), { contentType });

    const { data } = await supabase.storage
      .from('business_permits')
      .getPublicUrl(filePath);

    if (data) {
      businessPermitUploadedUrl = data.publicUrl as string;
    }
  };

  const handleCreateBusiness = async () => {
    setIsSubmitting(true);
    await uploadImages();

    const CreatePoiInput: MutationCreatePoiArgs = {
      type: establishment.type,
      userId: user ? user.id : '',
      input: {
        address: basicInfo.address,
        categories:
          establishment.type === 'Accommodation'
            ? [accommodationFacilities.category]
            : establishment.type === 'Attraction'
            ? attractionFacilities.categories
            : restaurantFacilities.categories,
        contactNumber: basicInfo.contactNumber,
        isAttraction: establishment.type === 'Attraction',
        latitude: basicInfo.latitude as number,
        longitude: basicInfo.longitude as number,
        name: basicInfo.name,
        visitDuration: openingHours.hour * 60 + openingHours.minute,
        price:
          establishment.type === 'Accommodation'
            ? accommodationFacilities.price
            : establishment.type === 'Attraction'
            ? attractionFacilities.price
            : `${restaurantFacilities.minPrice}-${restaurantFacilities.maxPrice}`,
        amenities: accommodationFacilities.amenities || [],
        atmospheres: restaurantFacilities.atmpospheres || [],
        description: basicInfo.description,
        imageUrls: businessImagesUploadedUrls,
        permitUrl: businessPermitUploadedUrl,
        operatingHours: openingHours.openingHours.map((oh) => ({
          day: oh.day,
          is24hours: oh.is24Hours,
          isClosed: oh.isClosed,
          closeTime: new Date(oh.closingTime),
          openTime: new Date(oh.openingTime),
        })),
      },
    };

    await createBusiness({
      variables: {
        type: establishment.type,
        userId: CreatePoiInput.userId,
        input: CreatePoiInput.input,
      },
      onCompleted: () => {
        setIsSubmitting(false);
        router.push('/business/create/success');
        reset();
      },
      onError: (err) => {
        Alert.alert('Error', err.message);
        console.log('Error', err.message);
        ToastAndroid.show(
          'Failed to create business profile.',
          ToastAndroid.SHORT,
        );
        setIsSubmitting(false);
      },
      refetchQueries: [
        {
          query: GetBusinessOperatorBusinessDocument,
          variables: {
            userId: CreatePoiInput.userId,
          },
        },
      ],
    });
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        padding: 20,
        alignItems: 'center',
      }}
    >
      <CreateBusinessHeader title={'Create Business'} />
      <View
        className="items-center rounded-xl bg-gray-100  p-2"
        style={[styles.imageContainer]}
      >
        {businessImages.permitUrl ? (
          <TouchableOpacity style={styles.imageWrapper} activeOpacity={0.9}>
            <Image
              source={{ uri: businessImages.permitUrl }}
              style={styles.image}
            />
            <TouchableOpacity
              style={styles.deleteButton}
              onPress={deleteImage}
              activeOpacity={0.9}
            >
              <View className="rounded-full bg-orange-500 px-0.5">
                <Ionicons name="ios-close" size={22} color="white" />
              </View>
            </TouchableOpacity>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={pickImage} activeOpacity={0.9}>
            <View className="mb-2 ml-1 mt-1 h-[335] w-[330] items-center justify-center self-center rounded-sm border border-gray-400">
              <Text className="font-poppins text-xs text-gray-400">
                Select image
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
      <View style={{ marginTop: 20 }}>
        <Text
          style={{
            fontFamily: 'Poppins',
            textAlign: 'center',
            fontSize: 15,
            color: 'gray',
            marginBottom: -25,
          }}
        >
          Please upload a business permit
        </Text>
        <BasicButton
          onPress={pickImage}
          title={'Select Image'}
          color="#F65A82"
        />
      </View>

      <GradientButton
        onPress={handleCreateBusiness}
        title={'Create Business'}
        isSubmitting={isSubmitting}
        disabled={businessImages.permitUrl ? false : true}
        className="top-40"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    alignContent: 'center',
    padding: 10,
  },
  imageWrapper: {
    width: '48%',
    position: 'relative',
    padding: 4,
  },
  image: {
    width: 330,
    height: 330,
    borderRadius: 2,
  },
  deleteButton: {
    position: 'absolute',
    top: 15,
    right: 13,
    backgroundColor: 'transparent',
  },
});

export default BusinessVerificationScreen;
