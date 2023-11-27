import { useContext, type ReactNode } from 'react';
import { FlatList } from 'react-native';
import { router } from 'expo-router';
import { useMutation } from '@apollo/client';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

import { AuthContext } from '~/context/AuthProvider';
import { DeleteTripDocument, GetTripsDocument } from '~/graphql/generated';
import { confirmationAlert } from '~/utils/utils';
import TripMenuItem from './TripMenuItem';

interface TripMenu {
  icon: ReactNode;
  title: string;
  color: string;
  onClick: () => void;
}

interface TripMenuListProps {
  id: number;
  onModalClose: () => void;
}

function TripMenuList({ onModalClose, id }: TripMenuListProps) {
  const { user } = useContext(AuthContext);

  const [deleteTrip] = useMutation(DeleteTripDocument, {
    variables: {
      tripId: id,
    },
  });

  const handleViewItineraryDetials = () => {
    router.push(`/traveler/trip/itinerary/${id}`);
  };

  const handleDeleteTrip = async () => {
    await deleteTrip({
      refetchQueries: [
        {
          query: GetTripsDocument,
          variables: {
            userId: user ? user.id : '',
          },
        },
      ],
      onError: (error) => {
        console.log('Error', error.message);
      },
    });
  };

  const showDeleteTripAlert = () => {
    confirmationAlert(
      'Delete trip',
      'Are you sure you want to delete this trip?',
      'Delete',
      'Cancel',
      () => handleDeleteTrip(),
    );
  };

  const tripMenus: TripMenu[] = [
    {
      icon: (
        <Ionicons
          name="information-circle-outline"
          color={'#403f3f'}
          size={26}
        />
      ),
      title: 'View trip details',
      color: '#403f3f',
      onClick: () => handleViewItineraryDetials(),
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
      onClick: () => showDeleteTripAlert(),
    },
  ];

  return (
    <FlatList
      testID="trip-menu-list"
      data={tripMenus}
      renderItem={({ item }) => (
        <TripMenuItem
          onClick={() => {
            onModalClose();
            item.onClick();
          }}
          item={item}
        />
      )}
      scrollEnabled={false}
    />
  );
}

export default TripMenuList;
