import React from 'react';
import { Text, View } from 'react-native';

import EditBusinessTimeSelector from '~/components/BusinessOperator/EditOperatingHours/EditTimeSelector';
import { days, DayValue } from '~/constant/constant';
import { OperatingHour } from '~/graphql/generated';
import EditOpeningHourCheckbox from './EditOpeningHourCheckbox';

interface BusinessDayItemProps {
  day: number;
  startTime: Date;
  endTime: Date;
  isClosed: boolean;
  is24Hours: boolean;
  operatingHours: OperatingHour[];
  setOperatingHours: React.Dispatch<React.SetStateAction<OperatingHour[]>>;
}

const BusinessDayItem: React.FC<BusinessDayItemProps> = ({
  day,
  startTime,
  endTime,
  isClosed,
  is24Hours,
  operatingHours,
  setOperatingHours,
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
          <EditBusinessTimeSelector
            day={day}
            endTime={endTime}
            startTime={startTime}
            operatingHours={operatingHours}
            setOperatingHours={setOperatingHours}
          />
        )}
        <EditOpeningHourCheckbox
          day={day}
          option={`${isClosed ? 'CLOSED' : is24Hours ? '24 HOURS OPEN' : null}`}
          options={['24 HOURS OPEN', 'CLOSED']}
          operatingHours={operatingHours}
          setOperatingHours={setOperatingHours}
        />
      </View>
    </View>
  );
};

export default BusinessDayItem;
