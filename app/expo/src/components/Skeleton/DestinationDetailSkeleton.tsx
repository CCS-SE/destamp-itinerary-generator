import React from 'react';
import { Dimensions, View } from 'react-native';
import { Stack } from 'expo-router';

import Skeleton from './Skeleton';

const DestinationDetailSkeleton = () => {
  const cardWidth = Dimensions.get('window').width * 0.87;

  const skeWidth = cardWidth;

  return (
    <View className=" flex-1 self-center">
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
          alignItems: 'center',
          marginTop: 10,
          marginBottom: 10,
          flex: 1,
        }}
      >
        <Skeleton width={430} height={380} style={{ borderRadius: 0 }} />
        <Skeleton
          width={skeWidth / 1.002}
          height={90}
          style={{ borderRadius: 15, marginTop: 20 }}
        />
        <Skeleton
          width={skeWidth / 1.002}
          height={70}
          style={{ borderRadius: 15, marginTop: 10 }}
        />
        <Skeleton
          width={skeWidth / 1.002}
          height={200}
          style={{ borderRadius: 15, marginTop: 15 }}
        />
      </View>
    </View>
  );
};

export default DestinationDetailSkeleton;
