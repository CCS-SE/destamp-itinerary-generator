import React, { useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

import { getDaysDifference, getTripDateFormat } from "~/utils/dates";
import BottomHalfModal from "../Modal/BottomHalfModal";
import TripMenuList from "../TripMenu/TripMenuList";

interface TripCardProps {
  id: string;
  imgSrc: string;
  destination?: string;
  startDate: Date;
  endDate: Date;
  budget: number;
  travelSize: string;
}

export default function TripCard({
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
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  const daysDifference = getDaysDifference(startDate, endDate);

  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light)}
    >
      <View className="bg- m-3">
        <View className="w-[370] rounded-2xl bg-gray-50 shadow-md">
          <Image
            source={imgSrc}
            className="h-52 w-[370] rounded-2xl"
            placeholder={blurhash}
            transition={1_800}
          ></Image>
          <View className=" container absolute h-52 rounded-2xl bg-black opacity-20" />
          <TouchableOpacity
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
              color={"white"}
            ></FontAwesome5>
          </TouchableOpacity>
          <BottomHalfModal isVisible={isModalVisible} onClose={onModalClose}>
            <TripMenuList onCloseModal={onModalClose} />
          </BottomHalfModal>
          <View className="absolute left-4 top-40 w-[215] flex-row justify-between">
            <Text className="text-left text-2xl font-semibold text-zinc-100">
              {destination}
            </Text>
          </View>
          <View className="flex-row justify-between p-2">
            <View testID="date" className="flex-row items-center">
              <Text className="pl-2 text-center text-lg font-medium text-gray-500">
                {`${getTripDateFormat(startDate)}  •  ${daysDifference} ${
                  daysDifference > 1 ? "days" : "day"
                }`}
              </Text>
            </View>
          </View>
          <View className="-top-2 flex-row pl-2">
            <View
              testID="travel_size"
              className="mr-3 flex-row items-center rounded-md pl-2"
            >
              {travelSizeIcon[travelSize]}
              <Text className="pl-1 text-center text-base font-light text-gray-500">
                {`${travelSize}  •`}
              </Text>
            </View>
            <Text className="text-center text-base font-light text-gray-500">
              {`₱${new Intl.NumberFormat().format(budget)}`}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const travelSizeIcon: Record<string, any> = {
  SOLO: <AntDesign name="user" size={15} color={"#808080"} />,
  COUPLE: <AntDesign name="hearto" size={15} color={"#808080"} />,
  FAMILY: <AntDesign name="home" size={15} color={"#808080"} />,
  GROUP: <AntDesign name="team" size={15} color={"#808080"} />,
};
