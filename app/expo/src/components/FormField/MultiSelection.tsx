import { useEffect, useState } from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

interface AmenityProps {
  key: number;
  value: string;
}

interface MultiSelectionProps {
  placeholder: string;
  data: AmenityProps[] | [];
  onOptionChange: (options: string[]) => void;
  initialSelectedOptions: string[];
}

export default function MultiSelection({
  placeholder,
  data,
  onOptionChange,
  initialSelectedOptions,
}: MultiSelectionProps) {
  const [selectedOptions, setSelectedOptions] = useState<string[]>(
    initialSelectedOptions,
  );

  useEffect(() => {
    onOptionChange(selectedOptions);
  }, [selectedOptions]);

  const handleOptionChange = (options: string[]) => {
    setSelectedOptions(options);
    onOptionChange(options);
  };

  return (
    <MultipleSelectList
      setSelected={handleOptionChange}
      data={data}
      save="value"
      label="Amenities"
      boxStyles={{ borderColor: '#FC8040', borderWidth: 2 }}
      dropdownStyles={{
        borderColor: '#FC8040',
        borderWidth: 2,
      }}
      badgeStyles={{ backgroundColor: '#F9E3E8' }}
      labelStyles={{ color: '#DE4D6C', fontSize: 16 }}
      badgeTextStyles={{ color: '#DE4D6C' }}
      placeholder={`Select ${placeholder}`}
      searchPlaceholder={`Select ${placeholder}`}
    />
  );
}
