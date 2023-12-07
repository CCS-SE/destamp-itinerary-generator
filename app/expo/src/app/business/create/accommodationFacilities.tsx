import React, { useEffect, useState } from 'react';
import { Alert, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuery } from '@apollo/client';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import PriceRange from '~/components/BusinessOperator/PriceRange/PriceRange';
import Question from '~/components/BusinessOperator/Question';
import BasicButton from '~/components/Button/BasicButton';
import AccommodationSelection from '~/components/FormField/AccommodationSelection';
import AmenitiesSelection from '~/components/FormField/AmenitiesSelection';
import { GetPoiFeaturesDocument } from '~/graphql/generated';
import useFormstore from '~/store/useFormStore';

const AccommodationFacilities = () => {
  const [selectedAccommodation, setSelectedAccommodation] =
    useState<string>('');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);

  const [minPrice] = useState<number>(0);
  const [maxPrice] = useState<number>(0);

  const handleSave = () => {
    console.log('minPrice:', minPrice);
    console.log('maxPrice:', maxPrice);

    if (!selectedAccommodation && selectedAmenities.length === 0) {
      Alert.alert(
        'Incomplete',
        'Please select at least one option for Accommodation or Amenities.',
      );
    } else if (minPrice > maxPrice) {
      console.log('Invalid Price Range');
      window.alert(
        'Invalid Price Range: Minimum price should be lower than the maximum price.',
      );
    } else {
      console.log(amenities);
      router.push('/business/create/uploadPhotos');
    }
  };

  const [amenities, setAmenities] = useState<{ key: number; value: string }[]>(
    [],
  );

  const { preferenceData } = useFormstore();

  const { data } = useQuery(GetPoiFeaturesDocument);
  useEffect(() => {
    if (data) {
      setAmenities(
        data.amenities.map((amenity) => ({
          key: amenity.id,
          value: amenity.name,
        })),
      );
    }
  }, [data]);

  return (
    <View style={{ backgroundColor: 'white', flex: 1 }}>
      <CreateBusinessHeader title={'Accommodation'} />
      <SafeAreaView>
        <View
          style={{ marginLeft: 25, marginRight: 10, alignContent: 'center' }}
        >
          <ScrollView>
            <Question question={'Select Category'} />
            <View style={{ alignItems: 'center', marginBottom: 30 }}>
              <AccommodationSelection
                onOptionChange={(option) => setSelectedAccommodation(option)}
                initialSelectedOption={selectedAccommodation}
              />
            </View>

            <Question question={'Amenities'} />
            <View style={{ justifyContent: 'center', margin: 10 }}>
              <AmenitiesSelection
                onOptionChange={(options) => setSelectedAmenities(options)}
                initialSelectedOptions={preferenceData.amenities}
                data={[]}
              />
            </View>
            <PriceRange title={'Average price of rooms'} />

            <BasicButton title={'Save'} onPress={handleSave} />
          </ScrollView>
        </View>
      </SafeAreaView>
    </View>
  );
};

export default AccommodationFacilities;
