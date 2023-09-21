import type { ReactNode } from 'react';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

import TripMenuItem from './TripMenuItem';

interface TripMenuListProps {
  onModalClose: () => void; // function of each menu
}

function TripMenuList({ onModalClose }: TripMenuListProps) {
  const { id } = useLocalSearchParams();

  const [tripMenu] = useState<TripMenu[]>(tripMenus);

  return (
    <FlatList
      testID="trip-menu-list"
      data={tripMenu}
      renderItem={({ item }) => (
        <TripMenuItem
          onClick={() => {
            onModalClose();
            item.onClick!(id);
          }}
          item={item}
        />
      )}
      scrollEnabled={false}
    />
  );
}

interface TripMenu {
  icon: ReactNode;
  title: string;
  color: string;
  onClick: (id: string | string[] | undefined) => void;
}

const tripMenus: TripMenu[] = [
  {
    icon: (
      <Ionicons name="information-circle-outline" color={'#403f3f'} size={26} />
    ),
    title: 'View trip details',
    color: '#403f3f',
    onClick: (id) => router.push(`/itinerary/${id}`),
  },
  {
    icon: <Ionicons name="share-outline" color={'#403f3f'} size={24} />,
    title: 'Share trip',
    color: '#403f3f',
    onClick: () => undefined,
  },
  {
    icon: <Feather name="repeat" color={'#403f3f'} size={21.5} />,
    title: 'Regenerate trip',
    color: '#403f3f',
    onClick: () => undefined,
  },
  {
    icon: <AntDesign name="delete" color={'#FB2E53'} size={22} />,
    title: 'Delete trip',
    color: '#FB2E53',
    onClick: () => undefined,
  },
];

export default TripMenuList;
