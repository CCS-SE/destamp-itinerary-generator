import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const WorkingHours = ({ days, hours }: { days: string; hours: string[] }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Working Hours </Text>
      <View>
        <Text style={styles.workinghours}>
          {days} {'\t\t\t\t'} : {'\t\t\t\t'} {hours}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    marginTop: 20,
  },
  title: {
    margin: 2,
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#FC8040',
  },
  workinghours: {
    marginLeft: 15,
    fontSize: 12,
    fontFamily: 'Poppins',
  },
});

export default WorkingHours;
