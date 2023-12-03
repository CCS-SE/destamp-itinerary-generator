import { useState } from 'react';
import { View } from 'react-native';

import BedAndBreakfast from '../../../assets/images/Bed&Breakfast.svg';
import Hotel from '../../../assets/images/Hotel.svg';
import Inn from '../../../assets/images/Inn.svg';
import AccommodationTypeCard from '../Card/traveler/AccommodationTypeCard';

interface AccommodationSelectionProps {
  onOptionChange: (option: string) => void;
  initialSelectedOption: string;
}

export default function AccommodationSelection({
  onOptionChange,
  initialSelectedOption,
}: AccommodationSelectionProps) {
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    onOptionChange(option);
  };

  const isOptionSelected = (option: string) => {
    return selectedOption === option;
  };

  return (
    <View className="w-72 flex-row justify-between">
      {accommodations.map((accommodation, i) => (
        <AccommodationTypeCard
          key={i}
          icon={accommodation.icon}
          title={accommodation.title}
          isSelected={isOptionSelected(accommodation.keyword)}
          onPress={() => handleOptionChange(accommodation.keyword)}
        />
      ))}
    </View>
  );
}

const accommodations = [
  {
    title: 'Hotel',
    icon: <Hotel height={35} width={35} />,
    keyword: 'Hotel',
  },
  {
    title: 'Inn',
    icon: <Inn height={30} width={30} />,
    keyword: 'Inn',
  },
  {
    title: 'Bed & Breakfast',
    icon: <BedAndBreakfast height={30} width={30} />,
    keyword: 'Bed & breakfast',
  },
];
