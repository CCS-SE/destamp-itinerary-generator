import React from 'react';
import { Text, View } from 'react-native';

import BusinessHourSelector from '~/components/BusinessOperator/OperatingHours/TimeSelector';
import OpeningHourCheckbox from './OpeningHourCheckBox';

interface BusinessDayItemProps {
  day: string;
  // id: number;
  // onDelete: (id: number) => void;
}

const BusinessDayItem: React.FC<BusinessDayItemProps> = ({ day }) => {
  const [selectedStatus, setSelectedStatus] = React.useState<string | null>(
    null,
  );

  const handleStatusSelect = (status: string | null) => {
    console.log('Selected Status:', status);
    setSelectedStatus(status);
  };
  return (
    <View
      style={{
        margin: 10,
      }}
    >
      <View style={{ justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row' }}>
          <Text
            style={{
              fontFamily: 'Poppins',
              fontSize: 18,
              color: '#FFBD59',
              paddingBottom: 8,
            }}
          >
            {day}
          </Text>
        </View>

        <OpeningHourCheckbox
          options={['24 HOURS OPEN', 'CLOSED']}
          onSelect={handleStatusSelect}
        />

        {selectedStatus !== '24 HOURS OPEN' && selectedStatus !== 'CLOSED' && (
          <BusinessHourSelector />
        )}
      </View>
      {/* <View style={{ alignItems: 'center', marginLeft: 10 }}>
        <TouchableOpacity onPress={handleDelete}>
          <MaterialIcons name="delete" size={24} color="gray" />
        </TouchableOpacity>
      </View> */}
    </View>
  );
};

export default BusinessDayItem;
