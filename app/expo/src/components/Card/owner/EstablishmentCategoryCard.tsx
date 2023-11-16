import React from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

const EstablishmentCategory = ({
  type,
  mainCategory,
  tags,
}: {
  type: string;
  mainCategory: string;
  tags: string[];
}) => {
  // function onPress(tags: string[]): void {
  //   throw new Error('Function not implemented.');
  // }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Establishment Category </Text>
      <Text style={styles.mainCategory}>
        {type} | {mainCategory}
      </Text>

      <Text style={styles.tagsTitle}> Tags: </Text>
      <View style={styles.tagsHolder}>
        <FlatList
          data={tags}
          renderItem={({ item }) => (
            <TouchableOpacity
              // onPress={() => onPress([item])}
              style={styles.buttonContainer}
            >
              <Text style={styles.tags}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item, index) => index.toString()}
          horizontal={true} // Render tags horizontally
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    marginTop: 13,
  },
  title: {
    fontSize: 18,
    fontFamily: 'Poppins',
    color: '#FC8040',
    marginBottom: 2,
  },
  mainCategory: {
    fontFamily: 'Poppins',
    marginLeft: 8,
    fontSize: 12,
    marginBottom: 5,
  },
  tagsTitle: {
    color: '#F65A82',
    paddingLeft: 5,
    marginBottom: 5,
    fontFamily: 'Poppins',
    fontSize: 12,
  },
  tagsHolder: {
    padding: 5,
    borderWidth: 1,
    borderColor: '#ECB476',
    borderRadius: 10,
    width: 300,
    marginLeft: 5,
    height: 53, //sample height
  },
  buttonContainer: {
    backgroundColor: '#9CADCE73',
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginRight: 5,
    padding: 1,
  },

  tags: {
    fontFamily: 'Poppins',
    fontSize: 10,
    alignContent: 'center',
    justifyContent: 'center',
    padding: 5,
  },
});

export default EstablishmentCategory;
