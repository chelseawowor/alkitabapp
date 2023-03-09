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
const BookmarkList = ({navigation, route}) => {
  const [flatListItems, setFlatListItems] = useState([]);

  const getData = () => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM Bookmark_Table', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setFlatListItems(temp);
        console.log(setFlatListItems);
      });
    });
  };

  useEffect(() => {
    getData();
  }, [flatListItems]);

  const listItemView = item => {
    const id = item.bookmark_id;
    const Ayat = item.ayat;
    return (
      <View key={item.bookmark_id}>
        <Menu>
          <MenuTrigger>
            <Text style={styles.componentAyat}>{item.ayat}</Text>
          </MenuTrigger>
          <MenuOptions>
            <MenuOption
              text="Hapus"
              onSelect={() => {
                navigation.navigate('BookmarkDelete', {
                  ID: `${id}`,
                  AYAT: `${Ayat}`,
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
            <ScreenName halaman="Bookmark" />
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

export default BookmarkList;

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
  componentAyat: {
    backgroundColor: 'white',
    marginVertical: 7,
    marginLeft: 15,
    padding: 8,
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
