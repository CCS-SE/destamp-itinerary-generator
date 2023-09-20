import React from 'react';
import { ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import DatePicker from 'react-native-modern-datepicker';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';

import Activities from '../../components/TravelInfo/Activities';
import Companions from '../../components/TravelInfo/Companions';

const TravelerInfoScreen: React.FC = () => {
  function setSelectedDate(date: string): void {
    throw new Error('Function not implemented.');
  }

  return (
    <ScrollView style={styles.scroll}>
      <View style={styles.container}>
        <View style={styles.step}>
          <Text style={styles.title}>Where do you want to travel?</Text>
          <TextInput style={styles.form} placeholder="Travel Destination" />
        </View>
        <View style={styles.step}>
          <Text style={styles.title}>Where are you departing from?</Text>
          <TextInput style={styles.form} placeholder="Departing Location" />
        </View>
        <View style={styles.step}>
          <Text style={styles.title}>Whom are you traveling with?</Text>
          <View style={styles.row}>
            <Companions
              icons={<Ionicons name="person-outline" size={24} />}
              color="white"
              title="Solo"
              onPress={() => {}}
            />
            <Companions
              icons={<Ionicons name="md-people-outline" size={24} />}
              color="white"
              title="Duo"
              onPress={() => {}}
            />
          </View>
          <View style={styles.row}>
            <Companions
              icons={
                <MaterialCommunityIcons
                  name="account-group-outline"
                  size={24}
                />
              }
              color="white"
              title="Solo"
              onPress={() => {}}
            />
            <Companions
              icons={<Ionicons name="person-outline" size={24} />}
              color="white"
              title="Solo"
              onPress={() => {}}
            />
          </View>
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Travel Dates</Text>
          <DatePicker onSelectedChange={(date) => setSelectedDate(date)} />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Budget</Text>
          <TextInput style={styles.form} placeholder="Budget" />
        </View>
        <View style={styles.container}>
          <Text style={styles.title}>Choose accommodation type</Text>
          <TextInput style={styles.form} placeholder="Hotel, Rentals,.." />
        </View>

        <View style={styles.container}>
          <Text style={styles.title}>Choose ammenities</Text>
          <TextInput
            style={styles.form}
            placeholder="Free Wifi, Parking Space,.."
          />
        </View>
        <View>
          <Text style={styles.title}>Choose activities you like</Text>
          <View style={styles.row}>
            <Activities
              icons={<Ionicons name="person-outline" size={24} />}
              color="#DFCCF1"
              title="Sightseeing and Tours"
              onPress={() => {}}
            />
            <Activities
              icons={<Ionicons name="person-outline" size={24} />}
              color="#65F1D0"
              title="Outdoor Activities"
              onPress={() => {}}
            />
            <Activities
              icons={<Ionicons name="person-outline" size={24} />}
              color="#DFCCF1"
              title={'Shopping\n'}
              onPress={() => {}}
            />
          </View>
          <View style={styles.row}>
            <Activities
              icons={<Ionicons name="person-outline" size={24} />}
              color="#65F1D0"
              title="Educational and Learning Activities"
              onPress={() => {}}
            />
            <Activities
              icons={<Ionicons name="person-outline" size={24} />}
              color="#DFCCF1"
              title={'Arts and Museums\n'}
              onPress={() => {}}
            />
            <Activities
              icons={<Ionicons name="person-outline" size={24} />}
              color="#65F1D0"
              title="Food and Culinary Experiences"
              onPress={() => {}}
            />
          </View>
          <View style={styles.row}>
            <Activities
              icons={<Ionicons name="person-outline" size={24} />}
              color="#65F1D0"
              title="Bench"
              onPress={() => {}}
            />
          </View>
          <View style={styles.container}>
            <Text style={styles.title}>Choose venue preferences</Text>
            <TextInput style={styles.form} placeholder="Hotel, Rentals,.." />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  scroll: {
    flex: 1,
  },
  title: {
    padding: 10,
    marginLeft: 5,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    color: 'orange',
  },
  step: {
    marginBottom: 5,
  },
  form: {
    marginLeft: 10,
    color: 'orange',
    borderWidth: 2,
    borderColor: 'orange',
    borderRadius: 10,
    padding: 10,
    width: 300,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginLeft: 10,
    marginRight: 10,
    padding: 3,
  },
  activities: {
    textAlign: 'center',
  },
});

export default TravelerInfoScreen;
