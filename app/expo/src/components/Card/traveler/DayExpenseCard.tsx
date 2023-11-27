import { Dimensions, Text, View } from 'react-native';

import { amountFormatter } from '~/utils/utils';
import Accommodation from '../../../../assets/images/accommodation.svg';
import Attraction from '../../../../assets/images/attraction.svg';
import Food from '../../../../assets/images/food.svg';
import Transportation from '../../../../assets/images/transportation.svg';

interface DayExpenseCardProps {
  accommodationCost: number;
  attractionCost: number;
  foodCost: string;
  transportationCost: number;
  totalCost: number;
  travelerCount: number;
}

interface DayExpenseTextProps {
  value: string;
}

export default function DayExpenseCard({
  accommodationCost,
  attractionCost,
  foodCost,
  transportationCost,
  totalCost,
}: DayExpenseCardProps) {
  const formatCurrency = (amount: number): string =>
    `₱${amountFormatter(amount)}`;

  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      className="ml-2 mt-5 h-[70] rounded-2xl bg-pink-100 p-2"
      style={{ width: screenWidth / 1.15 }}
    >
      <View className="flex-row ">
        <Text className="m-1 font-poppins text-base text-gray-500">
          Day Expenses
        </Text>
        <View className="absolute left-[190] flex-row items-center ">
          <Text className="m-1 font-poppins-medium text-base text-[#F65A82]">
            Total:
          </Text>
          <Text className="font-poppins-medium text-base font-medium text-[#F65A82]">
            {formatCurrency(totalCost)}
          </Text>
        </View>
      </View>
      <View className="flex-row items-center">
        <Accommodation height={18} width={18} style={{ marginLeft: 3 }} />
        <DayExpenseText value={formatCurrency(accommodationCost)} />
        <Attraction height={18} width={18} />
        <DayExpenseText value={formatCurrency(attractionCost)} />
        <Food height={18} width={18} />
        <DayExpenseText value={foodCost} />
        <Transportation height={18} width={18} />
        <DayExpenseText value={formatCurrency(transportationCost)} />
      </View>
    </View>
  );
}

const DayExpenseText = ({ value }: DayExpenseTextProps) => {
  return (
    <Text className=" mx-1.5 font-poppins text-sm text-gray-500 ">{value}</Text>
  );
};
