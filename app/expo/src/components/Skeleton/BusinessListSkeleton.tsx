import React from 'react';
import { Dimensions, View } from 'react-native';

import Skeleton from './Skeleton';

const BusinessScreenSkeleton = () => {
  const cardWidth = Dimensions.get('window').width * 0.85;

  return (
    <View className="mb-32 mt-5 flex-1">
      {Array(4)
        .fill(null)
        .map((_, index) => (
          <View
            key={index}
            style={{
              elevation: 3,
              width: cardWidth,
              shadowColor: 'black',
              shadowOffset: { width: 0, height: 3 },
              shadowOpacity: -0.09,
              shadowRadius: 1,
              borderRadius: 16,
              backgroundColor: '#fff',
              alignContent: 'center',
              justifyContent: 'center',
              marginTop: 15,
              marginBottom: 20,
            }}
          >
            <Skeleton
              width={cardWidth}
              height={160}
              style={{ borderRadius: 16 }}
            />
          </View>
        ))}
    </View>
  );
};

export default BusinessScreenSkeleton;
