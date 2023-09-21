import { Text, View } from 'react-native';

import { amountFormatter } from '~/utils/utils';
import Attraction from '../../../assets/images/attraction.svg';
import Food from '../../../assets/images/food.svg';
import Transportation from '../../../assets/images/transportation.svg';

interface DayExpenseCardProps {
  attractionCost: number;
  foodCost: number;
  transportationCost: number;
  totalCost: number;
}

interface DayExpenseTextProps {
  value: string;
}

export default function DayExpenseCard({
  attractionCost,
  foodCost,
  transportationCost,
  totalCost,
}: DayExpenseCardProps) {
  const formatCurrency = (amount: number): string =>
    `₱${amountFormatter(amount)}`;

  return (
    <View className="mt-5 h-[80] w-[370] rounded-2xl bg-pink-100 p-2">
      <View className="flex-row ">
        <Text className="m-1 font-poppins text-lg text-gray-500">
          Day Expenses
        </Text>
        <Text className="absolute left-[270] m-1  font-poppins-medium text-lg text-[#F65A82]">
          Total
        </Text>
      </View>
      <View className="flex-row items-center">
        <Attraction height={25} width={21} style={{ marginLeft: 3 }} />
        <DayExpenseText value={formatCurrency(attractionCost)} />
        <Food height={25} width={21} />
        <DayExpenseText value={formatCurrency(foodCost)} />
        <Transportation height={25} width={21} />
        <DayExpenseText value={formatCurrency(transportationCost)} />
        <Text className="absolute left-[275] font-poppins-medium text-lg font-medium text-[#F65A82]">
          {formatCurrency(totalCost)}
        </Text>
      </View>
    </View>
  );
}

const DayExpenseText = ({ value }: DayExpenseTextProps) => {
  return (
    <Text className=" mx-2.5 font-poppins text-base text-gray-500 ">
      {value}
    </Text>
  );
};
