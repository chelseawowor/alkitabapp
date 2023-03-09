import {StyleSheet, Text, View, Image} from 'react-native';
import React, {useEffect} from 'react';

const Splash = ({navigation}) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Home');
    }, 2500);
  }, [navigation]);
  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={require('../assets/icons/logo2.png')}
      />
      <Text style={styles.labelnama}>WUKE SUSI</Text>
      <Text style={styles.labelnama}>WATTI'U ALALUSASSA</Text>
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  labelnama: {
    textAlign: 'center',
    color: '#51391D',
    fontSize: 22,
    fontFamily: 'Bentham-Regular',
    marginTop: 15,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  logo: {
    width: 280,
    height: 280,
  },
});
