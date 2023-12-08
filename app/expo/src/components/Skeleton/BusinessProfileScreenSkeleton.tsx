import React from 'react';
import { Dimensions, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Skeleton from './Skeleton';

const BusinessProfileScreenSkeleton = () => {
  const cardWidth = Dimensions.get('window').width * 0.88;
  return (
    <View className="flex-1 items-center">
      <Skeleton
        width={Dimensions.get('window').width}
        height={Dimensions.get('window').height * 0.3}
        style={{ borderRadius: 16, marginBottom: 15 }}
      />
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
    </View>
  );
};

export default BusinessProfileScreenSkeleton;
