import { ReactNode } from 'react';
import {
  Dimensions,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
} from 'react-native';
import { useRouter } from 'expo-router';

import { ExpenseCategory, TravelSize } from '~/graphql/generated';
import { Activities } from '~/store/types';
import { separateWords } from '~/utils/utils';
import Accommodation from '../../../../assets/images/accommodation-field.svg';
import Food from '../../../../assets/images/food-field.svg';
import Transpo from '../../../../assets/images/transpo-field.svg';

interface ReviewCardProps extends ViewProps {
  icon?: ReactNode;
  title?: string;
  value?: string;
  groupCount?: number;
  adultCount?: number;
  childCount?: number;
  travelGroup?: string;
  budgetInclusion?: [ExpenseCategory];
  isPreference?: boolean;
  isArray?: boolean;
  amenities?: string[];
  cuisines?: string[];
  activities?: Activities;
  diningStyles?: string[];
  isEditabble?: boolean;
  isTravelSize?: boolean;
  section: string;
}

export default function ReviewCard({
  icon,
  title,
  value,
  budgetInclusion,
  amenities,
  activities,
  cuisines,
  diningStyles,
  travelGroup,
  adultCount,
  childCount,
  groupCount,
  isTravelSize,
  isEditabble,
  isPreference,
  isArray,
  section,
  ...viewProps
}: ReviewCardProps) {
  const router = useRouter();

  const inputWidth = Dimensions.get('window').width * 0.88;

  const travelerCount = {
    [TravelSize.Solo]: adultCount,
    [TravelSize.Couple]: adultCount,
    [TravelSize.Family]: (adultCount || 0) + (childCount || 0),
    [TravelSize.Group]: groupCount,
  };

  const handleEditHandler = (section: string) => {
    if (isPreference || isArray) {
      router.push({
        pathname: '/trip/preference',
        params: {
          section: section,
        },
      });
    } else {
      router.push({
        pathname: '/trip/create',
        params: {
          section: section,
        },
      });
    }
  };

  const displayItems = (items: string[]) => {
    return (
      <View className="mt-2 flex-row flex-wrap">
        {items.map((item, i) => (
          <View
            className="mx-1.5 my-1 flex-row rounded-lg border border-pink-300 p-1"
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

  return isPreference ? (
    <View
      className="my-2 h-auto rounded-xl p-1 "
      {...viewProps}
      style={{ width: inputWidth }}
    >
      <View className="flex-row items-center">
        <Text className="font-poppins text-gray-500">{title}</Text>
        <TouchableOpacity
          onPress={() => handleEditHandler(section)}
          activeOpacity={0.8}
          className="absolute right-3"
        >
          <Text className="font-poppins-medium text-base text-orange-400">
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="font-poppins-medium text-lg text-gray-500">{value}</Text>
    </View>
  ) : isArray ? (
    <View
      className="my-2 h-auto rounded-xl p-1 "
      {...viewProps}
      style={{ width: inputWidth }}
    >
      <View className="flex-row items-center">
        <Text className="font-poppins text-gray-500">{title}</Text>
        <TouchableOpacity
          onPress={() => handleEditHandler(section)}
          activeOpacity={0.8}
          className="absolute right-3"
        >
          <Text className="font-poppins-medium text-base text-orange-400">
            Edit
          </Text>
        </TouchableOpacity>
      </View>
      {amenities ? displayItems(amenities) : <></>}
      {activities ? (
        <View className="mt-2 flex-row flex-wrap">
          {Object.entries(activities).map((activity, i) => (
            <View
              className="mx-1.5 my-1 flex-row rounded-lg border border-pink-300 p-1"
              key={i}
            >
              <Text className="font-poppins-medium text-[12px] text-pink-600 ">
                {separateWords(activity[0])}
              </Text>
            </View>
          ))}
        </View>
      ) : (
        <></>
      )}
      {diningStyles ? displayItems(diningStyles) : <></>}
      {cuisines ? displayItems(cuisines) : <></>}
    </View>
  ) : (
    <View
      className="my-2 h-14 flex-row items-center rounded-xl bg-gray-50 p-4 shadow-sm"
      {...viewProps}
      style={{ width: inputWidth }}
    >
      {icon}
      <Text
        className="ml-4 mr-16 text-ellipsis font-poppins text-lg text-gray-600"
        numberOfLines={1}
      >
        {!isTravelSize
          ? title
          : `${title} (${travelerCount[travelGroup as TravelSize]})`}
      </Text>
      {budgetInclusion ? (
        budgetInclusion.map((inclusion, i) => (
          <View key={i} className="left-2 ml-2 flex-row">
            {budgetInclusions[inclusion]}
          </View>
        ))
      ) : (
        <></>
      )}
      {isEditabble ? (
        <TouchableOpacity
          onPress={() => handleEditHandler(section)}
          activeOpacity={0.8}
          className="absolute right-3"
        >
          <Text className="font-poppins-medium text-base text-orange-400">
            Edit
          </Text>
        </TouchableOpacity>
      ) : (
        <></>
      )}
    </View>
  );
}

const budgetInclusions = {
  [ExpenseCategory.Accommodation]: <Accommodation height={18} width={18} />,
  [ExpenseCategory.Food]: <Food height={22} width={22} />,
  [ExpenseCategory.Transportation]: <Transpo height={17} width={17} />,
  [ExpenseCategory.Activity]: <></>,
  [ExpenseCategory.Other]: <></>,
  [ExpenseCategory.Sightseeing]: <></>,
  [ExpenseCategory.Shopping]: <></>,
};
