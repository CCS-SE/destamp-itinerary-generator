import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Question from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import AccommodationSelection from '~/components/FormField/AccommodationSelection';
import AmenitiesSelection from '~/components/FormField/AmenitiesSelection';

const AccommodationFacilities = () => {
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const handleSave = () => {
    if (!selectedAccommodation && selectedAmenities.length === 0) {
      Alert.alert(
        'Please select at least one option for Accommodation or Amenities.',
      );
      return;
    }
    router.push('/business/create/verificationPage');
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <CreateBusinessHeader title={'Accom Facilities'} />
      <SafeAreaView>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Question question={'Select Category'} />
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <AccommodationSelection
                onOptionChange={(option) => setSelectedAccommodation(option)}
                initialSelectedOption={selectedAccommodation}
              />
            </View>

            <Question question={'Amenities'} />
            <View style={{ justifyContent: 'center', margin: 10 }}>
              <AmenitiesSelection
                onOptionChange={(options) => setSelectedAmenities(options)}
                initialSelectedOptions={selectedAmenities}
                data={[]}
              />
            </View>

            <BasicButton title={'Save'} onPress={handleSave} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AccommodationFacilities;
