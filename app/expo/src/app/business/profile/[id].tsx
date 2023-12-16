import React, { useCallback, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Swiper from 'react-native-swiper';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';
import { Entypo, Feather } from '@expo/vector-icons';
import { Model } from 'react-model';

import OperatingHourCard from '~/components/Card/owner/OperatingHoursCard';
import ProfileDescription from '~/components/Card/owner/ProfileDescriptionCard';
import BusinessDetailScreenSkeleton from '~/components/Skeleton/BusinessDetailSkeleton';
import {
  createSlideSchema,
  ImageSlider,
} from '~/components/Slider/ImageSlider';
import { GetBusinessDetailsDocument } from '~/graphql/generated';
import Back from '../../../../assets/images/back-icon.svg';

const BusinessProfile = () => {
  const { id, imageList } = useLocalSearchParams();

  const [editing, setEditing] = useState(false);

  const cardWidth = Dimensions.get('window').width * 0.9;

  const { loading, error, data } = useQuery(GetBusinessDetailsDocument, {
    variables: {
      poiId: id as string,
    },
  });

  const getPlaceType = () => {
    if (data?.poi.accommodation) {
      return 'Accommodation';
    } else if (data?.poi.restaurant) {
      return 'Restaurant';
    } else {
      return 'Attraction';
    }
  };

  const [{ useStore }] = useState(() =>
    Model(createSlideSchema(JSON.parse(imageList as string))),
  );
  const [state, actions] = useStore();

  const loadHandle = useCallback((i: number) => {
    actions.loaded(i);
  }, []);

  const handleBack = () => router.back();

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (loading && !data) {
    return (
      <View
        className="flex-1 items-center bg-white"
        testID="business-detail-loading"
      >
        <BusinessDetailScreenSkeleton />
      </View>
    );
  }

  const toEditRestaurantFacilities = () => {
    setEditing(false);
    return router.push({
      pathname: '/business/profile/edit/editRestaurantFacilities',
      params: {
        poiId: id as string,
        placeType: getPlaceType() as string,
        imageList: imageList as string,
      },
    });
  };

  const toEditAccommodationFacilities = () => {
    setEditing(false);
    return router.push({
      pathname: '/business/profile/edit/editAccommodationFacilities',
      params: {
        poiId: id as string,
        placeType: getPlaceType() as string,
        imageList: imageList as string,
      },
    });
  };

  const toEditBusinessImages = () => {
    setEditing(false);
    return router.push({
      pathname: '/business/profile/edit/editBusinessImages',
      params: {
        poiId: id as string,
        placeType: getPlaceType() as string,
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
        return () => {
          setEditing(false);
          router.push({
            pathname: '/business/profile/edit/editAttractionFacilities',
            params: {
              poiId: id as string,
              placeType: getPlaceType() as string,
              imageList: imageList as string,
            },
          });
        };
    }
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <ScrollView>
        {data && (
          <View className="items-center">
            <View className="h-80">
              <View
                className="absolute left-0 top-10 z-10 mx-4 flex-row items-center justify-between"
                style={{ width: cardWidth }}
              >
                <Back height={43} width={43} onPress={handleBack} />
                {editing ? (
                  <TouchableOpacity
                    className="-mr-3 rounded-xl  bg-gray-300"
                    activeOpacity={0.9}
                    onPress={() => setEditing(false)}
                  >
                    <Text className="px-1.5 py-1.5 font-poppins-medium text-base text-slate-700">
                      Cancel
                    </Text>
                  </TouchableOpacity>
                ) : (
                  <TouchableOpacity
                    className="-mr-3 rounded-xl  bg-gray-300"
                    activeOpacity={0.9}
                    onPress={() => setEditing(true)}
                  >
                    <Text className="px-5 py-1.5 font-poppins-medium text-base text-slate-700">
                      Edit
                    </Text>
                  </TouchableOpacity>
                )}
              </View>
              <Swiper
                loadMinimal
                loadMinimalSize={2}
                loop={true}
                activeDotColor="white"
              >
                {state.imgList.map((item, i) => (
                  <ImageSlider
                    loadHandle={loadHandle}
                    uri={item}
                    i={i}
                    key={i}
                    loaded={state.loadQueue[i]}
                  />
                ))}
              </Swiper>
              {editing && (
                <View className="absolute bottom-3 left-2 w-auto flex-row items-center space-x-2 rounded-xl bg-pink-100 px-3.5 py-1.5 shadow-md">
                  <Entypo name="images" size={16} color="black" />
                  <TouchableOpacity onPress={toEditBusinessImages}>
                    <Feather name="edit" size={16} color="#F97316" />
                  </TouchableOpacity>
                </View>
              )}
              {data.poi.price !== '0' ? (
                <View className="absolute bottom-3 right-2 w-auto flex-row items-center rounded-xl bg-pink-100 px-3.5 py-1.5 shadow-md">
                  <Text className="font-poppins-semibold text-lg text-[#DE4D6C] ">
                    ₱{data.poi.price}
                  </Text>
                  {editing && (
                    <TouchableOpacity
                      onPress={getPlaceTypeRoute(getPlaceType())}
                    >
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
            <ProfileDescription
              businessName={data.poi.name}
              businessCategories={data.poi.categories.map((item) => item.name)}
              businessAddress={data.poi.address}
              businessContactNumber={data.poi.contactNumber}
              businessDescription={data.poi.description || ''}
              editing={editing}
              poiId={id as string}
              placeType={getPlaceType()}
              setEditing={setEditing}
              imageList={imageList as string}
            />
            {!data.poi.accommodation ? (
              <OperatingHourCard
                operatingHours={data.poi.operatingHours}
                editing={editing}
                poiId={id as string}
                setEditing={setEditing}
                placeType={getPlaceType()}
                imageList={imageList as string}
              />
            ) : (
              <></>
            )}
            {data.poi.restaurant ? (
              <View
                className="flex columns-2 "
                style={{
                  width: cardWidth,
                }}
              >
                <View className="mb-2 mt-3 flex-row items-center">
                  <Text className="text-lg text-gray-600">
                    Dining Atmosphere
                  </Text>
                  {editing && (
                    <TouchableOpacity onPress={toEditRestaurantFacilities}>
                      <Feather
                        name="edit"
                        size={16}
                        color="#F97316"
                        style={{ marginLeft: 5 }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View className="flex flex-row flex-wrap">
                  {data.poi.restaurant.atmospheres.map((atmosphere) => (
                    <Text
                      className="font-poppins text-gray-600"
                      key={atmosphere}
                      style={{ width: '50%' }}
                    >
                      • {atmosphere}
                    </Text>
                  ))}
                </View>
              </View>
            ) : (
              <></>
            )}
            {data.poi.accommodation ? (
              <View
                className="flex columns-2 "
                style={{
                  width: cardWidth,
                }}
              >
                <View className="mb-2 mt-3 flex-row items-center">
                  <Text className="text-lg text-gray-600">Amenities</Text>
                  {editing && (
                    <TouchableOpacity onPress={toEditAccommodationFacilities}>
                      <Feather
                        name="edit"
                        size={16}
                        color="#F97316"
                        style={{ marginLeft: 5 }}
                      />
                    </TouchableOpacity>
                  )}
                </View>
                <View className="flex flex-row flex-wrap">
                  {data.poi.accommodation.amenities.map((amenity) => (
                    <Text
                      className="font-poppins text-gray-600"
                      key={amenity.name}
                      style={{ width: '50%' }}
                    >
                      • {amenity.name}
                    </Text>
                  ))}
                </View>
              </View>
            ) : (
              <></>
            )}
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: 'white',
  },
});

export default BusinessProfile;
