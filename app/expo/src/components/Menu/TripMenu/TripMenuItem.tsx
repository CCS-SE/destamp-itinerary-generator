import type { ReactNode } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

interface TripMenu {
  icon: ReactNode;
  title: string;
  color: string;
  isPremium?: boolean;
  premiumIcon?: ReactNode;
}

interface TripMenuItemProps {
  onClick: () => void;
  item: TripMenu;
}

function TripMenuItem({ onClick, item }: TripMenuItemProps) {
  return (
    <TouchableOpacity
      accessibilityRole="button"
      activeOpacity={0.8}
      onPress={onClick}
    >
      <View
        testID={`trip-menu-${item.title}`}
        className="items-start justify-start p-4"
      >
        <View className="flex-row items-center p-1">
          {item?.icon}
          <Text
            testID="trip-menu-item-title"
            style={{ color: item?.color }}
            className="ml-5 font-poppins text-lg"
          >
            {item?.title}
          </Text>
          <View className="-mt-1 ml-2">
            {!item.isPremium ? item.premiumIcon : null}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default TripMenuItem;
