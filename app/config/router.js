import React from 'react';
import { TabNavigator, StackNavigator,DrawerNavigator } from 'react-navigation';
import { Icon, Button } from 'native-base';

import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Home from '../screens/Home';
import ListSekolah from '../screens/ListSekolah';
import MapSekolah from '../screens/MapSekolah';
import DetailSekolah from '../screens/DetailSekolah';
import AboutApp from '../screens/AboutApp';
import MyAkun from '../screens/MyAkun';
import EditMyAkun from '../screens/EditMyAkun';
import KomentarSekolah from '../screens/Komentar';
import DetailSekolah_Map from '../screens/DetailSekolah_Map';
import LikeSekolah from '../screens/LikeSekolah';

// Navigation
export const MapSekolah_Stack = StackNavigator({
  MapSekolah: {
    screen: MapSekolah,
    navigationOptions: ({ d }) => ({
      header: null,
    }),
  },
  DetailSekolah_Map: {
    screen: DetailSekolah_Map,
    navigationOptions: ({ d }) => ({
      header: null,
    }),
  },
}, {
  mode: 'card',
  headerMode: 'float',
});

export const ListSekolah_Stack = StackNavigator({
  ListSekolah: {
    screen: ListSekolah,
    navigationOptions: {
      header: null,
    },
  },
  DetailSekolah: {
    screen: DetailSekolah,
    navigationOptions: {
      header: null,
    },
  },
  KomentarSekolah: {
    screen: KomentarSekolah,
    navigationOptions: ({ d }) => ({
      header: null,
    }),
  },
  LikeSekolah: {
    screen: LikeSekolah,
    navigationOptions: ({ d }) => ({
      header: null,
    }),
  },
}, {
  mode: 'card',
  headerMode: 'float',
});

export const MyAkun_Stack = StackNavigator({
  MyAkun: {
    screen: MyAkun,
    navigationOptions: ({ d }) => ({
      header: null,
    }),
  },
  EditMyAkun: {
    screen: EditMyAkun,
    navigationOptions: ({ d }) => ({
      header: null,
    }),
  },
}, {
  mode: 'card',
  headerMode: 'float',
});

export const Dasboard = DrawerNavigator({
  Home: {
    screen: Home,
    navigationOptions: ({ d }) => ({
      drawerLabel: 'Home',
      drawerIcon:  <Icon name='home' />,
    }),  
  }, 
  MyAkun: {
    screen: MyAkun_Stack,
    navigationOptions: ({ d }) => ({
      drawerLabel: 'Akun Saya',
      drawerIcon:  <Icon name='contact' />,
    }), 
  }, 
  ListSekolah: {
    screen: ListSekolah_Stack,
    navigationOptions: {
      drawerLabel: 'List Sekolah',
      drawerIcon:  <Icon name='school' />,
    }  
  }, 
  MapSekolah: {
    screen: MapSekolah_Stack,
    navigationOptions: ({ d }) => ({
      drawerLabel: 'Map Sekolah',
      drawerIcon:  <Icon name='map' />,
    }),   
  },
  AboutApp: {
    screen: AboutApp,
    navigationOptions: {
      drawerLabel: 'About App',
      drawerIcon:  <Icon name='information-circle' />,
    }  
  },
});

export const Root = StackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header: null,
    },
  },
  SignUp: {
    screen: SignUp,
    navigationOptions: ({ d }) => ({
      title: 'Sign Up',
    }),
  },
  Dasboard: {
    screen: Dasboard,
    navigationOptions: ({ d }) => ({
      header: null,
    }),
  },
}, {
  mode: 'card',
  headerMode: 'float',
});
