import React from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Skeleton from './Skeleton';

const ProfileScreenSkeleton = () => {
  const cardWidth = Dimensions.get('window').width * 0.88;
  return (
    <View className="flex-1 items-center">
      <SafeAreaView className="flex-0">
        <Skeleton
          width={cardWidth}
          height={100}
          style={{ borderRadius: 16, marginBottom: 15, marginTop: 25 }}
        />
        <Skeleton width={cardWidth} height={180} style={{ borderRadius: 16 }} />
        <Skeleton
          width={cardWidth}
          height={60}
          style={{ borderRadius: 16, marginBottom: 15, marginTop: 20 }}
        />
        <Skeleton
          width={cardWidth}
          height={60}
          style={{ borderRadius: 16, marginBottom: 15 }}
        />
        <Skeleton
          width={cardWidth}
          height={60}
          style={{ borderRadius: 16, marginBottom: 15 }}
        />
      </SafeAreaView>
    </View>
  );
};

export default ProfileScreenSkeleton;
