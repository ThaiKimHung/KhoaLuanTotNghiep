import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
} from 'react-native';
import FontSize from '../components/size';

import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NhomScreen from '../screens/NhomScreen';
import ScreenAllUser from '../screens/ScreenAllUser';
import ScreenCaiDat from '../screens/ScreenCaiDat';
// import ExploreScreen from './ExploreScreen';
// import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const Tab = createBottomTabNavigator();

const home = require('../assets/images/home.png');
const group = require('../assets/images/group.png');
const install = require('../assets/images/installation-symbol.png');
const thongtin = require('../assets/images/id-card.png');

const MainTabScreen = () => (
  <Tab.Navigator
    initialRouteName="Home"
    activeColor="#fff"
    tabBarOptions={{
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray',
    }}>
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Trang Chủ',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Image
            source={home}
            style={{
              height: FontSize.scale(26),
              width: FontSize.verticalScale(26),
            }}></Image>
        ),
        tabBarBadge: 3,
      }}
    />
    <Tab.Screen
      name="Nhom"
      component={DetailsStackScreen}
      options={{
        tabBarLabel: 'Nhóm',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Image
            source={group}
            style={{
              height: FontSize.scale(26),
              width: FontSize.verticalScale(26),
            }}></Image>
        ),
      }}
    />
    <Tab.Screen
      name="DanhBa"
      component={UserStackScreen}
      options={{
        tabBarLabel: 'Danh bạ',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Image
            source={thongtin}
            style={{
              height: FontSize.scale(26),
              width: FontSize.verticalScale(26),
            }}></Image>
        ),
      }}
    />
    <Tab.Screen
      name="CaiDat"
      component={CaiDatStackScreen}
      options={{
        tabBarLabel: 'Cài Đặt',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Image
            source={install}
            style={{
              height: FontSize.scale(26),
              width: FontSize.verticalScale(26),
            }}></Image>
        ),
      }}
    />
  </Tab.Navigator>
);

export default MainTabScreen;

const HomeStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen
        name="HomeScreen"
        component={HomeScreen}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

const DetailsStackScreen = ({navigation}) => {
  return (
    <DetailStack.Navigator headerMode="none">
      <DetailStack.Screen
        name="NhomScreen"
        component={NhomScreen}></DetailStack.Screen>
    </DetailStack.Navigator>
  );
};

const UserStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen
        name="ScreenAllUser"
        component={ScreenAllUser}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};

const CaiDatStackScreen = ({navigation}) => {
  return (
    <HomeStack.Navigator headerMode="none">
      <HomeStack.Screen
        name="ScreenCaiDat"
        component={ScreenCaiDat}></HomeStack.Screen>
    </HomeStack.Navigator>
  );
};
