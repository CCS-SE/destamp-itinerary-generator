import { ReactNode, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import AddSpendingForm from '~/components/Forms/AddSpendingForm';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';
import { ExpenseCategory } from '~/graphql/generated';

interface DirectionCardProps {
  icon: ReactNode;
  duration: string;
  distance: string;
  transportationPrice: string;
  isTransportationIncluded: boolean;
  tripId: number;
  date: Date;
  categoryType: ExpenseCategory;
}

export default function DirectionCard({
  icon,
  duration,
  distance,
  transportationPrice,
  isTransportationIncluded,
  tripId,
  date,
  categoryType,
}: DirectionCardProps) {
  const [addExpenseModal, setAddExpenseModal] = useState(false);
  const screenWidth = Dimensions.get('window').width;

  return (
    <View
      className="mx-7 h-[45] flex-row items-center rounded-xl bg-gray-100 pr-3"
      style={{ width: screenWidth / 1.31 }}
    >
      <View className="mx-2">{icon}</View>
      <View className="flex-1 flex-row items-center justify-between">
        <Text className="mx-2 font-poppins text-sm text-gray-400">
          {`${duration} • ${distance}`}
        </Text>
        {isTransportationIncluded ? (
          <View className="mr-3 rounded-md bg-orange-100 px-2">
            {transportationPrice !== '0' ? (
              <Text className="font-poppins text-sm text-orange-600">
                {`₱${transportationPrice}`}
              </Text>
            ) : (
              <></>
            )}
          </View>
        ) : (
          <></>
        )}
      </View>
      {isTransportationIncluded && parseFloat(distance) > 1 && (
        <TouchableOpacity onPress={() => setAddExpenseModal(true)}>
          <MaterialCommunityIcons name="cash-plus" size={24} color="#989FB0" />
        </TouchableOpacity>
      )}
      <BottomHalfModal
        isVisible={addExpenseModal}
        onClose={() => setAddExpenseModal(false)}
      >
        <AddSpendingForm
          tripId={tripId}
          closeModal={() => setAddExpenseModal(false)}
          minDate={date}
          maxDate={date}
          amount={parseFloat(transportationPrice).toFixed(2)}
          categoryType={categoryType}
        />
      </BottomHalfModal>
    </View>
  );
}
