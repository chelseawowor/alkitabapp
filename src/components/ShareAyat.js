import {StyleSheet, Text, View, Share, TouchableOpacity} from 'react-native';
import React from 'react';
import HeaderImage from './Atoms/HeaderImage';
import BackButton from './Atoms/BackButton';
import ScreenName from './Atoms/ScreenName';

const ShareAyat = ({navigation, route}) => {
  const verse = route.params.ayat;
  console.log(verse);
  //Here is the Share API
  Share.share({
    message: verse.toString(),
    title: 'Sharing via react native',
  })
    //after successful share return result
    .then(result => console.log(result))
    //If any thing goes wrong it comes here
    .catch(errorMsg => console.log(errorMsg));
  return (
    <View style={styles.c}>
      <HeaderImage />
      <View style={styles.component}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>

        <View style={styles.nama}>
          <ScreenName halaman="ALKITAB TALAUD" />
        </View>
      </View>
      <TouchableOpacity
        style={styles.buttondel}
        onPress={() => navigation.goBack()}>
        <Text style={styles.hapus}>Kembali ke bacaan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ShareAyat;

const styles = StyleSheet.create({
  c: {
    flex: 1,
    backgroundColor: 'white',
  },
  component: {
    paddingTop: 12,
    flexDirection: 'row',
    paddingLeft: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#926E39',
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  nama: {
    marginStart: 80,
  },
  buttondel: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 8,
  },
  hapus: {
    backgroundColor: '#926E39',
    color: 'white',
    padding: 9,
    borderBottomWidth: 2,
    borderRightWidth: 1,
    borderColor: 'black',
  },
});
