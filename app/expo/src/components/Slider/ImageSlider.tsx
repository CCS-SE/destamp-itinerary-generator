import { View } from 'react-native';
import { Image } from 'expo-image';

import { blurhash } from '~/app/constant/constant';

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

export const ImageSlider = ({ uri, loadHandle, i }: SlideProps) => {
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
