import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, Stack } from 'expo-router';

import BusinessBasicInformation from './basicInformation';
import DiningType from './diningType';
import ChooseType from './establishmentType';
import BusinessOpeningHours from './openingHours';
import PriceRange from './priceRange';

const handleBackButtonPress = () => {
  router.back();
};

const CreateBusiness = () => {
  return (
    <View>
      <Stack.Screen
        options={{
          title: 'Create Business',
          headerTitleStyle: {
            color: 'orange',
            fontSize: 21,
            fontFamily: 'Poppins',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={handleBackButtonPress}>
              {/* <Back height={25} width={25} /> */}
              <Text>Back</Text>
            </TouchableOpacity>
          ),
        }}
      />
      <ScrollView>
        <SafeAreaView>
          <ChooseType />
          <BusinessBasicInformation />
          <BusinessOpeningHours />
          <DiningType />
          <PriceRange />
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default CreateBusiness;
