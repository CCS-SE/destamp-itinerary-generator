import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

type Day =
  | 'Sunday'
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday';

type DayValue = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const days: Record<DayValue, Day> = {
  0: 'Sunday',
  1: 'Monday',
  2: 'Tuesday',
  3: 'Wednesday',
  4: 'Thursday',
  5: 'Friday',
  6: 'Saturday',
};

const formatOperatingHours = (
  operatingours: {
    day: number;
    openTime?: string | number | Date;
    closeTime?: string | number | Date;
  }[],
) => {
  return operatingours.map((hours, index) => {
    const dayName = days[index as DayValue];

    if (hours.openTime && hours.closeTime) {
      const openTime = new Date(hours.openTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      const closeTime = new Date(hours.closeTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      return { dayName, openTime, closeTime };
    } else {
      return { dayName };
    }
  });
};

const OperatingHourCard = ({
  operatingHours,
}: {
  operatingHours: {
    day: number;
    openTime?: string | number | Date;
    closeTime?: string | number | Date;
  }[];
}) => {
  const formattedOperatingHours = formatOperatingHours(operatingHours);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, { width: screenWidth * 0.9 }]}>
      <Text className="mb-1 font-poppins text-base text-gray-600">
        Opening Hours
      </Text>
      {formattedOperatingHours.map((operatingHour, index) => {
        return operatingHours[index]!.day === new Date().getDay() ? (
          <View className="flex-row" key={index}>
            <Text className="w-24 font-poppins-semibold text-base text-orange-500">
              {operatingHour.dayName}
            </Text>
            <Text className="ml-2 font-poppins-semibold text-base text-orange-500">
              {operatingHour.openTime || 'Closed'}
            </Text>
            <Text className="ml-3 font-poppins-semibold text-base text-orange-500">
              {operatingHour.closeTime ? `-   ${operatingHour.closeTime}` : ''}
            </Text>
          </View>
        ) : (
          <View className="flex-row" key={index}>
            <Text className="w-24 font-poppins text-sm text-gray-600">
              {operatingHour.dayName}
            </Text>
            <Text className="ml-2 font-poppins text-sm text-gray-700">
              {operatingHour.openTime || 'Closed'}
            </Text>
            <Text className="ml-3 font-poppins text-sm text-gray-700">
              {operatingHour.closeTime ? `-   ${operatingHour.closeTime}` : ''}
            </Text>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
});

export default OperatingHourCard;
