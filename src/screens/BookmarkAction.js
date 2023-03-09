import React, {useState, useEffect} from 'react';

import {Text, View, StyleSheet, Alert, TouchableOpacity} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';
import BackButton from '../components/Atoms/BackButton';
import HeaderImage from '../components/Atoms/HeaderImage';
import ScreenName from '../components/Atoms/ScreenName';

var db = openDatabase({name: 'Database.db'});

const BookmarkAction = ({navigation, route}) => {
  const verse = route.params.ayat;
  const [ayatNya, setAyatNya] = useState(verse);
  console.log(ayatNya);
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Bookmark_Table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS Bookmark_Table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Bookmark_Table(bookmark_id INTEGER PRIMARY KEY AUTOINCREMENT, ayat VARCHAR(255))',
              [],
            );
          }
        },
      );
    });
  }, []);

  const insertData = () => {
    db.transaction(function (tx) {
      tx.executeSql(
        'INSERT INTO Bookmark_Table (ayat) VALUES (?)',
        [ayatNya],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Berhasil',
              'Ayat telah ditambahkan ke Bookmark',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.goBack(),
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Gagal menambahkan ke bookmark');
          }
        },
      );
    });

    viewBookmark();
  };

  const viewBookmark = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Bookmark_Table', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        console.log(temp);
      });
    });
  };
  return (
    <View style={styles.c}>
      <HeaderImage />
      <View style={styles.component}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>

        <View style={styles.nama}>
          <ScreenName halaman="Bookmark" />
        </View>
      </View>
      <View>
        <Text style={styles.text}>{verse}</Text>
        <TouchableOpacity onPress={insertData}>
          <Text style={styles.tambah}>Tambahkan ke Bookmark</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookmarkAction;

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
  tambah: {
    backgroundColor: '#926E39',
    color: 'white',
    padding: 6,
    borderBottomWidth: 2,
    borderRightWidth: 2,
    borderColor: 'black',
    margin: 15,
    borderRadius: 15,
    marginRight: 200,
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
    marginTop: 20,
    marginHorizontal: 10,
    margin: 3,
    fontSize: 14,
    backgroundColor: 'rgba(164, 118, 50, 0.10)',
    padding: 10,
  },
});
