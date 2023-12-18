import { useContext, type ReactNode } from 'react';
import { FlatList, ToastAndroid } from 'react-native';
import { router } from 'expo-router';
import { useMutation } from '@apollo/client';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';

import { AuthContext } from '~/context/AuthProvider';
import {
  DeletePoiDocument,
  GetBusinessOperatorBusinessDocument,
} from '~/graphql/generated';
import { confirmationAlert } from '~/utils/utils';
import BusinessMenuItem from './BusinessMenuItem';

interface BusinessMenu {
  icon: ReactNode;
  title: string;
  color: string;
  onPress?: () => void;
}

interface BusinessMenuListProps {
  id: string;
  imageList: string[];
  onModalClose: () => void;
}

function BusinessMenuList({
  id,
  imageList,
  onModalClose,
}: BusinessMenuListProps) {
  const { user } = useContext(AuthContext);

  const [deleteBusiness] = useMutation(DeletePoiDocument, {
    variables: {
      poiId: id,
    },
  });

  const handleViewDetails = () => {
    return router.push({
      pathname: `/business/profile/${id}`,
      params: {
        id: id,
        imageList: JSON.stringify(imageList),
      },
    });
  };

  const handleDeleteBusiness = async () => {
    await deleteBusiness({
      refetchQueries: [
        {
          query: GetBusinessOperatorBusinessDocument,
          variables: {
            userId: user ? user.id : '',
          },
        },
      ],
      onCompleted: () => {
        ToastAndroid.show('Business deleted.', ToastAndroid.SHORT);
      },
      onError: (error) => {
        console.log('Error', error.message);
      },
    });
  };

  const showDeleteBusinessAlert = () => {
    confirmationAlert(
      'Delete business',
      'Are you sure you want to delete this business?',
      'Delete',
      'Cancel',
      () => handleDeleteBusiness(),
    );
  };

  const businessMenus: BusinessMenu[] = [
    {
      icon: (
        <Ionicons
          name="information-circle-outline"
          color={'#403f3f'}
          size={26}
        />
      ),
      title: 'View Business Details',
      color: '#727272',
      onPress: handleViewDetails,
    },
    {
      icon: <MaterialIcons name="delete" color={'#FB2E53'} size={24} />,
      title: 'Delete Business',
      color: '#FB2E53',
      onPress: showDeleteBusinessAlert,
    },
  ];

  return (
    <FlatList
      testID="business-menu-list"
      data={businessMenus}
      renderItem={({ item }) => (
        <BusinessMenuItem
          key={item.title}
          onPress={() => {
            onModalClose();
            item.onPress!();
          }}
          item={item}
        />
      )}
      scrollEnabled={false}
    />
  );
}

export default BusinessMenuList;
