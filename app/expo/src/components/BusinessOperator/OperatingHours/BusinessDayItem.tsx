import React from 'react';
import { Text, View } from 'react-native';

import BusinessHourSelector from '~/components/BusinessOperator/OperatingHours/TimeSelector';
import { days, DayValue } from '~/constant/constant';
import OpeningHourCheckbox from './OpeningHourCheckBox';

interface BusinessDayItemProps {
  day: number;
  startTime: Date;
  endTime: Date;
  isClosed: boolean;
  is24Hours: boolean;
}

const BusinessDayItem: React.FC<BusinessDayItemProps> = ({
  day,
  startTime,
  endTime,
  isClosed,
  is24Hours,
}) => {
  return (
    <View className="mb-3 rounded-2xl bg-gray-100 p-2">
      <View style={{ justifyContent: 'space-between' }}>
        <Text
          style={{
            fontFamily: 'Poppins',
            fontSize: 20,
            color: '#FA8E56',
          }}
        >
          {days[day as DayValue]}
        </Text>
        {!is24Hours && !isClosed && (
          <BusinessHourSelector
            day={day}
            endTime={endTime}
            startTime={startTime}
          />
        )}
        <OpeningHourCheckbox
          day={day}
          option={`${isClosed ? 'CLOSED' : is24Hours ? '24 HOURS OPEN' : null}`}
          options={['24 HOURS OPEN', 'CLOSED']}
        />
      </View>
    </View>
  );
};

export default BusinessDayItem;
