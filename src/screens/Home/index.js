import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Text,
  SafeAreaView,
  Image,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import HeaderImage from '../../components/Atoms/HeaderImage';
import ScreenName from '../../components/Atoms/ScreenName';
import {openDatabase} from 'react-native-sqlite-storage';

var db = openDatabase({
  name: 'cobaa.db',
  readOnly: true,
  createFromLocation: '~www/cobaa.db',
});
const Home = ({navigation}) => {
  const [flatListItems, setFlatListItems] = useState([]);

  useEffect(() => {
    db.transaction(tx => {
      tx.executeSql('SELECT * FROM namaKitab', [], (tx, results) => {
        var temp = [];
        for (let i = 0; i < results.rows.length; ++i) {
          temp.push(results.rows.item(i));
        }
        setFlatListItems(temp);
        console.log(setFlatListItems);
      });
    });
  }, []);

  return (
    <SafeAreaView>
      <HeaderImage />
      <View style={styles.component}>
        <ScreenName style={styles.header} halaman="ALKITAB TALAUD" />
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <Image
            style={styles.menu}
            source={require('../../assets/icons/menu.png')}
          />
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.list}
        data={flatListItems}
        keyExtractor={item => item.bookID}
        renderItem={({item}) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Bacaan', {
                namaKitab: `${item.bookName}`,
                kitabID: `${item.bookID}`,
                kitabChp: `${item.chapters}`,
              });
            }}>
            <Text style={styles.nama}>{item.bookName}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  component: {
    paddingTop: 10,
    paddingBottom: 10,
    marginBottom: 5,
    paddingRight: 10,
    flexDirection: 'row',
    paddingLeft: 15,
    backgroundColor: 'rgba(164, 118, 50, 0.15)',
    borderBottomWidth: 0.5,
    borderBottomColor: '#926E39',
  },
  menu: {
    marginLeft: 177,
    width: 30,
    height: 30,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 10,
    flexDirection: 'row',
    paddingLeft: 15,
    backgroundColor: 'rgba(164, 118, 50, 0.17)',
  },
  nama: {
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
    shadowOpacity: 0.23,
    shadowRadius: 2.62,

    elevation: 4,
  },
  list: {
    height: '73%',
  },
});
