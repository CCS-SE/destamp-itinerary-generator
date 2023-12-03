import React, { useContext, useEffect, useRef, useState } from 'react';
import { Alert, Animated, Dimensions, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Image } from 'expo-image';
import { useMutation } from '@apollo/client';
import { AntDesign } from '@expo/vector-icons';

import GradientButton from '~/components/Button/GradientButton';
import FancyModal from '~/components/Modal/FancyModal';
import { AuthContext } from '~/context/AuthProvider';
import {
  ClaimStampDocument,
  GetTripsDocument,
  GetUserInfoDocument,
} from '~/graphql/generated';

interface ClaimStampCardProps {
  id: number;
  url: string;
  title: string;
}

function ClaimStampCard({ id, url, title }: ClaimStampCardProps) {
  const { user } = useContext(AuthContext);

  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const onModalClose = () => {
    setIsVisible(false);
  };

  const [claimStamp] = useMutation(ClaimStampDocument);

  const handleClaimStamp = async () => {
    setIsSubmitting(true);
    await claimStamp({
      variables: {
        stampId: id,
        userId: user ? user.id : '',
      },
      onCompleted: () => {
        setIsSubmitting(false);
        onModalClose();
      },
      onError: (err) => {
        Alert.alert('Error', err.message);
        console.log('Error', err.message);
        setIsSubmitting(false);
      },
      refetchQueries: [
        {
          query: GetTripsDocument,
          variables: {
            userId: user ? user.id : '',
            stampId: id,
          },
        },
        {
          query: GetUserInfoDocument,
          variables: {
            userId: user ? user.id : '',
          },
        },
      ],
    });
  };

  const cardWidth = Dimensions.get('window').width * 0.9;

  const animatedValue = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: -1,
          duration: 120,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 120,
          useNativeDriver: true,
        }),
      ]),
    ).start();
  }, []);

  const translateXAnimatedStyle = {
    transform: [
      {
        translateX: animatedValue.interpolate({
          inputRange: [-1, 1],
          outputRange: [-1, 1],
        }),
      },
      {
        rotate: animatedValue.interpolate({
          inputRange: [-1, 1],
          outputRange: ['-8deg', '8deg'],
        }),
      },
    ],
  };

  return (
    <View className="mt-3 self-center">
      <View
        className="mb-3.5 h-[270] flex-row items-center rounded-2xl bg-gray-50 p-3 shadow-md"
        style={{ width: cardWidth }}
      >
        <View className="w-1/3">
          <Animated.View style={translateXAnimatedStyle}>
            <Image
              testID="claim-stamp-img"
              source={url}
              className="ml-7 mt-2 h-32 w-32 self-center"
            ></Image>
          </Animated.View>
        </View>
        <View className="ml-5 w-2/3 items-center">
          <Text className="mt-0.5 px-4 text-center font-poppins-semibold text-lg text-orange-400">
            You've reached the end of your trip!
          </Text>
          <Text className="mt-2 px-4 text-center font-poppins text-xs text-gray-600">
            How about claiming a stamp to remember this adventure?
          </Text>
          <TouchableOpacity
            className="mt-5 w-28 rounded-xl bg-orange-400 p-1.5"
            activeOpacity={0.9}
            onPress={() => setIsVisible(true)}
          >
            <Text className="text-center font-poppins-medium text-white">
              Claim
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FancyModal isVisible={isVisible}>
        <AntDesign
          name="closecircleo"
          size={24}
          color="#A29E9E"
          style={{ alignSelf: 'flex-end' }}
          onPress={onModalClose}
        />
        <Text className="mt-3 p-3 text-center font-poppins text-base text-gray-500">
          You are about to claim the City Explorer stamp for {title}. ✨
        </Text>
        <Image
          source={{ uri: url || '' }}
          className=" my-5 h-32 w-32 self-center rounded-md"
        />
        <Text className=" px-5 text-center font-poppins text-[9px] text-gray-500">
          You can only claim one stamp per destination. If there are multiple
          trips to Iloilo City, you can only claim one stamp for Iloilo City.
        </Text>
        <GradientButton
          isSubmitting={isSubmitting}
          onPress={handleClaimStamp}
          title="Claim"
          width={0.6}
        />
      </FancyModal>
    </View>
  );
}

export default ClaimStampCard;
