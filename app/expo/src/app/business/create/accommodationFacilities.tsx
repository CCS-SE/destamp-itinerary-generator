import React from 'react';
import { Alert, Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Question from '~/components/BusinessOperator/Question';
import StepperButton from '~/components/Button/StepperButton';
import CustomContainer from '~/components/Container/CustomContainer';
import AccommodationSelection from '~/components/FormField/AccommodationSelection';
import MultiSelection from '~/components/FormField/MultiSelection';
import {
  AccommodationSchema,
  accommodationSchema,
} from '~/components/Forms/schema/addBusinessProfileSchema';
import { GetPoiFacilitiesDocument } from '~/graphql/generated';
import addBusinessFormStore from '~/store/addBusinessFormStore';

const AccommodationFacilities = () => {
  const { accommodationFacilities, setData } = addBusinessFormStore();
  const { data } = useQuery(GetPoiFacilitiesDocument);

  const { control, handleSubmit } = useForm<AccommodationSchema>({
    mode: 'onChange',
    resolver: zodResolver(accommodationSchema),
  });

  const onSubmit: SubmitHandler<AccommodationSchema> = async (data) => {
    setData({
      step: 4,
      data: {
        ...accommodationFacilities,
        category: accommodationFacilities.category,
        amenities: accommodationFacilities.amenities,
        price: data.hotelPrice,
      },
    });

    if (accommodationFacilities.amenities.length === 0) {
      Alert.alert('Please select at least one amenity.');
      return;
    }
    router.push('/business/create/businessImages');
  };

  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <CreateBusinessHeader title={'Create Business'} />
      <SafeAreaView className="flex-1 ">
        <ScrollView>
          <View style={{ marginHorizontal: 40, alignContent: 'center' }}>
            <Question question={'Select Category'} />
            <View style={{ marginBottom: 30 }}>
              <AccommodationSelection
                onOptionChange={(option) =>
                  setData({
                    data: { ...accommodationFacilities, category: option },
                    step: 4,
                  })
                }
                initialSelectedOption={accommodationFacilities.category}
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
                onOptionChange={(options) =>
                  setData({
                    step: 4,
                    data: { ...accommodationFacilities, amenities: options },
                  })
                }
                initialSelectedOptions={[]}
                data={
                  (data &&
                    data.amenities.map((amenity) => ({
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
              defaultValue={accommodationFacilities.price}
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
                    onChangeText={onChange}
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
        <StepperButton
          label={'Next'}
          onPress={handleSubmit(onSubmit)}
          className="-top-6"
        />
      </SafeAreaView>
    </View>
  );
};

export default AccommodationFacilities;
