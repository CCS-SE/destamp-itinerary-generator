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

import { OperatingHour } from '~/graphql/generated';

interface EditBusinessTimeSelectorProps {
  day: number;
  startTime: Date;
  endTime: Date;
  operatingHours: OperatingHour[];
  setOperatingHours: React.Dispatch<React.SetStateAction<OperatingHour[]>>;
}

const EditBusinessTimeSelector = ({
  day,
  startTime,
  endTime,
  operatingHours,
  setOperatingHours,
}: EditBusinessTimeSelectorProps) => {
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
      if (!new Date(endHour) || endTime <= new Date(endHour)) {
        setStartHour(selected);

        const updatedOpeningHours = operatingHours.map((oh) => {
          if (oh.day === day) {
            return {
              ...oh,
              openTime: new Date(selected),
            };
          }
          return oh;
        });

        setOperatingHours(updatedOpeningHours);
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
      if (!new Date(startHour) || new Date(startHour) <= startTime) {
        setEndHour(selected);
        const updatedOpeningHours = operatingHours.map((oh) => {
          if (oh.day === day) {
            return {
              ...oh,
              closeTime: new Date(selected),
            };
          }
          return oh;
        });

        setOperatingHours(updatedOpeningHours);
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
    return new Date(time).toLocaleTimeString([], {
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
              value={new Date(startHour)}
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
                value={new Date(endHour)}
                onChange={handleEndChange}
              />
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default EditBusinessTimeSelector;

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
