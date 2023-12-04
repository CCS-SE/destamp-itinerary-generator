import React from 'react';
import { View } from 'react-native';
import { router, Stack } from 'expo-router';

import Back from '../../../assets/images/back-btn.svg';
import Logo from '../../../assets/images/destampp-logo.svg';

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
            color: '#FF8439',
            fontSize: 20,
            fontFamily: 'Poppins',
          },
          headerLeft: () => (
            <View style={{ paddingRight: 10 }}>
              <Back height={30} width={30} onPress={handleBack} />
            </View>
          ),
          headerBackVisible: false,
          headerRight: () => {
            return (
              <View className="rounded-full p-0.5">
                <Logo height={45} width={45} />
              </View>
            );
          },
        }}
      />
    </View>
  );
};

export default CreateBusinessHeader;
