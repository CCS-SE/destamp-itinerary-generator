import React from 'react';
import { StyleSheet, View } from 'react-native';
import { router } from 'expo-router';

import BusinessProfileCard from '~/components/Card/BusinessCard';
import SearchBar from '~/components/SearchBar/SearchBar';

const BusinessListScreen = () => {
  return (
    <View>
      <View style={styles.container}>
        <SearchBar searchTitle={'Search Listing'}></SearchBar>
        <BusinessProfileCard
          businessName={'Teepee'}
          businessAddress={'something'}
          onPress={() => router.push('/businessProfile/1')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
});

export default BusinessListScreen;
