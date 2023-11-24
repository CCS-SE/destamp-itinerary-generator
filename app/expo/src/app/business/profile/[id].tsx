import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { useQuery } from '@apollo/client';

import ContactInformation from '~/components/Card/owner/ContactInfoCard';
import EstablishmentCategory from '~/components/Card/owner/EstablishmentCategoryCard';
import ImageCollections from '~/components/Card/owner/ImageCollections';
import MealPrice from '~/components/Card/owner/MealPrice';
import ProfileDescription from '~/components/Card/owner/ProfileDescriptionCard';
import WorkingHours from '~/components/Card/owner/WorkingHoursCard';
import { GetBusinessInformationDocument } from '~/graphql/generated';

const BusinessProfile = () => {
  const { loading, error, data } = useQuery(GetBusinessInformationDocument, {
    variables: {
      placeId: 'ChIJafobTxjlrjMRmv5QKj6xO4o', // ${businessIndex} Use the index to fetch business data
    },
  });

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  if (loading) {
    // create loading skeleton here
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Business Profile',
          headerBackTitleVisible: false,
          headerTitleStyle: {
            fontSize: 23,
            fontFamily: 'Poppins',
          },
        }}
      />
      <ScrollView>
        {data && (
          <View className="items-center">
            <ProfileDescription
              businessName={data.place.name}
              businessAddress={data.place.address}
              description={data.place.description || ''}
            />
            <ContactInformation
              contactNumber={data.place.contactNumber || ''}
            />
            <EstablishmentCategory
              type={data.place.type}
              mainCategory={data.place.categories[0]?.name}
              tags={data.place.categories.map(
                (category: { name: string }) => category.name,
              )}
            />
            <WorkingHours openingHours={data.place.openingHours} />
            <ImageCollections key="images" images={data.place.images} />
            <MealPrice price={data.place.price} />
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 2,
    backgroundColor: 'white',
  },
});

export default BusinessProfile;
