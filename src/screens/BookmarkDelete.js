import React from 'react';
import {View, Alert, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {openDatabase} from 'react-native-sqlite-storage';
import BackButton from '../components/Atoms/BackButton';
import HeaderImage from '../components/Atoms/HeaderImage';
import ScreenName from '../components/Atoms/ScreenName';

var db = openDatabase({name: 'Database.db'});

const BookmarkDelete = ({navigation, route}) => {
  const id = route.params.ID;
  const ayat = route.params.AYAT;

  const deletebookmark = () => {
    const BID = id.toString();
    db.transaction(tx => {
      tx.executeSql(
        'DELETE FROM  Bookmark_Table where bookmark_id=?',
        [BID],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Berhasil',
              'Bookmark telah dihapus',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.navigate('BookmarkList'),
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Gagal menghapus bookmark');
          }
        },
      );
    });
  };

  return (
    <View style={styles.c}>
      <HeaderImage />
      <View style={styles.component}>
        <TouchableOpacity onPress={() => navigation.push('Home')}>
          <BackButton />
        </TouchableOpacity>

        <View style={styles.nama}>
          <ScreenName halaman="Bookmark" />
        </View>
      </View>
      <View style={styles.text}>
        <Text style={styles.text1}>
          Anda yakin ingin menghapus dari Bookmark?
        </Text>
        <Text style={styles.text2}>{ayat}</Text>
      </View>

      <TouchableOpacity style={styles.buttondel} onPress={deletebookmark}>
        <Text style={styles.hapus}>Hapus dari Bookmark</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookmarkDelete;

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
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
  buttondel: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    borderRadius: 16,
  },
  hapus: {
    backgroundColor: '#926E39',
    color: 'white',
    padding: 9,
    borderBottomWidth: 2,
    borderRightWidth: 1,
    borderColor: 'black',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,

    elevation: 14,
  },
  text: {
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 5,
  },
  text1: {
    marginTop: 90,
    fontSize: 18,
  },
  text2: {
    marginTop: 20,
    margin: 3,
    fontSize: 14,
    backgroundColor: 'rgba(164, 118, 50, 0.10)',
    padding: 10,
  },
});
