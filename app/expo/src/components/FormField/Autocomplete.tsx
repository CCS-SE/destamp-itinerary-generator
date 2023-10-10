import React, { useState } from 'react';
import { Dimensions, Text, View } from 'react-native';
import { AutocompleteDropdown } from 'react-native-autocomplete-dropdown';

interface ItemProps {
  id: string;
  title: string | null;
}

interface AutoCompleteInputProps {
  data: ItemProps[];
  onChange: (value: string) => void;
}

export default function AutoComplete({
  data,
  onChange,
}: AutoCompleteInputProps) {
  const inputWidth = Dimensions.get('window').width * 0.8;

  const [, setSelectedItem] = useState<ItemProps>();

  const handleChange = (item: ItemProps) => {
    if (item) {
      setSelectedItem(item);
      onChange(item.title ? item.title : '');
    }
  };

  return (
    <AutocompleteDropdown
      clearOnFocus={false}
      closeOnBlur={true}
      onSelectItem={handleChange}
      dataSet={data}
      containerStyle={{ width: inputWidth }}
      textInputProps={{
        style: {
          color: '#808080',
        },
      }}
      suggestionsListMaxHeight={500}
      suggestionsListTextStyle={{
        color: '#fff',
      }}
      renderItem={(item) => (
        <View className="bg-gray-100">
          <Text className="p-3 font-poppins text-base text-[#808080]">
            {item.title}
          </Text>
        </View>
      )}
    />
  );
}
