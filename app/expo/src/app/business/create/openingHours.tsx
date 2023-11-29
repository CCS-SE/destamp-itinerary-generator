import React, { useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import BusinessDayItem from '~/components/BusinessOperator/OperatingHours/BusinessDayItem';
import TimePicker from '~/components/BusinessOperator/OperatingHours/TimeDurationPicker';
import Question from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
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
    if (businessDays.length > 0) {
      setValidationError('');
      return true;
    } else {
      setValidationError('Please select at least one business day');
      return false;
    }
  };

  // const deleteBusinessDay = (idToDelete: number) => {
  //   setBusinessDays((prevBusinessDays) =>
  //     prevBusinessDays
  //       .filter((businessDay) => businessDay.id !== idToDelete)
  //       .sort((a, b) => a.id - b.id),
  //   );
  // };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
      }}
    >
      <SafeAreaView>
        <CreateBusinessHeader title={'Opening Hours'} />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Question question={'Opening Hours'} />
          <TouchableOpacity onPress={addBusinessDay}>
            <Text>
              {' '}
              <MaterialIcons
                name="add-circle-outline"
                size={24}
                color="orange"
              />
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView>
          {businessDays.map((item) => (
            <BusinessDayItem
              key={item.id}
              day={item.day}
              // onDelete={() => deleteBusinessDay(item.id)}
              id={item.id}
            />
          ))}
          <View style={{ marginTop: 20 }}>
            <Question question={'Recommended Visit Duration'} />
            <TimePicker />
            <BasicButton
              title={'Next'}
              onPress={() => {
                if (validateDays()) {
                  router.push('/business/create/priceRange');
                } else {
                  console.error('Please select at least one business day');
                }
              }}
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default BusinessOpeningHours;
