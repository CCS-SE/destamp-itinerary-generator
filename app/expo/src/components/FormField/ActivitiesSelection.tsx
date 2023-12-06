import { useState } from 'react';
import { View } from 'react-native';

import Arts from '../../../assets/images/arts-perf.svg';
import Landmark from '../../../assets/images/landmark-perf.svg';
import Museum from '../../../assets/images/museum-pref.svg';
import Outdoor from '../../../assets/images/outdoor-perf.svg';
import Shopping from '../../../assets/images/shopping-perf.svg';
import Sight from '../../../assets/images/sight-perf.svg';
import CircularSlider from '../Slider/CircularSlider';

interface ActivitiesSelectionProps {
  onActivitiesSliderValueChange: (name: string, value: number) => void;
  initialActivityValues: { [key: string]: number };
}
export default function ActivitiesSelection({
  onActivitiesSliderValueChange,
  initialActivityValues,
}: ActivitiesSelectionProps) {
  const [activityValues, setActivityValues] = useState(initialActivityValues);

  const handleSliderValueChange = (sliderName: string, newValue: number) => {
    setActivityValues({ ...activityValues, [sliderName]: newValue });
    onActivitiesSliderValueChange(sliderName, newValue);
  };

  return (
    <View>
      <View className="mr-1 mt-3 w-[300] flex-row justify-between">
        {activities.map((activity, i) => (
          <CircularSlider
            key={i}
            icon={activity.icon}
            color={activity.color}
            title={activity.title}
            initialValue={(activityValues[activity.value] as number) || 0}
            onValueChange={(value) =>
              handleSliderValueChange(activity.value, value)
            }
          />
        ))}
      </View>
      <View className="mr-1 mt-3 w-[300] flex-row justify-between">
        {activities1.map((activity, i) => (
          <CircularSlider
            key={i}
            icon={activity.icon}
            color={activity.color}
            title={activity.title}
            initialValue={(activityValues[activity.value] as number) || 0}
            onValueChange={(value) =>
              handleSliderValueChange(activity.value, value)
            }
          />
        ))}
      </View>
    </View>
  );
}

const activities = [
  {
    title: 'Sightseeing',
    value: 'Sightseeing',
    color: '#65F1D0',
    icon: <Sight height={35} width={37} />,
  },
  {
    title: 'Museum',
    value: 'Museum',
    color: '#DFCCF1',
    icon: <Museum height={35} width={37} />,
  },
  {
    title: 'Outdoor Activities',
    value: 'Outdoor',
    color: '#FFCE98',
    icon: <Outdoor height={35} width={37} />,
  },
];

const activities1 = [
  {
    title: 'Arts',
    value: 'Arts',
    color: '#C4EF78',
    icon: <Arts height={35} width={37} />,
  },
  {
    title: 'Shopping',
    value: 'Shopping',
    color: '#90DCFC',
    icon: <Shopping height={35} width={37} />,
  },
  {
    title: 'Architecture and Landmarks',
    value: 'Landmarks',
    color: '#E997AB',
    icon: <Landmark height={33} width={37} />,
  },
];
