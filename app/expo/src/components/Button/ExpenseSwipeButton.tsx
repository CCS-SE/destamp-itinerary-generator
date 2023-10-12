import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface ExpenseSwipeButtonProps {
  onPressDelete: () => void;
  onPressEdit: () => void;
  isDeleting: boolean;
}
const ExpenseSwipeButton = ({
  onPressDelete,
  onPressEdit,
  isDeleting,
}: ExpenseSwipeButtonProps) => {
  return (
    <View className="mt-1 flex-1 flex-row justify-between pl-16">
      <TouchableOpacity
        onPress={onPressEdit}
        className="absolute bottom-0 right-16 top-0 w-16 items-center justify-center bg-green-500"
      >
        <Text className="text-white">Edit</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={onPressDelete}
        className="absolute bottom-0 right-0 top-0 w-16 items-center justify-center  bg-red-500"
      >
        {isDeleting ? (
          <ActivityIndicator
            testID="gradient-btn-loading"
            size="small"
            color={'white'}
            className="m-1"
          />
        ) : (
          <Text className="text-white">Delete</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default ExpenseSwipeButton;
