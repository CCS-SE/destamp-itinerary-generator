import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';

interface ItemProps {
  id: number;
  name: string;
  image?: {
    url: string | undefined;
  } | null;
}

interface SearchableTextInputProps {
  placeholder: string;
  data: ItemProps[];
  onChange: (selectedValue: string) => void;
}

const SearchableTextInput = ({
  placeholder,
  data,
  onChange,
}: SearchableTextInputProps) => {
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [filteredData, setFilteredData] = useState<ItemProps[]>([]);

  const searchFilterFunction = (text: string) => {
    if (text) {
      const newData = data.filter(function (item) {
        const itemData = item.name ? item.name.toLowerCase() : ''.toLowerCase();
        const textData = text.toLowerCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredData(newData);
      setSearch(text);
    } else {
      setFilteredData(data);
      setSearch(text);
    }
  };

  const handlOnClearPress = () => {
    setSearch('');
    setSelectedValue('');
    onChange('');
    searchFilterFunction('');
    setFilteredData([]);
  };

  const ItemView = ({ name }: ItemProps) => {
    const handleItemPress = () => {
      setSearch(name);
      setSelectedValue(name);
      onChange(name);
      setFilteredData([]);
    };

    return (
      <TouchableOpacity onPress={handleItemPress}>
        <View className="flex- my-2">
          <Text className="font-poppins text-base text-gray-600">{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View className="h-12 w-[330] flex-row items-center justify-center rounded-xl bg-gray-100 p-2">
        <AntDesign name="search1" size={20} color="#808080" />
        <TextInput
          onChangeText={(text) => searchFilterFunction(text)}
          placeholder={search ? selectedValue : placeholder}
          value={search}
          className="ml-2 flex-1 pb-0.5 font-poppins text-base text-gray-500"
        />
        {search ? (
          <TouchableOpacity onPress={handlOnClearPress}>
            <MaterialIcons name="clear" size={20} color="#808080" />
          </TouchableOpacity>
        ) : null}
      </View>
      {!selectedValue && search && filteredData.length == 0 ? (
        <Text className="font-poppins text-base text-gray-600">
          No results found
        </Text>
      ) : (
        <FlatList
          scrollEnabled={false}
          data={filteredData}
          renderItem={({ item }) => (
            <ItemView name={item.name} id={item.id} image={item.image} />
          )}
        />
      )}
    </View>
  );
};

export default SearchableTextInput;
