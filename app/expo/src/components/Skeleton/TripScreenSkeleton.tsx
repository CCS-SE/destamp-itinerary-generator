import React from 'react';
import { Dimensions, View } from 'react-native';

import Skeleton from './Skeleton';

const TripScreenSkeleton = () => {
  const cardWidth = Dimensions.get('window').width * 0.9;
  const skeWidth = cardWidth - 30;
  return (
    <View className="mb-32 mt-3 flex-1">
      <View
        style={{
          elevation: 3,
          width: cardWidth,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.24,
          shadowRadius: 4,
          borderRadius: 16,
          backgroundColor: '#fff',
          alignContent: 'center',
          justifyContent: 'center',
          paddingBottom: 16,
        }}
      >
        <Skeleton width={cardWidth} height={210} style={{ borderRadius: 16 }} />
        <Skeleton
          width={skeWidth / 2}
          height={30}
          style={{ borderRadius: 8, marginTop: 8, marginLeft: 10 }}
        />
        <Skeleton
          width={skeWidth / 3}
          height={18}
          style={{ borderRadius: 16, marginTop: 8, marginLeft: 10 }}
        />
      </View>
      <View
        style={{
          elevation: 3,
          width: cardWidth,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.24,
          shadowRadius: 4,
          borderRadius: 16,
          backgroundColor: '#fff',
          alignContent: 'center',
          justifyContent: 'center',
          paddingBottom: 16,
          marginTop: 18,
        }}
      >
        <Skeleton width={cardWidth} height={210} style={{ borderRadius: 16 }} />
        <Skeleton
          width={skeWidth / 2}
          height={30}
          style={{ borderRadius: 8, marginTop: 8, marginLeft: 10 }}
        />
        <Skeleton
          width={skeWidth / 3}
          height={18}
          style={{ borderRadius: 16, marginTop: 8, marginLeft: 10 }}
        />
      </View>
      <View
        style={{
          elevation: 3,
          width: cardWidth,
          shadowColor: 'black',
          shadowOffset: { width: 0, height: 3 },
          shadowOpacity: 0.24,
          shadowRadius: 4,
          borderRadius: 16,
          backgroundColor: '#fff',
          alignContent: 'center',
          justifyContent: 'center',
          paddingBottom: 16,
          marginTop: 18,
        }}
      >
        <Skeleton width={cardWidth} height={210} style={{ borderRadius: 16 }} />
        <Skeleton
          width={skeWidth / 2}
          height={30}
          style={{ borderRadius: 8, marginTop: 8, marginLeft: 10 }}
        />
        <Skeleton
          width={skeWidth / 3}
          height={18}
          style={{ borderRadius: 16, marginTop: 8, marginLeft: 10 }}
        />
      </View>
    </View>
  );
};

export default TripScreenSkeleton;
