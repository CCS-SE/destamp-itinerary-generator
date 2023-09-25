import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { gql, useQuery } from '@apollo/client';

import BusinessProfileCard from '~/components/Card/BusinessCard';
import SearchBar from '~/components/SearchBar/SearchBar';
import { GetBusinessQueryDocument } from '~/graphql/generated';

export const GetBusinessListQuery = gql(
  `query GetBusinessQuery($placeId: String!) {
  place(placeId: $placeId) {
    name
    address
  }
}`,
);

const BusinessListScreen = () => {
  const [businessIndex] = useState('1'); // Initial index
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [businesses, setBusinesses] = useState<any[]>([]);

  const { loading, error, data } = useQuery(GetBusinessQueryDocument, {
    variables: {
      placeId: 'clmoxompn019fv72o09ue5vh8', // ${businessIndex} Use the index to fetch business data
    },
    skip: !businessIndex,
  });

  useEffect(() => {
    if (data && data.place) {
      setBusinesses([data.place]);
    } else {
      setBusinesses([]);
    }
  }, [data]);

  // const handleSearch = () => {
  //   // format 'ChIJ2xyP0DblrjMR1WWPScBX8Wc-{index}'
  //   // placeId + businessIndex
  //   setBusinessIndex(businessIndex);
  // };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <SearchBar searchTitle={'Search Listing'} value={businessIndex} />
      <BusinessProfileCard
        businessName={'Teepee'}
        businessAddress={'something'}
        onPress={() => router.push('/businessProfile/1')}
      />
      {/* here */}
      {/* <TextInput
        style={styles.input}
        onChangeText={(text) => setBusinessIndex(text)}
        value={businessIndex}
        placeholder="Enter business index"
      />
      <Button title="Search" onPress={handleSearch} /> */}
      {/* here */}

      {businesses.length > 0 ? (
        businesses.map((business, index) => (
          <BusinessProfileCard
            key={index}
            businessName={business.name}
            businessAddress={business.address}
            onPress={() => {
              router.push(`/businessProfile/${businessIndex}`);
            }}
          />
        ))
      ) : (
        <Text>No businesses found for index {businessIndex}.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  input: {},
});

export default BusinessListScreen;
