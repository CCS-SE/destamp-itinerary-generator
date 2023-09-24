import React from 'react';
import { ScrollView, View } from 'react-native';

import ContactInformation from '~/components/Card/ContactInfoCard';
import EstablishmentCategory from '~/components/Card/EstablishmentCategoryCard';
import ImageCollections from '~/components/Card/ImageCollections';
import MealPrice from '~/components/Card/MealPrice';
import ProfileDescription from '~/components/Card/ProfileDescriptionCard';
import WorkingHours from '~/components/Card/WorkingHoursCard';

const BusinessProfile = () => {
  const handleTagPress = () => {};
  return (
    <ScrollView>
      <View>
        <ProfileDescription
          description={
            'Explore your adventurous side by making your own unique snack combo with the variety.'
          }
        ></ProfileDescription>
        <ContactInformation
          contactNumber={9496651088}
          emailAddress={'tepee@gmail.com'}
        ></ContactInformation>
        <EstablishmentCategory
          mainCategory={'Food Establishment'}
          tags={['sample', 'sample2']}
          onPress={handleTagPress}
        ></EstablishmentCategory>
        <WorkingHours
          days={'Monday - Sunday'}
          hours={['11AM - 12PM']}
        ></WorkingHours>
        <ImageCollections
          images={[
            require('../../../assets/samplePhotos/Teepee.png'),
            require('../../../assets/samplePhotos/images.png'),
          ]}
        ></ImageCollections>
        <MealPrice minPrice={60} maxPrice={200}></MealPrice>
      </View>
    </ScrollView>
  );
};

export default BusinessProfile;
