import React from 'react';
import MapView, { Marker } from 'react-native-maps';

interface MapProps {
  latitude: string;
  longitude: string;
  businessName: string;
  address: string;
}

const Map: React.FC<MapProps> = ({
  latitude,
  longitude,
  businessName,
  address,
}) => {
  return (
    <MapView
      style={{ flex: 1, height: 200 }}
      initialRegion={{
        latitude: parseFloat(latitude) || 10.7202,
        longitude: parseFloat(longitude) || 122.5621,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}
    >
      {latitude && longitude && (
        <Marker
          coordinate={{
            latitude: parseFloat(latitude),
            longitude: parseFloat(longitude),
          }}
          title={businessName}
          description={address}
        />
      )}
    </MapView>
  );
};

export default Map;
