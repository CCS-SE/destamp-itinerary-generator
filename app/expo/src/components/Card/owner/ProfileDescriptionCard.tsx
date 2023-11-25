import React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { separateWords } from '~/utils/utils';

const ProfileDescription = ({
  businessName,
  businessCategories,
  businessAddress,
  businessContactNumber,
  businessDescription,
}: {
  businessName: string;
  businessCategories: string[];
  businessAddress: string;
  businessContactNumber: string;
  businessDescription: string;
}) => {
  const screenWidth = Dimensions.get('window').width;

  const displayCategories = (items: string[]) => {
    return (
      <View className="mt-1 flex-row flex-wrap">
        {items.map((item, i) => (
          <View
            className="my-0.5 mr-1.5 flex-row rounded-lg border border-pink-300 px-1.5"
            key={i}
          >
            <Text className="font-poppins-medium text-[12px] text-pink-600 ">
              {separateWords(item)}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={[{ width: screenWidth * 0.9 }]}>
      <Text
        className="mt-4 font-poppins-medium text-xl text-gray-800"
        numberOfLines={3}
      >
        {businessName}
      </Text>
      <View>{displayCategories(businessCategories)}</View>
      <View className="mt-4 flex-row items-center">
        <Ionicons
          name="md-location-outline"
          size={16}
          color="#676464"
          style={{ marginLeft: -3, alignSelf: 'baseline' }}
        />
        <Text
          className="ml-1 font-poppins text-sm text-gray-500"
          numberOfLines={3}
        >
          {businessAddress}
        </Text>
      </View>
      {businessContactNumber ? (
        <View className=" flex-row items-center">
          <Ionicons name="ios-call-outline" size={15} color="#676464" />
          <Text className="ml-1 font-poppins text-base text-gray-500">
            {businessContactNumber}
          </Text>
        </View>
      ) : (
        <></>
      )}
      {businessDescription ? (
        <Text
          className="mt-4 font-poppins text-sm text-gray-500"
          numberOfLines={5}
        >
          {businessDescription}
        </Text>
      ) : (
        <></>
      )}
    </View>
  );
};

export default ProfileDescription;
