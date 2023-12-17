import { useCallback, useState } from 'react';
import { Dimensions, Platform, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { Model } from 'react-model';

import DestinationDetailSkeleton from '~/components/Skeleton/DestinationDetailSkeleton';
import {
  createSlideSchema,
  ImageSlider,
} from '~/components/Slider/ImageSlider';
import { days, DayValue } from '~/constant/constant';
import { GetDailyItineraryPoiDetailsDocument } from '~/graphql/generated';
import Back from '../../../../../../assets/images/back-icon.svg';

interface Category {
  name: string;
}

export default function DestinationDetailScreen() {
  const { id, imageList } = useLocalSearchParams();

  const { error, loading, data } = useQuery(
    GetDailyItineraryPoiDetailsDocument,
    {
      variables: {
        poiId: id as string,
      },
    },
  );

  const [{ useStore }] = useState(() =>
    Model(createSlideSchema(JSON.parse(imageList as string))),
  );
  const [state, actions] = useStore();

  const screenWidth = Dimensions.get('window').width;

  const loadHandle = useCallback((i: number) => {
    actions.loaded(i);
  }, []);

  const handleBack = () => router.back();

  const formatTime = (time: Date) => {
    return new Date(time).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const displayCategories = (items: Category[]) => {
    return (
      <View className="mt-2 flex-row flex-wrap px-2">
        {items.map((item, i) => (
          <View
            className="mx-1 my-0.5 flex-row rounded-lg bg-pink-100 p-1"
            key={i}
          >
            <Text className="font-poppins-medium text-[10px] text-pink-600 ">
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (loading && !data) {
    return (
      <View className="flex-1 items-center">
        <DestinationDetailSkeleton />
      </View>
    );
  }

  return (
    <>
      <View>
        <View className="relative -top-4 h-[420]">
          <View className="absolute left-0 top-20 z-10 mx-4 flex-row justify-between">
            <Back height={43} width={43} onPress={handleBack} />
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
        </View>
      </View>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="-mt-10 flex-1" edges={['left', 'right']}>
        {data && (
          <ScrollView
            className="flex-1 rounded-tl-3xl rounded-tr-3xl bg-white p-4"
            showsVerticalScrollIndicator={false}
          >
            <View
              className="mt-3 self-center rounded-2xl bg-gray-100 p-2"
              style={{ width: screenWidth / 1.13 }}
            >
              <Text className="mx-3 font-poppins-medium text-lg text-gray-700">
                {data.poi.name}
              </Text>
              {data.poi.address ? (
                <Text className="text-small mx-3 mt-2.5 font-poppins text-gray-500">
                  {data.poi.address}
                </Text>
              ) : (
                <></>
              )}
              {data.poi.description ? (
                <Text className="text-small mx-3 mt-6 font-poppins text-gray-500">
                  {data.poi.description}
                </Text>
              ) : (
                <></>
              )}
              {displayCategories(data.poi.categories)}
            </View>
            {data.poi.restaurant ? (
              <View
                className="mt-3 self-center rounded-2xl bg-gray-100 p-2 "
                style={{ width: screenWidth / 1.13 }}
              >
                <View
                  className="ml-2 flex columns-2"
                  style={{
                    width: screenWidth,
                  }}
                >
                  <Text className="mb-2 mt-1 text-base text-gray-600">
                    Dining Atmosphere
                  </Text>
                  <View className="flex flex-row flex-wrap">
                    {data.poi.restaurant.atmospheres.map(
                      (atmosphere, index) => (
                        <View
                          className="mr-1.5  rounded-xl border border-pink-600 px-2 py-1"
                          key={index}
                        >
                          <Text className="font-poppins text-[9px] text-pink-600">
                            {atmosphere}
                          </Text>
                        </View>
                      ),
                    )}
                  </View>
                </View>
              </View>
            ) : (
              <></>
            )}
            <View
              className="mt-3 self-center rounded-2xl bg-gray-100 p-2"
              style={{ width: screenWidth / 1.13 }}
            >
              {data.poi.contactNumber ? (
                <View className="flex-row items-center">
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color="gray"
                    style={{ marginLeft: 7 }}
                  />
                  {Platform.OS === 'ios' ? (
                    <TextInput
                      className="mx-2 font-poppins text-base text-gray-500"
                      value={data.poi.contactNumber}
                      editable={false}
                      multiline
                    />
                  ) : (
                    <Text
                      className="mx-2 font-poppins text-base text-gray-500"
                      selectable
                    >
                      {data.poi.contactNumber}
                    </Text>
                  )}
                </View>
              ) : (
                <Text className="mx-3 font-poppins text-base text-gray-500">
                  No contacts provided.
                </Text>
              )}
            </View>
            {data.poi.operatingHours.length !== 0 ? (
              <View
                className="mt-3 h-auto self-center rounded-2xl bg-gray-100 p-2"
                style={{ width: screenWidth / 1.13 }}
              >
                {data.poi.operatingHours &&
                  data.poi.operatingHours.map((oh, index) => (
                    <View key={index} className="mx-3 flex-row">
                      <Text
                        className={` w-16 font-poppins-medium ${
                          oh.day === new Date().getDay()
                            ? 'text-[18px] text-orange-500'
                            : ' text-base text-gray-500'
                        }`}
                      >
                        {days[oh.day as DayValue]}
                      </Text>
                      {oh.isClosed ? (
                        <Text className="pl-2 font-poppins text-base text-gray-500">
                          Closed
                        </Text>
                      ) : oh.is24Hours ? (
                        <Text className="pl-2 font-poppins text-base text-gray-500">
                          Open 24 hours
                        </Text>
                      ) : (
                        <Text
                          className={`pl-2  ${
                            oh.day === new Date().getDay()
                              ? 'font-poppins-medium text-[18px] text-orange-500'
                              : 'font-poppins text-base text-gray-500'
                          }  `}
                        >
                          {oh.openTime ? formatTime(new Date(oh.openTime)) : ''}{' '}
                          -{' '}
                          {oh.closeTime
                            ? formatTime(new Date(oh.closeTime))
                            : ''}
                        </Text>
                      )}
                    </View>
                  ))}
              </View>
            ) : (
              <View
                className="mt-3 h-auto self-center rounded-2xl bg-gray-100 p-2"
                style={{ width: screenWidth / 1.13 }}
              >
                <Text className="mx-3 font-poppins text-base text-gray-500">
                  No opening hours provided.
                </Text>
              </View>
            )}
            {data.poi.accommodation ? (
              <View
                className="mt-3 self-center rounded-2xl bg-gray-100 p-2 "
                style={{ width: screenWidth / 1.13 }}
              >
                <View
                  className="ml-2 flex columns-2"
                  style={{
                    width: screenWidth / 1.2,
                  }}
                >
                  <Text className="mb-2 mt-1 text-base text-gray-600">
                    Amenities
                  </Text>
                  <View className="mb-2 flex flex-row flex-wrap">
                    {data.poi.accommodation.amenities.map((amenity, index) => (
                      <Text
                        className="font-poppins text-xs text-gray-600"
                        key={index}
                        style={{ width: '50%' }}
                      >
                        • {amenity.name}
                      </Text>
                    ))}
                  </View>
                </View>
              </View>
            ) : (
              <></>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}
