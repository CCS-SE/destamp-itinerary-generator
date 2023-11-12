import React, { useState } from 'react';
import {
  Dimensions,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import { AntDesign, MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

type Coordinate = [number, number];

interface MapboxLocation {
  place_name: string;
  name: string;
  center: Coordinate;
}

interface GeocoderProps {
  placeholder: string;
  onChange: (item: MapboxLocation) => void;
}

export default function GeocoderSearch({
  placeholder,
  onChange,
}: GeocoderProps) {
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState<MapboxLocation>({
    name: '',
    center: [0, 0],
    place_name: '',
  });
  const [results, setResults] = useState<MapboxLocation[]>([]);

  const inputWidth = Dimensions.get('window').width * 0.82;

  const handlOnClearPress = () => {
    setSearch('');
    setSelectedValue({
      name: '',
      center: [0, 0],
      place_name: '',
    });
    onChange({
      name: '',
      center: [0, 0],
      place_name: '',
    });
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

  const ItemView = ({ name, center, place_name }: MapboxLocation) => {
    const handleItemPress = () => {
      setSearch(name);
      setSelectedValue({
        name: name,
        center: center,
        place_name: place_name,
      });
      onChange({
        name: name,
        center: center,
        place_name: place_name,
      });
      setResults([]);
    };

    return (
      <TouchableOpacity onPress={handleItemPress}>
        <View className="my-2">
          <Text className="font-poppins text-base text-gray-600">{name}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <View
        className="h-12 flex-row items-center justify-center rounded-xl bg-gray-100 p-2"
        style={{ width: inputWidth }}
      >
        <AntDesign name="search1" size={20} color="#808080" />
        <TextInput
          onChangeText={handleQueryChange}
          placeholder={search ? selectedValue.place_name : placeholder}
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
          <ItemView
            name={item.place_name}
            place_name={item.place_name}
            center={item.center}
          />
        )}
      />
    </View>
  );
}
