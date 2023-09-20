import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { FontAwesome, Ionicons, MaterialIcons } from '@expo/vector-icons';

import ReviewForms from '~/components/TravelInfo/ReviewForm';

const ReviewInfoScreen: React.FC = () => {
  return (
    <ScrollView style={styles.scroll}>
      <View>
        <Text style={styles.title}>Title</Text>
        <TextInput style={styles.form} placeholder="Display Trip Title" />
      </View>
      <View>
        <Text> Insert Image</Text>
      </View>
      <View>
        <ReviewForms
          icons={<FontAwesome name="calendar" size={24} color="black" />}
          title=""
          onPress={() => {}}
        />
        <ReviewForms
          icons={<MaterialIcons name="attach-money" size={24} color="black" />}
          title=""
          onPress={() => {}}
        />
        <ReviewForms
          icons={<Ionicons name="person-outline" size={24} />}
          title=""
          onPress={() => {}}
        />
      </View>
      <View>
        <TouchableOpacity></TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flex: 1,
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
  title: {
    padding: 10,
    marginLeft: 5,
    fontWeight: 'bold',
    fontFamily: 'Poppins',
    color: 'orange',
  },
});

export default ReviewInfoScreen;
