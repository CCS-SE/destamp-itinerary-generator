import { ReactNode } from 'react';
import { Text, TouchableOpacity, View, ViewProps } from 'react-native';
import { useRouter } from 'expo-router';

import { ExpenseCategory, TravelSize } from '~/graphql/generated';
import Accommodation from '../../../assets/images/accommodation-field.svg';
import Food from '../../../assets/images/food-field.svg';
import Transpo from '../../../assets/images/transpo-field.svg';

interface ReviewCardProps extends ViewProps {
  icon: ReactNode;
  title: string;
  groupCount?: string;
  adultCount?: string;
  childCount?: string;
  travelGroup?: string;
  budgetInclusion?: string;
  isEditabble?: boolean;
  isTravelSize?: boolean;
  section: string;
}

export default function ReviewCard({
  icon,
  title,
  budgetInclusion,
  travelGroup,
  adultCount,
  childCount,
  groupCount,
  isTravelSize,
  isEditabble,
  section,
  ...viewProps
}: ReviewCardProps) {
  const router = useRouter();

  const travelerCount = {
    [TravelSize.Solo]: 1,
    [TravelSize.Couple]: 2,
    [TravelSize.Family]:
      parseInt(adultCount ? adultCount : '0') +
      parseInt(childCount ? childCount : '0'),
    [TravelSize.Group]: groupCount,
  };

  const handleEditHandler = (section: string) => {
    router.push({
      pathname: '/trip/create',
      params: {
        section: section,
      },
    });
  };

  return (
    <View
      className="my-1.5 h-14 w-[370] flex-row items-center rounded-xl bg-gray-50 p-4 shadow-sm"
      {...viewProps}
    >
      {icon}
      <Text className="ml-5 font-poppins  text-lg text-gray-600">
        {!isTravelSize
          ? title
          : `${title} (${travelerCount[travelGroup as TravelSize]})`}
      </Text>
      {budgetInclusion ? (
        budgetInclusion.split(',').map((inclusion, i) => (
          <View key={i} className="left-2 ml-2 flex-row">
            {budgetInclusions[inclusion as unknown as ExpenseCategory]}
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
          <Text className=" font-poppins-medium text-lg text-orange-400">
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
