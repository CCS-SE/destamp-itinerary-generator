import type { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TripMenu {
  icon: ReactNode;
  title: string;
  color: string;
}

interface TripMenuItemProps {
  onCloseModal: () => void; // function of each menu
  item: TripMenu;
}

function TripMenuItem({ onCloseModal, item }: TripMenuItemProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      onPress={() => {
        onCloseModal();
      }}
    >
      <View testID="trip-menu-item" className="items-start justify-start p-4">
        <View className="flex-row items-center p-1">
          {item?.icon}
          <Text
            testID="trip-menu-item-title"
            style={{ color: item?.color }}
            className="ml-5 text-lg"
          >
            {item?.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TripMenuItem;
