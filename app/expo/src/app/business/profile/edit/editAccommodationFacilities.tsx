import React, { useState } from 'react';
import { Alert, Text, ToastAndroid, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Question from '~/components/BusinessOperator/Question';
import GradientButton from '~/components/Button/GradientButton';
import StepperButton from '~/components/Button/StepperButton';
import CustomContainer from '~/components/Container/CustomContainer';
import AccommodationSelection from '~/components/FormField/AccommodationSelection';
import MultiSelection from '~/components/FormField/MultiSelection';
import {
  AccommodationSchema,
  accommodationSchema,
} from '~/components/Forms/schema/addBusinessProfileSchema';
import {
  EditPoiDocument,
  GetBusinessDetailsDocument,
  GetPoiFacilitiesDocument,
} from '~/graphql/generated';

const AccommodationFacilities = () => {
  const { poiId, placeType } = useLocalSearchParams();
  const poiFacilities = useQuery(GetPoiFacilitiesDocument);

  const { error, data } = useQuery(GetBusinessDetailsDocument, {
    variables: {
      poiId: poiId as string,
    },
  });

  if (error) {
    Alert.alert('Error', error.message);
  }

  const [amenities, setAmenities] = useState(
    data?.poi.accommodation?.amenities.map((a) => a.name) || [],
  );
  const [category, setCategory] = useState(
    data?.poi.categories[0] ? data?.poi.categories[0].name : ('' as string),
  );
  const [price, setPrice] = useState(data?.poi.price);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [editPoi] = useMutation(EditPoiDocument);

  const { control, handleSubmit } = useForm<AccommodationSchema>({
    mode: 'onChange',
    resolver: zodResolver(accommodationSchema),
  });

  const onSubmit: SubmitHandler<AccommodationSchema> = async (data) => {
    setIsSubmitting(true);
    if (amenities.length === 0) {
      Alert.alert('Please select at least one amenity.');
      return;
    }

    await editPoi({
      variables: {
        poiId: poiId as string,
        type: placeType as string,
        input: {
          price: price,
          amenities: amenities,
          categories: [category],
        },
      },
      refetchQueries: [
        {
          query: GetBusinessDetailsDocument,
          variables: {
            poiId: poiId as string,
          },
        },
      ],
      onCompleted: () => {
        setTimeout(() => {
          router.push(`/business/profile/${poiId}`);
          setIsSubmitting(false);
          ToastAndroid.show('Successfully edited.', 2000);
        }, 5000);
      },
      onError: (error) => {
        Alert.alert('Error', error.message);
        setIsSubmitting(false);
      },
    });
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <CreateBusinessHeader title={'Edit Business'} />
      <SafeAreaView className="flex-1 ">
        <ScrollView>
          <View style={{ marginHorizontal: 40, alignContent: 'center' }}>
            <Question question={'Select Category'} />
            <View style={{ marginBottom: 30 }}>
              <AccommodationSelection
                onOptionChange={(option) => setCategory(option)}
                initialSelectedOption={category}
              />
            </View>
            <Question question={'Amenities'} />
            <View
              style={{
                marginHorizontal: 10,
                alignContent: 'center',
                marginLeft: -2,
              }}
            >
              <MultiSelection
                onOptionChange={(options) => {
                  setAmenities(options);
                }}
                initialSelectedOptions={[]}
                data={
                  (poiFacilities.data &&
                    poiFacilities.data.amenities.map((amenity) => ({
                      key: amenity.id,
                      value: amenity.name,
                    }))) ||
                  []
                }
                placeholder={'Amenities'}
              />
            </View>
            <Question question={'Room price per night'} />
            <Controller
              control={control}
              name="hotelPrice"
              defaultValue={price}
              render={({
                field: { onChange, onBlur, value },
                fieldState: { error },
              }) => {
                return (
                  <CustomContainer
                    prefix={
                      <Text className="mr-1.5 justify-center text-center font-poppins-medium text-2xl text-orange-500">
                        {'₱'}
                      </Text>
                    }
                    placeholder={''}
                    value={value}
                    onChangeText={(value) => {
                      onChange(value);
                      setPrice(value);
                    }}
                    onBlur={onBlur}
                    errorMessage={error?.message}
                    multiline={true}
                    inputMode="numeric"
                    width={315}
                    maxLength={9}
                  />
                );
              }}
            />
          </View>
        </ScrollView>
        <GradientButton
          onPress={handleSubmit(onSubmit)}
          title="Save"
          isSubmitting={isSubmitting}
        />
      </SafeAreaView>
    </View>
  );
};

export default AccommodationFacilities;
