import type { ReactNode } from 'react';
import React, { memo, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

import { blurhash } from '~/app/constant/constant';
import {
  amountFormatter,
  getTripDateFormat,
  toSentenceCase,
  tripDuration,
} from '~/utils/utils';
import TripMenuList from '../../Menu/TripMenu/TripMenuList';
import BottomHalfModal from '../../Modal/BottomHalfModal';

interface TripCardProps {
  id: number;
  imgSrc?: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  travelSize: string;
  totalTravellers: number;
}

function TripCard({
  id,
  destination,
  startDate,
  endDate,
  budget,
  travelSize,
  totalTravellers,
}: TripCardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const cardWidth = Dimensions.get('window').width * 0.9;

  const daysDifference = tripDuration(startDate, endDate);

  return (
    <View className="m-3" testID="trip-card">
      <Link href={`/traveler/trip/itinerary/${id}`}>
        <View
          className=" rounded-2xl bg-gray-50 shadow-md"
          style={{ width: cardWidth }}
        >
          <Image
            testID="trip-destination-img"
            source={
              'https://gttp.imgix.net/223596/x/0/top-23-iloilo-tourist-spots-home-to-gigantes-islands-amp-old-churches-6.jpg?auto=compress%2Cformat&ch=Width%2CDPR&dpr=1&ixlib=php-3.3.0&w=883'
            }
            className="h-52 rounded-2xl"
            placeholder={blurhash}
            transition={1_500}
          ></Image>
          <View
            className=" container absolute h-52 rounded-2xl bg-black opacity-30"
            style={{ width: cardWidth }}
          />
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
                {`${toSentenceCase(travelSize)} (${totalTravellers}) `}
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
