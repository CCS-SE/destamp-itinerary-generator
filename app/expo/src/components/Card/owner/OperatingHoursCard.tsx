import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

import { days, DayValue } from '~/app/constant/constant';

const formatOperatingHours = (
  operatingours: {
    day: number;
    openTime?: string | number | Date;
    closeTime?: string | number | Date;
    isClosed: boolean;
    is24Hours: boolean;
  }[],
) => {
  return operatingours.map((hours, index) => {
    const dayName = days[index as DayValue];

    const { isClosed, is24Hours } = hours;

    if (hours.openTime && hours.closeTime) {
      const openTime = new Date(hours.openTime).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      });
      const closeTime = new Date(hours.closeTime).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: false,
      });

      return { dayName, openTime, closeTime };
    } else {
      return { dayName, isClosed, is24Hours };
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
    isClosed: boolean;
    is24Hours: boolean;
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
            {operatingHour.isClosed ? (
              <Text className="font-poppins-semibold text-base text-orange-500">
                Closed
              </Text>
            ) : operatingHour.is24Hours ? (
              <Text className="font-poppins-semibold text-base text-orange-500">
                Open 24 hours
              </Text>
            ) : (
              <>
                <Text className="ml-2 font-poppins-semibold text-base text-orange-500">
                  {operatingHour.openTime || 'Closed'}
                </Text>
                <Text className="ml-3 font-poppins-semibold text-base text-orange-500">
                  {operatingHour.closeTime
                    ? `-   ${operatingHour.closeTime}`
                    : ''}
                </Text>
              </>
            )}
          </View>
        ) : (
          <View className="flex-row" key={index}>
            <Text className="w-24 font-poppins text-sm text-gray-500">
              {operatingHour.dayName}
            </Text>
            {operatingHour.isClosed ? (
              <Text className=" font-poppins text-sm text-gray-500">
                Closed
              </Text>
            ) : operatingHour.is24Hours ? (
              <Text className="font-poppins text-sm text-gray-500">
                Open 24 hours
              </Text>
            ) : (
              <>
                <Text className="ml-2 font-poppins text-sm text-gray-700">
                  {operatingHour.openTime || 'Closed'}
                </Text>
                <Text className="ml-3 font-poppins text-sm text-gray-700">
                  {operatingHour.closeTime
                    ? `-   ${operatingHour.closeTime}`
                    : ''}
                </Text>
              </>
            )}
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
