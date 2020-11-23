import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';
import SplashScreen from './SplashScreen';
import SigninScreen from './SignInScreen';
// import SignUpScreen from './SignUpđéwqwwwww    Screen';

const RootStack = createStackNavigator();

const RootStackScreen = () => (
  <NavigationContainer>
    <RootStack.Navigator headerMode="none" initialRouteName="SplashScreen">
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="SigninScreen" component={SigninScreen} />
      {/* <RootStack.Screen name="SignUpScreen" component={SignUpScreen} /> */}
    </RootStack.Navigator>
  </NavigationContainer>
);

export default RootStackScreen;
