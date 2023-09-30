import type { ReactNode } from 'react';
import React, { memo, useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

import { getTripDateFormat, tripDuration } from '~/utils/dates';
import { amountFormatter, toSentenceCase } from '~/utils/utils';
import TripMenuList from '../../Menu/TripMenu/TripMenuList';
import BottomHalfModal from '../../Modal/BottomHalfModal';

interface TripCardProps {
  id: number;
  imgSrc: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  travelSize: string;
}

function TripCard({
  id,
  imgSrc,
  destination,
  startDate,
  endDate,
  budget,
  travelSize,
}: TripCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  const daysDifference = tripDuration(startDate, endDate);

  return (
    <View className="bg- m-3" testID="trip-card">
      <Link href={`/itinerary/${id}`}>
        <View className="w-[370] rounded-2xl bg-gray-50 shadow-md">
          <Image
            testID="trip-destination-img"
            source={imgSrc}
            className="h-52 w-[370] rounded-2xl"
            placeholder={blurhash}
            transition={1_800}
          ></Image>
          <View className=" container absolute h-52 rounded-2xl bg-black opacity-30" />
          <TouchableOpacity
            accessibilityRole="button"
            testID="trip-menu-btn"
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
            <TripMenuList id={id} onModalClose={onModalClose} />
          </BottomHalfModal>
          <View className="absolute left-4 top-40 w-[215] flex-row justify-between">
            <Text
              testID="trip-destination"
              className="text-left font-poppins-semibold text-2xl text-zinc-100"
            >
              {destination}
            </Text>
          </View>
          <View className="flex-row justify-between p-2">
            <View className="flex-row items-center">
              <Text
                testID="trip-date"
                className="pl-2 text-center font-poppins-medium text-lg text-gray-500"
              >
                {`${getTripDateFormat(startDate)}  •  ${daysDifference} ${
                  daysDifference > 1 ? 'days' : 'day'
                }`}
              </Text>
            </View>
          </View>
          <View className="-top-2 flex-row pl-2">
            <View className="mr-3 flex-row items-center rounded-md pl-2">
              {travelSizeIcon[travelSize]}
              <Text
                testID="trip-travel-size"
                className="pl-1 text-center font-poppins text-base  text-gray-500"
              >
                {toSentenceCase(travelSize)}
              </Text>
              <Text className="pl-2 text-center font-poppins text-base  text-gray-500">
                •
              </Text>
            </View>
            <View className="flex-row">
              <Text className=" text-center font-poppins text-base  text-gray-500">
                ₱
              </Text>
              <Text
                testID="trip-budget"
                className="text-center font-poppins text-base  text-gray-500"
              >
                {amountFormatter(budget)}
              </Text>
            </View>
          </View>
        </View>
      </Link>
    </View>
  );
}

const travelSizeIcon: Record<string, ReactNode> = {
  SOLO: <AntDesign name="user" size={15} color={'#808080'} />,
  COUPLE: <AntDesign name="hearto" size={15} color={'#808080'} />,
  FAMILY: <AntDesign name="home" size={15} color={'#808080'} />,
  GROUP: <AntDesign name="team" size={15} color={'#808080'} />,
};

export default memo(TripCard);
