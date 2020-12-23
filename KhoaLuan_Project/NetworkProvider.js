import React from 'react';
import NetInfo from '@react-native-community/netinfo';
import {Alert} from 'react-native';

export const NetworkContext = React.createContext({isConnected: true});

export class NetworkProvider extends React.PureComponent {
  constructor(props) {
    super(props);
    this.unsubscribe = NetInfo.addEventListener(this.handleConnectivityChange);
    this.state = {
      isConnected: true,
    };
  }

  componentDidMount() {
    NetInfo.addEventListener(this.handleConnectivityChange);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  handleConnectivityChange = (state) => {
    if (state.isConnected) {
      this.setState({isConnected: state.isConnected});
    } else {
      this.setState({isConnected: state.isConnected});
    }
  };

  render() {
    return (
      <NetworkContext.Provider value={this.state}>
        {this.props.children}
      </NetworkContext.Provider>
    );
  }
}
