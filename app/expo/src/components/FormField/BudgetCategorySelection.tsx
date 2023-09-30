import { useState } from 'react';
import { Text, View } from 'react-native';

import { ExpenseCategory } from '~/graphql/generated';
import Accommodation from '../../../assets/images/accommodation-field.svg';
import Food from '../../../assets/images/food-field.svg';
import Transpo from '../../../assets/images/transpo-field.svg';
import BudgetCategoryCard from '../Card/traveler/BudgetCategoryCard';

interface BudgetCategorySelectionProps {
  onOptionChange: (options: ExpenseCategory[]) => void;
}

export default function BudgetCategorySelection({
  onOptionChange,
}: BudgetCategorySelectionProps) {
  const [selectedOptions, setSelectedOptions] = useState([
    ExpenseCategory.Accommodation,
  ]);

  const handleOptionChange = (option: ExpenseCategory) => {
    const updatedOptions = selectedOptions.includes(option)
      ? selectedOptions.filter((selected) => selected !== option)
      : [...selectedOptions, option];

    setSelectedOptions(updatedOptions);
    onOptionChange(updatedOptions);
  };

  return (
    <View>
      <View className="flex-row">
        <BudgetCategoryCard
          icon={<Accommodation height={25} width={25} />}
          title="Accommodation"
          onPress={() => handleOptionChange(ExpenseCategory.Accommodation)}
          isSelected={selectedOptions.includes(ExpenseCategory.Accommodation)}
        />
        <BudgetCategoryCard
          icon={<Food height={25} width={25} />}
          title="Food"
          onPress={() => handleOptionChange(ExpenseCategory.Food)}
          isSelected={selectedOptions.includes(ExpenseCategory.Food)}
        />
        <BudgetCategoryCard
          icon={<Transpo height={25} width={25} />}
          title="Transportation"
          onPress={() => handleOptionChange(ExpenseCategory.Transportation)}
          isSelected={selectedOptions.includes(ExpenseCategory.Transportation)}
        />
      </View>
      <View className="flex-row">
        {selectedOptions.length < 1 ? (
          <Text className="ml-2 font-poppins text-gray-500">
            No inclusions selected
          </Text>
        ) : (
          <View className="flex-row">
            <Text className="ml-2 font-poppins text-gray-500">Include</Text>
            <Text className="ml-1 font-poppins-medium text-gray-500">
              {`${selectedOptions
                .map((option) => option.toLocaleLowerCase())
                .join(', ')}`}
            </Text>
          </View>
        )}
      </View>
    </View>
  );
}
