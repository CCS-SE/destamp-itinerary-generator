import React from 'react';
import { View } from 'react-native';
import { router, Stack } from 'expo-router';

import Back from '../../../assets/images/back-btn.svg';

const handleBack = () => {
  router.back();
};

const CreateBusinessHeader = ({ title }: { title: string }) => {
  return (
    <View style={{ alignContent: 'center' }}>
      <Stack.Screen
        options={{
          title: title,
          headerTitleStyle: {
            color: '#504D4D',
            fontSize: 20,
            fontFamily: 'Poppins',
          },
          headerLeft: () => (
            <View style={{ paddingRight: 10 }}>
              <Back height={30} width={30} onPress={handleBack} />
            </View>
          ),
          headerBackVisible: false,
        }}
      />
    </View>
  );
};

export default CreateBusinessHeader;
