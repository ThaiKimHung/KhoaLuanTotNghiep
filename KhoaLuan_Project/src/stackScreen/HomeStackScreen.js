import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import SigninScreen from '../screens/SignInScreen';
import MainTabScreen from './MainTabScreen';
import ScreenLoaiBaiDang from '../screens/ScreenLoaiBaiDang';
import ScreenCaiDat from '../screens/ScreenCaiDat';
import BaiDangStackScreen from './BaiDangStackScreen';
// import SignUpScreen from './SignUpđéwqwwwww    Screen';
import KhenThuong from '../baidang/KhenThuong';
import ScreenDetailBaiDang from '../screens/ScreenDetailBaiDang';
import BaiDangComponent from '../components/BaiDangComponent';
const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  // <NavigationContainer>
  <HomeStack.Navigator headerMode="none" initialRouteName="MainTabScreen">
    <HomeStack.Screen name="MainTabScreen" component={MainTabScreen} />
    <HomeStack.Screen name="ScreenLoaiBaiDang" component={ScreenLoaiBaiDang} />
    <HomeStack.Screen name="KhenThuong" component={KhenThuong} />
    <HomeStack.Screen
      name="ScreenDetailBaiDang"
      component={ScreenDetailBaiDang}
    />
    {/* <HomeStack.Screen name="BaiDangComponent" component={BaiDangComponent} /> */}
  </HomeStack.Navigator>
  // </NavigationContainer>
);

export default HomeStackScreen;
