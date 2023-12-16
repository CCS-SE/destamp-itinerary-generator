import React, { useState } from 'react';
import { Alert, Text, ToastAndroid, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, set, SubmitHandler, useForm } from 'react-hook-form';

import AtmosphereSelection from '~/components/BusinessOperator/EstablishmentTypes/AtmosphereSelection';
import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Question from '~/components/BusinessOperator/Question';
import GradientButton from '~/components/Button/GradientButton';
import CustomContainer from '~/components/Container/CustomContainer';
import MultiSelection from '~/components/FormField/MultiSelection';
import {
  RestaurantSchema,
  restaurantSchema,
} from '~/components/Forms/schema/addBusinessProfileSchema';
import {
  EditPoiDocument,
  GetBusinessDetailsDocument,
  GetPoiFacilitiesDocument,
} from '~/graphql/generated';

const RestaurantFacilities = () => {
  const { poiId, placeType } = useLocalSearchParams();

  const { error, data } = useQuery(GetBusinessDetailsDocument, {
    variables: {
      poiId: poiId as string,
    },
  });

  if (error) {
    Alert.alert('Error', error.message);
  }

  const [chosenCategories, setChosenCategories] = useState(
    data?.poi.categories.map((c) => c.name) as string[],
  );
  const [minPrice, setMinPrice] = useState(
    data?.poi.price.split('-')[0] as string,
  );
  const [maxPrice, setMaxPrice] = useState(
    data?.poi.price.split('-')[1] as string,
  );
  const [atmospheres, setAtmospheres] = useState(
    data?.poi.restaurant?.atmospheres as string[],
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const poiFacilities = useQuery(GetPoiFacilitiesDocument);

  const { control, handleSubmit } = useForm<RestaurantSchema>({
    mode: 'onChange',
    resolver: zodResolver(restaurantSchema),
  });

  const [editPoi] = useMutation(EditPoiDocument);

  const onSubmit: SubmitHandler<RestaurantSchema> = async () => {
    setIsSubmitting(true);
    if (chosenCategories.length === 0) {
      Alert.alert('Please select atleast one category.');
      setIsSubmitting(false);
      return;
    }
    if (atmospheres.length === 0) {
      Alert.alert('Please select atleast one dining atmosphere.');
      setIsSubmitting(false);
      return;
    }
    await editPoi({
      variables: {
        poiId: poiId as string,
        type: placeType as string,
        input: {
          categories: chosenCategories,
          price: `${minPrice}-${maxPrice}`,
          atmospheres: atmospheres,
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
      onError: (err) => {
        Alert.alert('Error', err.message);
        setIsSubmitting(false);
      },
    });
  };
  const categories = poiFacilities.data?.restaurantCategoires.map((c) => ({
    key: c.id,
    value: c.name,
  }));

  return (
    <View style={{ flex: 1, alignItems: 'center', backgroundColor: 'white' }}>
      <CreateBusinessHeader title={'Edit Business'} />
      <SafeAreaView className="flex-1">
        <View className="mx-7">
          <Question question={'Category'} />
          <MultiSelection
            placeholder="Categories"
            data={(poiFacilities.data && categories) || []}
            initialSelectedOptions={[]}
            onOptionChange={(options) => setChosenCategories(options)}
          />
          <View className="mt-7">
            <Question question={'Atmosphere'} />
            <AtmosphereSelection
              onOptionChange={(options) => setAtmospheres(options)}
              initialSelectedOptions={atmospheres}
            />
          </View>
          <Question question={'Meal price range per person'} />
          <View className="flex-row justify-between">
            <Controller
              control={control}
              name="minPrice"
              defaultValue={minPrice}
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
                    placeholder={'Min price'}
                    value={value}
                    onChangeText={(value) => {
                      onChange(value);
                      setMinPrice(value);
                    }}
                    onBlur={onBlur}
                    errorMessage={error?.message}
                    multiline={true}
                    inputMode="numeric"
                    width={150}
                    errorWidth={160}
                    maxLength={9}
                  />
                );
              }}
            />
            <Controller
              control={control}
              name="maxPrice"
              defaultValue={maxPrice}
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
                    placeholder={'Max price'}
                    value={value}
                    onChangeText={(value) => {
                      onChange(value);
                      setMaxPrice(value);
                    }}
                    onBlur={onBlur}
                    errorMessage={error?.message}
                    multiline={true}
                    inputMode="numeric"
                    width={150}
                    errorWidth={160}
                  />
                );
              }}
            />
          </View>
        </View>
      </SafeAreaView>
      <GradientButton
        title="Save"
        onPress={handleSubmit(onSubmit)}
        isSubmitting={isSubmitting}
      />
    </View>
  );
};

export default RestaurantFacilities;
