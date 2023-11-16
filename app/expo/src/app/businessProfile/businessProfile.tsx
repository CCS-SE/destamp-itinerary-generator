import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { gql, useQuery } from '@apollo/client';

import ContactInformation from '~/components/Card/owner/ContactInfoCard';
import EstablishmentCategory from '~/components/Card/owner/EstablishmentCategoryCard';
import ImageCollections from '~/components/Card/owner/ImageCollections';
import MealPrice from '~/components/Card/owner/MealPrice';
import ProfileDescription from '~/components/Card/owner/ProfileDescriptionCard';
import WorkingHours from '~/components/Card/owner/WorkingHoursCard';
import { GetBusinessInformationDocument } from '~/graphql/generated';

export const GetBusinessInformationQuery = gql(
  `query GetBusinessInformation($placeId: String!){
    place(placeId: $placeId) {
    name
    address
    contactNumber
    description
    website
    type
    categories {
      id
      name
    }
    price
    images {
      url
    }
    openingHours {
      closeTime
      day
      openTime

    }
    amenities {
      id
      name
    }
    diningAtmospheres {
      id
      name
    }
    diningCuisines {
      id
      name
    }
    diningOfferings {
      id
      name
    }
    diningOptions {
      id
      name
    }
    visitDuration
  }   
  }`,
);

const BusinessProfile = () => {
  const [businessIndex] = useState('1'); // Initial index
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [businesses, setBusinesses] = useState<any[]>([]);

  const { loading, error, data } = useQuery(GetBusinessInformationDocument, {
    variables: {
      placeId: 'ChIJafobTxjlrjMRmv5QKj6xO4o', // ${businessIndex} Use the index to fetch business data
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

  if (loading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error.message}</Text>;
  }

  return (
    <View>
      <Stack.Screen options={{ title: 'Business Profile' }} />
      <ScrollView>
        <View style={styles.container}>
          {businesses.length > 0 ? (
            businesses.map((business, index) => (
              <>
                <ProfileDescription
                  key={index}
                  businessName={business.name}
                  businessAddress={business.address}
                  description={business.description}
                />
                <ContactInformation
                  key={index}
                  contactNumber={business.contactNumber}
                  website={business.website}
                />
                <EstablishmentCategory
                  type={business.type}
                  mainCategory={business.categories[0].name}
                  tags={business.categories.map(
                    (category: { name: string }) => category.name,
                  )}
                  // onPress={handleTagPress}
                />
                <WorkingHours openingHours={business.openingHours} />

                <ImageCollections key="images" images={business.images} />
                <MealPrice price={business.price} />
              </>
            ))
          ) : (
            <Text>No businesses found</Text>
          )}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});

export default BusinessProfile;
