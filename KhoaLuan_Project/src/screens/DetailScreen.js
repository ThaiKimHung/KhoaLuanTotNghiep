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
import {NavigationContainer, StackActions} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
const Stack = createStackNavigator();

const DetailsScreen = ({navigation}) => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text>Detail Screen</Text>
      <Button
        title="Go to detail srceen ... again"
        onPress={() => {
          navigation.push('Details');
        }}></Button>
      <Button
        title="Go to home"
        onPress={() => {
          navigation.navigate('Home');
        }}></Button>
      <Button
        title="Go back"
        onPress={() => {
          navigation.goBack();
        }}></Button>
      <Button
        title="Go to the frist screen"
        onPress={() => {
          navigation.popToTop();
        }}></Button>
    </View>
  );
};
export default DetailsScreen;
