import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import HeaderImage from '../components/Atoms/HeaderImage';
import BackButton from '../components/Atoms/BackButton';
import ScreenName from '../components/Atoms/ScreenName';

const Chapters = ({navigation, route}) => {
  const namaKitab = route.params.kitabName;
  const chapters = route.params.kitabChp;
  const kitabID = route.params.kitabId;
  var hitung = [];

  for (let i = 1; i <= chapters; i++) {
    hitung.push(
      <TouchableOpacity
        key={i}
        onPress={() =>
          navigation.navigate('Bacaan', {kitabID, namaKitab, chapters})
        }>
        <Text style={styles.nama2}>
          {namaKitab} {i}
        </Text>
      </TouchableOpacity>,
    );
  }

  return (
    <View>
      <HeaderImage />
      <View style={styles.component}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>

        <View style={styles.nama}>
          <ScreenName halaman={namaKitab} />
        </View>
      </View>
      <ScrollView>{hitung}</ScrollView>
    </View>
  );
};

export default Chapters;

//STYLE TAMPILAN
const styles = StyleSheet.create({
  pasal: {
    fontFamily: 'AbhayaLibre-Regular',
    paddingLeft: 16,
    fontSize: 17,
    color: '#51391D',
    lineHeight: 22,
    width: 500,
    height: 40,
    borderBottomColor: 'grey',
    borderBottomWidth: 0.5,
    textAlignVertical: 'center',
    alignItems: 'stretch',
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
  nama2: {
    fontFamily: 'Roboto-Regular',
    paddingHorizontal: 15,
    marginHorizontal: 15,
    marginVertical: 4,
    fontSize: 18,
    color: '#51391D',
    height: 60,
    borderBottomColor: 'grey',
    borderWidth: 0.1,
    borderRadius: 10,
    textAlignVertical: 'center',
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
  },
});
