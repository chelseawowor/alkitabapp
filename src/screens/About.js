import {StyleSheet, Text, View, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import HeaderImage from '../components/Atoms/HeaderImage';
import BackButton from '../components/Atoms/BackButton';
import ScreenName from '../components/Atoms/ScreenName';
import {ScrollView} from 'react-native-gesture-handler';

const AboutScreen = ({navigation}) => {
  return (
    <View style={styles.c}>
      <HeaderImage />
      <View style={styles.component}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackButton />
        </TouchableOpacity>
        <View style={styles.nama}>
          <ScreenName halaman="TENTANG KAMI" />
        </View>
      </View>
      <ScrollView>
        <View style={styles.container}>
          <Image
            style={styles.logo}
            source={require('../assets/icons/Logo.png')}
          />
          <Text style={styles.labelnama}>WUKE SUSI</Text>
          <Text style={styles.labelnama}>WATTI'U ALALUSASSA</Text>
          <View style={styles.gap}>
            <Text style={styles.kalimat}>
              Adalah Alkitab Elektronik berbahasa daerah Talaud.
            </Text>
            <Text style={styles.kalimat}>
              Alkitab ini dibuat oleh mahasiswi Fakultas Ilmu Komputer, Jurusan
              Sistem Informasi Universitas Klabat sebagai Tugas Akhir kami untuk
              membantu melestarikan budaya daerah khususnya bahasa daerah di
              Sulawesi Utara.
            </Text>
            <Text style={styles.kalimat2}>
              Developed by: Chelsea Wowor, Eirene Wowor dan Bpk. Reynoldus
              Sahulata
            </Text>
          </View>
          <Image
            style={styles.imaggg}
            source={require('../assets/icons/torang.png')}
          />
          <Text>Lembaga bersangkutan:</Text>
          <View style={styles.img}>
            <Image
              style={styles.imag}
              source={require('../assets/icons/logouk.png')}
            />
            <Image
              style={styles.imagg}
              source={require('../assets/icons/Logo.FIK.png')}
            />
          </View>
        </View>
      </ScrollView>
    </View>
  );
};
export default AboutScreen;

const styles = StyleSheet.create({
  c: {
    flex: 1,
    backgroundColor: 'white',
  },
  component: {
    paddingTop: 12,
    flexDirection: 'row',
    paddingLeft: 10,
    borderBottomColor: '#926E39',
    borderBottomWidth: 2,
    paddingBottom: 10,
    backgroundColor: 'white',
  },
  nama: {
    marginStart: 70,
  },
  labelnama: {
    textAlign: 'center',
    color: '#51391D',
    fontSize: 20,
    fontFamily: 'Bentham-Regular',
    marginTop: 4,
  },
  container: {
    alignItems: 'center',
  },
  logo: {
    width: 49,
    height: 85,
    marginTop: 40,
  },
  kalimat: {
    textAlign: 'center',
    color: '#51391D',
    fontSize: 14,
    fontFamily: 'Bentham-Regular',
    marginTop: 4,
    marginHorizontal: 15,
  },
  kalimat2: {
    marginTop: 40,
    textAlign: 'center',
    color: '#51391D',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
    marginHorizontal: 15,
  },
  gap: {
    marginTop: 30,
  },
  img: {
    flexDirection: 'row',
  },
  imag: {
    margin: 10,
    width: 120,
    height: 120,
  },
  imagg: {
    width: 150,
    height: 150,
  },
  imaggg: {
    margin: 10,
    width: 140,
    height: 120,
  },
});
