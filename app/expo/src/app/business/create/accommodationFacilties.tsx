import React from 'react';
import { View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import Question from '~/components/BusinessOperator/Question';
import AccommodationSelection from '~/components/FormField/AccommodationSelection';
import AmenitiesSelection from '~/components/FormField/AmenitiesSelection';
import CreateBusinessHeader from '.';

const AccommodationFacilties = () => {
  return (
    <View>
      <CreateBusinessHeader title={'Accommodation Facilties'} />
      <SafeAreaView>
        <ScrollView>
          <View style={{ padding: 20 }}>
            <Question question={'Select Category'} />
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <AccommodationSelection
                onOptionChange={function (option: string): void {
                  console.log('Function not implemented.');
                }}
                initialSelectedOption={''}
              />
            </View>

            <Question question={'Amenities'} />
            <View style={{ justifyContent: 'center', margin: 10 }}>
              <AmenitiesSelection
                onOptionChange={function (options: string[]): void {
                  console.log('Function not implemented.');
                }}
                initialSelectedOptions={[]}
              />
            </View>

            {/* <BasicButton
              title={'Save'}
              onPress={() =>
                router.push('/business/create/accommodationFacilties')
              }
            /> */}
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AccommodationFacilties;
