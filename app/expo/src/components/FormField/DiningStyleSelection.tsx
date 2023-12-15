import { useState } from 'react';
import { View } from 'react-native';

import DiningStyleCard from '../Card/traveler/DiningStyle';

interface DiningStyleSelectionProps {
  onOptionChange: (options: string[]) => void;
  initialSelectedOptions: string[];
}

export default function DiningStyleSelection({
  onOptionChange,
  initialSelectedOptions,
}: DiningStyleSelectionProps) {
  const [selectedOptions, setSelectedOptions] = useState(
    initialSelectedOptions,
  );

  const handleOptionChange = (option: string) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onOptionChange(updatedOptions);
  };

  const isOptionSelected = (option: string) => {
    return selectedOptions.includes(option);
  };

  return (
    <View className="w-[270]">
      <View className="flex-row justify-between">
        {diningStyles.map((diningStyle, i) => (
          <DiningStyleCard
            key={i}
            uri={diningStyle.url}
            title={diningStyle.title}
            onPress={() => handleOptionChange(diningStyle.keyword)}
            isSelected={isOptionSelected(diningStyle.keyword)}
          />
        ))}
      </View>
      <View className="mt-3 flex-row justify-between">
        {diningStyles1.map((diningStyle, i) => (
          <DiningStyleCard
            key={i}
            uri={diningStyle.url}
            title={diningStyle.title}
            onPress={() => handleOptionChange(diningStyle.keyword)}
            isSelected={isOptionSelected(diningStyle.keyword)}
          />
        ))}
      </View>
    </View>
  );
}

const diningStyles = [
  {
    title: 'Fine dining',
    url: 'https://www.richmondehoteliloilo.com.ph/wp-content/uploads/2020/06/dinning-the-Granary-0001.jpg',
    keyword: 'Fine',
  },
  {
    title: 'Casual dining',
    url: 'https://www.brandsandbranches.com/upload/blog/blog-1604145412.jpg',
    keyword: 'Casual',
  },
];

const diningStyles1 = [
  {
    title: 'Fast dining',
    url: 'https://i.pinimg.com/564x/ee/bb/9c/eebb9cfe1197197bbef8c963e1bedd32.jpg',
    keyword: 'Fast',
  },
  {
    title: 'Buffet dining',
    url: 'https://cdn.phonebooky.com/blog/wp-content/uploads/2023/06/06172529/juanita1_11zon.jpg',
    keyword: 'Buffet',
  },
];
