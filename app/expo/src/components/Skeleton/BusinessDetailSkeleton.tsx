import React from 'react';
import { Dimensions, View } from 'react-native';
import { Stack } from 'expo-router';

import Skeleton from './Skeleton';

const BusinessDetailScreenSkeleton = () => {
  const cardWidth = Dimensions.get('window').width * 0.9;

  const skeWidth = cardWidth;

  return (
    <View className="-mt-1 flex-1">
      <Stack.Screen
        options={{
          headerShown: false,
        }}
      />
      <View
        style={{
          elevation: 3,
          width: '100%',
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: -0.09,
          shadowRadius: 1,
          borderRadius: 16,
          backgroundColor: '#fff',
          alignContent: 'center',
          justifyContent: 'center',
          marginTop: 10,
          marginBottom: 10,
        }}
      >
        <Skeleton width={430} height={330} style={{ borderRadius: 0 }} />
        <Skeleton
          width={skeWidth / 1.2}
          height={35}
          style={{ borderRadius: 10, margin: 8, marginLeft: 30 }}
        />
        <Skeleton
          width={skeWidth / 1.002}
          height={70}
          style={{ borderRadius: 10, marginTop: 4, marginLeft: 30 }}
        />
        <Skeleton
          width={skeWidth / 1.002}
          height={50}
          style={{ borderRadius: 10, marginTop: 10, marginLeft: 30 }}
        />
        <Skeleton
          width={skeWidth / 1.002}
          height={180}
          style={{ borderRadius: 10, marginTop: 15, marginLeft: 30 }}
        />
      </View>
    </View>
  );
};

export default BusinessDetailScreenSkeleton;
