import React from 'react';
import {View, Text, SafeAreaView} from 'react-native';

import {NetworkContext} from './NetworkProvider';

export class StatusConnect extends React.PureComponent {
  static contextType = NetworkContext;

  render() {
    return (
      <View style={{position: 'absolute'}}>
        <Text>
          You are now {this.context.isConnected ? 'online' : 'offline'}
        </Text>
      </View>
    );
  }
}
