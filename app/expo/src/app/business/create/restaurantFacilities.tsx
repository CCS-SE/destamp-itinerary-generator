import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import AtmosphereSelection from '~/components/BusinessOperator/PriceRange/AtmosphereSelection';
import Questions from '~/components/BusinessOperator/Question';
import Question from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import CustomButtom from '~/components/Button/CustomButtom';
import CuisineSelection from '~/components/FormField/CuisineSelection';
import DiningStyleSelection from '~/components/FormField/DiningStyleSelection';
import CreateBusinessHeader from '.';

const RestaurantFacilities = () => {
  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
      <CreateBusinessHeader title={'Restaurant Facilities'} />
      <SafeAreaView>
        <ScrollView>
          <View style={{ marginLeft: 25, marginRight: 20 }}>
            <Questions question={'Dining Style'} />
            <View style={{ alignItems: 'center' }}>
              <DiningStyleSelection
                onOptionChange={function (options: string[]): void {
                  console.log('Function not implemented.');
                }}
                initialSelectedOptions={[]}
              />
            </View>

            <Question question={'Cuisines'} />
            <View style={{ marginBottom: 20 }}>
              <CuisineSelection
                onOptionChange={function (option: string[]): void {
                  console.log('Function not implemented.');
                }}
                initialSelectedOptions={[]}
              />
            </View>

            <Questions question={'Atmosphere'} />

            <AtmosphereSelection
              onOptionChange={function (option: string[]): void {
                console.log('Function not implemented.');
              }}
              initialSelectedOptions={[]}
            />

            <BasicButton
              title={'Save'}
              onPress={() =>
                router.push('/business/create/attractionActivities')
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default RestaurantFacilities;
