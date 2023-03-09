import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';

const BackButton = () => {
  return (
    <View>
      <TouchableOpacity style={styles.kembali}>
        <Image
          style={styles.component}
          source={require('../../assets/icons/kembali.png')}
        />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  kembali: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  component: {
    paddingTop: 2,
    paddingBottom: 5,
    paddingLeft: 8,
  },
});
