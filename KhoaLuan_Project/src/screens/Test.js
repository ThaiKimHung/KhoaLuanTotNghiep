import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput,
  Alert,
} from 'react-native';

export default class Test extends React.Component {
  constructor(props) {
    super(props);
    this.state = {text: 'Useless Placeholder'};
  }
  render() {
    return (
      <View>
        <TextInput
          style={{height: 40, borderColor: 'gray', borderWidth: 1}}
          onChangeText={(text) => this.setState({text})}
          value={this.state.text}
        />
        <Button
          title="nhấn"
          onPress={() => {
            alert(this.state.text);
          }}></Button>
      </View>
    );
  }
}
