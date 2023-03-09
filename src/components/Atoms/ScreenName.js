import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

const ScreenName = props => {
  return (
    <View>
      <Text style={styles.nama}>{props.halaman}</Text>
    </View>
  );
};

export default ScreenName;

const styles = StyleSheet.create({
  nama: {
    height: 19,
    top: 5,
    fontSize: 20,
    lineHeight: 22,
    textTransform: 'uppercase',
    fontFamily: 'FrederickatheGreat-Regular',
    color: '#675035',
  },
});
