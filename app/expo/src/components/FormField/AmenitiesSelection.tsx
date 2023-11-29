import { useEffect, useState } from 'react';
import { MultipleSelectList } from 'react-native-dropdown-select-list';

interface AmenityProps {
  key: string;
  value: string;
}

interface AmenitiesSelectionProps {
  data: AmenityProps[] | [];
  onOptionChange: (options: string[]) => void;
  initialSelectedOptions: string[];
}

export default function AmenitiesSelection({
  data,
  onOptionChange,
  initialSelectedOptions,
}: AmenitiesSelectionProps) {
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
      boxStyles={{ borderColor: '#FC8040', borderWidth: 2, width: '90%' }}
      dropdownStyles={{
        borderColor: '#FC8040',
        borderWidth: 2,
        width: '90%',
      }}
      badgeStyles={{ backgroundColor: '#F9E3E8' }}
      labelStyles={{ color: '#DE4D6C', fontSize: 16 }}
      badgeTextStyles={{ color: '#DE4D6C' }}
      placeholder="Select amenities"
      searchPlaceholder="Select amenities"
    />
  );
}
