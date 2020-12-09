import React from 'react';
import {View, Text, Button} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import RootStackScreen from './src/stackScreen/RootStackScreen';
export default class App extends React.Component {
  render() {
    return (
      <View style={{flex: 1}}>
        <RootStackScreen></RootStackScreen>
        <FlashMessage position="top" floating={true} />
      </View>
    );
  }
}
