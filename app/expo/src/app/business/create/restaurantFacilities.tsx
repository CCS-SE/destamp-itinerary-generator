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

  const [minPrice] = useState<number>(0);
  const [maxPrice] = useState<number>(0);

  const handleSave = () => {
    console.log('minPrice:', minPrice);
    console.log('maxPrice:', maxPrice);

    if (selectedAtmosphere.length === 0) {
      Alert.alert(
        'Complete information first',
        'Please select options for Dining Style, Cuisines, and Atmosphere.',
      );
    } else if (minPrice > maxPrice) {
      console.log('Invalid Price Range');
      window.alert(
        'Invalid Price Range: Minimum price should be lower than the maximum price.',
      );
    } else {
      router.push('/business/create/uploadPhotos');
    }
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

            <PriceRange title={'Average price per person'} />

            <BasicButton title={'Save'} onPress={handleSave} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default RestaurantFacilities;
