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

import OneSignal from 'react-native-onesignal';

import ModalComponent from './src/modal/ModalComponent';
import Utils from './src/apis/Utils';
import Test from './src/screens/Test';
const Stack = createStackNavigator();
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isConnected: true,
      display: true,
    };
    OneSignal.setLogLevel(6, 0);

    // Replace 'YOUR_ONESIGNAL_APP_ID' with your OneSignal App ID.
    OneSignal.init('2db1f7fd-d78c-4cf2-986b-c1b505665cf8', {
      kOSSettingsKeyAutoPrompt: false,
      kOSSettingsKeyInAppLaunchURL: false,
      kOSSettingsKeyInFocusDisplayOption: 2,
    });
    OneSignal.inFocusDisplaying(2); // Controls what should happen if a notification is received while the app is open. 2 means that the notification will go directly to the device's notification center.

    // The promptForPushNotifications function code will show the iOS push notification prompt. We recommend removing the following code and instead using an In-App Message to prompt for notification permission (See step below)
    OneSignal.promptForPushNotificationsWithUserResponse(
      this.myiOSPromptCallback,
    );

    OneSignal.addEventListener('received', this.onReceived);
    OneSignal.addEventListener('opened', this.onOpened);
    OneSignal.addEventListener('ids', this.onIds);
  }

  componentWillUnmount() {
    OneSignal.removeEventListener('received', this.onReceived);
    OneSignal.removeEventListener('opened', this.onOpened);
    OneSignal.removeEventListener('ids', this.onIds);
  }

  onReceived(notification) {
    console.log('Notification received: ', notification);
  }

  onOpened(openResult) {
    console.log('Message: ', openResult.notification.payload.body);
    console.log('Data: ', openResult.notification.payload.additionalData);
    console.log('isActive: ', openResult.notification.isAppInFocus);
    console.log('openResult: ', openResult);
  }

  onIds(device) {
    console.log('Device info: ', device);
  }
  myiOSPromptCallback(permission) {
    // do something with permission value
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
        {/* <Test></Test> */}
      </View>
    );
  }
}
