import React, { useState } from 'react';
import { Text, TextInput, View, ViewStyle } from 'react-native';

import HalfBoxContainer from '~/components/Container/HalfBoxContainer';

const TimeDurationPicker = () => {
  const [selectedHour, setSelectedHour] = useState('');
  const [selectedMinute, setSelectedMinute] = useState('');

  const handleHourChange = (hour: string) => {
    setSelectedHour(hour);
  };

  const handleMinuteChange = (minute: string) => {
    let sanitizedMinute = minute.replace(/[^0-9]/g, '');
    sanitizedMinute = sanitizedMinute
      ? Math.min(parseInt(sanitizedMinute, 10), 59).toString()
      : '';

    setSelectedMinute(sanitizedMinute);
  };

  const displayTime = () => {
    if (selectedHour === '1' && selectedMinute === '1') {
      return `${selectedHour} Hour and ${selectedMinute} Minute`;
    } else if (selectedHour === '1') {
      return `${selectedHour} Hour and ${selectedMinute} Minutes`;
    } else if (selectedMinute === '1') {
      return `${selectedHour} Hours and ${selectedMinute} Minute`;
    } else if (!selectedHour && !selectedMinute) {
      return '00 Hours and 00 Minutes';
    } else {
      return `${selectedHour} Hours and ${selectedMinute} Minutes`;
    }
  };

  const containerStyles: ViewStyle = {
    borderWidth: 1,
    borderColor: 'transparent',
    width: 200,
    shadowColor: '#000',
    backgroundColor: 'white',
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    padding: 7,
    justifyContent: 'center',
    alignSelf: 'center',
  };

  return (
    <View>
      <Text style={{ fontFamily: 'Poppins', fontSize: 15, marginBottom: 15 }}>
        {displayTime()}
      </Text>

      <View style={containerStyles}>
        <TextInput
          style={{ fontFamily: 'Poppins', fontSize: 18 }}
          placeholder="00 "
          maxLength={2}
          value={selectedHour}
          onChangeText={handleHourChange}
          keyboardType="numeric"
        />
        <Text style={{ fontFamily: 'Poppins', fontSize: 18 }}> : </Text>
        <TextInput
          style={{ fontFamily: 'Poppins', fontSize: 18 }}
          placeholder="00 "
          maxLength={2}
          value={selectedMinute}
          onChangeText={handleMinuteChange}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default TimeDurationPicker;
