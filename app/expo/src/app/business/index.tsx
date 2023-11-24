import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from 'expo-router';
import { useQuery } from '@apollo/client';
import { supabase } from 'config/initSupabase';

import AbsoluteButton from '~/components/Button/AbsoluteButton';
import BusinessCard from '~/components/Card/owner/BusinessCard';
import SearchBar from '~/components/SearchBar/SearchBar';
import { GetBusinessListDocument } from '~/graphql/generated';

const BusinessListScreen = () => {
  const { loading, error, data } = useQuery(GetBusinessListDocument, {
    variables: {
      placeId: 'ChIJafobTxjlrjMRmv5QKj6xO4o', // ${businessIndex} Use the index to fetch business data
    },
  });

  const handleLogout = async () => {
    return await supabase.auth.signOut();
  };

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (loading) {
    return <Text>Loading...</Text>;
  }

  // if(!loading && data?.place.length < 0) {
  //   return <Text>No businesses found for index</Text>
  // }

  return (
    <View style={styles.container}>
      <SearchBar searchTitle={'Search Listing'} />
      {/* <TextInput
        style={styles.input}
        onChangeText={(text) => setBusinessIndex(text)}
        value={businessIndex}
        placeholder="Enter business index"
      />
      <Button title="Search" onPress={handleSearch} /> */}

      {data &&
        [data.place].map((business, index) => (
          <BusinessCard
            key={index}
            businessName={business.name}
            businessImages={business.images}
            businessAddress={business.address}
            onPress={() => {
              router.push(`/business/profile/${business.id}`);
            }}
          />
        ))}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    alignItems: 'center',
    backgroundColor: 'white',
  },
});

export default BusinessListScreen;
