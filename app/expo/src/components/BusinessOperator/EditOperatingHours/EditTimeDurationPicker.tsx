import React, { useEffect, useState } from 'react';
import { Text, View } from 'react-native';
import ScrollPicker from 'react-native-wheel-scrollview-picker';

interface EditTimeDurationPickerProps {
  setVisitDuration: React.Dispatch<React.SetStateAction<number>>;
  visitDuration: number;
}
const EditTimeDurationPicker = ({
  setVisitDuration,
  visitDuration,
}: EditTimeDurationPickerProps) => {
  const hours = Array.from(Array(13).keys());
  const minutes = Array.from({ length: 12 }, (_, i) => i * 5);

  const [hour, setHour] = useState(Math.floor(visitDuration / 60));
  const [minute, setMinute] = useState(Math.floor(visitDuration % 60));

  useEffect(() => {
    setVisitDuration(hour * 60 + minute);
  }, [hour, minute]);

  return (
    <View>
      <View className="rounded-2xl bg-white py-5">
        <View className="flex-row justify-between">
          <View className=" w-1/2 flex-row  items-center">
            <ScrollPicker
              dataSource={hours}
              selectedIndex={hour}
              wrapperHeight={150}
              wrapperBackground="#FFFFFF"
              onValueChange={(hour) => {
                setHour(hour);
              }}
              itemHeight={40}
              highlightColor="#d8d8d8"
              highlightBorderWidth={0.3}
            />
            <Text className="px-2 font-poppins text-sm text-gray-800">
              {hour > 1 ? 'hours' : 'hour'}
            </Text>
          </View>
          <View className="w-1/2 flex-row items-center">
            <ScrollPicker
              style={{ height: 10 }}
              dataSource={minutes}
              selectedIndex={minute}
              wrapperHeight={150}
              wrapperBackground="#FFFFFF"
              onValueChange={(min) => {
                setMinute(min);
              }}
              itemHeight={40}
              highlightColor="#d8d8d8"
              highlightBorderWidth={0.3}
            />
            <Text className="px-4 font-poppins text-sm text-gray-800">
              {minute > 1 ? 'mins' : 'min'}
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
};

export default EditTimeDurationPicker;
