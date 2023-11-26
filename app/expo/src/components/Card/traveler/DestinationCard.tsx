import { useCallback, useState } from 'react';
import { Dimensions, Text, TouchableOpacity, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Model } from 'react-model';

import AddSpendingForm from '~/components/Forms/AddSpendingForm';
import BottomHalfModal from '~/components/Modal/BottomHalfModal';
import {
  createSlideSchema,
  ImageSlider,
} from '~/components/Slider/ImageSlider';
import { ExpenseCategory } from '~/graphql/generated';
import { calculateAveragePrice } from '~/utils/utils';
import Person from '../../../../assets/images/person.svg';

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
    <View className="mt-5 w-[360] flex-row rounded-2xl ">
      <View
        className="mx-7 mr-2 h-[200] rounded-2xl pr-3"
        style={{ width: screenWidth / 1.26 }}
      >
        <Swiper
          loadMinimal
          loadMinimalSize={2}
          loop={true}
          activeDotColor="#FC8040"
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
