import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';
import GoBack from '../components/GoBack';
import {
  GetDSKhenThuong,
  AddBaiDang_KhenThuong,
  AddBaiDang_KhenThuong_Nhom,
  GetDSGroup,
  GetChiTietBaiDang,
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import ImagePicker from 'react-native-image-crop-picker';
const search = require('../assets/images/search.png');
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
// export default () => (
//   <Tabs.Navigator
//     tabBarOptions={{
//       activeTintColor: '#2F7C6E',
//       inactiveTintColor: '#222222',
//     }}>
//     <Tabs.Screen
//       name="Home"
//       component={Home}
//       options={{
//         tabBarIcon: ({focused, color, size}) => (
//           <Icon
//             name="Home"
//             size={size ? size : 24}
//             color={focused ? color : '#222222'}
//             focused={focused}
//             color={color}
//           />
//         ),
//       }}
//     />
//     <Tabs.Screen
//       name="Home 2"
//       component={Home2}
//       options={{
//         tabBarIcon: ({focused, color, size}) => (
//           <Icon
//             name="Home"
//             size={size ? size : 24}
//             color={focused ? color : '#222222'}
//             focused={focused}
//             color={color}
//           />
//         ),
//       }}
//     />
//   </Tabs.Navigator>
// );
import {NavigationContainer} from '@react-navigation/native';

const Tabs = AnimatedTabBarNavigator();
export default class TestTAb extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Tabs.Navigator
          tabBarOptions={{
            activeTintColor: '#2F7C6E',
            inactiveTintColor: '#222222',
          }}>
          <Tabs.Screen
            name="Home"
            component={Home}
            options={{
              tabBarIcon: ({focused, color, size}) => (
                <Icon
                  name="Home"
                  size={size ? size : 24}
                  color={focused ? color : '#222222'}
                  focused={focused}
                  color={color}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="Home 2"
            component={Home2}
            options={{
              tabBarIcon: ({focused, color, size}) => (
                <Icon
                  name="Home"
                  size={size ? size : 24}
                  color={focused ? color : '#222222'}
                  focused={focused}
                  color={color}
                />
              ),
            }}
          />
        </Tabs.Navigator>
      </NavigationContainer>
    );
  }
}

const Home = () => {
  return (
    <View>
      <Text>home</Text>
    </View>
  );
};

const Home2 = () => {
  return (
    <View>
      <Text>home 2</Text>
    </View>
  );
};
