import React from 'react';
import { View } from 'react-native';
import { router, Stack } from 'expo-router';

import Back from '../../../../assets/images/back-btn.svg';

const handleBack = () => {
  router.back();
};

const CreateBusinessHeader = () => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          title: ' Create Business',
          headerTitleStyle: {
            color: '#FF8439',
            fontSize: 21,
            fontFamily: 'Poppins',
          },
          headerLeft: () => (
            <View>
              <Back height={35} width={30} onPress={handleBack} />
            </View>
          ),
        }}
      />
    </View>
  );
};

export default CreateBusinessHeader;
