import React from 'react';
import {
  View,
  Text,
  Button,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
} from 'react-native';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import AppStack from './src/stackScreen/AppStack';
import NetInfo from '@react-native-community/netinfo';

import ModalComponent from './src/modal/ModalComponent';
import Utils from './src/apis/Utils';
const Stack = createStackNavigator();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      display: true,
    };
  }
  change() {
    this.setState({
      display: !this.state.display,
    });
    // this.props.navigation.goBack();
    // Utils.goback(this, '');
  }
  componentDidMount() {
    NetInfo.addEventListener((state) => {
      if (state.isConnected) {
        this.setState({isConnected: state.isConnected});
      } else {
        this.setState({isConnected: state.isConnected});
      }
    });
  }

  render() {
    const {display} = this.state;
    return (
      // <NetworkProvider>
      <View style={{flex: 1}}>
        <NavigationContainer>
          <Stack.Navigator
            headerMode="none"
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
            {this.state.isConnected ? (
              <Stack.Screen name="AppStack" component={AppStack} />
            ) : (
              <Stack.Screen name="ModalComponent" component={ModalComponent} />
            )}
          </Stack.Navigator>
        </NavigationContainer>

        <FlashMessage position="top" floating={true} />
      </View>
    );
  }
}
