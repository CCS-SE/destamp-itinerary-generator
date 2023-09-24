import React from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const VerificationOptionCard = ({
  title,
  description,
  icon,
  onPress,
}: {
  title: string;
  description: string;
  icon: ImageSourcePropType[];
  onPress: (params: object) => void;
}) => {
  return (
    <View>
      <TouchableOpacity onPress={() => onPress(onPress)}>
        <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.content}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.description}>{description}</Text>
            </View>
            <View style={styles.iconBox}>
              <FlatList
                data={icon}
                renderItem={({ item }) => (
                  <Image source={item} style={styles.icon}></Image>
                )}
              />
            </View>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 301,
    height: 170,
    backgroundColor: '#FAFAFA66',
    borderRadius: 10,
    borderWidth: 1,
    padding: 10,
    margin: 20,
    justifyContent: 'center',
  },
  content: {
    alignContent: 'center',
    width: 200,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignContent: 'center',
    alignSelf: 'center',
  },
  title: {
    fontSize: 15,
    fontFamily: 'Poppins',
    color: '#FC8040',
  },
  description: {
    fontSize: 11,
    fontFamily: 'Poppins',
    color: '#818181',
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
  },
  iconBox: {
    height: 70,
  },
});
export default VerificationOptionCard;
