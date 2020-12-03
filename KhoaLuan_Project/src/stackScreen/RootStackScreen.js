import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import SigninScreen from '../screens/SignInScreen';
import HomeStackScreen from '../stackScreen/HomeStackScreen';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <NavigationContainer>
    <RootStack.Navigator headerMode="none" initialRouteName="SplashScreen">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      {/* <RootStack.Screen name="SplashScreen2" component={SplashScreen2} /> */}
      <RootStack.Screen name="SigninScreen" component={SigninScreen} />
      <RootStack.Screen name="HomeStackScreen" component={HomeStackScreen} />
    </RootStack.Navigator>
  </NavigationContainer>
);

export default RootStackScreen;
