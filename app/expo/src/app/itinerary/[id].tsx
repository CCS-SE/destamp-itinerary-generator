import { useRef, useState } from 'react';
import { Dimensions, FlatList, ScrollView, Text, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';

import DayButton from '~/components/Button/DayButton';
import ItineraryCard from '~/components/Card/traveler/ItineraryCard';
import ItineraryScreenSkeleton from '~/components/Skeleton/ItineraryScreenSkeleton';
import { GetTravelerItineraryDocument } from '~/graphql/generated';
import { tripDuration } from '~/utils/dates';
import Back from '../../../assets/images/back-icon.svg';
import Expense from '../../../assets/images/expense-icon.svg';
import Map from '../../../assets/images/map-icon.svg';
import Point from '../../../assets/images/point.svg';

export default function ItineraryScreen() {
  const { id } = useLocalSearchParams();
  const [selectedDay, setSelectedDay] = useState(0);
  const mapRef = useRef<MapView>(null);

  const DEFAULT_PADDING = { top: 50, right: 40, bottom: 40, left: 40 };
  const screenWidth = Dimensions.get('window').width;

  const handleTabPress = (dayIndex: number) => {
    setSelectedDay(dayIndex);
  };

  const handleBack = () => {
    return router.back();
  };

  const { loading, error, data } = useQuery(GetTravelerItineraryDocument, {
    variables: {
      tripId: parseInt(id as string),
    },
  });

  const dateArray = (startDate: Date, endDate: Date) => {
    return Array.from(
      { length: tripDuration(startDate, endDate) },
      (_, index) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + index);
        return currentDate;
      },
    );
  };

  const generateDayTabs = (startDate: Date, endDate: Date) => {
    const dates = dateArray(startDate, endDate);

    return dates.map((date, index) => (
      <DayButton
        key={`day ${index + 1}`}
        date={date}
        day={index + 1}
        isSelected={selectedDay === index}
        onPress={() => handleTabPress(index)}
      />
    ));
  };

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (loading && !data) {
    return (
      <View className="flex-1 items-center">
        <ItineraryScreenSkeleton />
      </View>
    );
  }

  const fitAllMarkers = () => {
    const latLang =
      data &&
      data.itinerary.dailyItineraries[selectedDay]?.destinations.map((item) => {
        return { latitude: item.latitude, longitude: item.longitude };
      });

    if (mapRef) {
      mapRef.current?.fitToCoordinates(latLang, {
        edgePadding: DEFAULT_PADDING,
        animated: true,
      });
    }
  };

  return (
    <>
      <View>
        <View
          className="mx-4 mt-14 flex-row justify-between"
          style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 1 }}
        >
          <Back height={45} width={45} onPress={handleBack} />
          <View className="flex-row items-end">
            <Map
              height={45}
              width={45}
              style={{ marginRight: 12 }}
              onPress={() =>
                router.push({
                  pathname: '/map/',
                  params: {
                    id: id as string,
                    selectedDay: selectedDay,
                  },
                })
              }
            />
            <Expense
              height={45}
              width={45}
              onPress={() => router.push(`/expense/${id}`)}
            />
          </View>
        </View>
        <MapView
          className="h-[280] w-screen"
          ref={mapRef}
          initialRegion={{
            latitude: 10.7201501,
            longitude: 122.5621063,
            latitudeDelta: 0.0822,
            longitudeDelta: 0.0421,
          }}
          onMapReady={fitAllMarkers}
        >
          {data &&
            data.itinerary.dailyItineraries[selectedDay]?.destinations.map(
              (destination, i) => (
                <Marker
                  key={i}
                  identifier={destination.id}
                  coordinate={{
                    latitude: destination.latitude,
                    longitude: destination.longitude,
                  }}
                  title={destination.name}
                  pinColor="#F65A82"
                >
                  <View style={[{ width: 40, height: 40 }]}>
                    <Point height={23} width={23} />
                  </View>
                </Marker>
              ),
            )}
        </MapView>
      </View>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="-mt-7 flex-1 ">
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="flex-1 items-center rounded-tl-3xl rounded-tr-3xl bg-white p-5">
            <View
              className="mt-3 h-[80] flex-row items-center justify-center rounded-2xl bg-gray-100 p-2"
              style={{ width: screenWidth / 1.125 }}
            >
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
                directionalLockEnabled
                automaticallyAdjustContentInsets={false}
              >
                {data &&
                  generateDayTabs(
                    new Date(data.trip.startDate),
                    new Date(data.trip.endDate),
                  )}
              </ScrollView>
            </View>
            {data && (
              <FlatList
                data={data.itinerary.dailyItineraries.filter(
                  (itinerary) => itinerary.dayIndex === selectedDay,
                )}
                renderItem={({ item }) => (
                  <ItineraryCard
                    date={
                      dateArray(
                        new Date(data.trip.startDate),
                        new Date(data.trip.endDate),
                      )[item.dayIndex]!
                    }
                    itineraryId={data.itinerary.id}
                    key={item.dayIndex}
                    attractionCost={item.attractionCost}
                    foodCost={item.foodCost}
                    accommodationCost={item.accommodationCost}
                    transportationCost={item.transportationCost}
                    departingLocation={data.trip.departingLocation?.name}
                    destinations={item.destinations}
                    preferredTime={data.trip.preferredTime}
                    travelDistances={item.travelDistances}
                    travelDurations={item.travelDurations}
                    isAccommodationIncluded={data.trip.isAccommodationIncluded}
                    isTransportationIncluded={
                      data.trip.isTransportationIncluded
                    }
                    adultCount={data.trip.adultCount || 0}
                    childCount={data.trip.childCount || 0}
                  />
                )}
                scrollEnabled={false}
              />
            )}
          </View>
        </ScrollView>
      </View>
    </>
  );
}
