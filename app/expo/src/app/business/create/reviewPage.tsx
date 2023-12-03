import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack, useRouter } from 'expo-router';
import { useMutation } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';

import GradientButton from '~/components/Button/GradientButton';
import ReviewCard from '~/components/Card/traveler/ReviewCard';
import { AuthContext } from '~/context/AuthProvider';
import {
  CreateTripDocument,
  ExpenseCategory,
  GetTripsDocument,
  MutationCreateTripArgs,
  TravelSize,
} from '~/graphql/generated';
import useFormstore from '~/store/useFormStore';
import {
  amountFormatter,
  dateFormmater,
  formatDateToString,
  separateWords,
  toSentenceCase,
} from '~/utils/utils';
import Back from '../../../../assets/images/back-btn.svg';
import Peso from '../../../../assets/images/review-budget.svg';
import Calendar from '../../../../assets/images/review-calendar.svg';
import Destination from '../../../../assets/images/review-destination.svg';
import TravelGroupSize from '../../../../assets/images/review-travel-size.svg';

const isIncluded = (
  value: ExpenseCategory,
  budgetInclusion: ExpenseCategory[],
) => {
  return budgetInclusion.includes(value) ? true : false;
};

export default function ReviewBusiness() {
  const router = useRouter();
  const { preferenceData, tripData, reviewData, setData, reset } =
    useFormstore();

  const handleBackButtonPress = () => {
    router.back();
  };

  const [createTrip] = useMutation(CreateTripDocument);

  return (
    <SafeAreaView className="flex-1 bg-white p-2" edges={['bottom']}>
      <View>
        <ScrollView
          // className="self-center"
          showsVerticalScrollIndicator={false}
        >
          <View>
            <Stack.Screen
              options={{
                title: ' Review Business',
                headerBackTitleVisible: false,
                headerTitleStyle: {
                  color: '#504D4D',
                  fontSize: 21,
                  fontFamily: 'Poppins',
                },
                headerLeft: () => (
                  <TouchableOpacity onPress={handleBackButtonPress}>
                    <Back height={25} width={25} />
                  </TouchableOpacity>
                ),
              }}
            />
          </View>

          <View className="mt-7">
            <Text className="font-poppins text-xl text-orange-600">
              Basic Information
            </Text>
            <ReviewCard
              title="Business Name"
              value={'BusinessName'}
              section="0"
              isPreference
              isEditabble
            />
            <ReviewCard
              title="Description"
              value={'Descripion'}
              section="0"
              isPreference
              isEditabble
            />
            <ReviewCard
              title="Contact Number"
              value={'Contact Number'}
              section="0"
              isPreference
              isEditabble
            />
            <ReviewCard
              title="Address"
              value={'Address'}
              section="0"
              isPreference
              isEditabble
            />
            <Text className="font-poppins text-xl text-orange-600">
              Operating Hours
            </Text>
            <ReviewCard
              title="Operating Hours"
              value={'test'}
              section="0"
              isPreference
              isEditabble
            />
          </View>
          <View className="mt-7">
            <Text className="font-poppins text-xl text-orange-600">
              Price Range
            </Text>
            <ReviewCard
              title="Price Range per person"
              value={'Price Range'}
              section="0"
              isPreference
              isEditabble
            />
            <ReviewCard
              title="Admission Fee"
              value={'Admission Fee'}
              section="0"
              isPreference
              isEditabble
            />
          </View>
          <View className="mt-7">
            <Text className="font-poppins text-xl text-orange-600">
              Establishment Type
            </Text>
            <ReviewCard
              title="Establishment Type"
              value={'Establishment Type'}
              section="0"
              isPreference
              isEditabble
            />
            <ReviewCard
              title="Categories"
              value={'Categories'}
              section="0"
              isPreference
              isEditabble
            />
          </View>
          <GradientButton
            onPress={function (): void {
              console.log('Function not implemented.');
            }}
            title={'Create Business'}
            isSubmitting={false}
          />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
