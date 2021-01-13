import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  Image,
} from 'react-native';
import FontSize from '../components/size';

import {createStackNavigator} from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import NhomScreen from '../screens/NhomScreen';
import ScreenAllUser from '../screens/ScreenAllUser';
import ScreenCaiDat from '../screens/ScreenCaiDat';
import ScreenThongBao from '../screens/ScreenThongBao';
// import ExploreScreen from './ExploreScreen';
// import ProfileScreen from './ProfileScreen';
import Icon from 'react-native-vector-icons/FontAwesome';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {useIsFocused} from '@react-navigation/native';
import {ROOTGlobal} from '../apis/dataGlobal';

import Utils from '../apis/Utils';

import {CountSoLuong_ThongBao} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const HomeStack = createStackNavigator();
const DetailStack = createStackNavigator();
const Tab = AnimatedTabBarNavigator();

const home = require('../assets/images/home.png');
const group = require('../assets/images/group.png');
const install = require('../assets/images/installation-symbol.png');
const thongtin = require('../assets/images/id-card.png');

export default class MainTabScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      soluong: '',
    };
    // ROOTGlobal.DemSoLuong = this._DemSoLuongThongBao;
  }
  HomeStackScreen = () => {
    // const isFocused = useIsFocused();
    return (
      <HomeStack.Navigator headerMode="none">
        <HomeStack.Screen
          name="HomeScreen"
          component={HomeScreen}></HomeStack.Screen>
      </HomeStack.Navigator>
    );
  };
  DetailsStackScreen = () => {
    return (
      <DetailStack.Navigator headerMode="none">
        <DetailStack.Screen
          name="NhomScreen"
          component={NhomScreen}></DetailStack.Screen>
      </DetailStack.Navigator>
    );
  };

  UserStackScreen = () => {
    return (
      <HomeStack.Navigator headerMode="none">
        <HomeStack.Screen
          name="ScreenAllUser"
          component={ScreenAllUser}></HomeStack.Screen>
      </HomeStack.Navigator>
    );
  };

  ThongBaoStackScreen = () => {
    return (
      <HomeStack.Navigator headerMode="none">
        <HomeStack.Screen
          name="ScreenThongBao"
          component={ScreenThongBao}></HomeStack.Screen>
      </HomeStack.Navigator>
    );
  };

  CaiDatStackScreen = () => {
    return (
      <HomeStack.Navigator headerMode="none">
        <HomeStack.Screen
          name="ScreenCaiDat"
          component={ScreenCaiDat}></HomeStack.Screen>
      </HomeStack.Navigator>
    );
  };

  _DemSoLuongThongBao = async () => {
    let res = await CountSoLuong_ThongBao(
      await Utils.ngetStorage(nkey.id_user),
    );
    // console.log('res so luong thong bao------------------', res);
    if (res.status == 1) {
      this.setState({
        soluong: res.Data.soluong,
      });
      // await console.log('sol uong', this.state.soluong);
    }
  };

  ham = async () => {
    setInterval(async () => {
      this._DemSoLuongThongBao();
    }, 1000);
  };

  componentDidMount = async () => {
    // this._DemSoLuongThongBao();
    await this.ham();
    //  var timer = setInterval(() => {
    //    console.log('I do not leak!');
    //  }, 5000);
  };

  render() {
    const {soluong} = this.state;
    return (
      <Tab.Navigator
        // tabBar=
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#FFFFFF',
          inactiveTintColor: '#222222',
          activeBackgroundColor: '#007DE3',
          // tabStyle: {tabBarBackground: 'orange'},
        }}>
        <Tab.Screen
          name="Home"
          component={this.HomeStackScreen}
          listeners={{
            tabPress: () => {
              // Prevent default action
              // ROOTGlobal.DemSoLuong();
              ROOTGlobal.GetDsAllBaiDang();
              // ROOTGlobal.ScrollHome();
            },
          }}
          options={{
            tabBarLabel: 'Trang chủ',
            floating: true,

            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="home"
                size={size ? size : 24}
                color={focused ? color : '#222222'}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Nhom"
          component={this.DetailsStackScreen}
          listeners={{
            tabPress: () => {
              ROOTGlobal.GetDsNhom();
            },
          }}
          options={{
            tabBarLabel: 'Nhóm',

            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="users"
                size={size ? size : 24}
                color={focused ? color : '#222222'}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        <Tab.Screen
          name="ThongBao"
          component={this.ThongBaoStackScreen}
          listeners={{
            tabPress: () => {
              ROOTGlobal.GetDsThongBao();
            },
          }}
          options={{
            tabBarLabel: 'Thông báo',
            tabBarIcon: ({focused, color, size}) => (
              <View style={{flexDirection: 'row'}}>
                {soluong != 0 ? (
                  <View
                    style={{
                      top: -10,
                      right: -30,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: 'red',
                      borderRadius: 10,
                      width: FontSize.verticalScale(20),
                    }}>
                    <Text style={{color: '#FFFFFF'}}>{soluong}</Text>
                  </View>
                ) : // <View></View>
                null}
                <Icon
                  name="bell"
                  size={size ? size : 24}
                  color={focused ? color : '#222222'}
                  focused={focused}
                  color={color}
                />
              </View>
            ),
          }}
          // <Image
          //       source={group}
          //       style={{
          //         height: FontSize.scale(26),
          //         width: FontSize.verticalScale(26),
          //       }}></Image>
        />
        <Tab.Screen
          name="DanhBa"
          component={this.UserStackScreen}
          listeners={{
            tabPress: () => {
              // Prevent default action
              // ROOTGlobal.DemSoLuong();
              ROOTGlobal.GetDsUser();
            },
          }}
          options={{
            tabBarLabel: 'Danh bạ',

            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="address-card"
                size={size ? size : 24}
                color={focused ? color : '#222222'}
                focused={focused}
                color={color}
              />
            ),
          }}
          // <Image
          //     source={thongtin}
          //     style={{
          //       height: FontSize.scale(26),
          //       width: FontSize.verticalScale(26),
          //     }}></Image>
        />
        <Tab.Screen
          name="CaiDat"
          component={this.CaiDatStackScreen}
          listeners={{
            tabPress: () => {
              // Prevent default action
              ROOTGlobal.GetProfileUser();
            },
          }}
          options={{
            tabBarLabel: 'Cài đặt',
            tabBarIcon: ({focused, color, size}) => (
              <Icon
                name="cogs"
                size={size ? size : 24}
                color={focused ? color : '#222222'}
                focused={focused}
                color={color}
              />
            ),
          }}
        />
        {/* <Image
            source={install}
            style={{
              height: FontSize.scale(26),
              width: FontSize.verticalScale(26),
            }}></Image> */}
      </Tab.Navigator>
    );
  }
}
