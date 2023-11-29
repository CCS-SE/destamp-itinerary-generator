import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import AtmosphereSelection from '~/components/BusinessOperator/AtmosphereSelection';
import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Question from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import CuisineSelection from '~/components/FormField/CuisineSelection';
import DiningStyleSelection from '~/components/FormField/DiningStyleSelection';

const RestaurantFacilities = () => {
  const [selectedDiningStyle, setSelectedDiningStyle] = useState<string[]>([]);
  const [selectedCuisines, setSelectedCuisines] = useState<string[]>([]);
  const [selectedAtmosphere, setSelectedAtmosphere] = useState<string[]>([]);

  const handleSave = () => {
    if (
      selectedDiningStyle.length === 0 ||
      selectedCuisines.length === 0 ||
      selectedAtmosphere.length === 0
    ) {
      Alert.alert(
        'Complete information first',
        'Please select options for Dining Style, Cuisines, and Atmosphere.',
      );
      return;
    }
    router.push('/business/create/index');
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
      <CreateBusinessHeader title={'Restaurant Facilities'} />
      <SafeAreaView>
        <ScrollView>
          <View style={{ marginLeft: 25, marginRight: 20 }}>
            <Question question={'Dining Style'} />
            <View style={{ alignItems: 'center' }}>
              <DiningStyleSelection
                onOptionChange={(options) => setSelectedDiningStyle(options)}
                initialSelectedOptions={selectedDiningStyle}
              />
            </View>

            <Question question={'Cuisines'} />
            <View style={{ marginBottom: 20 }}>
              <CuisineSelection
                onOptionChange={(options) => setSelectedCuisines(options)}
                initialSelectedOptions={selectedCuisines}
              />
            </View>

            <Question question={'Atmosphere'} />
            <AtmosphereSelection
              onOptionChange={(options) => setSelectedAtmosphere(options)}
              initialSelectedOptions={selectedAtmosphere}
            />

            <BasicButton title={'Save'} onPress={handleSave} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default RestaurantFacilities;
