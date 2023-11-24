import React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';

const formatOpeningHours = (
  openingHours: {
    openTime?: string | number | Date;
    closeTime?: string | number | Date;
  }[],
) => {
  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  return openingHours.map((hours, index) => {
    const dayName = days[index];

    if (hours.openTime && hours.closeTime) {
      const openTime = new Date(hours.openTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });
      const closeTime = new Date(hours.closeTime).toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
      });

      return `${dayName}: \t \t ${openTime} - ${closeTime}`;
    } else {
      return `${dayName}: \t \t Closed`;
    }
  });
};

const WorkingHours = ({
  openingHours,
}: {
  openingHours: {
    openTime?: string | number | Date;
    closeTime?: string | number | Date;
  }[];
}) => {
  const formattedOpeningHours = formatOpeningHours(openingHours);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, { width: screenWidth * 0.85 }]}>
      <Text style={styles.title}>Working Hours</Text>
      {formattedOpeningHours.map((workingHours, index) => (
        <Text key={index} style={styles.workinghours}>
          {workingHours}
        </Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#FC8040',
  },
  workinghours: {
    fontSize: 12,
    fontFamily: 'Poppins',
  },
});

export default WorkingHours;
