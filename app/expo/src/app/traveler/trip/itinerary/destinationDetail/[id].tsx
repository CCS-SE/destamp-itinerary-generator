import { useCallback, useState } from 'react';
import { Dimensions, Platform, Text, TextInput, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';
import Swiper from 'react-native-swiper';
import { Image } from 'expo-image';
import { router, Stack, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Model } from 'react-model';

import Back from '../../../../../../assets/images/back-icon.svg';

interface ImageProps {
  url: string;
}

interface OpeningHour {
  openTime?: string;
  closeTime?: string;
  day: number;
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
  const { name, address, contactNumber, openingHours, images } =
    useLocalSearchParams();

  const parsedImages: ImageProps[] = JSON.parse(images as string);
  const imageList = parsedImages.map((img) => img.url);

  const openingHoursArray: OpeningHour[] = JSON.parse(openingHours as string);

  const [{ useStore }] = useState(() => Model(createSlideSchema(imageList)));

  const [state, actions] = useStore();

  const loadHandle = useCallback((i: number) => {
    actions.loaded(i);
  }, []);

  const handleBack = () => router.back();

  const getTime = (time: string) => {
    const hour = new Date(time).getHours();
    const min = new Date(time).getMinutes();

    return `${hour}:${min != 0 ? min : `${min}0`}`;
  };

  const screenWidth = Dimensions.get('window').width;

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
              <Slide
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
        <ScrollView className="flex-1 rounded-tl-3xl rounded-tr-3xl bg-white p-4">
          <View
            className="mt-3 self-center rounded-2xl bg-gray-100 p-2"
            style={{ width: screenWidth / 1.13 }}
          >
            <Text className="mx-3 font-poppins-medium text-lg text-gray-700">
              {name}
            </Text>
            {address ? (
              <Text className="text-small mx-3 mt-2.5 font-poppins text-gray-500">
                {address}
              </Text>
            ) : (
              <></>
            )}
          </View>
          <View
            className="mt-3 self-center rounded-2xl bg-gray-100 p-2"
            style={{ width: screenWidth / 1.13 }}
          >
            {contactNumber ? (
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
                    value={contactNumber as string}
                    editable={false}
                    multiline
                  />
                ) : (
                  <Text
                    className="mx-2 font-poppins text-base text-gray-500"
                    selectable
                  >
                    {contactNumber}
                  </Text>
                )}
              </View>
            ) : (
              <Text className="mx-3 font-poppins text-base text-gray-500">
                No contacts provided.
              </Text>
            )}
          </View>
          {openingHoursArray.length !== 0 ? (
            <View
              className="mt-3 h-auto self-center rounded-2xl bg-gray-100 p-2"
              style={{ width: screenWidth / 1.13 }}
            >
              {openingHoursArray &&
                openingHoursArray.map((oh, index) => (
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
      </SafeAreaView>
    </>
  );
}

const Slide = ({ uri, loadHandle, i }: SlideProps) => {
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

const createSlideSchema = (imageList: string[]) =>
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
