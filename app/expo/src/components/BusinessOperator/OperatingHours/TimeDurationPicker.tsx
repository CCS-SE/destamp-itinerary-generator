import React from 'react';
import { Text, TextInput, View, ViewStyle } from 'react-native';

import addBusinessFormStore from '~/store/addBusinessFormStore';

const TimeDurationPicker = () => {
  const { openingHours, setData } = addBusinessFormStore();

  const handleHourChange = (hour: string) => {
    setData({
      step: 2,
      data: {
        ...openingHours,
        hour: hour,
      },
    });
  };

  const handleMinuteChange = (minute: string) => {
    let sanitizedMinute = minute.replace(/[^0-9]/g, '');
    sanitizedMinute = sanitizedMinute
      ? Math.min(parseInt(sanitizedMinute, 10), 59).toString()
      : '';

    setData({
      step: 2,
      data: {
        ...openingHours,
        minute: sanitizedMinute,
      },
    });
  };

  const displayTime = () => {
    return `${
      parseInt(openingHours.hour.toString()) > 1
        ? `${openingHours.hour.toString()} Hours`
        : `${openingHours.hour.toString()} Hour`
    } and ${
      parseInt(openingHours.minute.toString()) > 1
        ? `${openingHours.minute.toString()} Minutes`
        : `${openingHours.minute.toString()} Minute`
    }`;
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
          placeholder="00"
          maxLength={2}
          value={openingHours.hour.toString()}
          onChangeText={handleHourChange}
          keyboardType="numeric"
        />
        <Text style={{ fontFamily: 'Poppins', fontSize: 18 }}> : </Text>
        <TextInput
          style={{ fontFamily: 'Poppins', fontSize: 18 }}
          placeholder="00"
          maxLength={2}
          value={openingHours.minute.toString()}
          onChangeText={handleMinuteChange}
          keyboardType="numeric"
        />
      </View>
    </View>
  );
};

export default TimeDurationPicker;
