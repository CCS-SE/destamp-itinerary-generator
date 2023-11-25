import React, { useState } from 'react';
import { Text, TouchableWithoutFeedback, View } from 'react-native';
import ModalSelector from 'react-native-modal-selector';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePicker, {
  DateTimePickerEvent,
} from '@react-native-community/datetimepicker';

const BusinessHourSelector = () => {
  const [showStartPicker, setShowStartPicker] = useState(false);
  const [showEndPicker, setShowEndPicker] = useState(false);
  const [startHour, setStartHour] = useState(new Date());
  const [endHour, setEndHour] = useState(new Date());
  const [startDay, setStartDay] = useState<string | null>(null);

  const handleStartDayChange = (option: { label: string }) => {
    setStartDay(option.label);
  };

  const handleStartChange = (
    _event: DateTimePickerEvent,
    selected: Date | undefined,
  ) => {
    if (selected) {
      setStartHour(selected);
    }
    setShowStartPicker(false);
  };

  const handleEndChange = (
    _event: DateTimePickerEvent,
    selected: Date | undefined,
  ) => {
    if (selected) {
      setEndHour(selected);
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

  const daysOfWeek = [
    { key: '0', label: 'Sunday' },
    { key: '1', label: 'Monday' },
    { key: '2', label: 'Tuesday' },
    { key: '3', label: 'Wednesday' },
    { key: '4', label: 'Thursday' },
    { key: '5', label: 'Friday' },
    { key: '6', label: 'Saturday' },
  ];

  return (
    <View>
      <ModalSelector
        data={daysOfWeek}
        initValue={startDay || 'Select Day'}
        onChange={handleStartDayChange}
        style={{ borderColor: 'pink' }}
      />

      <TouchableWithoutFeedback
        onPress={() => setShowStartPicker(!showStartPicker)}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: 'Poppins', fontSize: 15 }}>
            {' '}
            <MaterialCommunityIcons
              name="clock-edit-outline"
              size={24}
              color="black"
            />{' '}
            OPENING HOUR:
          </Text>
          <Text style={{ fontFamily: 'Poppins', fontSize: 15, color: 'green' }}>
            {formatTime(startHour)}
          </Text>
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

      <TouchableWithoutFeedback
        onPress={() => setShowEndPicker(!showEndPicker)}
      >
        <View
          style={{
            borderWidth: 1,
            borderColor: 'black',
            borderRadius: 10,
            padding: 10,
            marginTop: 10,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Text style={{ fontFamily: 'Poppins', fontSize: 15 }}>
            {' '}
            <MaterialCommunityIcons
              name="clock-edit-outline"
              size={24}
              color="black"
            />{' '}
            CLOSING HOUR: {'\t \t '}
          </Text>
          <Text style={{ fontFamily: 'Poppins', fontSize: 15, color: 'green' }}>
            {formatTime(startHour)}
          </Text>
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
  );
};

export default BusinessHourSelector;
