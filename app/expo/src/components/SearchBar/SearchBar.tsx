import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

const SearchBar = ({
  searchTitle,
  value,
}: {
  searchTitle: string;
  value: string;
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.row}>
        <AntDesign name="search1" size={24} color="#ECB476" margin={5} />
        <TextInput style={styles.searchTitle}>
          {searchTitle} {value}
        </TextInput>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderWidth: 1,
    borderColor: '#FFC98B',
    borderRadius: 10,
    width: 305,
    height: 50,
    padding: 5,
    justifyContent: 'center',
    margin: 10,
    alignContent: 'center',
    alignSelf: 'center',
  },
  searchTitle: {
    fontSize: 15,
    color: '#818181',
    fontFamily: 'Poppins',
    alignSelf: 'center',
    marginLeft: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
export default SearchBar;
