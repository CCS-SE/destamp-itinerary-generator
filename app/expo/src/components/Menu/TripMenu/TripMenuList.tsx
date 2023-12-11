import { useContext, type ReactNode } from 'react';
import { FlatList, ToastAndroid } from 'react-native';
import { router } from 'expo-router';
import { useMutation } from '@apollo/client';
import { AntDesign, Feather, FontAwesome5, Ionicons } from '@expo/vector-icons';

import { AuthContext } from '~/context/AuthProvider';
import {
  DeleteTripDocument,
  GetTripItineraryDocument,
  GetTripsDocument,
  RegenerateTripDocument,
} from '~/graphql/generated';
import { confirmationAlert } from '~/utils/utils';
import TripMenuItem from './TripMenuItem';

interface TripMenu {
  icon: ReactNode;
  title: string;
  color: string;
  isPremium?: boolean;
  premiumIcon?: ReactNode;
  onClick: () => void;
}

interface TripMenuListProps {
  id: number;
  isPremium: boolean;
  setRegenerating: React.Dispatch<React.SetStateAction<boolean>>;
  setDeleting: React.Dispatch<React.SetStateAction<boolean>>;
  onModalClose: () => void;
}

function TripMenuList({
  onModalClose,
  id,
  isPremium,
  setDeleting,
  setRegenerating,
}: TripMenuListProps) {
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
    setDeleting(true);
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
        console.log('Error', error);
        setDeleting(false);
        ToastAndroid.show('Failed to delete trip', ToastAndroid.SHORT);
      },
      onCompleted: () => {
        setDeleting(false);
        ToastAndroid.show('Trip deleted successfully', ToastAndroid.SHORT);
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

  const [regenerateTrip] = useMutation(RegenerateTripDocument);

  const handleRegenerateTrip = async () => {
    setRegenerating(true);
    await regenerateTrip({
      variables: {
        regenerateTripId: id,
      },
      refetchQueries: [
        {
          query: GetTripItineraryDocument,
          variables: {
            tripId: id,
          },
        },
      ],
      onError: (error) => {
        console.log('Error', error.message);
        ToastAndroid.show('Failed to regenerate trip', ToastAndroid.SHORT);
        setRegenerating(false);
      },
      onCompleted: () => {
        setTimeout(() => {
          ToastAndroid.show(
            'Trip regenerated successfully',
            ToastAndroid.SHORT,
          );
          setRegenerating(false);
        }, 10000);
      },
    });
  };

  const showPremiumFeat = () => {
    onModalClose();
    router.push('/traveler/subscription/');
  };

  const showRegenerateTripAlert = () => {
    confirmationAlert(
      'Regenerate trip',
      'Are you sure you want to regenerate this trip?',
      'Confirm',
      'Cancel',
      () => handleRegenerateTrip(),
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
      icon: <Feather name="repeat" color={'#403f3f'} size={21.5} />,
      title: 'Regenerate trip',
      color: '#403f3f',
      isPremium: isPremium,
      premiumIcon: <FontAwesome5 name="crown" size={18} color="#FECF29" />,
      onClick: () =>
        isPremium ? showRegenerateTripAlert() : showPremiumFeat(),
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
