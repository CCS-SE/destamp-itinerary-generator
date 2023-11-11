import { ReactNode, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AddSpendingForm from '~/components/Forms/AddSpendingForm';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';
import { ExpenseCategory } from '~/graphql/generated';
import { taxisNeeded } from '~/utils/utils';

interface DirectionCardProps {
  icon: ReactNode;
  duration: string;
  distance: string;
  transportationPrice: string;
  isTransportationIncluded: boolean;
  itineraryId: number;
  date: Date;
  categoryType: ExpenseCategory;
  adultCount: number;
  childCount: number;
}

export default function DirectionCard({
  icon,
  duration,
  distance,
  transportationPrice,
  isTransportationIncluded,
  itineraryId,
  date,
  categoryType,
  adultCount,
  childCount,
}: DirectionCardProps) {
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      className="ml-8 mr-2 h-[45] flex-row items-center rounded-xl bg-gray-100 pr-3"
      style={{ width: screenWidth / 1.29 }}
    >
      <View className="mx-2">{icon}</View>
      <View className="flex-1 flex-row items-center justify-between">
        <Text className="mx-2 font-poppins text-base text-gray-400">
          {`${duration} • ${distance}`}
        </Text>
        {isTransportationIncluded ? (
          <View className="mr-3 rounded-md bg-orange-100 px-2">
            <Text className="font-poppins text-base text-orange-600">
              {`₱${transportationPrice}`}
            </Text>
          </View>
        ) : (
          <></>
        )}
      </View>
      {isTransportationIncluded && (
        <TouchableOpacity onPress={() => setAddExpenseModal(true)}>
          <MaterialCommunityIcons name="cash-plus" size={24} color="gray" />
        </TouchableOpacity>
      )}
      <BottomHalfModal
        isVisible={addExpenseModal}
        onClose={() => setAddExpenseModal(false)}
      >
        <AddSpendingForm
          itineraryId={itineraryId}
          closeModal={() => setAddExpenseModal(false)}
          minDate={date}
          maxDate={date}
          amount={(
            parseFloat(transportationPrice) *
            taxisNeeded(adultCount, childCount)
          ).toFixed(2)}
          categoryType={categoryType}
        />
      </BottomHalfModal>
    </View>
  );
}
