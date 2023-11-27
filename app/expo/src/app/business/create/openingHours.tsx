import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';

import BusinessHourSelector from '~/components/BusinessOperator/BusinessHourSelector';
import Questions from '~/components/BusinessOperator/Question';
import TimePicker from '~/components/BusinessOperator/TimeDurationPicker';
import BasicButton from '~/components/Button/BasicButton';
import CreateBusinessHeader from '.';

const BusinessOpeningHours = () => {
  const [businessHours, setBusinessHours] = useState([{ key: 1 }]);

  const addBusinessHour = () => {
    if (businessHours.length < 7) {
      const newKey = businessHours.length + 1;
      setBusinessHours([...businessHours, { key: newKey }]);
    }
  };

  const deleteBusinessHour = (keyToDelete: number) => {
    const updatedBusinessHours = businessHours.filter(
      (hour) => hour.key !== keyToDelete,
    );
    setBusinessHours(updatedBusinessHours);
  };

  const renderBusinessHour = (item: { key: number }) => (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <BusinessHourSelector />
      <TouchableOpacity onPress={() => deleteBusinessHour(item.key)}>
        <MaterialIcons name="delete" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );

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
        <CreateBusinessHeader />
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Questions question={'Opening Hours'} />
          <TouchableOpacity onPress={addBusinessHour}>
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
        {businessHours.map((item) => (
          <View
            key={item.key}
            style={{
              backgroundColor: 'transparent',
              height: 140,
              marginBottom: 5,
            }}
          >
            {renderBusinessHour(item)}
          </View>
        ))}
        <View style={{ marginTop: 20 }}>
          <Questions question={'Recommended Visit Duration'} />
          <TimePicker />
          <BasicButton
            title={'Next'}
            onPress={() => {
              router.push('/business/create/priceRange');
            }}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};

export default BusinessOpeningHours;
