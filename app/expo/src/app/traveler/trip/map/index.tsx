import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, Platform, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';

import { GetTravelerItineraryDocument, PlaceType } from '~/graphql/generated';
import Back from '../../../../../assets/images/back-icon.svg';
import RestaurantMark from '../../../../../assets/images/marker-restau.svg';
import Mark from '../../../../../assets/images/marker.svg';

export default function MapScreen() {
  const { id, selectedDay } = useLocalSearchParams();
  const mapRef = useRef<MapView>(null);
  const scrollView = useRef<ScrollView>(null);

  const { width } = Dimensions.get('window');

  const CARD_HEIGHT = 130;
  const CARD_WIDTH = width * 0.7;
  const SPACING_FOR_CARD_INSET = width * 0.1 - 10;

  const handleBack = () => {
    return router.back();
  };

  const { data } = useQuery(GetTravelerItineraryDocument, {
    variables: {
      tripId: parseInt(id as string),
    },
  });

  const mapAnimation = new Animated.Value(0);

  useEffect(() => {
    let mapIndex = 0;
    mapAnimation.addListener(({ value }) => {
      let index = Math.floor(value / CARD_WIDTH + 0.3);
      const destinations =
        data!.itinerary.dailyItineraries[parseInt(selectedDay as string)]!
          .destinations;
      if (index >= destinations.length) {
        index = destinations.length - 1;
      }
      if (index <= 0) {
        index = 0;
      }

      setTimeout(() => {
        if (mapIndex !== index) {
          mapIndex = index;
          const { latitude, longitude } = destinations[index]!;
          mapRef?.current?.animateToRegion(
            {
              latitude: latitude,
              longitude: longitude,
              latitudeDelta: 0.09422,
              longitudeDelta: 0.04422,
            },
            350,
          );
        }
      }, 100);
    });
  });

  const interpolations = data!.itinerary.dailyItineraries[
    parseInt(selectedDay as string)
  ]!.destinations.map((_, index) => {
    const inputRange = [
      (index - 1) * CARD_WIDTH,
      index * CARD_WIDTH,
      (index + 1) * CARD_WIDTH,
    ];

    const scale = mapAnimation.interpolate({
      inputRange,
      outputRange: [1, 1.7, 1],
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
          const destinations =
            data?.itinerary.dailyItineraries[parseInt(selectedDay as string)]!
              .destinations;
          const firstDestination = destinations![0];

          if (destinations![0] && mapRef.current) {
            mapRef.current.animateToRegion(
              {
                latitude: firstDestination!.latitude,
                longitude: firstDestination!.longitude,
                latitudeDelta: 0.09422,
                longitudeDelta: 0.04422,
              },
              350,
            );
          }
        }}
      >
        {data &&
          data.itinerary.dailyItineraries[
            parseInt(selectedDay as string)
          ]?.destinations.map((destination, i) => {
            const scaleStyle = {
              transform: [
                {
                  scale: interpolations[i]!.scale,
                },
              ],
            };

            return (
              <Marker
                key={i}
                identifier={destination.id}
                coordinate={{
                  latitude: destination.latitude,
                  longitude: destination.longitude,
                }}
                pinColor="#F65A82"
              >
                <Animated.View className="h-32 w-32 items-center justify-center">
                  <Animated.View
                    style={[{ width: 40, height: 40 }, scaleStyle]}
                  >
                    {destination.type === PlaceType.Restaurant ? (
                      <RestaurantMark height={40} width={40} />
                    ) : (
                      <Mark height={40} width={40} />
                    )}
                  </Animated.View>
                </Animated.View>
              </Marker>
            );
          })}
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
          data.itinerary.dailyItineraries[
            parseInt(selectedDay as string)
          ]?.destinations.map((item, index) => (
            <View
              key={index}
              className="mx-4 overflow-hidden rounded-3xl bg-white"
              style={{ width: CARD_WIDTH - 10, height: CARD_HEIGHT }}
            >
              <View className="flex-1 px-7 py-1.5">
                <Text
                  numberOfLines={1}
                  className="font-poppins text-base text-gray-600"
                >
                  {item.name}
                </Text>
                <View className="flex-row ">
                  <Image
                    source={{ uri: item.images[0]?.url }}
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
          ))}
      </Animated.ScrollView>
    </View>
  );
}
