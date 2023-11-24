import React from 'react';
import {
  Dimensions,
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
  mainCategory?: string;
  tags: string[];
}) => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <View style={[styles.container, { width: screenWidth * 0.85 }]}>
      <Text style={styles.title}> Establishment Category </Text>
      <Text style={styles.mainCategory}>
        {type} | {mainCategory}
      </Text>

      <Text style={styles.tagsTitle}> Tags: </Text>
      <View style={[styles.tagsHolder, { width: screenWidth * 0.85 }]}>
        <FlatList
          data={tags}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.buttonContainer}
              activeOpacity={0.9}
            >
              <Text style={styles.tags}>{item}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(_, index) => index.toString()}
          horizontal={true} // Render tags horizontally
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
    fontSize: 12,
    marginBottom: 5,
    marginLeft: 4,
  },
  tagsTitle: {
    color: '#DE4D6C',
    marginBottom: 5,
    fontFamily: 'Poppins',
    fontSize: 12,
  },
  tagsHolder: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ECB476',
    borderRadius: 10,
    height: 'auto', //sample height
  },
  buttonContainer: {
    backgroundColor: '#9CADCE73',
    borderRadius: 15,
    alignSelf: 'flex-start',
    marginRight: 5,
    padding: 1.5,
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
