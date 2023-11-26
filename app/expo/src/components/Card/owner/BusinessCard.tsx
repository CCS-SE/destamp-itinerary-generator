import React, { memo, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

import BusinessMenuList from '~/components/Menu/BusinessMenu/BusinessMenuList';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';

interface BusinessCardProps {
  businessId: string;
  businessName: string;
  businessImages: string[];
  businessAddress: string;
}

function BusinessCard({
  businessId,
  businessImages,
  businessName,
  businessAddress,
}: BusinessCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const handleViewDetails = () => {
    router.push({
      pathname: `/business/profile/${businessId}`,
      params: {
        id: businessId,
        imageList: JSON.stringify(businessImages),
      },
    });
  };

  const cardWidth = Dimensions.get('window').width * 0.85;

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View className="mt-9" testID="business-card">
      <TouchableOpacity activeOpacity={0.9} onPress={handleViewDetails}>
        <View
          className="rounded-2xl bg-gray-50 shadow-md"
          style={{ width: cardWidth }}
        >
          <Image
            testID="trip-destination-img"
            source={businessImages[businessImages.length - 2]}
            className="h-44 rounded-2xl"
            placeholder={blurhash}
            transition={1_500}
          ></Image>
          <View
            className="absolute h-44 rounded-2xl bg-black opacity-30"
            style={{ width: cardWidth }}
          />
          <TouchableOpacity
            accessibilityRole="button"
            testID="business-menu-btn"
            className=" absolute right-3 top-2 p-2"
            activeOpacity={0.7}
            onPress={() => {
              setIsModalVisible(true);
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
            }}
          >
            <FontAwesome5
              name="ellipsis-h"
              size={22}
              color={'white'}
            ></FontAwesome5>
          </TouchableOpacity>
          <BottomHalfModal isVisible={isModalVisible} onClose={onModalClose}>
            <BusinessMenuList
              id={businessId}
              imageList={businessImages}
              onModalClose={onModalClose}
            />
          </BottomHalfModal>
          <View className="absolute left-4 top-[125] w-auto">
            <Text
              numberOfLines={1}
              testID="business-name"
              className="text-left font-poppins-semibold text-xl text-zinc-100"
            >
              {businessName}
            </Text>
            <Text
              numberOfLines={1}
              testID="business-name"
              className="-mt-0.5 pr-9 text-left font-poppins text-[10.5px] text-zinc-100"
            >
              {businessAddress}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      {/* <Link href={`/business/profile/${businessId}`}> */}
    </View>
  );
}

export default memo(BusinessCard);
