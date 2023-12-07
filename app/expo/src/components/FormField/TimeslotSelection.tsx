import { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { RangeSlider } from '@react-native-assets/slider';

interface PreferedTimeProps {
  tripDuration: number;
  onValueChange?: (ranges: Array<[number, number]>) => void;
}

type CustomThumbProps = {
  value: number;
  thumb: 'min' | 'max';
};

const CustomThumb = ({ thumb }: CustomThumbProps) => {
  const isMaxThumb = thumb === 'max';

  return (
    <View
      style={{
        width: 20, // Adjust the size of the circle as needed
        height: 16, // Adjust the size of the circle as needed
        borderRadius: 10, // Make it a circle by setting borderRadius to half of the width/height
        backgroundColor: isMaxThumb ? '#EB4586' : '#EB4586',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      {/* <Text style={{ color: 'white' }}>{value}</Text> */}
    </View>
  );
};

const MIN = 6;
const MAX = 24;

export default function TimeslotSelection({
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

  const dayDisplay = (value: number) => {
    return value >= 12
      ? `${
          value === 12
            ? `${value}PM`
            : value - 12 == 12
            ? `${value - 12}AM`
            : `${value - 12}PM`
        }`
      : `${value}AM`;
  };

  return (
    <View>
      <ScrollView
        style={{ height: 400 }}
        showsVerticalScrollIndicator={true}
        persistentScrollbar={true}
      >
        {ranges.map((range, index) => (
          <View key={index} style={{ padding: 1 }}>
            <View className="m-1 w-[310] flex-row items-center justify-between">
              <Text className="font-poppins-medium text-lg text-gray-500">{`DAY  ${
                index + 1
              }`}</Text>
              <View className="px-.5 w-[100] items-center rounded-lg bg-[#F9EBEE] py-1">
                <Text className="font-poppins-medium text-xs text-[#FF6E93] ">{`${dayDisplay(
                  range[0],
                )} - ${dayDisplay(range[1])}`}</Text>
              </View>
            </View>
            <View className="my-1 flex-row">
              <Text className="text-md font-poppins text-gray-600">{`${MIN} AM`}</Text>
              <RangeSlider
                style={{
                  width: 225,
                  height: 20,
                  flexGrow: 0,
                  paddingHorizontal: 12,
                }}
                range={range}
                step={1}
                CustomThumb={CustomThumb}
                onValueChange={(newRange) => handleRangeChange(index, newRange)}
                outboundColor="#E5E7EB"
                inboundColor="#EB4586"
                trackHeight={8}
                minimumValue={MIN}
                maximumValue={MAX}
              />

              <Text className="text-ms font-poppins text-gray-600">{`${
                MAX - 12
              } AM`}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
