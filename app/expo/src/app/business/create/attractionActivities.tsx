import React from 'react';
import { StyleSheet, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import AttractionIcons from '~/components/BusinessOperator/AttractionIcons';
import Question from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import CreateBusinessHeader from '.';

const AttractionActivities = () => {
  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
      <CreateBusinessHeader title={'Attraction Activities'} />
      <SafeAreaView>
        <ScrollView>
          <View>
            <Question question={'Select Category'} />
            <AttractionIcons
              onActivitiesSliderValueChange={function (
                name: string,
                value: number,
              ): void {
                console.log('Function not implemented.');
              }}
              initialActivityValues={{}}
            />
            <BasicButton
              title={'Save'}
              onPress={() =>
                router.push('/business/create/accommodationFacilties')
              }
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AttractionActivities;
