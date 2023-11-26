import { useCallback, useState } from 'react';
import { Dimensions, Platform, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@apollo/client';
import { Ionicons } from '@expo/vector-icons';
import { Model } from 'react-model';

import DestinationDetailSkeleton from '~/components/Skeleton/DestinationDetailSkeleton';
import { GetDailyItineraryPoiDetailsDocument } from '~/graphql/generated';
import Back from '../../../../../../assets/images/back-icon.svg';

interface Category {
  name: string;
}

interface SlideStateProps {
  imgList: string[];
  loadQueue: number[];
}

interface SlideActionsProps {
  loaded: number;
}

interface SlideProps {
  uri: string;
  loadHandle: (i: number) => void;
  i: number;
  loaded: number | undefined;
}

type Day = 'Sun' | 'Mon' | 'Tue' | 'Wed' | 'Thu' | 'Fri' | 'Sat';

type DayValue = 0 | 1 | 2 | 3 | 4 | 5 | 6;

const days: Record<DayValue, Day> = {
  0: 'Sun',
  1: 'Mon',
  2: 'Tue',
  3: 'Wed',
  4: 'Thu',
  5: 'Fri',
  6: 'Sat',
};

export default function DestinationDetailScreen() {
  const { id, imageList } = useLocalSearchParams();

  const { error, loading, data } = useQuery(
    GetDailyItineraryPoiDetailsDocument,
    {
      variables: {
        poiId: id as string,
      },
    },
  );

  const [{ useStore }] = useState(() =>
    Model(createSlideSchema(JSON.parse(imageList as string))),
  );
  const [state, actions] = useStore();

  const screenWidth = Dimensions.get('window').width;

  const loadHandle = useCallback((i: number) => {
    actions.loaded(i);
  }, []);

  const handleBack = () => router.back();

  const getTime = (time: string) => {
    const hour = new Date(time).getHours();
    const min = new Date(time).getMinutes();

    return `${hour}:${min != 0 ? min : `${min}0`}`;
  };

  const displayCategories = (items: Category[]) => {
    return (
      <View className="mt-2 flex-row flex-wrap px-2">
        {items.map((item, i) => (
          <View
            className="mx-1 my-0.5 flex-row rounded-lg bg-pink-100 p-1"
            key={i}
          >
            <Text className="font-poppins-medium text-[10px] text-pink-600 ">
              {item.name}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (loading && !data) {
    return (
      <View className="flex-1 items-center">
        <DestinationDetailSkeleton />
      </View>
    );
  }

  return (
    <>
      <View>
        <View className="relative -top-4 h-[420]">
          <View className="absolute left-0 top-20 z-10 mx-4 flex-row justify-between">
            <Back height={43} width={43} onPress={handleBack} />
          </View>
          <Swiper
            loadMinimal
            loadMinimalSize={2}
            loop={true}
            activeDotColor="white"
          >
            {state.imgList.map((item, i) => (
              <ImageSlider
                loadHandle={loadHandle}
                uri={item}
                i={i}
                key={i}
                loaded={state.loadQueue[i]}
              />
            ))}
          </Swiper>
        </View>
      </View>
      <Stack.Screen options={{ headerShown: false }} />
      <SafeAreaView className="-mt-10 flex-1" edges={['left', 'right']}>
        {data && (
          <ScrollView className="flex-1 rounded-tl-3xl rounded-tr-3xl bg-white p-4">
            <View
              className="mt-3 self-center rounded-2xl bg-gray-100 p-2"
              style={{ width: screenWidth / 1.13 }}
            >
              <Text className="mx-3 font-poppins-medium text-lg text-gray-700">
                {data.poi.name}
              </Text>
              {data.poi.address ? (
                <Text className="text-small mx-3 mt-2.5 font-poppins text-gray-500">
                  {data.poi.address}
                </Text>
              ) : (
                <></>
              )}
              {data.poi.description ? (
                <Text className="text-small mx-3 mt-6 font-poppins text-gray-500">
                  {data.poi.description}
                </Text>
              ) : (
                <></>
              )}
              {displayCategories(data.poi.categories)}
            </View>
            <View
              className="mt-3 self-center rounded-2xl bg-gray-100 p-2"
              style={{ width: screenWidth / 1.13 }}
            >
              {data.poi.contactNumber ? (
                <View className="flex-row items-center">
                  <Ionicons
                    name="call-outline"
                    size={20}
                    color="gray"
                    style={{ marginLeft: 7 }}
                  />
                  {Platform.OS === 'ios' ? (
                    <TextInput
                      className="mx-2 font-poppins text-base text-gray-500"
                      value={data.poi.contactNumber}
                      editable={false}
                      multiline
                    />
                  ) : (
                    <Text
                      className="mx-2 font-poppins text-base text-gray-500"
                      selectable
                    >
                      {data.poi.contactNumber}
                    </Text>
                  )}
                </View>
              ) : (
                <Text className="mx-3 font-poppins text-base text-gray-500">
                  No contacts provided.
                </Text>
              )}
            </View>
            {data.poi.operatingHours.length !== 0 ? (
              <View
                className="mt-3 h-auto self-center rounded-2xl bg-gray-100 p-2"
                style={{ width: screenWidth / 1.13 }}
              >
                {data.poi.operatingHours &&
                  data.poi.operatingHours.map((oh, index) => (
                    <View key={index} className="mx-3 flex-row">
                      <Text className='"mx-3 font-poppins-medium text-base text-gray-500'>
                        {days[oh.day as DayValue]}
                      </Text>

                      {oh.openTime !== null ? (
                        <Text className="pl-2 font-poppins text-base text-gray-500">
                          {oh.openTime ? getTime(oh.openTime) : ''} -{' '}
                          {oh.closeTime ? getTime(oh.closeTime) : ''}
                        </Text>
                      ) : (
                        <Text className="pl-2 font-poppins text-base text-gray-500">
                          Closed
                        </Text>
                      )}
                    </View>
                  ))}
              </View>
            ) : (
              <View
                className="mt-3 h-auto self-center rounded-2xl bg-gray-100 p-2"
                style={{ width: screenWidth / 1.13 }}
              >
                <Text className="mx-3 font-poppins text-base text-gray-500">
                  No opening hours provided.
                </Text>
              </View>
            )}
          </ScrollView>
        )}
      </SafeAreaView>
    </>
  );
}

export const ImageSlider = ({ uri, loadHandle, i }: SlideProps) => {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View className="flex-1 justify-center bg-transparent">
      <Image
        className="flex-1 bg-transparent"
        onLoad={() => {
          loadHandle(i);
        }}
        source={{ uri: uri }}
        contentFit="cover"
        placeholder={blurhash}
        transition={1_000}
      />
    </View>
  );
};

export const createSlideSchema = (imageList: string[]) =>
  ({
    state: {
      imgList: imageList || [],
      loadQueue: new Array(imageList.length).fill(0),
    },
    actions: {
      loaded: (index) => {
        return (state) => {
          state.loadQueue[index] = 1;
        };
      },
    },
  }) as ModelType<SlideStateProps, SlideActionsProps>;
