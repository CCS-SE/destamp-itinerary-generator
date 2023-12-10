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

import addBusinessFormStore from '~/store/addBusinessFormStore';

interface BusinessTimeSelectorProps {
  day: number;
  startTime: Date;
  endTime: Date;
}

const BusinessTimeSelector = ({
  day,
  startTime,
  endTime,
}: BusinessTimeSelectorProps) => {
  const { openingHours, setData } = addBusinessFormStore();
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startHour, setStartHour] = useState(startTime);
  const [endHour, setEndHour] = useState(endTime);

  const handleStartChange = (
    _event: DateTimePickerEvent,
    selected: Date | undefined,
  ) => {
    if (selected) {
      const minTimeDifference = 60 * 60 * 1000; // 60 minutes in milliseconds
      const endTime = new Date(selected.getTime() + minTimeDifference);

      // Check if the closing time is at least 1 hour after the opening time
      if (!endHour || endTime <= endHour) {
        setStartHour(selected);

        const updatedOpeningHours = openingHours.openingHours.map((oh) => {
          if (oh.day === day) {
            return {
              ...oh,
              openingTime: new Date(selected),
            };
          }
          return oh;
        });

        setData({
          step: 2,
          data: {
            ...openingHours,
            openingHours: updatedOpeningHours,
          },
        });
      } else {
        Alert.alert(
          'Invalid Opening Hour',
          'Opening hour should be at least 1 hour before closing hour.',
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
      const minTimeDifference = 60 * 60 * 1000; // 60 minutes in milliseconds
      const startTime = new Date(selected.getTime() - minTimeDifference);

      // Check if the opening time is at least 1 hour before the closing time
      if (!startHour || startHour <= startTime) {
        setEndHour(selected);
        const updatedOpeningHours = openingHours.openingHours.map((oh) => {
          if (oh.day === day) {
            return {
              ...oh,
              closingTime: new Date(selected),
            };
          }
          return oh;
        });

        setData({
          step: 2,
          data: {
            ...openingHours,
            openingHours: updatedOpeningHours,
          },
        });
      } else {
        Alert.alert(
          'Invalid Closing Hour',
          'Closing hour should be at least 1 hour after opening hour.',
        );
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

  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <TouchableWithoutFeedback
          onPress={() => setShowStartPicker(!showStartPicker)}
        >
          <View style={{ padding: 10, marginRight: 10 }}>
            <Text style={{ fontFamily: 'Poppins', fontSize: 13 }}>
              Opening hour:
            </Text>
            <View style={containerStyles}>
              <Text className="font-poppins-medium text-base text-[#FA8E56]">
                {' '}
                <MaterialCommunityIcons
                  name="clock-edit-outline"
                  size={23}
                  color="#FA8E56"
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
            <View style={{ padding: 10, marginLeft: 10 }}>
              <Text style={{ fontFamily: 'Poppins', fontSize: 13 }}>
                Closing hour:
              </Text>
              <View style={containerStyles}>
                <Text className="font-poppins-medium text-base text-[#FA8E56]">
                  {' '}
                  <MaterialCommunityIcons
                    name="clock-edit-outline"
                    size={23}
                    color="#FA8E56"
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
  shadowRadius: 1.84,
  elevation: 2,
  borderRadius: 10,
  padding: 10,
  justifyContent: 'space-between',
};
