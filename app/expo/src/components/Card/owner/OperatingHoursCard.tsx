import React from 'react';
import {
  Dimensions,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { router } from 'expo-router';
import { Feather } from '@expo/vector-icons';

import { days, DayValue } from '~/constant/constant';

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

      return { dayName, openTime, closeTime, isClosed, is24Hours };
    } else {
      return { dayName, isClosed, is24Hours };
    }
  });
};

const OperatingHourCard = ({
  operatingHours,
  editing,
  poiId,
  setEditing,
  placeType,
  imageList,
}: {
  operatingHours: {
    day: number;
    openTime?: string | number | Date;
    closeTime?: string | number | Date;
    isClosed: boolean;
    is24Hours: boolean;
  }[];
  editing: boolean;
  poiId: string;
  setEditing: React.Dispatch<React.SetStateAction<boolean>>;
  placeType: string;
  imageList: string;
}) => {
  const formattedOperatingHours = formatOperatingHours(operatingHours);
  const screenWidth = Dimensions.get('window').width;

  const toEditOperatingHours = () => {
    setEditing(false);
    return router.push({
      pathname: '/business/profile/edit/editOperatingHours',
      params: {
        poiId: poiId as string,
        placeType: placeType as string,
        imageList: imageList as string,
      },
    });
  };
  return (
    <View style={[styles.container, { width: screenWidth * 0.9 }]}>
      <View className="mb-1 flex-row items-center">
        <Text className="font-poppins text-base text-gray-600">
          Opening Hours
        </Text>
        {editing && (
          <TouchableOpacity onPress={toEditOperatingHours}>
            <Feather
              name="edit"
              size={16}
              color="#F97316"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>
        )}
      </View>
      {formattedOperatingHours.map((operatingHour, index) => {
        return operatingHours[index]?.day === new Date().getDay() ? (
          <View className="flex-row" key={index}>
            <Text className="w-24 font-poppins-semibold text-base text-orange-500">
              {operatingHour.dayName}
            </Text>
            {operatingHour.isClosed ? (
              <Text className="ml-2 font-poppins-semibold text-base text-orange-500">
                Closed
              </Text>
            ) : operatingHour.is24Hours ? (
              <Text className="ml-2 font-poppins-semibold text-base text-orange-500">
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
              <Text className=" ml-2 font-poppins text-sm text-gray-700">
                Closed
              </Text>
            ) : operatingHour.is24Hours ? (
              <Text className="ml-2 font-poppins text-sm text-gray-700">
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
