import React, { useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

interface ItemProps {
  id: number | string;
  name: string;
}

interface GeocoderProps {
  placeholder: string;
  onChange: (selectedValue: string) => void;
}

interface MapboxLocation {
  id: string;
  place_name: string;
}

export default function GeocoderSearch({
  placeholder,
  onChange,
}: GeocoderProps) {
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState('');
  const [results, setResults] = useState<MapboxLocation[]>([]);

  const handlOnClearPress = () => {
    setSearch('');
    setSelectedValue('');
    onChange('');
    setResults([]);
  };

  const handleQueryChange = async (searchText: string) => {
    setSearch(searchText);

    const bbox =
      '122.49387407547306%2C10.678857423038792%2C122.60062156657557%2C10.757309505422896'; // boundary of search result

    const MAPBOX_API_KEY = Constants.expoConfig?.extra
      ?.MAPBOX_API_KEY as string;

    try {
      const response = await axios.get(
        `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
          searchText,
        )}.json?country=ph&bbox=${bbox}&access_token=${MAPBOX_API_KEY}`,
      );

      const data = await response.data;
      setResults(data.features);
    } catch (error) {
      console.error('Error geocoding:', error);
    }
  };

  const ItemView = ({ name }: ItemProps) => {
    const handleItemPress = () => {
      setSearch(name);
      setSelectedValue(name);
      onChange(name);
      setResults([]);
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
          onChangeText={handleQueryChange}
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
      <FlatList
        scrollEnabled={false}
        data={results}
        renderItem={({ item }) => (
          <ItemView name={item.place_name} id={item.id} />
        )}
      />
    </View>
  );
}
