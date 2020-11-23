/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SplashScreen from './src/screens/SplashScreen';
import SignInScreen from './src/screens/SignInScreen';
import Main from './src/screens/Main';
import RootStackScreen from './src/screens/RootStackScreen';
import HomeScreen from './src/screens/HomeScreen';

AppRegistry.registerComponent(appName, () => RootStackScreen);
