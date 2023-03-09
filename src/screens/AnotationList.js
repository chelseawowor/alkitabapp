import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  SafeAreaView,
} from 'react-native';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
  MenuOption,
} from 'react-native-popup-menu';
import React, {useState, useEffect} from 'react';
import HeaderImage from '../components/Atoms/HeaderImage';
import BackButton from '../components/Atoms/BackButton';
import ScreenName from '../components/Atoms/ScreenName';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({name: 'Database.db'});
const AnotasiList = ({navigation}) => {
  const [flatListItems, setFlatListItems] = useState([]);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Anotasi_Table', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setFlatListItems(temp);
      });
    });
  };

  useEffect(() => {
    getData();
  }, [flatListItems]);

  const listItemView = item => {
    const ida = item.anotasi_id;
    const verse = item.ayat;
    return (
      <View key={item.anotasi_id}>
        <Menu>
          <MenuTrigger style={styles.componentlist}>
            <View style={styles.componentAyat}>
              <Text>{item.ayat}</Text>
              <Text style={styles.text}>{item.anotasi_ayat}</Text>
            </View>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              text="Hapus"
              onSelect={() => {
                navigation.navigate('AnotationDelete', {
                  IDA: `${ida}`,
                  AYT: `${verse}`,
                });
              }}
            />
          </MenuOptions>
        </Menu>
      </View>
    );
  };

  return (
    <MenuProvider>
      <SafeAreaView style={styles.c}>
        <HeaderImage />
        <View style={styles.component}>
          <TouchableOpacity onPress={() => navigation.push('Home')}>
            <BackButton />
          </TouchableOpacity>

          <View style={styles.nama}>
            <ScreenName halaman="Annotation" />
          </View>
        </View>
        <View>
          <FlatList
            style={styles.list}
            data={flatListItems}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => listItemView(item)}
          />
        </View>
      </SafeAreaView>
    </MenuProvider>
  );
};

export default AnotasiList;

const styles = StyleSheet.create({
  c: {
    flex: 1,
    backgroundColor: 'rgba(164, 118, 50, 0.08)',
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
  text: {
    borderTopWidth: 1,
    borderTopColor: 'grey',
    padding: 5,
    marginTop: 10,
    color: 'blue',
    fontSize: 15,
  },
  componentAyat: {
    backgroundColor: 'white',
    marginVertical: 5,
    marginLeft: 10,
    padding: 8,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderRightWidth: 0.5,
    borderColor: '#926E30',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  list: {
    height: '73%',
  },
});
