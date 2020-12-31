import React, {useState} from 'react';
import {View, Button, Platform, Text} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';

export default class Test2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visibility: false,
      DateDisplay: '',
    };
  }

  handleConfirm = (date) => {
    this.setState({
      DateDisplay: date.toUTCString(),
    });
  };

  onPressCancel = () => {
    this.setState({
      visibility: false,
    });
  };
  onPressButton = () => {
    this.setState({
      visibility: true,
    });
  };

  render() {
    return (
      <View style={{flex: 1}}>
        <Button title="hi" onPress={this.onPressButton}></Button>
        <Text> {this.state.DateDisplay}</Text>
        <DateTimePickerModal
          mode="date"
          isVisible={this.state.visibility}
          onConfirm={this.handleConfirm}
          onCancel={this.onPressCancel}></DateTimePickerModal>
      </View>
    );
  }
}
