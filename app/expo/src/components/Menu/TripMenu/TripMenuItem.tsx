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
      activeOpacity={0.8}
      onPress={() => {
        onCloseModal();
      }}
    >
      <View className="p-4 justify-start items-start">
        <View className="flex-row items-center p-1">
          {item?.icon}
          <Text style={{ color: item?.color }} className="ml-5 text-lg">
            {item?.title}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TripMenuItem;
