import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import SigninScreen from '../screens/SignInScreen';
import MainTabScreen from './MainTabScreen';
import ScreenLoaiBaiDang from '../screens/ScreenLoaiBaiDang';
import ScreenCaiDat from '../screens/ScreenCaiDat';
// import SignUpScreen from './SignUpđéwqwwwww    Screen';

const HomeStack = createStackNavigator();

const HomeStackScreen = () => (
  // <NavigationContainer>
  <HomeStack.Navigator headerMode="none" initialRouteName="MainTabScreen">
    <HomeStack.Screen name="MainTabScreen" component={MainTabScreen} />
    <HomeStack.Screen name="ScreenLoaiBaiDang" component={ScreenLoaiBaiDang} />
    {/* <HomeStack.Screen name="ScreenCaiDat" component={ScreenCaiDat} /> */}
    {/* <RootStack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
  </HomeStack.Navigator>
  // </NavigationContainer>
);

export default HomeStackScreen;
