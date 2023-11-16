import { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import * as Haptics from 'expo-haptics';
import { router, Stack } from 'expo-router';

import GradientButton from '~/components/Button/GradientButton';
import SubscriptionPriceCard from '~/components/Card/traveler/SubscriptionPriceCard';
import Back from '../../../assets/images/back-btn.svg';
import Route from '../../../assets/images/optimized-route.svg';
import Personalized from '../../../assets/images/personalized.svg';
import Regenerate from '../../../assets/images/regenerate.svg';
import UnliTrip from '../../../assets/images/unli-trip.svg';

export default function Subscription() {
  const [selectedOption, setSelectedOption] = useState('monthly');

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const handleBackButtonPress = () => {
    router.back();
  };

  return (
    <View className="flex-1 bg-white">
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
        <View className="mx-3">
          <UnliTrip height={250} width={250} />
          <Text className="mt-2 font-poppins-medium text-base text-gray-500">
            Endless trip creation
          </Text>
          <Text className="w-64 font-poppins-medium text-sm text-gray-400">
            Create endless adventure with our unlimited trip generation.
          </Text>
        </View>
        <View className="mx-3">
          <Regenerate height={250} width={250} />
          <Text className="mt-2 font-poppins-medium text-base text-gray-500">
            Revive your adventure
          </Text>
          <Text className="w-64 font-poppins-medium text-sm text-gray-400">
            Refresh your itinerary with our regeneration feature.
          </Text>
        </View>
        <View className="mx-3">
          <Personalized height={250} width={250} />
          <Text className="mt-2 font-poppins-medium text-base text-gray-500">
            Tailored journey
          </Text>
          <Text className="w-64 font-poppins-medium text-sm text-gray-400">
            Experience tailored travel itinerary to suit your interests and
            preferences.
          </Text>
        </View>
        <View className="mx-3">
          <Route height={250} width={250} />
          <Text className="mt-2 font-poppins-medium text-base text-gray-500">
            Mapped routes between location
          </Text>
          <Text className="w-64 font-poppins-medium text-sm text-gray-400">
            See a full map view with an optimal route between each destinations.
          </Text>
        </View>
      </ScrollView>
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
          onPress={() => undefined}
          isSubmitting={false}
        ></GradientButton>
      </View>
    </View>
  );
}
