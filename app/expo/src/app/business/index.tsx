import React, { useContext } from 'react';
import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { useQuery } from '@apollo/client';
import { supabase } from 'config/initSupabase';

import AbsoluteButton from '~/components/Button/AbsoluteButton';
import BusinessCard from '~/components/Card/owner/BusinessCard';
import BusinessScreenSkeleton from '~/components/Skeleton/BusinessListSkeleton';
import { AuthContext } from '~/context/AuthProvider';
import { GetBusinessesDocument } from '~/graphql/generated';

const BusinessListScreen = () => {
  const { user } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GetBusinessesDocument, {
    variables: {
      userId: user ? user.id : '',
    },
  });

  const handleLogout = async () => {
    // added temp logout button
    return await supabase.auth.signOut();
  };

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (loading && !data) {
    return (
      <View
        className="flex-1 items-center bg-white"
        testID="my-business-loading"
      >
        <BusinessScreenSkeleton />
      </View>
    );
  }

  if (!loading && data && data.pois.length <= 0) {
    return (
      <Text className="font-poppins text-base text-gray-500">
        Discover and claim your business. Take control of your business profile.
      </Text>
    );
  }

  return (
    <View className="flex-1 items-center bg-white">
      {data && (
        <FlatList
          testID="my-business-list"
          data={data.pois}
          renderItem={({ item }) => (
            <BusinessCard
              businessId={item.id}
              businessName={item.name}
              businessImages={item.images.map((item) => item.image.url)}
              businessAddress={item.address}
            />
          )}
          showsVerticalScrollIndicator={false}
        />
      )}
      <TouchableOpacity onPress={handleLogout}>
        <Text>Logout</Text>
      </TouchableOpacity>
      <AbsoluteButton
        title="+"
        onPress={() => undefined}
        style={{ bottom: 40 }}
      />
    </View>
  );
};

export default BusinessListScreen;
