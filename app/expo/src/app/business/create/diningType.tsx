import React from 'react';
import { StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Questions from '~/components/BusinessOperator/Question';
import CustomButtom from '~/components/Button/CustomButtom';

const DiningType = () => {
  return (
    <View style={{ alignItems: 'center', backgroundColor: 'white', flex: 1 }}>
      <SafeAreaView>
        <Questions question={'Dining Type'} />
        <View style={styles.row}>
          <CustomButtom
            content={'Fast Food'}
            height={50}
            width={130}
            onClickColor={'pink'}
            onPress={() => undefined}
          />
          <CustomButtom
            content={'Fine Dining'}
            height={50}
            width={130}
            onClickColor={'pink'}
            onPress={() => undefined}
          />
        </View>
        <View style={styles.row}>
          <CustomButtom
            content={'Casual Dining'}
            height={50}
            width={130}
            onClickColor={'pink'}
            onPress={() => undefined}
          />
          <CustomButtom
            content={'Buffet'}
            height={50}
            width={130}
            onClickColor={'pink'}
            onPress={() => undefined}
          />
        </View>

        <Questions question={'Atmosphere'} />
        <View style={styles.row}>
          <CustomButtom
            content={'Upscale'}
            height={50}
            width={130}
            onClickColor={'pink'}
            onPress={() => undefined}
          />
          <CustomButtom
            content={'Romantic'}
            height={50}
            width={130}
            onClickColor={'pink'}
            onPress={() => undefined}
          />
        </View>
        <View style={styles.row}>
          <CustomButtom
            content={'Family Friendly'}
            height={50}
            width={130}
            onClickColor={'pink'}
            onPress={() => undefined}
          />
          <CustomButtom
            content={'Casual'}
            height={50}
            width={130}
            onClickColor={'pink'}
            onPress={() => undefined}
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
