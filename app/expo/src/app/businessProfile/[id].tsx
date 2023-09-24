import React from 'react';
import { View } from 'react-native';

import BusinessProfile from '~/screens/BusinessUser/BusinessProfile';

export default function BusinessProfileScreen() {
  return (
    <View>
      <BusinessProfile></BusinessProfile>
    </View>
  );
}
// import { Stack, useLocalSearchParams } from 'expo-router';
// import { gql, useQuery } from '@apollo/client';

// import ContactInformation from '~/components/Card/ContactInfoCard';
// import EstablishmentCategory from '~/components/Card/EstablishmentCategoryCard';
// import ImageCollections from '~/components/Card/ImageCollections';
// import MealPrice from '~/components/Card/MealPrice';
// import ProfileDescription from '~/components/Card/ProfileDescriptionCard';
// import WorkingHours from '~/components/Card/WorkingHoursCard';
// import { GetTravelerItineraryDocument } from '~/graphql/generated';
// // Define the GraphQL query
// export const GetplaceQuery = gql(`
//   query Getplace($placeId: String!) {
//     place(placeId: $placeId) {
//       id
//       name
//       description
//       type
//       address
//       price
//       contactNumber
//       visitDuration
//     }
//   }`
// );

// export default function BusinessProfileScreen() {
//   const { id } = useLocalSearchParams();
//   const handleTagPress = () => {};

//   const { loading, error, data } = useQuery(GetplaceQuery, {
//     variables: {
//       placeId: parseInt(id as string),
//     },
//   });

//   return (
//     <ScrollView>
//       <View style={styles.container}>
//         <Stack.Screen options={{ title: 'Business Profile' }} />
//         {/* Conditionally render components based on loading and error states */}
//         {loading && <Text>Loading...</Text>}
//         {error && <Text>{error.message}</Text>}

//         {/* Check if 'data' exists before accessing its properties */}
//         {data && data.place && (
//           <>
//             <ProfileDescription
//               description={data.place.description || ''}
//             />
//             <ContactInformation
//               contactNumber={data.place.contactNumber || ''}
//               emailAddress={data.place.emailAddress || ''}
//             />
//             {/* <EstablishmentCategory
//               mainCategory={'TEST -- MAKE LIST'}
//               tags={data.place.categories || []}
//               onPress={handleTagPress}
//             />
//             <WorkingHours
//               days={'Monday - Sunday'}
//               hours={['11AM - 12PM']}
//             ></WorkingHours>
//             <ImageCollections
//               images={[
//                 require('../../../assets/samplePhotos/Teepee.png'),
//                 require('../../../assets/samplePhotos/images.png'),
//               ]}
//             ></ImageCollections>
//             <MealPrice minPrice={60} maxPrice={200}></MealPrice> */}
//           </>
//         )}
//       </View>
//     </ScrollView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     margin: 20,
//   },
// });
