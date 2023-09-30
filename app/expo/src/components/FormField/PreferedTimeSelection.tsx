import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { RangeSlider } from '@react-native-assets/slider';

interface PreferedTimeProps {
  tripDuration: number;
  onValueChange?: (ranges: Array<[number, number]>) => void;
}

type CustomThumbProps = {
  value: number;
  thumb: 'min' | 'max';
};

const CustomThumb = ({ value }: CustomThumbProps) => {
  return <Text style={{ fontSize: 12 }}>{value}</Text>;
};

const MIN = 6;
const MAX = 24;

export default function PreferedTimeSelection({
  tripDuration,
  onValueChange,
}: PreferedTimeProps) {
  const [ranges, setRanges] = useState<Array<[number, number]>>([]);

  useEffect(() => {
    // Initialize with default values when tripDuration changes
    const defaultRanges = new Array(tripDuration).fill([10, 18]);
    setRanges(defaultRanges);
    if (onValueChange) {
      onValueChange(defaultRanges);
    }
  }, [tripDuration]);

  const handleRangeChange = (index: number, newRange: [number, number]) => {
    const updatedRanges = [...ranges];
    updatedRanges[index] = newRange;
    setRanges(updatedRanges);
    if (onValueChange) {
      onValueChange(updatedRanges);
    }
  };

  return (
    <View className="items-start">
      {ranges.map((range, index) => (
        <View key={index}>
          <View className="w-[310] flex-row items-center justify-between">
            <Text className="font-poppins-medium text-lg text-gray-500">{`Day  ${
              index + 1
            }`}</Text>
            <Text className="font-poppins-medium text-lg text-gray-500">{`${range[0]}:00-${range[1]}:00`}</Text>
          </View>
          <View className="my-5 flex-row">
            <Text className="font-poppins text-base text-gray-600">{MIN}</Text>
            <RangeSlider
              style={{
                width: 280,
                height: 25,
                flexGrow: 0,
                paddingHorizontal: 7,
              }}
              range={range}
              step={1}
              CustomThumb={CustomThumb}
              onValueChange={(newRange) => handleRangeChange(index, newRange)}
              outboundColor="#999999"
              inboundColor="#FC8040"
              trackHeight={7}
              minimumValue={MIN}
              maximumValue={MAX}
            />
            <Text className="font-poppins text-base text-gray-600">{MAX}</Text>
          </View>
        </View>
      ))}
    </View>
  );
}
