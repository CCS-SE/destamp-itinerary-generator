import React, { useState } from 'react';
import { Alert, Dimensions, Text, ToastAndroid, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from '@apollo/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';

import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Question from '~/components/BusinessOperator/Question';
import GradientButton from '~/components/Button/GradientButton';
import CustomContainer from '~/components/Container/CustomContainer';
import MultiSelection from '~/components/FormField/MultiSelection';
import {
  AttractionSchema,
  attractionSchema,
} from '~/components/Forms/schema/addBusinessProfileSchema';
import {
  EditPoiDocument,
  GetBusinessDetailsDocument,
  GetPoiFacilitiesDocument,
} from '~/graphql/generated';

const AttractionFacilities = () => {
  const { poiId, placeType, imageList } = useLocalSearchParams();

  const poiFacilities = useQuery(GetPoiFacilitiesDocument);

  const { error, data } = useQuery(GetBusinessDetailsDocument, {
    variables: {
      poiId: poiId as string,
    },
  });

  if (error) {
    Alert.alert('Error', error.message);
  }

  const [chosenCategories, setChosenCategories] = useState(
    data?.poi.categories.map((c) => c.name) || [],
  );
  const [price, setPrice] = useState(data?.poi.price as string);

  const [isSubmitting, setIsSubmitting] = useState(false);

  const { control, handleSubmit } = useForm<AttractionSchema>({
    mode: 'onChange',
    resolver: zodResolver(attractionSchema),
  });

  const [editPoi] = useMutation(EditPoiDocument);

  const onSubmit: SubmitHandler<AttractionSchema> = async () => {
    setIsSubmitting(true);

    if (chosenCategories.length === 0) {
      Alert.alert('Please select at least one category.');
      return;
    }

    await editPoi({
      variables: {
        poiId: poiId as string,
        type: placeType as string,
        input: {
          price: price as string,
          categories: chosenCategories as string[],
        },
      },
      onCompleted: () => {
        setTimeout(() => {
          router.push({
            pathname: `/business/profile/${poiId}`,
            params: {
              poiId: poiId as string,
              placeType: placeType as string,
              imageList: imageList as string,
            },
          });
          setIsSubmitting(false);
          ToastAndroid.show('Successfully edited.', 2000);
        }, 5000);
      },
      onError: (error) => {
        setIsSubmitting(false);
        Alert.alert('Error', error.message);
      },
      refetchQueries: [
        {
          query: GetBusinessDetailsDocument,
          variables: {
            poiId: poiId as string,
          },
        },
      ],
    });
  };

  const categories = poiFacilities.data?.attractionCategoires.map((c) => ({
    key: c.id,
    value: c.name,
  }));

  const inputWidth = Dimensions.get('window').width * 0.75;

  return (
    <View style={{ backgroundColor: 'white', flex: 1, paddingHorizontal: 40 }}>
      <CreateBusinessHeader title={'Edit Business'} />
      <View className="flex-1 px-2 py-7">
        <ScrollView>
          <View>
            <Question question={'Select Category'} />
            <MultiSelection
              data={(poiFacilities.data && categories) || []}
              initialSelectedOptions={[]}
              placeholder="Category"
              onOptionChange={(options) => {
                setChosenCategories(options);
              }}
            />
          </View>
          <Question question={'Admission Fee'} />
          <Controller
            control={control}
            name="admissionFee"
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
                  width={inputWidth}
                  maxLength={9}
                />
              );
            }}
          />
        </ScrollView>
        <GradientButton
          onPress={handleSubmit(onSubmit)}
          isSubmitting={isSubmitting}
          title="Save"
        />
      </View>
    </View>
  );
};

export default AttractionFacilities;
