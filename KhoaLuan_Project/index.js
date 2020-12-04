/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import SplashScreen from './src/screens/SplashScreen';
import SignInScreen from './src/screens/SignInScreen';

import Main from './src/screens/Main';
import RootStackScreen from './src/stackScreen/RootStackScreen';

import HomeScreen from './src/screens/HomeScreen';
import PhanChonLoaiBaiDang from './src/components/ChonLoaiBaiDang';
import ScreenLoaiBaiDang from './src/screens/ScreenLoaiBaiDang';

import HomeStackScreen from './src/stackScreen/HomeStackScreen';
import ScreenAllUser from './src/screens/ScreenAllUser';
import ScreenAllBaiDang from './src/screens/ScreenAllBaiDang';

import ScreenCaiDat from './src/screens/ScreenCaiDat';
import KhenThuong from './src/baidang/KhenThuong';

AppRegistry.registerComponent(appName, () => KhenThuong);
