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

export default function ReviewTripScreen() {
  const router = useRouter();
  const { preferenceData, tripData, reviewData, setData, reset } =
    useFormstore();
  const { user } = useContext(AuthContext);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputWidth = Dimensions.get('window').width * 0.87;

  const handleTitleChange = (text: string) => {
    setData({
      step: 3,
      data: {
        title: text,
      },
    });
  };

  const handleClearTitle = () => {
    setData({
      step: 3,
      data: {
        title: '',
      },
    });
  };

  const handleBackButtonPress = () => {
    router.back();
  };

  const [createTrip] = useMutation(CreateTripDocument);

  const onSubmit = async () => {
    setIsSubmitting(true);

    if (!reviewData.title) {
      Alert.alert('Empty trip title');
      setIsSubmitting(false);
    } else {
      const CreateTripInput: MutationCreateTripArgs = {
        userId: user?.id || '',
        data: {
          budget: parseFloat(tripData.budget),
          endDate: tripData.endDate
            ? new Date(formatDateToString(tripData.endDate))
            : new Date(formatDateToString(tripData.startDate)),
          isAccommodationIncluded: isIncluded(
            ExpenseCategory.Accommodation,
            tripData.budgetInclusions,
          ),
          isFoodIncluded: isIncluded(
            ExpenseCategory.Food,
            tripData.budgetInclusions,
          ),
          isTransportationIncluded: isIncluded(
            ExpenseCategory.Transportation,
            tripData.budgetInclusions,
          ),
          startDate: new Date(formatDateToString(tripData.startDate)),
          title: reviewData.title,
          travelSize: tripData.travelSize,
          travelerCount:
            tripData.travelSize === TravelSize.Group
              ? tripData.groupCount
              : tripData.travelSize === TravelSize.Family
              ? tripData.adultCount + tripData.childCount
              : tripData.adultCount,
          timeSlots: tripData.timeslots,
          startingLocation: tripData.startingLocation,
        },
      };

      await createTrip({
        variables: {
          userId: user?.id || '',
          data: CreateTripInput.data,
        },
        onCompleted: () => {
          setIsSubmitting(false);
          router.push('/(tabs)');
          reset();
        },
        refetchQueries: [
          {
            query: GetTripsDocument,
            variables: {
              userId: user ? user.id : '',
            },
          },
        ],
        onError: (err) => {
          // Alert.alert('Error', err.message);
          console.log('Error', err.message);
          setIsSubmitting(false);
        },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-2" edges={['bottom']}>
      <ScrollView className="self-center" showsVerticalScrollIndicator={false}>
        <View>
          <Stack.Screen
            options={{
              title: ' Review Trip',
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
          <Text className="font-poppins text-xl text-gray-600">Title</Text>
          <View
            className="mb-2 h-16 flex-row items-center justify-center rounded-xl "
            style={{ width: inputWidth }}
          >
            <TextInput
              className="h-[46] flex-1 rounded-xl border border-gray-500 p-3.5  font-poppins text-base text-gray-500"
              value={reviewData.title}
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
            icon={<Destination height={25} width={25} />}
            title={tripData.startingLocation?.name}
            className="mb-6"
            isEditabble
            section="1"
          />
          <ReviewCard
            icon={<Calendar height={25} width={25} />}
            title={
              tripData.endDate && !tripData.startDate?.isSame(tripData.endDate)
                ? `${dateFormmater(
                    tripData.startDate!.toISOString(),
                  )} - ${dateFormmater(tripData.endDate!.toISOString())}`
                : `${dateFormmater(tripData.startDate!.toISOString())}`
            }
            isEditabble
            section="3"
          />
          <ReviewCard
            icon={<TravelGroupSize height={23} width={23} />}
            title={toSentenceCase(tripData.travelSize)}
            travelGroup={tripData.travelSize}
            groupCount={tripData.groupCount}
            childCount={tripData.childCount}
            adultCount={tripData.adultCount}
            isTravelSize
            isEditabble
            section="2"
          />
          <ReviewCard
            icon={<Peso height={20} width={20} />}
            title={amountFormatter(parseInt(tripData.budget))}
            budgetInclusion={tripData.budgetInclusions}
            isEditabble
            section="6"
          />
        </View>
        <View className="mt-7">
          <Text className="font-poppins text-xl text-gray-600">Preference</Text>
          <ReviewCard
            title="Accommodation Type"
            value={separateWords(preferenceData.accommodationType)}
            section="0"
            isPreference
            isEditabble
          />
          <ReviewCard
            title="Amenities"
            amenities={preferenceData.amenities}
            section="1"
            isEditabble
            isArray
          />
          <ReviewCard
            title="Activities"
            activities={preferenceData.activities}
            section="2"
            isEditabble
            isArray
          />
          <ReviewCard
            title="Dining Styles"
            diningStyles={preferenceData.diningStyles}
            section="3"
            isEditabble
            isArray
          />
          <ReviewCard
            title="Cuisines"
            cuisines={preferenceData.cuisines}
            section="4"
            isEditabble
            isArray
          />
        </View>
      </ScrollView>
      <View className="self-center">
        <TouchableOpacity
          className={`h-14 w-52 items-center justify-center rounded-2xl ${
            isSubmitting ? 'opacity-80' : ''
          } bg-[#F65A82] shadow-sm`}
          activeOpacity={0.8}
          onPress={onSubmit}
        >
          {isSubmitting ? (
            <ActivityIndicator
              testID="gradient-btn-loading"
              size="small"
              color={'white'}
              className="m-1"
            />
          ) : (
            <Text className="font-poppins-medium text-lg text-white">
              Generate Itinerary
            </Text>
          )}
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
