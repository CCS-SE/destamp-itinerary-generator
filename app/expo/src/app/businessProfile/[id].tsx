import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { Stack } from 'expo-router';
import { gql, useQuery } from '@apollo/client';

import ContactInformation from '~/components/Card/ContactInfoCard';
import EstablishmentCategory from '~/components/Card/EstablishmentCategoryCard';
import ImageCollections from '~/components/Card/ImageCollections';
import MealPrice from '~/components/Card/MealPrice';
import ProfileDescription from '~/components/Card/ProfileDescriptionCard';
import WorkingHours from '~/components/Card/WorkingHoursCard';
import { GetPlaceQueryDocument } from '~/graphql/generated';

export const GetPlaceQuery = gql(
  `query GetPlaceQuery($placeId: String!) {
  place(placeId: $placeId) {
    name
    description
    contactNumber
    address
    images {
      url
      id
    }
    openingHours {
      id
      openTime
      closeTime
      day
    }
    price
    categories {
      id
      name
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
  }
  }
  `,
);
export default function BusinessProfileScreen() {
  // const { id } = useLocalSearchParams();
  const [businessProfile] = useState('1'); // Initial index
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [businesses, setBusinesses] = useState<any[]>([]);

  const { loading, error, data } = useQuery(GetPlaceQueryDocument, {
    variables: {
      placeId: 'clmoxompn019fv72o09ue5vh8', // ${businessProfile} Use the index to fetch business data
    },
    skip: !businessProfile,
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

  function handleTagPress(params: object): void {
    // You can use the `params` parameter as needed in the future
    console.log('Tag pressed with params:', params);
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
                  description={business.description}
                />
                <ContactInformation
                  contactNumber={business.contactNumber}
                  location={business.address}
                />
                <EstablishmentCategory
                  mainCategory={'test'}
                  tags={[
                    business.categories.name,
                    business.diningAtmospheres.name,
                  ]}
                  onPress={handleTagPress}
                />
                <WorkingHours
                  days={'Monday - Sunday'}
                  hours={['11AM - 12PM']}
                />
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
}

const styles = StyleSheet.create({
  container: {
    margin: 20,
  },
});
