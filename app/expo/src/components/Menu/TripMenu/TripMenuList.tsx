import { useContext, type ReactNode } from 'react';
import { FlatList } from 'react-native';
import { router } from 'expo-router';
import { useMutation } from '@apollo/client';
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';

import { AuthContext } from '~/context/AuthProvider';
import {
  DeleteTripDocument,
  GetTravelerTripsDocument,
} from '~/graphql/generated';
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
  const { session } = useContext(AuthContext);

  const [deleteTrip] = useMutation(DeleteTripDocument, {
    variables: {
      deleteTripId: id,
    },
  });

  const handleViewItineraryDetials = () => {
    router.push(`/itinerary/${id}`);
  };

  const handleDeleteTrip = async () => {
    await deleteTrip({
      onError: (error) => {
        console.log('Error', error.message);
      },
      update: (cache, { data }) => {
        const existingTrips = cache.readQuery({
          query: GetTravelerTripsDocument,
          variables: {
            userId: session ? session.user.id : '',
          },
        });

        const updatedTrips = existingTrips
          ? existingTrips.travelerTrips.filter(
              (trip) => trip.id !== data?.deleteTrip.id,
            )
          : [];

        cache.writeQuery({
          query: GetTravelerTripsDocument,
          variables: {
            userId: session ? session.user.id : '',
          },
          data: { travelerTrips: updatedTrips },
        });
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
            item.onClick();
            onModalClose();
          }}
          item={item}
        />
      )}
      scrollEnabled={false}
    />
  );
}

export default TripMenuList;
