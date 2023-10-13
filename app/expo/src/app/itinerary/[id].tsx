import { useState } from 'react';
import { FlatList, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';

import DayButton from '~/components/Button/DayButton';
import ItineraryCard from '~/components/Card/traveler/ItineraryCard';
import ItineraryScreenSkeleton from '~/components/Skeleton/ItineraryScreenSkeleton';
import { GetTravelerItineraryDocument } from '~/graphql/generated';
import { tripDuration } from '~/utils/dates';
import Back from '../../../assets/images/back-icon.svg';
import Expense from '../../../assets/images/expense-icon.svg';
import Map from '../../../assets/images/map-icon.svg';

export default function ItineraryScreen() {
  const { id } = useLocalSearchParams();

  const [selectedDay, setSelectedDay] = useState(0);

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

  const generateDayTabs = (startDate: Date, endDate: Date) => {
    const dateArray = Array.from(
      { length: tripDuration(startDate, endDate) },
      (_, index) => {
        const currentDate = new Date(startDate);
        currentDate.setDate(currentDate.getDate() + index);
        return currentDate;
      },
    );

    return dateArray.map((date, index) => (
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

  return (
    <>
      <SafeAreaView edges={['top']} className="flex-0">
        <View className="mx-4 flex-row justify-between">
          <Back height={45} width={45} onPress={handleBack} />
          <View className="flex-row items-end">
            <Map height={45} width={45} style={{ marginRight: 12 }} />
            <Link href={`/expense/${id}`}>
              <Expense height={45} width={45} />
            </Link>
          </View>
        </View>
      </SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView
        className="relative mt-36  flex-1"
        edges={['left', 'right']}
      >
        <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
          <View className="flex-1 items-center rounded-tl-3xl rounded-tr-3xl bg-white p-5">
            <View className="mt-3 h-[80] w-[370] flex-row items-center justify-center rounded-2xl bg-gray-100 p-2">
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
                  />
                )}
                scrollEnabled={false}
              />
            )}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
