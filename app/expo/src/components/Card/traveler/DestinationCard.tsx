import { useCallback, useState } from 'react';
import { Text, View } from 'react-native';
import Swiper from 'react-native-swiper';
import { Image } from 'expo-image';
import { Model } from 'react-model';

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

interface ItineraryCardProps {
  time: string;
  title: string;
  price: string;
  imageList: string[];
}

export default function DestinationCard({
  time,
  title,
  price,
  imageList,
}: ItineraryCardProps) {
  const [{ useStore }] = useState(() => Model(createSlideSchema(imageList)));
  const [state, actions] = useStore();

  const isFree = price === '0';

  const loadHandle = useCallback((i: number) => {
    actions.loaded(i);
  }, []);

  return (
    <View className="rounded-2x mt-5 w-[360] ">
      <View className="rounded-2x mx-8 h-[240] w-[310]">
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
        <View className="-mt-4 rounded-bl-2xl  rounded-br-2xl bg-gray-100 p-1">
          <Text className="mx-2.5 font-poppins text-base text-gray-500">
            {title}
          </Text>
          <View className="mb-1 flex-row">
            <Text className="mx-2.5 font-poppins text-base text-gray-400">
              {time}
            </Text>
            <PriceTag isFree={isFree} price={price} />
          </View>
        </View>
      </View>
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
        className={`mx-2.5 font-poppins text-base ${
          isFree ? 'text-[#12CC30]' : 'text-[#F65A82]'
        } `}
      >
        {isFree ? 'Free' : `₱${price}`}
      </Text>
    </View>
  );
};
