import type { ReactNode } from 'react';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

import TripMenuItem from './TripMenuItem';

interface TripMenuListProps {
  onCloseModal: () => void;
  item?: TripMenu;
}

function TripMenuList({ onCloseModal }: TripMenuListProps) {
  const [tripMenu] = useState<TripMenu[]>(tripMenus);

  return (
    <FlatList
      data={tripMenu}
      renderItem={({ item }) => (
        <TripMenuItem onCloseModal={onCloseModal} item={item} />
      )}
      scrollEnabled={false}
    />
  );
}

interface TripMenu {
  icon: ReactNode;
  title: string;
  color: string;
}

const tripMenus: TripMenu[] = [
  {
    icon: (
      <Ionicons name="information-circle-outline" color={'#403f3f'} size={26} />
    ),
    title: 'View trip details',
    color: '#403f3f',
  },
  {
    icon: <Ionicons name="share-outline" color={'#403f3f'} size={24} />,
    title: 'Share trip',
    color: '#403f3f',
  },
  {
    icon: <Feather name="repeat" color={'#403f3f'} size={21.5} />,
    title: 'Regenerate trip',
    color: '#403f3f',
  },
  {
    icon: <AntDesign name="delete" color={'#FB2E53'} size={22} />,
    title: 'Delete trip',
    color: '#FB2E53',
  },
];

export default TripMenuList;
