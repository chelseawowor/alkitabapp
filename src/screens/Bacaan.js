import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  FlatList,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  Menu,
  MenuProvider,
  MenuOptions,
  MenuTrigger,
  MenuOption,
} from 'react-native-popup-menu';
import HeaderImage from '../components/Atoms/HeaderImage';
import BackButton from '../components/Atoms/BackButton';
import ScreenName from '../components/Atoms/ScreenName';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({
  name: 'cobaa.db',
  readOnly: true,
  createFromLocation: '~www/cobaa.db',
});
const Bacaan = ({navigation, route, props}) => {
  const AID = route.params.kitabID;
  const NK = route.params.namaKitab;

  // Ambil data dari sqlite database
  const [alkitab, setAlkitab] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql(
        `SELECT * FROM DataAlkitab WHERE bookID= ${AID}`,
        [],
        (tx, results) => {
          var temp = [];
          for (let i = 0; i < results.rows.length; ++i) {
            temp.push(results.rows.item(i));
          }
          setAlkitab(temp);
        },
      );
    });
  }, []);

  const renderItem = ({item}) => {
    const verse = `${item.title} : ${item.verseNum} \n${item.verseText}`;
    const verses = `${item.title} : ${item.verseNum}`;

    return (
      <View>
        {item.verseNum === null && (
          <View>
            <TouchableOpacity key={item.index}>
              <Text style={styles.itemHeading}>{item.heading}</Text>
              <Text style={styles.item}>{item.verseText}</Text>
            </TouchableOpacity>
          </View>
        )}
        <View />
        {item.verseNum !== null && (
          <View>
            <Text style={styles.itemHeading}>{item.heading}</Text>
            <Menu style={styles.popMenu} onSelect={value => Alert.alert(value)}>
              <MenuTrigger>
                <Text style={styles.itemverse}>{verses}</Text>
                <Text style={styles.item}>{item.verseText}</Text>
              </MenuTrigger>
              <MenuOptions>
                <MenuOption
                  onSelect={() => {
                    navigation.navigate('BookmarkAction', {
                      ayat: `${verse}`,
                    });
                  }}
                  text="Tambahkan ke Bookmark"
                />
                <MenuOption
                  onSelect={() => {
                    navigation.navigate('AnotasiAction', {
                      ayat: `${verse}`,
                    });
                  }}
                  text="Tambahkan Anotasi"
                />
                <MenuOption
                  onSelect={() => {
                    navigation.navigate('ShareAyat', {
                      ayat: `${verse}`,
                    });
                  }}
                  value="Berhasil dibagikan"
                  text="Bagikan"
                />
              </MenuOptions>
            </Menu>
          </View>
        )}
      </View>
    );
  };

  return (
    <MenuProvider>
      <SafeAreaView>
        <HeaderImage />
        <View style={styles.component}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <BackButton />
          </TouchableOpacity>

          <View style={styles.nama}>
            <ScreenName halaman={NK} />
          </View>
        </View>
        <View style={styles.content}>
          <FlatList
            style={styles.bacaanComponent}
            data={alkitab}
            keyExtractor={item => item.sequenceNum}
            contentContainerStyle={{flexGrow: 1}}
            renderItem={renderItem}
          />
        </View>
      </SafeAreaView>
    </MenuProvider>
  );
};

export default Bacaan;

const styles = StyleSheet.create({
  headerStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
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
    marginLeft: 100,
  },
  itemHeading: {
    top: 15,
    fontSize: 20,
    fontWeight: '600',
    color: 'black',
  },
  item: {
    fontSize: 16,
    color: 'black',
    fontFamily: 'Roboto-Regular',
    textAlign: 'justify',
    marginHorizontal: 5,
  },
  itemverse: {
    fontSize: 16,
    fontWeight: '900',
    color: '#926E39',
    fontFamily: 'FrederickatheGreat-Regular',
  },
  bacaanComponent: {
    paddingHorizontal: 15,
    marginHorizontal: 5,
    paddingTop: 10,
    backgroundColor: 'white',
    height: '80%',
  },
});
// heading, verseNum, verseText
