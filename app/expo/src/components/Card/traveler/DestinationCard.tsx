import { useCallback, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Model } from 'react-model';

import AddSpendingForm from '~/components/Forms/AddSpendingForm';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';
import { PlaceType } from '~/graphql/generated';

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

interface DestinationCardProps {
  itineraryId: number;
  time: string;
  title: string;
  price: string;
  imageList: string[];
  date: Date;
  categoryType: PlaceType;
  onPress: () => void;
}

export default function DestinationCard({
  itineraryId,
  time,
  title,
  price,
  imageList,
  date,
  onPress,
  categoryType,
}: DestinationCardProps) {
  const [{ useStore }] = useState(() => Model(createSlideSchema(imageList)));
  const [state, actions] = useStore();
  const [addExpenseModal, setAddExpenseModal] = useState(false);

  const isFree = price === '0';

  const loadHandle = useCallback((i: number) => {
    actions.loaded(i);
  }, []);

  const screenWidth = Dimensions.get('window').width;
  return (
    <View className="rounded-2x mt-5 w-[360] flex-row ">
      <View
        className="rounded-2x ml-8 mr-2 h-[200] pr-3"
        style={{ width: screenWidth / 1.25 }}
      >
        <Swiper
          loadMinimal
          loadMinimalSize={2}
          loop={true}
          activeDotColor="#FC8040"
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
        <View className="-mt-4 flex-row justify-between rounded-bl-2xl rounded-br-2xl bg-gray-100 py-1 ">
          <TouchableOpacity
            className="ml-1"
            onPress={onPress}
            activeOpacity={1}
          >
            <Text
              className="ml-2.5 font-poppins text-base text-gray-500"
              style={{ width: screenWidth / 1.6 }}
            >
              {title}
            </Text>
            <View className="mb-1 flex-row">
              <Text
                className={`+ ml-2 font-poppins text-sm text-gray-400 ${
                  time ? 'mr-1' : ''
                }  `}
              >
                {time}
              </Text>
              <PriceTag isFree={isFree} price={price} />
            </View>
          </TouchableOpacity>

          {!isFree && (
            <TouchableOpacity
              className="justify-end"
              onPress={() => setAddExpenseModal(true)}
            >
              <View className="mr-3 justify-end">
                <MaterialCommunityIcons
                  name="cash-plus"
                  size={24}
                  color="gray"
                />
              </View>
            </TouchableOpacity>
          )}
        </View>
      </View>
      <BottomHalfModal
        isVisible={addExpenseModal}
        onClose={() => setAddExpenseModal(false)}
      >
        <AddSpendingForm
          itineraryId={itineraryId}
          closeModal={() => setAddExpenseModal(false)}
          minDate={date}
          maxDate={date}
          noteString={title}
          amount={price}
          categoryType={categoryType}
        />
      </BottomHalfModal>
    </View>
  );
}

const Slide = ({ uri, loadHandle, i }: SlideProps) => {
  const blurhash =
    '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';

  return (
    <View className="flex-1 justify-center rounded-2xl bg-transparent">
      <Image
        className="flex-1 rounded-2xl bg-transparent"
        onLoad={() => {
          loadHandle(i);
        }}
        source={{ uri: uri }}
        contentFit="cover"
        placeholder={blurhash}
        transition={1_800}
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

interface PriceTagProps {
  price: string;
  isFree: boolean;
}

const PriceTag = ({ price, isFree }: PriceTagProps) => {
  return (
    <View className={`rounded-lg ${isFree ? 'bg-green-200' : 'bg-pink-200'}`}>
      <Text
        className={`px-1 font-poppins text-sm ${
          isFree ? 'text-[#12CC30]' : 'text-[#F65A82]'
        } `}
      >
        {isFree ? 'Free' : `₱${price}`}
      </Text>
    </View>
  );
};
