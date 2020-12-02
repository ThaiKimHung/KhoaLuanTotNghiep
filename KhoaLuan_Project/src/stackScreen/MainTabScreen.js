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
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';

import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailScreen';
// import ExploreScreen from './ExploreScreen';
// import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/Ionicons';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();

const Tab = createBottomTabNavigator();

const MainTabScreen = () => (
  <Tab.Navigator initialRouteName="Home" activeColor="#fff">
    <Tab.Screen
      name="Home"
      component={HomeStackScreen}
      options={{
        tabBarLabel: 'Home',
        tabBarColor: '#009387',
        tabBarIcon: ({color}) => (
          <Icon name="home-outline" color={color} size={26} />
        ),
      }}
    />
    <Tab.Screen
      name="Details"
      component={DetailsStackScreen}
      options={{
        tabBarLabel: 'Details',
        tabBarColor: '#1f65ff',
        tabBarIcon: ({color}) => (
          <Icon name="battery-half-outline" color={color} size={26} />
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
    <DetailStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#009387',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerTitleAlign: 'center',
      }}>
      <DetailStack.Screen
        name="Details"
        component={DetailsScreen}
        options={{
          title: 'Details',
          headerLeft: () => (
            <Icon.Button
              name="grid-outline"
              size={25}
              backgroundColor="#009387"
              onPress={() => navigation.openDrawer()}></Icon.Button>
          ),
        }}></DetailStack.Screen>
    </DetailStack.Navigator>
  );
};
