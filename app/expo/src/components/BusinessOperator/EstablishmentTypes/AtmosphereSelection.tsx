import { useState } from 'react';
import { View } from 'react-native';

import AtmosphereCard from '~/components/Card/owner/AtmosphereCard';

interface AtmosphereSelectionProps {
  onOptionChange: (option: string[]) => void;
  initialSelectedOptions: string[];
}

export default function AtmosphereSelection({
  onOptionChange,
  initialSelectedOptions,
}: AtmosphereSelectionProps) {
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
        {atmospheres.map((atmospheres, i) => (
          <View className="mx-1.5 my-1 flex-row justify-between" key={i}>
            <AtmosphereCard
              title={atmospheres.title}
              isSelected={isOptionSelected(atmospheres.keyword)}
              onPress={() => handleOptionChange(atmospheres.keyword)}
            />
          </View>
        ))}
      </View>
    </View>
  );
}

const atmospheres = [
  {
    title: 'Upscaled',
    keyword: 'Upscaled',
  },
  {
    title: 'Romantic',
    keyword: 'Romantic',
  },
  {
    title: 'Family Friendly',
    keyword: 'FamilyFriendly',
  },
  {
    title: 'Casual',
    keyword: 'Casual',
  },
  {
    title: 'Cozy',
    keyword: 'Cozy',
  },
];
