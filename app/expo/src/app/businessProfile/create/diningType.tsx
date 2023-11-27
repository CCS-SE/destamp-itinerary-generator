import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Questions from '~/components/BusinessOperator/Question';
import CustomButtom from '~/components/Button/CustomButtom';

const DiningType = () => {
  return (
    <View style={{ alignItems: 'center' }}>
      <SafeAreaView>
        <Questions question={'Dining Type'} />
        <View style={styles.row}>
          <CustomButtom
            content={'Fast Food'}
            height={50}
            width={130}
            onClickColor={'pink'}
          />
          <CustomButtom
            content={'Fine Dining'}
            height={50}
            width={130}
            onClickColor={'pink'}
          />
        </View>
        <View style={styles.row}>
          <CustomButtom
            content={'Casual Dining'}
            height={50}
            width={130}
            onClickColor={'pink'}
          />
          <CustomButtom
            content={'Buffet'}
            height={50}
            width={130}
            onClickColor={'pink'}
          />
        </View>

        <Questions question={'Atmosphere'} />
        <View style={styles.row}>
          <CustomButtom
            content={'Upscale'}
            height={50}
            width={130}
            onClickColor={'pink'}
          />
          <CustomButtom
            content={'Romantic'}
            height={50}
            width={130}
            onClickColor={'pink'}
          />
        </View>
        <View style={styles.row}>
          <CustomButtom
            content={'Family Friendly'}
            height={50}
            width={130}
            onClickColor={'pink'}
          />
          <CustomButtom
            content={'Casual'}
            height={50}
            width={130}
            onClickColor={'pink'}
          />
        </View>
      </SafeAreaView>
    </View>
  );
};
const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default DiningType;
