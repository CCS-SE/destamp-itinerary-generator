import { useState } from 'react';
import { View } from 'react-native';

import CuisineCategoryCard from '../Card/traveler/CuisineCard';

interface RestaurantCategory {
  id: number;
  name: string;
}

interface CuisineSelectionProps {
  data: RestaurantCategory[];
  onOptionChange: (option: string[]) => void;
  initialSelectedOptions: string[];
}

export default function CuisineSelection({
  data,
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
    <View className=" w-[330] ">
      <View className="flex-row flex-wrap">
        {data.map((cuisine, i) => (
          <View className="mx-1.5 my-1 flex-row justify-between" key={i}>
            <CuisineCategoryCard
              title={cuisine.name}
              isSelected={isOptionSelected(cuisine.name)}
              onPress={() => handleOptionChange(cuisine.name)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}
