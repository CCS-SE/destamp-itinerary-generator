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

import { GetTripItineraryDocument } from '~/graphql/generated';
import Back from '../../../../../assets/images/back-icon.svg';
import Mark from '../../../../../assets/images/marker.svg';

export default function MapScreen() {
  const { id, selectedDay } = useLocalSearchParams();
  const [currentPlaceIndex, setCurrentPlaceIndex] = useState(0);
  const mapRef = useRef<MapView>(null);
  const scrollView = useRef<ScrollView>(null);

  const { width } = Dimensions.get('window');

  const CARD_HEIGHT = 130;
  const CARD_WIDTH = width * 0.7;
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

  const edgePadding = { top: 100, right: 130, bottom: 200, left: 130 };

  const googleMapsKey = Constants.expoConfig?.extra
    ?.GOOGLE_MAPS_API_KEY as string;

  const handleBack = () => {
    return router.back();
  };

  const { data } = useQuery(GetTripItineraryDocument, {
    variables: {
      tripId: parseInt(id as string),
    },
  });

  const selectedDailyItinerary =
    data?.trip.dailyItineraries[parseInt(selectedDay as string)];

  const startingLocation = {
    ...selectedDailyItinerary?.dailyItineraryPois[0]?.poi,
    id: '',
    latitude: data?.trip.startingLocation.center[1],
    longitude: data?.trip.startingLocation.center[0],
    name: data?.trip.startingLocation.name,
  };

  const dailyItineraryPois = data?.trip.isAccommodationIncluded
    ? selectedDailyItinerary?.dailyItineraryPois.map((item) => item.poi)
    : [startingLocation].concat(
        selectedDailyItinerary?.dailyItineraryPois.map((item) => item.poi) ||
          [],
      );
  const mapAnimation = new Animated.Value(0);

  useEffect(() => {
    let mapIndex = 0;
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      const destinations = data!.trip.dailyItineraries[
        parseInt(selectedDay as string)
      ]!.dailyItineraryPois.map((item) => item.poi);
      if (index >= destinations.length) {
        index = destinations.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          setCurrentPlaceIndex(index);
          const firstLocation = destinations[index];
          const secondLocation = destinations[index + 1];
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
        className="mx-4 mt-14"
        style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}
      >
        <Back height={45} width={45} onPress={handleBack} />
      </View>
      <MapView
        ref={mapRef}
        className="h-screen w-screen"
        provider={PROVIDER_GOOGLE}
        onMapReady={() => {
          const firstLocation = dailyItineraryPois![0];
          const secondLocation = dailyItineraryPois![1];
          if (dailyItineraryPois![0] && mapRef.current) {
            mapRef?.current?.fitToCoordinates(
              [
                {
                  latitude: firstLocation?.latitude,
                  longitude: firstLocation?.longitude,
                },
                {
                  latitude: secondLocation?.latitude || firstLocation?.latitude,
                  longitude:
                    secondLocation?.longitude || firstLocation?.longitude,
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
        {data && currentPlaceIndex + 1 < dailyItineraryPois!.length ? (
          <MapViewDirections
            key={currentPlaceIndex}
            origin={{
              latitude: selectedDailyItinerary?.dailyItineraryPois[
                currentPlaceIndex
              ]!.poi.latitude as number,
              longitude: selectedDailyItinerary?.dailyItineraryPois[
                currentPlaceIndex
              ]!.poi.longitude as number,
            }}
            destination={{
              latitude: selectedDailyItinerary?.dailyItineraryPois[
                currentPlaceIndex + 1
              ]!.poi.latitude as number,
              longitude: selectedDailyItinerary?.dailyItineraryPois[
                currentPlaceIndex + 1
              ]!.poi.longitude as number,
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
