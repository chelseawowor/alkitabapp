import 'react-native-gesture-handler';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import Home from '../screens/Home/index';
import Bacaan from '../screens/Bacaan';
import AboutScreen from '../screens/About';
import AnotationList from '../screens/AnotationList';
import Splash from '../screens/Splash';
import BookmarkAction from '../screens/BookmarkAction';
import BookmarkList from '../screens/BookmarkList';
import AnotasiAction from '../screens/AnotationAction';
import AnotationDelete from '../screens/AnotationDelete';
import BookmarkDelete from '../screens/BookmarkDelete';
import ShareAyat from '../components/ShareAyat';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function Root(props) {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        drawerActiveBackgroundColor: 'rgba(206, 155, 79, 0.31)',
        drawerActiveTintColor: '#51391D',
        drawerInactiveTintColor: '#51391D',
      }}>
      <Drawer.Screen
        options={{headerShown: false}}
        name="Home"
        component={Home}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="Bookmark"
        component={BookmarkList}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="Annotation"
        component={AnotationList}
      />
      <Drawer.Screen
        options={{headerShown: false}}
        name="About"
        component={AboutScreen}
      />
    </Drawer.Navigator>
  );
}

const Routes = () => {
  return (
    <Stack.Navigator initialRouteName="Splash">
      <Stack.Screen
        name="Splash"
        component={Splash}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Home"
        component={Root}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="Bacaan"
        component={Bacaan}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AnotasiAction"
        component={AnotasiAction}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookmarkAction"
        component={BookmarkAction}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="About"
        component={AboutScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AnotationList"
        component={AnotationList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookmarkList"
        component={BookmarkList}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="BookmarkDelete"
        component={BookmarkDelete}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AnotationDelete"
        component={AnotationDelete}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="ShareAyat"
        component={ShareAyat}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default Routes;
