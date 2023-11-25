import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { SwipeListView } from 'react-native-swipe-list-view';

import BusinessHourSelector from '~/components/BusinessOperator/BusinessHourSelector';
import Questions from '~/components/BusinessOperator/Question';
import TimePicker from '~/components/BusinessOperator/TimeDurationPicker';
import BasicButton from '~/components/Button/BasicButton';

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

  const renderBusinessHour = () => (
    <View style={{ backgroundColor: 'white', height: 160, marginBottom: 10 }}>
      <BusinessHourSelector />
    </View>
  );

  const renderHiddenItem = ({ item }: { item: { key: number } }) => (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        marginBottom: 10,
      }}
    >
      <TouchableOpacity
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: 75,
          height: '100%',
          backgroundColor: 'red',
        }}
        onPress={() => deleteBusinessHour(item.key)}
      >
        <Text style={{ color: '#FFF' }}>Delete</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View
      style={{ flex: 1, alignItems: 'center', justifyContent: 'space-between' }}
    >
      <SafeAreaView>
        <Questions question={'Opening Hours'} />
        <SwipeListView
          data={businessHours}
          keyExtractor={(item) => item.key.toString()}
          renderItem={renderBusinessHour}
          renderHiddenItem={renderHiddenItem}
          rightOpenValue={-75}
        />
        <BasicButton title={'Add Business Hour'} onPress={addBusinessHour} />
        <Questions question={'Recommended Visit Duration'} />
        <TimePicker />
        <BasicButton
          title={'Next'}
          onPress={() => {
            // Handle the "Next" button press
          }}
        />
      </SafeAreaView>
    </View>
  );
};

export default BusinessOpeningHours;
