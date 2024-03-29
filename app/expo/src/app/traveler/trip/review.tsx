import React, { useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Dimensions,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
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
import userStore from '~/store/userStore';
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
  const { user } = useContext(AuthContext);
  const router = useRouter();
  const { isPremium } = userStore();
  const { preferenceData, tripData, reviewData, setData, reset } =
    useFormstore();

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
    if (isPremium) {
      router.push('/traveler/trip/preference');
    } else {
      router.push('/traveler/trip/create');
    }
  };

  const [createTrip] = useMutation(CreateTripDocument);

  const onSubmit = async () => {
    setIsSubmitting(true);

    if (!reviewData.title) {
      Alert.alert('Empty trip title');
      setIsSubmitting(false);
    } else {
      const CreateTripInput: MutationCreateTripArgs = {
        isPremium: isPremium,
        userId: user ? user.id : '',
        tripInput: {
          budget: parseFloat(tripData.budget),
          destination: JSON.parse(JSON.stringify(tripData.destination)),
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
          startingLocation: !tripData.budgetInclusions.includes(
            ExpenseCategory.Accommodation,
          )
            ? tripData.startingLocation
            : '',
        },
        tripPreferenceInput: {
          accommodationType: isIncluded(
            ExpenseCategory.Accommodation,
            tripData.budgetInclusions,
          )
            ? preferenceData.accommodationType
            : '',
          activities: preferenceData.activities,
          amenities: isIncluded(
            ExpenseCategory.Accommodation,
            tripData.budgetInclusions,
          )
            ? preferenceData.amenities
            : [],
          cuisines: isIncluded(ExpenseCategory.Food, tripData.budgetInclusions)
            ? preferenceData.cuisines
            : [],
          diningStyles: isIncluded(
            ExpenseCategory.Food,
            tripData.budgetInclusions,
          )
            ? preferenceData.diningStyles
            : [],
        },
      };

      await createTrip({
        variables: {
          isPremium: CreateTripInput.isPremium,
          userId: CreateTripInput.userId,
          tripInput: CreateTripInput.tripInput,
          tripPreferenceInput: CreateTripInput.tripPreferenceInput,
        },
        onCompleted: () => {
          setIsSubmitting(false);
          ToastAndroid.show(
            'Itinerary generated successfully',
            ToastAndroid.SHORT,
          );
          router.push('/traveler/(tabs)');
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
          Alert.alert('Error', err.message);
          console.log('Error', err.message);
          ToastAndroid.show('Failed to generate itinerary', ToastAndroid.SHORT);
          setIsSubmitting(false);
        },
      });
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-2" edges={['bottom']}>
      <Spinner
        visible={isSubmitting}
        overlayColor="rgba(0, 0, 0, 0.50)"
        textStyle={{ color: 'white' }}
        textContent={'Generating itinerary...'}
      />
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
              className=" flex-1 rounded-xl border border-gray-500 py-2.5 pl-2 pr-8 font-poppins text-base text-gray-500"
              value={reviewData.title}
              numberOfLines={1}
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
          {!tripData.budgetInclusions.includes(
            ExpenseCategory.Accommodation,
          ) && (
            <ReviewCard
              icon={<Destination height={25} width={25} />}
              title={tripData.startingLocation?.name}
              className="mb-6"
              isEditabble
              section="6"
            />
          )}
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
            section="2"
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
            section="1"
          />
          <ReviewCard
            icon={<Peso height={20} width={20} />}
            title={amountFormatter(parseInt(tripData.budget))}
            budgetInclusion={tripData.budgetInclusions}
            isEditabble
            section="5"
          />
        </View>
        {isPremium ? (
          <View className="mt-7">
            <Text className="font-poppins text-xl text-gray-600">
              Preference
            </Text>
            {/* Accommodation Type */}
            {tripData.budgetInclusions &&
              tripData.budgetInclusions.includes(
                ExpenseCategory.Accommodation,
              ) && (
                <ReviewCard
                  title="Accommodation Type"
                  value={separateWords(preferenceData.accommodationType)}
                  section="0"
                  isPreference
                  isEditabble
                />
              )}
            {/* Amenities */}
            {tripData.budgetInclusions &&
              tripData.budgetInclusions.includes(
                ExpenseCategory.Accommodation,
              ) && (
                <ReviewCard
                  title="Amenities"
                  amenities={preferenceData.amenities}
                  section="1"
                  isEditabble
                  isArray
                />
              )}
            {/* Activities */}
            <ReviewCard
              title="Activities"
              activities={preferenceData.activities}
              section="2"
              isEditabble
              isArray
            />
            {/* Dining Styles */}
            {tripData.budgetInclusions &&
              tripData.budgetInclusions.includes(ExpenseCategory.Food) && (
                <ReviewCard
                  title="Dining Styles"
                  diningStyles={preferenceData.diningStyles}
                  section="3"
                  isEditabble
                  isArray
                />
              )}
            {/* Cuisines */}
            {tripData.budgetInclusions &&
              tripData.budgetInclusions.includes(ExpenseCategory.Food) && (
                <ReviewCard
                  title="Cuisines"
                  cuisines={preferenceData.cuisines}
                  section="4"
                  isEditabble
                  isArray
                />
              )}
          </View>
        ) : (
          <></>
        )}
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
