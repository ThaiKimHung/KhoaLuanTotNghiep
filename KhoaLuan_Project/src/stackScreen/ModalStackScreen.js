import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

import ModalComponent from '../components/ModalComponent';
// import SignUpScreen from './SignUpđéwqwwwww    Screen';

const ModalStack = createStackNavigator();

const ModalStackScreen = () => (
  // <NavigationContainer>
  <ModalStack.Navigator
    headerMode="none"
    initialRouteName="ModalComponent"
    screenOptions={{
      headerShown: false,
      cardStyle: {backgroundColor: 'transparent'},
      // cardOverlayEnabled: true,
      cardStyleInterpolator: ({current: {progress}}) => ({
        cardStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 0.5, 0.9, 1],
            outputRange: [0, 0.25, 0.7, 1],
          }),
        },
        overlayStyle: {
          opacity: progress.interpolate({
            inputRange: [0, 1],
            outputRange: [0, 0.2],
            extrapolate: 'clamp',
          }),
        },
      }),
    }}
    mode="modal">
    <ModalStack.Screen name="ModalComponent" component={ModalComponent} />
  </ModalStack.Navigator>
  // </NavigationContainer>
);

export default ModalStackScreen;
