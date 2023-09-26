import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Link, router, Stack, useLocalSearchParams } from 'expo-router';
import { gql, useQuery } from '@apollo/client';

import DayButton from '~/components/Button/DayButton';
import ItineraryCard from '~/components/Card/ItineraryCard';
import { GetTravelerItineraryDocument } from '~/graphql/generated';
import { tripDuration } from '~/utils/dates';
import Back from '../../../assets/images/back-icon.svg';
import Expense from '../../../assets/images/expense-icon.svg';
import Map from '../../../assets/images/map-icon.svg';

export const GetTravelersItineraryQuery = gql(
  `query GetTravelerItinerary($tripId: Int!) {
    itinerary(tripId: $tripId) {
      id
      totalCost

      itineraryDays {
        id
        foodCost
        attractionCost
        transportationCost
        dayIndex
        destinations {
          name
          price
          type
          visitDuration
          images {
            url
          }
        }
      }
    }
  
    trip(id: $tripId) {
      budget
      startDate
      endDate
      departingLocation {
        name
      }
    }
  }`,
);

export default function ItineraryScreen() {
  const { id } = useLocalSearchParams();

  const [selectedDay, setSelectedDay] = useState(1);

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
      { length: tripDuration(startDate, endDate) + 1 },
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
        isSelected={selectedDay === index + 1}
        onPress={() => handleTabPress(index + 1)}
      />
    ));
  };

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (loading) {
    return (
      <View>
        <Stack.Screen options={{ title: 'Itinerary' }} />
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <>
      <SafeAreaView edges={['top']} className="flex-0">
        <View className="mx-4 flex-row justify-between">
          <Back height={45} width={45} onPress={handleBack} />
          <View className="flex-row items-end">
            <Map height={45} width={45} style={{ marginRight: 10 }} />
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
            {data &&
              data.itinerary.itineraryDays.map((itinerary, i) => {
                if (itinerary.dayIndex === selectedDay) {
                  return (
                    <ItineraryCard
                      key={i}
                      attractionCost={itinerary.attractionCost}
                      foodCost={itinerary.foodCost}
                      transportationCost={itinerary.transportationCost}
                      departingLocation={data.trip.departingLocation?.name}
                      destinations={itinerary.destinations}
                    />
                  );
                }
              })}
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
}
