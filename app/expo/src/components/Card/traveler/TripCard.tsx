import type { ReactNode } from 'react';
import React, { memo, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import * as Haptics from 'expo-haptics';
import { Image } from 'expo-image';
import { Link } from 'expo-router';
import { AntDesign, FontAwesome5 } from '@expo/vector-icons';

import { blurhash } from '~/constant/constant';
import {
  amountFormatter,
  getTripDateFormat,
  getTripDateWithYearFormat,
  toSentenceCase,
  tripDuration,
} from '~/utils/utils';
import TripMenuList from '../../Menu/TripMenu/TripMenuList';
import BottomHalfModal from '../../Modal/BottomHalfModal';

interface TripCardProps {
  id: number;
  imgSrc?: string;
  title: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  travelSize: string;
  totalTravellers: number;
  isPremium: boolean;
  setRegenerating: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  daysDifference: number;
}

function TripCard({
  id,
  title,
  startDate,
  endDate,
  budget,
  travelSize,
  totalTravellers,
  isPremium,
  setRegenerating,
  setDeleting,
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
              images[
                parseInt(id.toString()[id.toString().length - 1] as string)
              ]
            }
            className="h-52 rounded-2xl"
            placeholder={blurhash}
            transition={1_200}
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
            <TripMenuList
              id={id}
              isPremium={isPremium}
              onModalClose={onModalClose}
              setRegenerating={setRegenerating}
              setDeleting={setDeleting}
            />
          </BottomHalfModal>
          <View className="absolute left-4 top-40 w-[215] flex-row justify-between">
            <Text
              testID="trip-title"
              className="text-left font-poppins-semibold text-2xl text-zinc-100"
            >
              {title}
            </Text>
          </View>
          <View className="flex-row justify-between p-2">
            <View className="flex-row items-center">
              <Text
                testID="trip-date"
                className="pl-2 text-center font-poppins-medium text-lg text-gray-500"
              >
                {(() => {
                  if (daysDifference > 1) {
                    return `${getTripDateFormat(
                      startDate,
                    )} - ${getTripDateWithYearFormat(endDate)}`;
                  } else if (daysDifference === 1) {
                    return `${getTripDateWithYearFormat(startDate)}`;
                  } else {
                    return '';
                  }
                })()}{' '}
                • {daysDifference} {daysDifference > 1 ? 'days' : 'day'}
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

const images: string[] = [
  'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcSi8R9T36oyyaXjot89S3qiK87PGjo-w1nd3YxGYw9kQhOTyUMdHs_3ICnqxK_SDf2OgK3NIk5XANZ-H6fJuJ13V1-DkcQrGcLt-btxAQ',
  'https://lh5.googleusercontent.com/p/AF1QipM3no0xRNR49mLdCGlRknEdhi7oFruc4gAVyNKc=w675-h390-n-k-no',
  'https://lh5.googleusercontent.com/proxy/rue5zgfmReWVgGb8gZpo8w_P3MrrIPug0ZVBRW11BFwcbseNXiFlZFvmIKIvToBtTNYkm3Bha9qC8WCmVbcxsi9qZTJdMyPUKdHMZ1ULhMDRwRKOpSABzoft4P3Rk_f7RhYvJdPC_s9WkxT78-y7tuFTHiXGKKw=w675-h390-n-k-no',
  'https://lh5.googleusercontent.com/p/AF1QipNDQRUiEkGDT7uJKKNoARxbPwBIydqEE87g6_ns=w675-h390-n-k-no',
  'https://encrypted-tbn1.gstatic.com/licensed-image?q=tbn:ANd9GcTfaddCTG-VVsHKuD4zSMgGnrGXpnZsfsQc3woPSemiHexpKtHsQCNQ9lIxqNau4BFRAthYfNYjkQdcYs5pBoBlpJDU_-8knq_ovt6L2CU',
  'https://encrypted-tbn3.gstatic.com/licensed-image?q=tbn:ANd9GcQoHzT0tzwu-t5ynAsGSqkvlJOVXq_5e9JLvJebggmbmcZ3wx88h0Te4mv-khZoFtPp-jF1258PkC9iFvtOCyk1SoGROmlcOtiDW1P2Bg',
  'https://lh5.googleusercontent.com/p/AF1QipNNcwXy4neqPppRQek_si8h6N8bRuoD72zjj0U=w675-h390-n-k-no',
  'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSENVZcHN6bNO9ICfNGh_utg1hjw5OsNTtdn9tpBWlv5475EBUJd251orLzAat758iE25m0dau0rbArxzNQKyOA6vIjajHEUL5HkBASag',
  'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcS_-FJFL6ia3Pm67HRqKZ-8yD2QSKQ2TNBOnJahfVEFifalbeaU5V_WyhT_X9Jp0SvY7drgY2i9HtTScWnHN9XLDT8BkHPVb0JgK1LgEg',
  'https://www.detourista.com/wp/wp-content/uploads/Tax-Place/Philippines/Iloilo/Iloilo/Featured/001-Calle-Real-in-Iloilo-City-150105-063819.jpg',
];

export default memo(TripCard);
