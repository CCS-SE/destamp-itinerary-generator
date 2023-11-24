import { useCallback, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Image } from 'expo-image';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Model } from 'react-model';

import AddSpendingForm from '~/components/Forms/AddSpendingForm';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';
import { ExpenseCategory } from '~/graphql/generated';
import { calculateAveragePrice } from '~/utils/utils';
import Person from '../../../../assets/images/person.svg';

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

interface TimeSlot {
  start: string;
  end: string;
}

interface DestinationCardProps {
  tripId: number;
  timeSlot?: TimeSlot;
  title: string;
  price: string;
  isAttraction: boolean;
  accommodation?: {
    id: number;
  } | null;
  imageList: string[];
  date: Date;
  categoryType: ExpenseCategory;
  onPress: () => void;
  travelerCount: number;
}

export default function DestinationCard({
  tripId,
  timeSlot,
  title,
  price,
  imageList,
  date,
  accommodation,
  isAttraction,
  onPress,
  categoryType,
  travelerCount,
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
        className="rounded-2x mx-7 mr-2 h-[200] pr-3"
        style={{ width: screenWidth / 1.26 }}
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
              className="ml-2 font-poppins text-base text-gray-500"
              style={{ width: screenWidth / 1.6 }}
              numberOfLines={1}
            >
              {title}
            </Text>
            <View className="mb-1 ml-2 flex-row">
              <Text className="mr-1 font-poppins text-[14.5px] text-gray-400">
                {timeSlot?.start == timeSlot?.end
                  ? timeSlot?.start
                  : `${timeSlot?.start} - ${timeSlot?.end}`}
              </Text>
              <PriceTag
                isFree={isFree}
                price={price}
                isAccommodation={accommodation !== null}
              />
            </View>
          </TouchableOpacity>

          {!isFree && (
            <TouchableOpacity
              className="justify-end"
              onPress={() => setAddExpenseModal(true)}
            >
              <View className="mb-0.5 mr-3 justify-end">
                <MaterialCommunityIcons
                  name="cash-plus"
                  size={25}
                  color="#989FB0"
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
          tripId={tripId}
          closeModal={() => setAddExpenseModal(false)}
          minDate={date}
          maxDate={date}
          noteString={title}
          amount={
            isAttraction
              ? (parseInt(price) * travelerCount).toFixed(2)
              : accommodation
              ? price
              : (calculateAveragePrice(price) * travelerCount).toFixed(2)
          }
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
  isAccommodation: boolean;
}

const PriceTag = ({ price, isFree, isAccommodation }: PriceTagProps) => {
  return (
    <View className={`rounded-lg ${isFree ? 'bg-green-200' : 'bg-pink-200'}`}>
      <View className="flex-row items-center justify-center px-1.5">
        <Text
          className={`mx-0.5 mt-0.5 font-poppins-medium text-xs ${
            isFree ? 'text-[#12CC30]' : 'text-[#F65A82]'
          } `}
        >
          {isFree ? 'Free' : `₱${price}`}
        </Text>
        {!isFree ? (
          isAccommodation ? null : (
            <Person height={10} width={10} />
          )
        ) : null}
      </View>
    </View>
  );
};
