import { useContext, useState } from 'react';
import { Text, ToastAndroid, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import Spinner from 'react-native-loading-spinner-overlay';
import * as Haptics from 'expo-haptics';
import { router, Stack } from 'expo-router';
import { useMutation } from '@apollo/client';

import GradientButton from '~/components/Button/GradientButton';
import SubscriptionPriceCard from '~/components/Card/traveler/SubscriptionPriceCard';
import { AuthContext } from '~/context/AuthProvider';
import {
  CancelSubscriptionDocument,
  GetTripsDocument,
  SubscribeToPremiumDocument,
} from '~/graphql/generated';
import userStore from '~/store/userStore';
import { confirmationAlert } from '~/utils/utils';
import Back from '../../../../assets/images/back-btn.svg';
import Route from '../../../../assets/images/optimized-route.svg';
import Personalized from '../../../../assets/images/personalized.svg';
import Regenerate from '../../../../assets/images/regenerate.svg';
import UnliTrip from '../../../../assets/images/unli-trip.svg';

export default function Subscription() {
  const { setUser, tripCount, userId, isPremium } = userStore();
  const { user } = useContext(AuthContext);
  const [amount, setAmount] = useState<number>(149);
  const [startDate, setStartDate] = useState<Date>(new Date());
  const [endDate, setEndDate] = useState<Date>(addMonths(new Date(), 1));

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedOption, setSelectedOption] = useState('monthly');

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);

    const currentDate = new Date();

    if (option === 'monthly') {
      setAmount(149);
      setStartDate(currentDate);
      setEndDate(addMonths(currentDate, 1)); // Add 1 month to the current date
    } else if (option === 'yearly') {
      setAmount(999);
      setStartDate(currentDate);
      setEndDate(addMonths(currentDate, 12)); // Add 1 year to the current date
    }
  };

  const handleBackButtonPress = () => {
    router.back();
  };

  const [subscribeToPremium] = useMutation(SubscribeToPremiumDocument);
  const [cancelSubscription] = useMutation(CancelSubscriptionDocument);

  const handleSubmitSubcription = async () => {
    setIsSubmitting(true);
    await subscribeToPremium({
      variables: {
        input: {
          amount: amount,
          endDate: new Date(endDate as Date),
          startDate: new Date(startDate as Date),
        },
        userId: user ? user.id : '',
      },
      onCompleted: () => {
        setIsSubmitting(false);
        ToastAndroid.show(
          'Subscribed to premium successfully.',
          ToastAndroid.SHORT,
        );
        setUser({
          tripCount: tripCount,
          userId: userId,
          isPremium: true,
        });
      },
      onError: (err) => {
        setIsSubmitting(false);
        console.log('Error', err.message);
        ToastAndroid.show(
          'Failed to subscribe to premium.',
          ToastAndroid.SHORT,
        );
      },
      refetchQueries: [
        {
          query: GetTripsDocument,
          variables: {
            userId: user ? user.id : '',
          },
        },
      ],
    });
  };

  const handleCancelSubcription = async () => {
    setIsSubmitting(true);
    await cancelSubscription({
      variables: {
        userId: user ? user.id : '',
      },
      onCompleted: () => {
        setIsSubmitting(false);
        ToastAndroid.show('Cancelled subscription.', ToastAndroid.SHORT);
        setUser({
          tripCount: tripCount,
          userId: userId,
          isPremium: false,
        });
      },
      onError: (err) => {
        setIsSubmitting(false);
        console.log('Error', err.message);
        ToastAndroid.show('Failed to cancel subscription.', ToastAndroid.SHORT);
      },
      refetchQueries: [
        {
          query: GetTripsDocument,
          variables: {
            userId: user ? user.id : '',
          },
        },
      ],
    });
  };

  const handleSubscribe = () => {
    confirmationAlert(
      'Subscripe to Premium',
      '',
      'Yes',
      'Cancel',
      async () => await handleSubmitSubcription(),
    );
  };

  const handleCancel = () => {
    confirmationAlert(
      'Cancel subscription',
      'Are you sure you want to cancel your subscription?',
      'Yes',
      'Cancel',
      async () => await handleCancelSubcription(),
    );
  };

  return (
    <View className="flex-1 bg-white">
      <Spinner
        visible={isSubmitting}
        overlayColor="rgba(0, 0, 0, 0.50)"
        textStyle={{ color: 'white' }}
        textContent={'Loading...'}
      />
      <Stack.Screen
        options={{
          title: ' Payment & Subscription',
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
      <ScrollView
        className="mx-5 mt-10 flex-1"
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
        directionalLockEnabled
        automaticallyAdjustContentInsets={false}
      >
        {subscriptionItems.map((item, index) => (
          <View className="mx-3" key={index}>
            {item.icon}
            <Text className="mt-2 font-poppins-medium text-base text-gray-500">
              {item.title}
            </Text>
            <Text className="w-64 font-poppins-medium text-sm text-gray-400">
              {item.description}
            </Text>
          </View>
        ))}
      </ScrollView>
      {!isPremium ? (
        <View className="mb-12">
          <SubscriptionPriceCard
            price="149.00"
            billedPer="per month"
            isSelected={selectedOption === 'monthly'}
            onPress={() => handleOptionChange('monthly')}
          />
          <SubscriptionPriceCard
            price="999.00"
            billedPer="per year"
            isSelected={selectedOption === 'yearly'}
            onPress={() => handleOptionChange('yearly')}
          />
          <GradientButton
            title="Continue"
            onPress={handleSubscribe}
            isSubmitting={isSubmitting}
          ></GradientButton>
        </View>
      ) : (
        <View className="-top-4">
          <GradientButton
            title="Cancel"
            onPress={handleCancel}
            isSubmitting={isSubmitting}
          ></GradientButton>
        </View>
      )}
    </View>
  );
}

const subscriptionItems = [
  {
    icon: <UnliTrip height={250} width={250} />,
    title: 'Endless trip creation',
    description: 'Create endless adventure with our unlimited trip generation.',
  },
  {
    icon: <Regenerate height={250} width={250} />,
    title: 'Revive your adventure',
    description: 'Refresh your itinerary with our regeneration feature.',
  },
  {
    icon: <Personalized height={250} width={250} />,
    title: 'Tailored journey',
    description:
      'Experience tailored travel itinerary to suit your interests and preferences.',
  },
  {
    icon: <Route height={250} width={250} />,
    title: 'Mapped routes between location',
    description:
      'See a full map view with an optimal route between each destinations.',
  },
];

function addMonths(date: Date, months: number) {
  date.setMonth(date.getMonth() + months);
  return date;
}
