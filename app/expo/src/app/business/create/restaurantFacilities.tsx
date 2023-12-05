import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import AtmosphereSelection from '~/components/BusinessOperator/EstablishmentTypes/AtmosphereSelection';
import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import PriceRange from '~/components/BusinessOperator/PriceRange/PriceRange';
import Question from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';

const RestaurantFacilities = () => {
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<string[]>([]);

  const handleSave = () => {
    if (selectedAtmosphere.length === 0) {
      Alert.alert(
        'Complete information first',
        'Please select options for Dining Style, Cuisines, and Atmosphere.',
      );
      return;
    }
    router.push('/business/create/uploadPhotos');
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
      <CreateBusinessHeader title={'Restaurant Facilities'} />
      <SafeAreaView>
        <ScrollView>
          <View style={{ marginLeft: 25, marginRight: 20 }}>
            <Question question={'Atmosphere'} />
            <AtmosphereSelection
              onOptionChange={(options) => setSelectedAtmosphere(options)}
              initialSelectedOptions={selectedAtmosphere}
            />

            <PriceRange />

            <BasicButton title={'Save'} onPress={handleSave} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default RestaurantFacilities;
