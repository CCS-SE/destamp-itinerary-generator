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
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import { useMutation, useQuery } from '@apollo/client';
import { MaterialIcons } from '@expo/vector-icons';

import ReviewCard from '~/components/Card/traveler/ReviewCard';
import { AuthContext } from '~/context/AuthProvider';
import {
  CreateTripDocument,
  ExpenseCategory,
  GetTravelerInfoDocument,
  GetTravelerTripsDocument,
  MutationCreateTripArgs,
  TravelSize,
} from '~/graphql/generated';
import { amountFormatter, toSentenceCase } from '~/utils/utils';
import Back from '../../../assets/images/back-btn.svg';
import Peso from '../../../assets/images/review-budget.svg';
import Calendar from '../../../assets/images/review-calendar.svg';
import Destination from '../../../assets/images/review-destination.svg';
import TravelGroupSize from '../../../assets/images/review-travel-size.svg';

const isIncluded = (
  value: ExpenseCategory,
  budgetInclusion: ExpenseCategory[],
) => {
  return budgetInclusion.includes(value) ? true : false;
};

export default function ReviewInfoScreen() {
  const router = useRouter();
  const { session } = useContext(AuthContext);

  const {
    destinationId,
    departingLocation,
    travelGroup,
    groupCount,
    adultCount,
    childCount,
    startDate,
    endDate,
    budget,
    preferredTime,
    title,
    budgetInclusions,
    locationAddress,
    locationLat,
    locationLng,
  } = useLocalSearchParams();

  const [userEditedTitle, setUserEditedTitle] = useState<string>(
    title as string,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const inputWidth = Dimensions.get('window').width * 0.87;

  const handleTitleChange = (text: string) => {
    setUserEditedTitle(text);
  };

  const handleClearTitle = () => {
    setUserEditedTitle('');
  };

  const handleBackButtonPress = () => {
    router.push({
      pathname: '/trip/create/',
      params: {
        title: userEditedTitle,
      },
    });
  };

  const dateFormmater = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });
  };

  const { data } = useQuery(GetTravelerInfoDocument, {
    variables: {
      userId: session ? session.user.id : '',
    },
  });

  const [createTrip] = useMutation(CreateTripDocument);

  const onSubmit = async () => {
    setIsSubmitting(true);

    if (userEditedTitle == '') {
      Alert.alert('Empty trip title');
      setIsSubmitting(false);
    }
    const CreateTripInput: MutationCreateTripArgs = {
      data: {
        budget: parseFloat(budget as string),
        destinationId: parseInt(destinationId as string),
        endDate: new Date(endDate as string),
        isAccommodationIncluded: isIncluded(
          ExpenseCategory.Accommodation,
          budgetInclusions as ExpenseCategory[],
        ),
        isFoodIncluded: isIncluded(
          ExpenseCategory.Food,
          budgetInclusions as ExpenseCategory[],
        ),
        isTransportationIncluded: isIncluded(
          ExpenseCategory.Transportation,
          budgetInclusions as ExpenseCategory[],
        ),
        startDate: new Date(startDate as string),
        title: userEditedTitle,
        travelerId: data ? data.traveler.id : 0,
        travelSize: travelGroup as TravelSize,
        adultCount:
          travelGroup === 'GROUP'
            ? parseInt(groupCount as string)
            : parseInt(adultCount as string) || 0,
        childCount:
          travelGroup === 'FAMILY' ? parseInt(childCount as string) || 0 : 0,
        preferredTime: preferredTime ? preferredTime.toString().split(',') : [],
      },
      locationData: {
        name: departingLocation as string,
        address: locationAddress as string,
        latitude: parseFloat(locationLat as string),
        longitude: parseFloat(locationLng as string),
      },
    };

    await createTrip({
      variables: {
        data: CreateTripInput.data,
        locationData: CreateTripInput.locationData,
      },
      onCompleted: () => {
        setIsSubmitting(false);
        router.push('/(tabs)');
      },
      refetchQueries: [
        {
          query: GetTravelerTripsDocument,
          variables: {
            userId: session ? session.user.id : '',
          },
        },
      ],
      onError: (err) => {
        Alert.alert('Error', err.message);
        console.log('Error', err.message);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <SafeAreaView className="flex-1 bg-white p-2" edges={['bottom']}>
      <ScrollView className="self-center">
        <View>
          <Stack.Screen
            options={{
              title: 'Review Trip',
              headerBackTitleVisible: false,
              headerTitleStyle: {
                color: '#504D4D',
                fontSize: 22,
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
            className="mb-6 h-16 flex-row items-center justify-center rounded-xl "
            style={{ width: inputWidth }}
          >
            <TextInput
              className="h-[46] flex-1 rounded-xl border border-gray-500 p-3.5  font-poppins text-base text-gray-500 "
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
            icon={<TravelGroupSize height={28} width={28} />}
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
            section="6"
          />
        </View>
      </ScrollView>
      <View className="bottom-5 self-center">
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
