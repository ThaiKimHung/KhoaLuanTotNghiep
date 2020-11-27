import * as React from 'react';
import {Button, View, Text} from 'react-native';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import Icon from 'react-native-vector-icons/Ionicons';

import HomeScreen from './HomeScreen';
import DetailsScreen from './DetailScreen';
import MainTabScreen from '../stackScreen/MainTabScreen';

const Stack = createStackNavigator();
const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();

const Drawer = createDrawerNavigator();
function Main() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator> */}
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen name="Home" component={MainTabScreen} />
        {/* <Drawer.Screen name="Details" component={DetailsStackScreen} /> */}
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default Main;
