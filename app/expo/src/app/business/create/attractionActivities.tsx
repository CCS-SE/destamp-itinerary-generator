import React, { useState } from 'react';
import { Alert, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import AttractionIcons from '~/components/BusinessOperator/AttractionIcons';
import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Question from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';

const AttractionActivities = () => {
  const [selectedActivities, setSelectedActivities] = useState<
    Record<string, number>
  >({});

  const handleSave = () => {
    if (Object.keys(selectedActivities).length === 0) {
      // Display an alert or any other feedback to the user
      Alert.alert('Please select at least one activity.');
      return;
    }

    // Continue with the save logic
    router.push('/business/create/verificationPage');
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white' }}>
      <CreateBusinessHeader title={'Attraction Activities'} />
      <SafeAreaView>
        <ScrollView>
          <View>
            <Question question={'Select Category'} />
            <AttractionIcons
              onActivitiesSliderValueChange={(name, value) =>
                setSelectedActivities((prevSelected) => ({
                  ...prevSelected,
                  [name]: value,
                }))
              }
              initialActivityValues={selectedActivities}
            />
            <BasicButton title={'Save'} onPress={handleSave} />
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default AttractionActivities;
