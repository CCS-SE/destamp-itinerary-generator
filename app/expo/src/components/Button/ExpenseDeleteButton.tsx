import React from 'react';
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native';

interface ExpenseDeleteButtonProps {
  onPress: () => void;
  isDeleting: boolean;
}
const ExpenseDeleteButton = ({
  onPress,
  isDeleting,
}: ExpenseDeleteButtonProps) => {
  return (
    <View className="mt-1 flex-1 flex-row items-center justify-between">
      <TouchableOpacity
        onPress={onPress}
        className="absolute bottom-0 right-0 top-0 w-16 items-center justify-center rounded-r-md bg-red-500"
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

export default ExpenseDeleteButton;
