import React, {useState, useEffect} from 'react';

import {
  Text,
  TextInput,
  View,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';

import {openDatabase} from 'react-native-sqlite-storage';
import BackButton from '../components/Atoms/BackButton';
import HeaderImage from '../components/Atoms/HeaderImage';
import ScreenName from '../components/Atoms/ScreenName';

var db = openDatabase({name: 'Database.db'});

const AnotasiAction = ({navigation, route}) => {
  const verse = route.params.ayat;
  const [ayatNya, setAyatNya] = useState(verse);
  const [anotasiAyat, setAnotasiAyat] = useState('');
  console.log(ayatNya, anotasiAyat);
  useEffect(() => {
    db.transaction(function (txn) {
      txn.executeSql(
        "SELECT name FROM sqlite_master WHERE type='table' AND name='Anotasi_Table'",
        [],
        function (tx, res) {
          console.log('item:', res.rows.length);
          if (res.rows.length == 0) {
            txn.executeSql('DROP TABLE IF EXISTS Anotasi_Table', []);
            txn.executeSql(
              'CREATE TABLE IF NOT EXISTS Anotasi_Table(anotasi_id INTEGER PRIMARY KEY AUTOINCREMENT, ayat VARCHAR(255), anotasi_ayat VARCHAR(255))',
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
        'INSERT INTO Anotasi_Table (ayat, anotasi_ayat) VALUES (?, ?)',
        [ayatNya, anotasiAyat],
        (tx, results) => {
          console.log('Results', results.rowsAffected);
          if (results.rowsAffected > 0) {
            Alert.alert(
              'Berhasil',
              'Catatan telah ditambahkan ke Anotasi',
              [
                {
                  text: 'Ok',
                  onPress: () => navigation.goBack(),
                },
              ],
              {cancelable: false},
            );
          } else {
            Alert.alert('Gagal menambahkan Anotasi');
          }
        },
      );
    });

    viewAnotasi();
  };

  const viewAnotasi = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Anotasi_Table', [], (tx, results) => {
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
          <ScreenName halaman="Anotation" />
        </View>
      </View>
      <View>
        <Text style={styles.componentAyat}>{verse}</Text>
        <TextInput
          style={styles.text}
          placeholder="Tuliskan catatan untuk ayat disini"
          onChangeText={setAnotasiAyat}
        />
        <TouchableOpacity style={styles.buttondel} onPress={insertData}>
          <Text style={styles.tambah}>Tambahkan ke Anotasi</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default AnotasiAction;

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
  text: {
    backgroundColor: 'white',
    padding: 5,
    marginTop: 10,
    marginHorizontal: 20,
    borderRadius: 5,
    borderWidth: 0.5,
    borderColor: 'black',
  },
  componentAyat: {
    backgroundColor: 'rgba(164, 118, 50, 0.17)',
    marginVertical: 7,
    marginHorizontal: 20,
    padding: 8,
  },
  tambah: {
    backgroundColor: '#926E39',
    color: 'white',
    padding: 9,
    borderBottomWidth: 2,
    borderRightWidth: 1,
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
});
