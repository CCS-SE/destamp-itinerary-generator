import { useState } from 'react';
import { View } from 'react-native';

import CuisineCategoryCard from '../Card/traveler/CuisineCard';

interface CuisineSelectionProps {
  onOptionChange: (option: string[]) => void;
  initialSelectedOptions: string[];
}

export default function CuisineSelection({
  onOptionChange,
  initialSelectedOptions,
}: CuisineSelectionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
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
    <View className=" w-[330]">
      <View className="flex-row flex-wrap">
        {cuisines.map((cuisine, i) => (
          <View className="mx-1.5 my-1 flex-row justify-between" key={i}>
            <CuisineCategoryCard
              title={cuisine.title}
              isSelected={isOptionSelected(cuisine.keyword)}
              onPress={() => handleOptionChange(cuisine.keyword)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const cuisines = [
  {
    title: 'Locals Best',
    keyword: 'LocalsBest',
  },
  {
    title: 'Filipino',
    keyword: 'Filipino',
  },
  {
    title: 'Korean',
    keyword: 'Korean',
  },
  {
    title: 'Thai',
    keyword: 'Thai',
  },
  {
    title: 'Indian',
    keyword: 'Indian',
  },
  {
    title: 'American',
    keyword: 'American',
  },
  {
    title: 'Japanese',
    keyword: 'Japanese',
  },
  {
    title: 'Chinese',
    keyword: 'Chinese',
  },
  {
    title: 'Italian',
    keyword: 'Italian',
  },
  {
    title: 'Spanish',
    keyword: 'Spanish',
  },
];
