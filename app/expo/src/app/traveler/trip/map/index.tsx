import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Constants from 'expo-constants';
import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import { GetTripMapItineraryDocument } from '~/graphql/generated';
import userStore from '~/store/userStore';
import { getTravelDistance, getTravelDuration } from '~/utils/utils';
import Back from '../../../../../assets/images/back-icon.svg';
import Mark from '../../../../../assets/images/marker.svg';

export default function MapScreen() {
  const { isPremium } = userStore();
  const { id, selectedDay } = useLocalSearchParams();
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const mapRef = useRef<MapView>(null);
  const scrollView = useRef<ScrollView>(null);

  const { width } = Dimensions.get('window');

  const CARD_HEIGHT = 130;
  const CARD_WIDTH = width * 0.7;
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

  const edgePadding = { top: 100, right: 50, bottom: 200, left: 50 };

  const googleMapsKey = Constants.expoConfig?.extra
    ?.GOOGLE_MAPS_API_KEY as string;

  const handleBack = () => {
    return router.back();
  };

  const scale = new Animated.Value(0.95);

  Animated.loop(
    Animated.sequence([
      Animated.timing(scale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }),
      Animated.timing(scale, {
        toValue: 0.95,
        duration: 1000,
        useNativeDriver: false,
      }),
    ]),
  ).start();

  const animatedStyle = {
    transform: [{ scale }],
  };

  const { data } = useQuery(GetTripMapItineraryDocument, {
    variables: {
      tripId: parseInt(id as string),
    },
  });

  const selectedDailyItinerary =
    data && data.trip.dailyItineraries[parseInt(selectedDay as string)];

  const dailyItineraryPois =
    data && data.trip.isAccommodationIncluded
      ? selectedDailyItinerary?.dailyItineraryPois.map((item) => item.poi)
      : [
          {
            ...selectedDailyItinerary!.dailyItineraryPois[0]!.poi,
            id: '',
            latitude: data?.trip.startingLocation.center[1],
            longitude: data?.trip.startingLocation.center[0],
            name: data?.trip.startingLocation.name,
          },
        ].concat(
          selectedDailyItinerary?.dailyItineraryPois.map((item) => item.poi) ||
            [],
        );
  const mapAnimation = new Animated.Value(0);

  useEffect(() => {
    let mapIndex = 0;
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      const destinations = dailyItineraryPois!.map((item) => item);

      if (index > destinations.length) {
        index = destinations.length - 1;
      }
      if (index < 0) {
        index = 0;
      }

      setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          setCurrentPlaceIndex(index);
          const firstLocation = destinations[index - 1];
          const secondLocation = destinations[index];
          mapRef?.current?.fitToCoordinates(
            [
              {
                latitude: firstLocation?.latitude as number,
                longitude: firstLocation?.longitude as number,
              },
              {
                latitude:
                  secondLocation?.latitude ||
                  (firstLocation?.latitude as number),
                longitude:
                  secondLocation?.longitude ||
                  (firstLocation?.longitude as number),
              },
            ],
            {
              edgePadding: edgePadding,
              animated: true,
            },
          );
        }
      }, 200);
    });
  });

  const interpolations = dailyItineraryPois?.map((_, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 2, 1],
      extrapolate: 'clamp',
    });

    return { scale };
  });

  return (
    <View>
      <Stack.Screen options={{ headerShown: false }} />
      <View
        className="mx-4 mt-14 flex-row items-center justify-between"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}
      >
        <Back height={45} width={45} onPress={handleBack} />
        {!isPremium ? (
          <Animated.View style={animatedStyle}>
            <TouchableOpacity
              className="flex-row items-center rounded-xl bg-blue-200 px-2.5 py-1.5"
              onPress={() => router.push('/traveler/subscription/')}
              activeOpacity={0.9}
            >
              <MaterialCommunityIcons
                name="check-decagram-outline"
                size={26}
                color="#1A7DF1"
              />
              <Text className="ml-1 font-poppins-medium text-base text-[#1A7DF1] ">
                Optimize Route
              </Text>
            </TouchableOpacity>
          </Animated.View>
        ) : (
          <></>
        )}
      </View>
      <MapView
        ref={mapRef}
        className="h-screen w-screen"
        provider={PROVIDER_GOOGLE}
        onMapReady={() => {
          const firstLocation = dailyItineraryPois![0];
          const secondLocation = dailyItineraryPois![1];
          if (firstLocation && mapRef.current) {
            mapRef?.current?.fitToCoordinates(
              [
                {
                  latitude: firstLocation?.latitude,
                  longitude: firstLocation?.longitude,
                },
                {
                  latitude: secondLocation?.latitude,
                  longitude: secondLocation?.longitude,
                },
              ],
              {
                edgePadding: edgePadding,
                animated: true,
              },
            );
          }
        }}
      >
        {data &&
          dailyItineraryPois?.map((poi, i) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations![i]!.scale,
                },
              ],
            };
            return (
              <Marker
                key={i}
                identifier={poi.id}
                coordinate={{
                  latitude: poi.latitude,
                  longitude: poi.longitude,
                }}
                pinColor="#F65A82"
              >
                <Animated.View className="h-32 w-32 items-center justify-center">
                  <Animated.View
                    style={[{ width: 40, height: 40 }, scaleStyle]}
                  >
                    <Mark height={40} width={40} />
                  </Animated.View>
                </Animated.View>
              </Marker>
            );
          })}
        {data && currentPlaceIndex - 1 >= 0 ? (
          <MapViewDirections
            key={currentPlaceIndex}
            origin={{
              latitude: dailyItineraryPois![currentPlaceIndex - 1]
                ?.latitude as number,
              longitude: dailyItineraryPois![currentPlaceIndex - 1]
                ?.longitude as number,
            }}
            destination={{
              latitude: dailyItineraryPois![currentPlaceIndex]
                ?.latitude as number,
              longitude: dailyItineraryPois![currentPlaceIndex]
                ?.longitude as number,
            }}
            apikey={googleMapsKey}
            strokeColor="#F65A82"
            strokeWidth={9}
          />
        ) : null}
      </MapView>
      <Animated.ScrollView
        className="absolute bottom-16 left-0 right-0 py-3"
        ref={scrollView}
        horizontal
        pagingEnabled
        scrollEventThrottle={1}
        showsHorizontalScrollIndicator={false}
        snapToInterval={CARD_WIDTH + 20}
        snapToAlignment="center"
        contentInset={{
          top: 0,
          left: SPACING_FOR_CARD_INSET,
          bottom: 0,
          right: SPACING_FOR_CARD_INSET,
        }}
        contentContainerStyle={{
          paddingHorizontal:
            Platform.OS === 'android' ? SPACING_FOR_CARD_INSET : 0,
        }}
        onScroll={Animated.event(
          [
            {
              nativeEvent: {
                contentOffset: {
                  x: mapAnimation,
                },
              },
            },
          ],
          { useNativeDriver: true },
        )}
      >
        {data &&
          dailyItineraryPois?.map((poi, index) => (
            <TouchableOpacity
              key={index}
              activeOpacity={0.95}
              onPress={() => {
                if (poi.id) {
                  router.push({
                    pathname: `/traveler/trip/itinerary/destinationDetail/${poi.id}`,
                    params: {
                      id: poi.id as string,
                      imageList: JSON.stringify(
                        poi.images?.map((item) => item.image.url),
                      ),
                    },
                  });
                }
              }}
            >
              <View
                className="mx-4 overflow-hidden rounded-3xl bg-white"
                style={{ width: CARD_WIDTH - 10, height: CARD_HEIGHT }}
              >
                <View className="flex-1 px-7 py-1.5">
                  <Text
                    numberOfLines={1}
                    className="font-poppins text-base text-gray-600"
                  >
                    {poi.name}
                  </Text>
                  <View className="flex-row ">
                    <Image
                      source={{ uri: poi.id ? poi.images![0]!.image.url : '' }}
                      className="mt-2 h-16 w-28 rounded-md"
                    />
                    {index !== 0 ? (
                      <View className="item-center ml-3 justify-center ">
                        <View className="flex-row items-center justify-center rounded-xl bg-pink-100 px-1">
                          <MaterialCommunityIcons
                            name="map-marker-distance"
                            size={15}
                            color="#DE4D6C"
                          />
                          <Text className=" ml-0.5 font-poppins text-gray-600">
                            {getTravelDistance(
                              data.trip.dailyItineraries[
                                parseInt(selectedDay as string)
                              ]?.dailyItineraryPois[index - 1]
                                ?.distance as number,
                            )}{' '}
                            km
                          </Text>
                        </View>
                        <View className="mt-1 flex-row items-center justify-center rounded-xl bg-pink-100 px-1">
                          <Ionicons
                            name="time-outline"
                            size={15}
                            color="#DE4D6C"
                          />
                          <Text className="ml-0.5 font-poppins text-gray-600">
                            {getTravelDuration(
                              data.trip.dailyItineraries[
                                parseInt(selectedDay as string)
                              ]?.dailyItineraryPois[index - 1]
                                ?.duration as number,
                            )}
                          </Text>
                        </View>
                      </View>
                    ) : (
                      <></>
                    )}
                  </View>
                  <View className="w-12 self-end rounded-md bg-blue-200 p-0.5 text-center">
                    <Text className="text-center font-poppins-medium text-xs text-blue-600">
                      Day {parseInt(selectedDay as string) + 1}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
      </Animated.ScrollView>
    </View>
  );
}
