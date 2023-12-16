import React from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { Feather, Ionicons } from '@expo/vector-icons';

import { separateWords } from '~/utils/utils';

const ProfileDescription = ({
  businessName,
  businessCategories,
  businessAddress,
  businessContactNumber,
  businessDescription,
  editing,
  poiId,
  placeType,
  setEditing,
  imageList,
}: {
  businessName: string;
  businessCategories: string[];
  businessAddress: string;
  businessContactNumber: string;
  businessDescription: string;
  editing: boolean;
  poiId: string;
  placeType: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  imageList: string;
}) => {
  const screenWidth = Dimensions.get('window').width;

  const toEditBasicInformation = () => {
    setEditing(false);
    return router.push({
      pathname: '/business/profile/edit/editBasicInformation',
      params: {
        poiId: poiId as string,
        placeType: placeType as string,
        imageList: imageList as string,
      },
    });
  };

  const toEditRestaurantFacilities = () => {
    setEditing(false);
    return router.push({
      pathname: '/business/profile/edit/editRestaurantFacilities',
      params: {
        poiId: poiId as string,
        placeType: placeType as string,
        imageList: imageList as string,
      },
    });
  };

  const toEditAccommodationFacilities = () => {
    setEditing(false);
    return router.push({
      pathname: '/business/profile/edit/editAccommodationFacilities',
      params: {
        poiId: poiId as string,
        placeType: placeType as string,
        imageList: imageList as string,
      },
    });
  };

  const toEditAttractionFacilities = () => {
    setEditing(false);
    return router.push({
      pathname: '/business/profile/edit/editAttractionFacilities',
      params: {
        poiId: poiId as string,
        placeType: placeType as string,
        imageList: imageList as string,
      },
    });
  };

  const getPlaceTypeRoute = (placeType: string) => {
    switch (placeType) {
      case 'Restaurant':
        return toEditRestaurantFacilities;
      case 'Accommodation':
        return toEditAccommodationFacilities;
      default:
        return toEditAttractionFacilities;
    }
  };

  const displayCategories = (items: string[]) => {
    return (
      <View
        className="flex-row items-center"
        style={{ width: screenWidth * 0.8 }}
      >
        <View className="mt-1 flex-row flex-wrap items-center">
          {items.map((item, i) => (
            <View
              className="my-0.5 mr-1.5 flex-row rounded-lg border border-pink-300 px-1.5"
              key={i}
            >
              <Text className="font-poppins-medium text-[12px] text-pink-600 ">
                {separateWords(item)}
              </Text>
            </View>
          ))}
        </View>
        {editing && (
          <TouchableOpacity onPress={getPlaceTypeRoute(placeType)}>
            <Feather
              name="edit"
              size={16}
              color="#F97316"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={[{ width: screenWidth * 0.9 }]}>
      <View className="mt-4 flex-row items-center">
        <Text
          className="font-poppins-medium text-xl text-gray-800"
          numberOfLines={3}
        >
          {businessName}
        </Text>
        {editing && (
          <TouchableOpacity onPress={toEditBasicInformation}>
            <Feather
              name="edit"
              size={16}
              color="#F97316"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        )}
      </View>

      <View>{displayCategories(businessCategories)}</View>
      <View
        className="mb-2 mt-4 flex-row items-center"
        style={{ width: screenWidth * 0.8 }}
      >
        <Ionicons
          name="md-location-outline"
          size={16}
          color="#676464"
          style={{ marginLeft: -3, alignSelf: 'baseline' }}
        />
        <Text
          className="ml-1 font-poppins text-sm text-gray-500"
          numberOfLines={3}
        >
          {businessAddress}
        </Text>
        {editing && (
          <TouchableOpacity onPress={toEditBasicInformation}>
            <Feather
              name="edit"
              size={16}
              color="#F97316"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        )}
      </View>
      {businessContactNumber ? (
        <View className=" flex-row items-center">
          <Ionicons name="ios-call-outline" size={15} color="#676464" />
          <Text className="ml-1 font-poppins text-base text-gray-500">
            {businessContactNumber}
          </Text>
          {editing && (
            <TouchableOpacity onPress={toEditBasicInformation}>
              <Feather
                name="edit"
                size={16}
                color="#F97316"
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <></>
      )}
      {businessDescription ? (
        <View className="mt-4 flex-row items-center">
          <Text
            className="font-poppins text-sm text-gray-500"
            numberOfLines={5}
          >
            {businessDescription}
          </Text>
          {editing && (
            <TouchableOpacity onPress={toEditBasicInformation}>
              <Feather
                name="edit"
                size={16}
                color="#F97316"
                style={{ marginLeft: 5 }}
              />
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ProfileDescription;
