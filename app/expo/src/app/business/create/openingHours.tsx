import React from 'react';
import { ScrollView, View } from 'react-native';
import { router } from 'expo-router';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import BusinessDayItem from '~/components/BusinessOperator/OperatingHours/BusinessDayItem';
import TimePicker from '~/components/BusinessOperator/OperatingHours/TimeDurationPicker';
import Question from '~/components/BusinessOperator/Question';
import StepperButton from '~/components/Button/StepperButton';
import addBusinessFormStore from '~/store/addBusinessFormStore';

const BusinessOpeningHours: React.FC = () => {
  const { openingHours } = addBusinessFormStore();

  const handleNext = () => router.push('/business/create/establishmentType');

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
      }}
    >
      <CreateBusinessHeader title={'Add Business'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {openingHours.openingHours.map((item) => (
          <View
            key={item.day}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginHorizontal: 2,
            }}
          >
            <BusinessDayItem
              key={item.day}
              day={item.day}
              endTime={item.closingTime}
              startTime={item.openingTime}
              isClosed={item.isClosed}
              is24Hours={item.is24Hours}
            />
          </View>
        ))}
        <View className="mt-6">
          <Question question={'Recommended Visit Duration'} />
          <TimePicker />
        </View>
      </ScrollView>
      <StepperButton onPress={handleNext} label={'Next'} />
    </View>
  );
};

export default BusinessOpeningHours;
