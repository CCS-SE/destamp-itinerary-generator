import React, { memo, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { AntDesign, FontAwesome5, Octicons } from '@expo/vector-icons';

import BusinessMenuList from '~/components/Menu/BusinessMenu/BusinessMenuList';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';
import FancyModal from '~/components/Modal/FancyModal';
import { blurhash } from '~/constant/constant';

interface BusinessCardProps {
  businessId: string;
  businessName: string;
  businessImages: string[];
  businessAddress: string;
  businessIsVerified: boolean;
}

function BusinessCard({
  businessId,
  businessImages,
  businessName,
  businessAddress,
  businessIsVerified,
}: BusinessCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isPendingStatusModalVisible, setIsPendingStatusModalVisible] =
    useState(false);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onModalOpen = () => {
    setIsModalVisible(true);
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  const onPendingStatusModalClose = () => {
    setIsPendingStatusModalVisible(false);
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

  const handleNonVerifiedModal = () => {
    setIsPendingStatusModalVisible(true);
  };

  const cardWidth = Dimensions.get('window').width * 0.88;

  return (
    <View className="mt-9" testID="business-card">
      <TouchableOpacity
        activeOpacity={0.9}
        onPress={
          businessIsVerified ? handleViewDetails : handleNonVerifiedModal
        }
      >
        <View
          className="rounded-2xl bg-gray-50 shadow-md"
          style={{ width: cardWidth }}
        >
          <Image
            testID="trip-destination-img"
            source={businessImages[0]}
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
            onPress={businessIsVerified ? onModalOpen : handleNonVerifiedModal}
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
      <FancyModal isVisible={isPendingStatusModalVisible} bgColor="#DCDCDC">
        <View className="items-center p-2">
          <AntDesign
            name="closecircleo"
            size={22}
            color="gray"
            style={{ alignSelf: 'flex-end' }}
            onPress={onPendingStatusModalClose}
          />
          <View className="mt-3">
            <Octicons name="unverified" size={30} color="gray" />
          </View>
          <Text className="mt-3 font-poppins-medium text-base text-gray-500">
            Your application is being screened
          </Text>
          <Text className="mt-3 p-4 text-center font-poppins text-sm text-gray-500">
            We have received your request to verify your business profile. We
            are currently verifying your information. This may take 2 to 5 days.
          </Text>
        </View>
      </FancyModal>
    </View>
  );
}

export default memo(BusinessCard);
