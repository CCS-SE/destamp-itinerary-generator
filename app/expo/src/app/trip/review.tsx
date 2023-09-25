import React, { useState } from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useLocalSearchParams } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import ReviewCard from '~/components/Card/ReviewCard';
import { amountFormatter, toSentenceCase } from '~/utils/utils';
import Peso from '../../../assets/images/review-budget.svg';
import Calendar from '../../../assets/images/review-calendar.svg';
import Destination from '../../../assets/images/review-destination.svg';
import TravelSize from '../../../assets/images/review-travel-size.svg';

export default function ReviewInfoScreen() {
  const {
    travelDestination,
    departingLocation,
    travelGroup,
    groupCount,
    adultCount,
    childCount,
    startDate,
    endDate,
    budget,
    budgetInclusions,
  } = useLocalSearchParams();

  const generatedTitle = `${travelDestination} Trip`;

  const [userEditedTitle, setUserEditedTitle] =
    useState<string>(generatedTitle);

  const handleTitleChange = (text: string) => {
    setUserEditedTitle(text);
  };

  const handleClearTitle = () => {
    setUserEditedTitle('');
  };

  const dateFormmater = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView
      className="flex-1 bg-white p-5"
      edges={['left', 'right', 'bottom']}
    >
      <ScrollView>
        <View>
          <Stack.Screen
            options={{ title: 'Review Trip', headerBackTitleVisible: false }}
          />
          <Text className="font-poppins text-xl text-gray-600">Title</Text>
          <View className="mb-6 h-14 w-[370] flex-row items-center justify-center rounded-xl ">
            <TextInput
              className="h-[46] flex-1 rounded-xl border border-gray-500 p-3  font-poppins text-base text-gray-500 "
              value={userEditedTitle}
              onChangeText={(text) => handleTitleChange(text)}
            />
            <TouchableOpacity
              onPress={handleClearTitle}
              className="absolute right-2"
            >
              <MaterialIcons name="clear" size={23} color="#808080" />
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <ReviewCard
            icon={<Destination height={28} width={28} />}
            title={departingLocation as string}
            className="mb-6"
            isEditabble
            section="1"
          />
          <ReviewCard
            icon={<Calendar height={28} width={28} />}
            title={
              startDate !== endDate && endDate !== ''
                ? `${dateFormmater(startDate as string)} - ${dateFormmater(
                    endDate as string,
                  )}`
                : `${dateFormmater(startDate as string)}`
            }
            isEditabble
            section="3"
          />
          <ReviewCard
            icon={<TravelSize height={28} width={28} />}
            title={toSentenceCase(travelGroup as string)}
            travelGroup={travelGroup as string}
            groupCount={groupCount as string}
            childCount={childCount as string}
            adultCount={adultCount as string}
            isTravelSize
            isEditabble
            section="2"
          />
          <ReviewCard
            icon={<Peso height={27} width={27} />}
            title={amountFormatter(parseInt(budget as string))}
            budgetInclusion={budgetInclusions as string}
            isEditabble
            section="4"
          />
        </View>
      </ScrollView>
      <View className="self-center">
        <TouchableOpacity
          className="h-14 w-60 items-center justify-center rounded-2xl bg-[#F65A82] shadow-sm"
          activeOpacity={0.8}
        >
          <Text className="font-poppins-medium text-lg text-white">
            Generate Itinerary
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
