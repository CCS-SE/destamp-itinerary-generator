import { useState } from 'react';
import { View } from 'react-native';

import Driving from '../../../assets/images/driving-transpo.svg';
import Walking from '../../../assets/images/walking-transpo.svg';
import TransportationStyleCard from '../Card/traveler/TransportationStyleCard';

interface TransportationStyleSelectionProps {
  onOptionChange: (option: string) => void;
  initialSelectedOption: string;
}

export default function TransportationStyleSelection({
  onOptionChange,
  initialSelectedOption,
}: TransportationStyleSelectionProps) {
  const [selectedOption, setSelectedOption] = useState(initialSelectedOption);

  const handleOptionChange = (option: string) => {
    setSelectedOption(option);
    onOptionChange(option);
  };

  const isOptionSelected = (option: string) => {
    return selectedOption === option;
  };

  return (
    <View>
      <TransportationStyleCard
        icon={<Walking height={25} width={25} />}
        title="Prefer walking"
        isSelected={isOptionSelected('Walking')}
        onPress={() => handleOptionChange('Walking')}
      />
      <TransportationStyleCard
        icon={<Driving height={25} width={25} />}
        title="Prefer driving"
        isSelected={isOptionSelected('Driving')}
        onPress={() => handleOptionChange('Driving')}
      />
    </View>
  );
}
