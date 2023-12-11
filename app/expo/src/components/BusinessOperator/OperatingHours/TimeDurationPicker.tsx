import React from 'react';
import { Text, View } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

import addBusinessFormStore from '~/store/addBusinessFormStore';

const TimeDurationPicker = () => {
  const { openingHours, setData } = addBusinessFormStore();
  const hours = Array.from(Array(13).keys());
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  return (
    <View>
      <View className="rounded-2xl bg-white py-5">
        <View className="flex-row justify-between">
          <View className=" w-1/2 flex-row  items-center">
            <ScrollPicker
              dataSource={hours}
              selectedIndex={1}
              wrapperHeight={150}
              wrapperBackground="#FFFFFF"
              onValueChange={(hour) => {
                setData({
                  step: 2,
                  data: {
                    ...openingHours,
                    hour: hour,
                  },
                });
              }}
              itemHeight={40}
              highlightColor="#d8d8d8"
              highlightBorderWidth={0.3}
            />
            <Text className="px-2 font-poppins text-sm text-gray-800">
              {openingHours.hour > 1 ? 'hours' : 'hour'}
            </Text>
          </View>
          <View className="w-1/2 flex-row items-center">
            <ScrollPicker
              style={{ height: 10 }}
              dataSource={minutes}
              selectedIndex={0}
              wrapperHeight={150}
              wrapperBackground="#FFFFFF"
              onValueChange={(min) => {
                setData({
                  step: 2,
                  data: {
                    ...openingHours,
                    minute: min,
                  },
                });
              }}
              itemHeight={40}
              highlightColor="#d8d8d8"
              highlightBorderWidth={0.3}
            />
            <Text className="px-4 font-poppins text-sm text-gray-800">
              {openingHours.minute > 1 ? 'mins' : 'min'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default TimeDurationPicker;
