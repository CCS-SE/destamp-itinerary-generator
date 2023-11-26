import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { router, Stack } from 'expo-router';

const handleBackButtonPress = () => {
  router.back();
};

const CreateBusinessHeader = () => {
  return (
    <View style={{ justifyContent: 'center' }}>
      <Stack.Screen
        options={{
          title: 'Create Business',
          headerTitleStyle: {
            color: '#FF8439',
            fontSize: 21,
            fontFamily: 'Poppins',
          },
          headerLeft: () => (
            <TouchableOpacity onPress={handleBackButtonPress}>
              <View>
                <Image
                  source={require('../../../../assets/images/destamp-logo.png')}
                  style={{ width: 50, height: 50, marginRight: 5 }}
                />
              </View>
            </TouchableOpacity>
          ),
        }}
      />
    </View>
  );
};

export default CreateBusinessHeader;
