import React, { useState } from 'react';
import {
  Alert,
  Text,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

const BusinessTimeSelector = () => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startHour, setStartHour] = useState(new Date());
  const [endHour, setEndHour] = useState(new Date());

  const handleStartChange = (
    _event: DateTimePickerEvent,
    selected: Date | undefined,
  ) => {
    if (selected) {
      const minTimeDifference = 30 * 60 * 1000;
      const endTime = new Date(selected.getTime() + minTimeDifference);

      if (endTime <= endHour) {
        setStartHour(selected);
      } else {
        Alert.alert(
          'Invalid Closing Hour',
          'Closing hour should be at least 30 minutes after opening hour.',
        );
      }
    }
    setShowStartPicker(false);
  };

  const handleEndChange = (
    _event: DateTimePickerEvent,
    selected: Date | undefined,
  ) => {
    if (selected) {
      const minTimeDifference = 30 * 60 * 1000; // 30 minutes in milliseconds
      const startTime = new Date(selected.getTime() - minTimeDifference);

      if (startTime >= startHour) {
        setEndHour(selected);
      } else {
        Alert.alert(
          'Invalid Closing Hour',
          'Closing hour should be at least 30 minutes after opening hour.',
        );
        // setEndHour(new Date(startHour.getTime() + minTimeDifference));
      }
    }
    setShowEndPicker(false);
  };

  const formatTime = (time: Date) => {
    return time.toLocaleTimeString([], {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
  };

  const containerStyles: ViewStyle = {
    borderWidth: 1,
    borderColor: 'transparent',
    shadowColor: '#000',
    backgroundColor: 'white',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 10,
    padding: 7,
    justifyContent: 'space-between',
  };

  return (
    <View style={{ margin: 5 }}>
      <View style={{ flexDirection: 'row' }}>
        <TouchableWithoutFeedback
          onPress={() => setShowStartPicker(!showStartPicker)}
        >
          <View style={{ padding: 10 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>
              OPENING HOUR:
            </Text>
            <View style={containerStyles}>
              <Text
                style={{
                  fontFamily: 'Poppins',
                  fontSize: 15,
                  color: 'green',
                }}
              >
                {' '}
                <MaterialCommunityIcons
                  name="clock-edit-outline"
                  size={24}
                  color="black"
                />
                {' \t'}
                {formatTime(startHour)}
              </Text>
            </View>
          </View>
        </TouchableWithoutFeedback>

        {showStartPicker && (
          <View>
            <DateTimePicker
              mode="time"
              value={startHour}
              onChange={handleStartChange}
            />
          </View>
        )}
        <View style={{ flexDirection: 'row' }}>
          <TouchableWithoutFeedback
            onPress={() => setShowEndPicker(!showEndPicker)}
          >
            <View style={{ padding: 10 }}>
              <Text style={{ fontFamily: 'Poppins', fontSize: 12 }}>
                CLOSING HOUR:
              </Text>
              <View style={containerStyles}>
                <Text
                  style={{
                    fontFamily: 'Poppins',
                    fontSize: 15,
                    color: 'green',
                  }}
                >
                  {' '}
                  <MaterialCommunityIcons
                    name="clock-edit-outline"
                    size={24}
                    color="black"
                  />
                  {' \t'}
                  {formatTime(endHour)}
                </Text>
              </View>
            </View>
          </TouchableWithoutFeedback>

          {showEndPicker && (
            <View>
              <DateTimePicker
                mode="time"
                value={endHour}
                onChange={handleEndChange}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default BusinessTimeSelector;
