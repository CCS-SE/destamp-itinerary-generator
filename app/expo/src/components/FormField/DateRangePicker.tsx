import { useState } from 'react';
import { Text, View } from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import { Moment } from 'moment';

interface DateRangePickerProps {
  onDateChange: (startDate: Moment | null, endDate: Moment | null) => void;
}

export default function DateRangePicker({
  onDateChange,
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<Moment | null>(null);
  const [endDate, setEndDate] = useState<Moment | null>(null);

  const minDate = new Date();

  const handleChange = (date: Moment, type: 'START_DATE' | 'END_DATE') => {
    if (type === 'END_DATE') {
      setEndDate(date);
      onDateChange(startDate, date);
    } else {
      setStartDate(date);
      setEndDate(null);
      onDateChange(date, endDate);
    }
  };

  const daysDifference = endDate ? endDate.diff(startDate, 'days') + 1 : 1;

  return (
    <View className="top-16 h-[260] flex-row items-center justify-between">
      <View className="mr-10 h-[380] flex-1">
        <CalendarPicker
          minDate={minDate}
          maxRangeDuration={4}
          allowRangeSelection={true}
          onDateChange={handleChange}
          todayBackgroundColor="#F6CAD4"
          scaleFactor={340}
          selectedDayColor="#FC8040"
          selectedDayTextColor="#FFFFFF"
          previousTitleStyle={{ fontSize: 14, marginLeft: 18 }}
          nextTitleStyle={{ fontSize: 14, marginRight: 18 }}
          width={320}
          height={400}
        />
        <View className="top-2 flex-row justify-center">
          <Text className="font-poppins text-base text-gray-600">
            Select Start Date - End Date
          </Text>
          <Text className="font-poppins text-base text-gray-600">
            {startDate && endDate
              ? ` • ${daysDifference} ${daysDifference! > 1 ? 'days' : 'day'}`
              : ''}
          </Text>
        </View>
      </View>
    </View>
  );
}
