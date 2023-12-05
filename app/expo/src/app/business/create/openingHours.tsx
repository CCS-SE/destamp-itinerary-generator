import React, { useState } from 'react';
import { Alert, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import BusinessDayItem from '~/components/BusinessOperator/OperatingHours/BusinessDayItem';
import TimeDurationPicker from '~/components/BusinessOperator/OperatingHours/TimeDurationPicker';
import Question from '~/components/BusinessOperator/Question';
import StepperButton from '~/components/Button/StepperButton';
import { days } from '~/constant/constant';

interface BusinessDay {
  day: string;
  id: number;
}

const BusinessOpeningHours: React.FC = () => {
  const [businessDays, setBusinessDays] = useState<BusinessDay[]>([
    { day: 'MONDAY', id: 1 },
  ]);

  const originalDays: string[] = Object.values(days);
  const [validationError, setValidationError] = useState<string>('');
  const dayExists = (day: string) =>
    businessDays.some((item) => item.day === day);

  const addBusinessDay = () => {
    if (businessDays.length < 7) {
      const newId = businessDays.length + 1;
      const nextDay = originalDays[newId % 7];

      if (nextDay) {
        if (!dayExists(nextDay)) {
          setBusinessDays([...businessDays, { day: nextDay, id: newId }]);
        } else {
          const availableDay = originalDays.find((day) => !dayExists(day));
          if (availableDay) {
            setBusinessDays([
              ...businessDays,
              { day: availableDay, id: newId },
            ]);
          }
        }
      }
    }
  };

  const validateDays = (): boolean => {
    if (businessDays.length > 2) {
      setValidationError('');
      return true;
    } else {
      Alert.alert('Error', 'Please select at least three business days.');
      setValidationError('Please select at least three business days.');

      return false;
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
      }}
    >
      <SafeAreaView>
        <CreateBusinessHeader title={'Opening Hours'} />
        <View style={{ marginLeft: 150 }}>
          <TouchableOpacity onPress={addBusinessDay}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginBottom: 5,
                backgroundColor: 'orange',
                borderRadius: 20,
                width: 170,
                height: 30,
                paddingRight: 13,
                justifyContent: 'flex-end',
              }}
            >
              <Text
                style={{
                  fontFamily: 'Poppins',
                  color: 'white',
                  fontSize: 12,
                  padding: 5,
                }}
              >
                ADD BUSINESS DAY
              </Text>
              <MaterialIcons
                name="add-circle-outline"
                size={24}
                color="white"
              />
            </View>
          </TouchableOpacity>
        </View>
        {validationError ? (
          <Text style={{ color: 'red' }}>{validationError}</Text>
        ) : null}
        <ScrollView showsVerticalScrollIndicator={false}>
          {businessDays.map((item) => (
            <BusinessDayItem
              key={item.id}
              day={item.day}
              id={0}
              onAddDay={function (): void {
                console.log('Function not implemented.');
              }}
            />
          ))}
          <View style={{ margin: 10, marginTop: 30 }}>
            <Question question={'Recommended Visit Duration'} />
            <TimeDurationPicker />
            <View style={{ marginTop: 100, paddingBottom: 50 }}>
              <StepperButton
                onPress={() => {
                  if (validateDays()) {
                    router.push('/business/create/establishmentType');
                  } else {
                    console.error('Please select at least three business days');
                  }
                }}
                label={'Next'}
              />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default BusinessOpeningHours;
