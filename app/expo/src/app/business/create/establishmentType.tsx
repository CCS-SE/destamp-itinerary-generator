import React from 'react';
import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as Haptics from 'expo-haptics';
import { router, Stack } from 'expo-router';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

import Questions from '~/components/BusinessOperator/Question';
import EstablishmentTypeButton from '~/components/Button/EstablishmentTypeButton';
import StepperButton from '~/components/Button/StepperButton';
import addBusinessFormStore from '~/store/addBusinessFormStore';
import { confirmationAlert } from '~/utils/utils';
import Back from '../../../../assets/images/back-btn.svg';

const EstablishmentType = () => {
  const { establishment, setData, reset } = addBusinessFormStore();

  const handleNext = () => {
    router.push('/business/create/basicInformation');
  };

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    confirmationAlert(
      'Discard changes',
      'Are you sure you want to discard your changes?',
      'Discard',
      'Cancel',
      () => {
        reset();
        router.back();
      },
    );
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: 'white',
        alignItems: 'center',
      }}
    >
      <Stack.Screen
        options={{
          title: 'Create Business',
          headerTitleStyle: {
            color: '#504D4D',
            fontSize: 20,
            fontFamily: 'Poppins',
          },
          headerLeft: () => (
            <View style={{ paddingRight: 10 }}>
              <Back height={30} width={30} onPress={handleBack} />
            </View>
          ),
          headerBackVisible: false,
        }}
      />
      <SafeAreaView className="flex-1">
        <Questions question={'What type of place is this?'} />
        <EstablishmentTypeButton
          label="Accommodation"
          icon={<FontAwesome name="hotel" size={24} color="#EB4586" />}
          onSelect={() =>
            setData({
              step: 3,
              data: { ...establishment, type: 'Accommodation' },
            })
          }
          isSelected={establishment.type === 'Accommodation'}
        />
        <EstablishmentTypeButton
          label="Attraction"
          icon={
            <MaterialIcons name="local-attraction" size={24} color="#EB4586" />
          }
          onSelect={() =>
            setData({
              step: 3,
              data: { ...establishment, type: 'Attraction' },
            })
          }
          isSelected={establishment.type === 'Attraction'}
        />
        <EstablishmentTypeButton
          label="Restaurant"
          icon={<Ionicons name="restaurant" size={24} color="#EB4586" />}
          onSelect={() =>
            setData({
              step: 3,
              data: { ...establishment, type: 'Restaurant' },
            })
          }
          isSelected={establishment.type === 'Restaurant'}
        />
      </SafeAreaView>
      <StepperButton onPress={handleNext} label={'Next'} className="-top-6" />
    </View>
  );
};

export default EstablishmentType;
