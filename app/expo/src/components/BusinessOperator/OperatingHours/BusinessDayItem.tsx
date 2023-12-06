import React, { useState } from 'react';
import { Text, View } from 'react-native';

import TimeSelector from '~/components/BusinessOperator/OperatingHours/TimeSelector';
import OpeningHourCheckbox from './OpeningHourCheckBox';

interface BusinessDayItemProps {
  day: string;
  id: number;
  onAddDay: () => void;
}

const BusinessDayItem: React.FC<BusinessDayItemProps> = ({ day }) => {
  const [selectedStatus, setSelectedStatus] = useState<string | null>(null);

  const handleStatusSelect = (status: string | null) => {
    console.log('Selected Status:', status);
    setSelectedStatus(status);
  };

  return (
    <View
      style={{
        margin: 5,
        backgroundColor: '#f5f5f5',
        padding: 15,
        borderRadius: 20,
      }}
    >
      <View style={{ justifyContent: 'space-between' }}>
        <Text
          style={{
            fontFamily: 'Poppins',
            fontSize: 18,
            color: '#FF8439',
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
        <TimeSelector />
      )}
    </View>
  );
};

export default BusinessDayItem;
