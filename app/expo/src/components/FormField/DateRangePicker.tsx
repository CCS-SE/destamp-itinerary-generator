import { useState } from 'react';
import { Text, View } from 'react-native';
import Calendar from 'react-native-calendar-range-picker';

import { tripDuration } from '~/utils/dates';

interface DateRangePickerProps {
  onDateChange: (startDate: string | null, endDate: string | null) => void;
}

interface DateProps {
  startDate: string | null;
  endDate: string | null;
}

export default function DateRangePicker({
  onDateChange,
}: DateRangePickerProps) {
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);

  const handleChange = ({ startDate, endDate }: DateProps) => {
    if (startDate && !endDate) {
      setStartDate(startDate);
      setEndDate(null);
      onDateChange(startDate, null);
      return;
    }
    if (startDate && endDate) {
      setStartDate(startDate);
      setEndDate(endDate);
      onDateChange(startDate, endDate);
      return;
    }
  };

  const daysDifference = tripDuration(startDate, endDate);

  return (
    <View className="h-[400] flex-row items-center justify-between">
      <View className="h-[330] flex-1">
        <Calendar
          pastYearRange={0}
          isMonthFirst
          onChange={handleChange}
          disabledBeforeToday
          style={{ selectedDayBackgroundColor: '#FC8040' }}
        />
        <Text className="top-3 self-center font-poppins text-base">
          Select Start Date - End Date{' '}
          {startDate && endDate
            ? `• ${daysDifference} ${daysDifference > 1 ? `days` : `day`}`
            : ''}
        </Text>
      </View>
    </View>
  );
}
