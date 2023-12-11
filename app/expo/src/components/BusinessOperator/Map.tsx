import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import axios from 'axios';

import addBusinessFormStore from '~/store/addBusinessFormStore';

interface MapProps {
  latitude?: number;
  longitude?: number;
  businessName?: string;
  address?: string;
}

const Map: React.FC<MapProps> = () => {
  const { basicInfo, setData } = addBusinessFormStore();
  const [location, setLocation] = useState({
    latitude: basicInfo.latitude,
    longitude: basicInfo.longitude,
  });

  const [address, setAddress] = useState(basicInfo.address);

  const getAddress = async (latitude: number, longitude: number) => {
    const res = await axios.get(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
    );

    if (res.data) {
      setAddress(res.data.display_name);
      return res.data.display_name as string;
    }
  };

  useEffect(() => {
    if (location) {
      getAddress(location.latitude as number, location.longitude as number);
    }
  }, [location]);

  return (
    <View>
      <MapView
        style={{ flex: 1, height: 200 }}
        initialRegion={{
          latitude: basicInfo.latitude as number,
          longitude: basicInfo.longitude as number,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        onPress={(event) => {
          setLocation(event.nativeEvent.coordinate);
          setData({
            step: 1,
            data: {
              ...basicInfo,
              address: address,
              latitude: event.nativeEvent.coordinate.latitude,
              longitude: event.nativeEvent.coordinate.longitude,
            },
          });
        }}
      >
        {location && (
          <Marker
            coordinate={{
              latitude: basicInfo.latitude as number,
              longitude: basicInfo.longitude as number,
            }}
          />
        )}
      </MapView>
    </View>
  );
};

export default Map;
