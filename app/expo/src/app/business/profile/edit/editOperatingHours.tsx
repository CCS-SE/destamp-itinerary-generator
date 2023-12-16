import React, { useState } from 'react';
import { Alert, ScrollView, ToastAndroid, View } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { useMutation, useQuery } from '@apollo/client';

import EditBusinessDayItem from '~/components/BusinessOperator/EditOperatingHours/EditBusinessDayItem';
import EditTimeDurationPicker from '~/components/BusinessOperator/EditOperatingHours/EditTimeDurationPicker';
import CreateBusinessHeader from '~/components/BusinessOperator/Header';
import Question from '~/components/BusinessOperator/Question';
import GradientButton from '~/components/Button/GradientButton';
import {
  EditPoiDocument,
  GetBusinessDetailsDocument,
  OperatingHour,
  OperatingHoursInput,
} from '~/graphql/generated';

const BusinessOpeningHours: React.FC = () => {
  const { poiId, placeType, imageList } = useLocalSearchParams();
  const [editPoi] = useMutation(EditPoiDocument);

  const { data, error } = useQuery(GetBusinessDetailsDocument, {
    variables: {
      poiId: poiId as string,
    },
  });

  if (error) {
    Alert.alert('Error', error.message);
  }

  const [openingHours, setOpeningHours] = useState(
    data?.poi.operatingHours as OperatingHour[],
  );
  const [visitDuration, setVisitDuration] = useState(
    data?.poi.visitDuration as number,
  );
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    const operatingHoursInput: OperatingHoursInput[] = openingHours.map(
      (oh) => {
        return {
          day: oh.day,
          isClosed: oh.isClosed,
          is24hours: oh.is24Hours,
          openTime: oh.openTime,
          closeTime: oh.closeTime,
        };
      },
    );

    await editPoi({
      variables: {
        input: {
          operatingHours: operatingHoursInput as OperatingHoursInput[],
          visitDuration: visitDuration as number,
        },
        poiId: poiId as string,
        type: placeType as string,
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

      onError: (err) => {
        setIsSubmitting(false);
        console.log(err);
        Alert.alert('Error', err.message);
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

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        backgroundColor: 'white',
        padding: 20,
      }}
    >
      <CreateBusinessHeader title={'Edit Business'} />
      <ScrollView showsVerticalScrollIndicator={false}>
        {openingHours.map((item) => (
          <View
            key={item.day}
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginHorizontal: 2,
            }}
          >
            <EditBusinessDayItem
              key={item.day}
              day={item.day}
              endTime={item.closeTime}
              startTime={item.openTime}
              isClosed={item.isClosed}
              is24Hours={item.is24Hours}
              operatingHours={openingHours}
              setOperatingHours={setOpeningHours}
            />
          </View>
        ))}
        <View className="p-4">
          <Question question={'Recommended Visit Duration'} />
          <EditTimeDurationPicker
            setVisitDuration={setVisitDuration}
            visitDuration={visitDuration}
          />
        </View>
      </ScrollView>
      <GradientButton
        title="Save"
        onPress={handleSubmit}
        isSubmitting={isSubmitting}
      />
    </View>
  );
};

export default BusinessOpeningHours;
