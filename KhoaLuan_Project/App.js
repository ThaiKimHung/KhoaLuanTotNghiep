import React from 'react';
import {View, Text, Button} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import RootStackScreen from './src/stackScreen/RootStackScreen';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppStack from './src/stackScreen/AppStack';

const Stack = createStackNavigator();
export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        {/* <RootStackScreen></RootStackScreen> */}
        <NavigationContainer>
          <Stack.Navigator headerMode="none">
            <Stack.Screen name="AppStack" component={AppStack} />
          </Stack.Navigator>
        </NavigationContainer>
        <FlashMessage position="top" floating={true} />
      </View>
    );
  }
}
