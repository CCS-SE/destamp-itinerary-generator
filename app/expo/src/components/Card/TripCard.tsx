import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import * as Haptics from "expo-haptics";
import { Image } from "expo-image";
import { AntDesign, FontAwesome5 } from "@expo/vector-icons";

import { getDaysDifference, getTripDateFormat } from "~/utils/dates";

interface TripCardProps {
  id: number;
  imgSrc: string;
  destination: string;
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
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View className="bg- m-3">
      <View className="w-[370] rounded-2xl">
        <Image
          source={imgSrc}
          className="h-52 w-[370] rounded-2xl"
          placeholder={blurhash}
          transition={1_800}
        />
        <View className="rounded-ful absolute right-3 top-2 p-1.5">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() =>
              Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium)
            }
          >
            <FontAwesome5
              name="ellipsis-h"
              size={22}
              color={"white"}
            ></FontAwesome5>
          </TouchableOpacity>
        </View>
        <View className="absolute bottom-14 left-4 w-[215] flex-row justify-between">
          <Text className="text-center text-2xl font-semibold text-zinc-100">
            {destination}
          </Text>
        </View>
        <View className="flex-auto">
          <View className="flex-row justify-between p-2.5">
            <View testID="date" className="flex-row items-center">
              <Text className="text-center text-base font-normal text-gray-600">
                {`${getTripDateFormat(startDate)} • ${getDaysDifference(
                  startDate,
                  endDate,
                )} days`}
              </Text>
            </View>
            <View className="flex-row">
              <View
                testID="travel_size"
                className=" mr-3 flex-row items-center"
              >
                {travelSizeIcon[travelSize]}
                <Text className="pl-2 text-center text-base font-normal text-gray-600">
                  {`${travelSize} •`}
                </Text>
              </View>
              <Text className="-ml-1.5 text-center text-base font-normal text-gray-600">
                {`₱${new Intl.NumberFormat().format(budget)}`}
              </Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}

const travelSizeIcon: Record<string, any> = {
  Solo: <AntDesign name="user" size={15} />,
  Couple: <AntDesign name="hearto" size={15} />,
  Family: <AntDesign name="home" size={15} />,
  Group: <AntDesign name="team" size={15} />,
};
