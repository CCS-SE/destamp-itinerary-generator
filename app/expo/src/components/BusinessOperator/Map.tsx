import React, { useEffect, useRef, useState } from 'react';
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import Constants from 'expo-constants';
import { MaterialIcons } from '@expo/vector-icons';
import axios from 'axios';

import addBusinessFormStore from '~/store/addBusinessFormStore';

interface MapProps {
  latitude?: number;
  longitude?: number;
  businessName?: string;
  address?: string;
  setEditAddress?: React.Dispatch<React.SetStateAction<string>>;
  setLongitude?: React.Dispatch<React.SetStateAction<number>>;
  setLatitude?: React.Dispatch<React.SetStateAction<number>>;
}

type Coordinate = [number, number];

interface MapboxLocation {
  place_name: string;
  name: string;
  center: Coordinate;
}

const Map: React.FC<MapProps> = (props: MapProps) => {
  const { basicInfo, setData } = addBusinessFormStore();
  const mapRef = useRef<MapView | null>(null);
  const [location, setLocation] = useState({
    latitude: props.latitude ? props.latitude : basicInfo.latitude,
    longitude: props.longitude ? props.longitude : basicInfo.longitude,
  });
  const [search, setSearch] = useState('');
  const [selectedValue, setSelectedValue] = useState<MapboxLocation>({
    name: '',
    center: [0, 0],
    place_name: '',
  });
  const [results, setResults] = useState<MapboxLocation[]>([]);
  const [address, setAddress] = useState(
    props.address ? props.address : basicInfo.address,
  );

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

  const handlOnClearPress = () => {
    setSearch('');
    setSelectedValue({
      name: '',
      center: [0, 0],
      place_name: '',
    });
    setResults([]);
    setData({
      step: 1,
      data: {
        ...basicInfo,
        address: '',
        latitude: undefined,
        longitude: undefined,
      },
    });
  };

  const getAddress = async (latitude: number, longitude: number) => {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    );

    if (res.data) {
      setAddress(res.data.display_name);
      setSearch(res.data.display_name);
      if (props.setEditAddress) {
        props.setEditAddress(res.data.display_name);
      } else {
        setData({
          step: 1,
          data: {
            ...basicInfo,
            address: res.data.display_name,
          },
        });
      }
      return res.data.display_name as string;
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
      setData({
        step: 1,
        data: {
          ...basicInfo,
          address: place_name,
          latitude: center[1],
          longitude: center[0],
        },
      });
      if (mapRef.current) {
        mapRef.current.animateToRegion(
          {
            latitude: center[1],
            longitude: center[0],
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0121,
          },
          500,
        );
      }
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

  useEffect(() => {
    if (location) {
      getAddress(location.latitude as number, location.longitude as number);
    }
  }, [location]);

  return (
    <View>
      <View className="mb-2 h-10 rounded-md border">
        <TextInput
          onChangeText={handleQueryChange}
          placeholder={search ? selectedValue.place_name : ''}
          value={search}
          className="ml-2 flex-1 pb-0.5 font-poppins text-base text-gray-500"
        />
        {search ? (
          <TouchableOpacity
            onPress={handlOnClearPress}
            className="absolute right-3 top-2 rounded-full  bg-orange-400"
          >
            <MaterialIcons name="clear" size={20} color="white" />
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
      <MapView
        ref={mapRef}
        style={{ flex: 1, height: 200 }}
        initialRegion={{
          latitude: location.latitude as number,
          longitude: location.longitude as number,
          latitudeDelta: 0.0122,
          longitudeDelta: 0.0121,
        }}
        onPress={(event) => {
          setLocation(event.nativeEvent.coordinate);
          if (props.setLatitude && props.setLongitude) {
            props.setLatitude(event.nativeEvent.coordinate.latitude);
            props.setLongitude(event.nativeEvent.coordinate.longitude);
          } else {
            setData({
              step: 1,
              data: {
                ...basicInfo,
                address: address,
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
              },
            });
          }
          if (mapRef.current) {
            mapRef.current.animateToRegion(
              {
                latitude: event.nativeEvent.coordinate.latitude,
                longitude: event.nativeEvent.coordinate.longitude,
                latitudeDelta: 0.0122,
                longitudeDelta: 0.0121,
              },
              500,
            );
          }
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: location.latitude as number,
              longitude: location.longitude as number,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;
