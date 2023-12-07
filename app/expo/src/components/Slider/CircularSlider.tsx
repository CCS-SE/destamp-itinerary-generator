import React, { useState } from 'react';
import { Text, View } from 'react-native';
import {
  GestureHandlerStateChangeEvent,
  State,
  TapGestureHandler,
} from 'react-native-gesture-handler';
import { Circle, G, Svg } from 'react-native-svg';

interface CircularSliderProps {
  color: string;
  title: string;
  icon: React.ReactNode;
  onValueChange: (value: number) => void;
  initialValue: number;
}

const CircularSlider = ({
  color,
  title,
  icon,
  onValueChange,
  initialValue,
}: CircularSliderProps) => {
  const [value, setValue] = useState(initialValue);

  const radius = 40;
  const strokeWidth = 13;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;

  const handleTap = (event: GestureHandlerStateChangeEvent) => {
    if (event.nativeEvent.state === State.ACTIVE) {
      const newValue = value + 100;
      setValue(newValue > 100 ? 0 : newValue);
      onValueChange(newValue > 100 ? 0 : newValue);
    }
  };

  return (
    <View>
      <TapGestureHandler onHandlerStateChange={handleTap}>
        <Svg width={radius * 2} height={radius * 2}>
          <G rotation="-90" origin={`${radius}, ${radius}`}>
            <Circle
              stroke="#E4E4E4"
              fill="none"
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
            />
            <Circle
              stroke={color}
              fill="none"
              cx={radius}
              cy={radius}
              r={radius - strokeWidth / 2}
              strokeDasharray={circumference}
              strokeDashoffset={offset}
              strokeWidth={strokeWidth}
            />
          </G>
          <View
            className="rounded-full p-1"
            style={{
              position: 'absolute',
              top: radius / 2.4,
              left: radius / 2.3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            {icon}
          </View>
        </Svg>
      </TapGestureHandler>
      <Text className="mt-1 text-center font-poppins text-xs text-gray-500">
        {title.split(' ').join('\n')}
      </Text>
    </View>
  );
};

export default CircularSlider;
