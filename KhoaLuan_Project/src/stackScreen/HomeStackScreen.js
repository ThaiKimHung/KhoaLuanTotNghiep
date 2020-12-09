import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import MainTabScreen from './MainTabScreen';

import SplashScreen from '../screens/SplashScreen';
import SigninScreen from '../screens/SignInScreen';
import ScreenLoaiBaiDang from '../screens/ScreenLoaiBaiDang';
import ScreenCaiDat from '../screens/ScreenCaiDat';
import BaiDangStackScreen from './BaiDangStackScreen';
import ScreenDetailBaiDang from '../screens/ScreenDetailBaiDang';
import SearchUser from '../screens/SearchUser';
import HomeScreen from '../screens/HomeScreen';

import BaiDangComponent from '../components/BaiDangComponent';

import KhenThuong from '../baidang/KhenThuong';
import TinNhanh from '../baidang/TinNhanh';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  // <NavigationContainer>
  <HomeStack.Navigator headerMode="none" initialRouteName="MainTabScreen">
    <HomeStack.Screen name="MainTabScreen" component={MainTabScreen} />
    <HomeStack.Screen name="ScreenLoaiBaiDang" component={ScreenLoaiBaiDang} />
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} />
    <HomeStack.Screen name="KhenThuong" component={KhenThuong} />
    <HomeStack.Screen name="SearchUser" component={SearchUser} />
    <HomeStack.Screen name="TinNhanh" component={TinNhanh} />

    <HomeStack.Screen
      name="ScreenDetailBaiDang"
      component={ScreenDetailBaiDang}
    />
    {/* <HomeStack.Screen name="BaiDangComponent" component={BaiDangComponent} /> */}
  </HomeStack.Navigator>
  // </NavigationContainer>
);

export default HomeStackScreen;
