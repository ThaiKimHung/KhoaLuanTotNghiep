import React, {Component} from 'react';
import {
  StatusBar,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Image,
  Vibration,
  StyleSheet,
  AppState,
} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import {NavigationContainer} from '@react-navigation/native';

// import HomeStackScreen from '../stackScreen/HomeStackScreen';
import MainTabScreen from '../stackScreen/MainTabScreen';

import SplashScreen from '../screens/SplashScreen';
import SigninScreen from '../screens/SignInScreen';
import ScreenLoaiBaiDang from '../screens/ScreenLoaiBaiDang';
import ScreenCaiDat from '../screens/ScreenCaiDat';
import ScreenDetailBaiDang from '../screens/ScreenDetailBaiDang';
import SearchUser from '../screens/SearchUser';
import HomeScreen from '../screens/HomeScreen';
import ScreenCMT_Child from '../screens/ScreenCMT_Child';
import ScreenBaiDangNhom from '../screens/ScreenBaiDangNhom';
import ScreenDetailBaiDang_Nhom from '../screens/ScreenDetailBaiDang_Nhom';
import ScreenThanhVienNhom from '../screens/ScreenThanhVienNhom';
import ScreenThemThanhVienNhom from '../screens/ScreenThemThanhVienNhom';
import ScreenTaoNhom from '../screens/ScreenTaoNhom';
import ScreenThongTinCaNhan from '../screens/ScreenThongTinCaNhan';

import BaiDangComponent from '../components/BaiDangComponent';

import ModalComponent from '../modal/ModalComponent';
import PopUpModal_XoaSua from '../modal/PopUpModal_XoaSua';
import ModalLike from '../modal/ModalLike';
import ModalLike_Detail from '../modal/ModalLike_Detail';
import PopUpModal_XoaSua_Detail from '../modal/PopUpModal_XoaSua_Detail';
import PopUpModal_CMT from '../modal/PopUpModal_CMT';
import PopUpModal_SuaCMT from '../modal/PopUpModal_SuaCMT';
import Modal_CaiDatNhom from '../modal/Modal_CaiDatNhom';
import PopUpModal_XoaSua_Detail_Nhom from '../modal/PopUpModal_XoaSua_Detail_Nhom';
import PopUpModal_XoaSua_Nhom from '../modal/PopUpModal_XoaSua_Nhom';
import ModalLike_Nhom from '../modal/ModalLike_Nhom';
import ModalLike_Detail_Nhom from '../modal/ModalLike_Detail_Nhom';

import KhenThuong from '../baidang/KhenThuong';
import TinNhanh from '../baidang/TinNhanh';
import ChaoMungTV from '../baidang/ChaoMungTV';
import TinNhanh_Nhom from '../baidang/TinNhanh_Nhom';
import KhenThuong_Nhom from '../baidang/KhenThuong_Nhom';
import ChaoMungTV_Nhom from '../baidang/ChaoMungTV_Nhom';

import Screen_EditBaiDang from '../edit/Screen_EditBaiDang';
import Screen_EditBaiDang_Detail from '../edit/Screen_EditBaiDang_Detail';
import Edit_KhenThuong from '../edit/Edit_KhenThuong';
import Edit_ChaoMungTV from '../edit/Edit_ChaoMungTV';
import Edit_KhenThuong_Detail from '../edit/Edit_KhenThuong_Detail';
import Edit_ChaoMungTV_Detail from '../edit/Edit_ChaoMungTV_Detail';
import Screen_EditBaiDang_Nhom from '../edit/Screen_EditBaiDang_Nhom';
import Screen_EditBaiDang_Detail_Nhom from '../edit/Screen_EditBaiDang_Detail_Nhom';
import Edit_KhenThuong_Nhom from '../edit/Edit_KhenThuong_Nhom';
import Edit_ChaoMungTV_Nhom from '../edit/Edit_ChaoMungTV_Nhom';
import Edit_KhenThuong_Detail_Nhom from '../edit/Edit_KhenThuong_Detail_Nhom';
import Edit_ChaoMungTV_Detail_Nhom from '../edit/Edit_ChaoMungTV_Detail_Nhom';
import Edit_TrangThongTinCaNhan from '../edit/Edit_TrangThongTinCaNhan';

import Test from '../screens/Test';
// import

const AuthenStack = createStackNavigator();
const AuthStack = () => (
  <AuthenStack.Navigator headerMode="none" initialRouteName="SplashScreen">
    <AuthenStack.Screen
      name="SplashScreen"
      component={SplashScreen}></AuthenStack.Screen>
    <AuthenStack.Screen
      name="SigninScreen"
      component={SigninScreen}></AuthenStack.Screen>
  </AuthenStack.Navigator>
);

const HomeStack = createStackNavigator();
const HomeStackScreen = () => (
  <HomeStack.Navigator headerMode="none" initialRouteName="MainTabScreen">
    <HomeStack.Screen name="MainTabScreen" component={MainTabScreen} />
    <HomeStack.Screen name="ScreenLoaiBaiDang" component={ScreenLoaiBaiDang} />
    {/* <HomeStack.Screen name="HomeScreen" component={HomeScreen} /> */}
    <HomeStack.Screen name="KhenThuong" component={KhenThuong} />
    <HomeStack.Screen name="KhenThuong_Nhom" component={KhenThuong_Nhom} />
    <HomeStack.Screen name="SearchUser" component={SearchUser} />
    <HomeStack.Screen name="TinNhanh" component={TinNhanh} />
    <HomeStack.Screen name="TinNhanh_Nhom" component={TinNhanh_Nhom} />
    <HomeStack.Screen
      name="ScreenDetailBaiDang"
      component={ScreenDetailBaiDang}
    />
    <HomeStack.Screen name="ScreenCMT_Child" component={ScreenCMT_Child} />
    <HomeStack.Screen name="ChaoMungTV" component={ChaoMungTV} />
    <HomeStack.Screen name="ChaoMungTV_Nhom" component={ChaoMungTV_Nhom} />
    <HomeStack.Screen
      name="Screen_EditBaiDang"
      component={Screen_EditBaiDang}
    />
    <HomeStack.Screen
      name="Screen_EditBaiDang_Detail"
      component={Screen_EditBaiDang_Detail}
    />
    <HomeStack.Screen name="Edit_KhenThuong" component={Edit_KhenThuong} />
    <HomeStack.Screen name="Edit_ChaoMungTV" component={Edit_ChaoMungTV} />
    <HomeStack.Screen
      name="Edit_KhenThuong_Detail"
      component={Edit_KhenThuong_Detail}
    />
    <HomeStack.Screen
      name="Edit_ChaoMungTV_Detail"
      component={Edit_ChaoMungTV_Detail}
    />
    <HomeStack.Screen
      name="Edit_TrangThongTinCaNhan"
      component={Edit_TrangThongTinCaNhan}
    />
    <HomeStack.Screen name="ScreenBaiDangNhom" component={ScreenBaiDangNhom} />
    <HomeStack.Screen
      name="ScreenDetailBaiDang_Nhom"
      component={ScreenDetailBaiDang_Nhom}
    />

    <HomeStack.Screen
      name="Screen_EditBaiDang_Nhom"
      component={Screen_EditBaiDang_Nhom}
    />
    <HomeStack.Screen
      name="Screen_EditBaiDang_Detail_Nhom"
      component={Screen_EditBaiDang_Detail_Nhom}
    />

    <HomeStack.Screen
      name="Edit_KhenThuong_Detail_Nhom"
      component={Edit_KhenThuong_Detail_Nhom}
    />
    <HomeStack.Screen
      name="Edit_ChaoMungTV_Detail_Nhom"
      component={Edit_ChaoMungTV_Detail_Nhom}
    />
    <HomeStack.Screen
      name="Edit_ChaoMungTV_Nhom"
      component={Edit_ChaoMungTV_Nhom}
    />
    <HomeStack.Screen
      name="Edit_KhenThuong_Nhom"
      component={Edit_KhenThuong_Nhom}
    />
    <HomeStack.Screen
      name="ScreenThanhVienNhom"
      component={ScreenThanhVienNhom}
    />
    <HomeStack.Screen
      name="ScreenThemThanhVienNhom"
      component={ScreenThemThanhVienNhom}
    />
    <HomeStack.Screen name="ScreenTaoNhom" component={ScreenTaoNhom} />
    <HomeStack.Screen
      name="ScreenThongTinCaNhan"
      component={ScreenThongTinCaNhan}
    />
    {/* ChaoMungThanhVienMoi */}
  </HomeStack.Navigator>
);

// const RoottScreen = createStackNavigator();
// const RootScreen = () => {
//   <RoottScreen.Navigator>
//     <RoottScreen.Screen></RoottScreen.Screen>
//   </RoottScreen.Navigator>;
// };

//chứa root screen và con
const RoottStack = createStackNavigator();
const RootStack = () => (
  <RoottStack.Navigator headerMode="none" initialRouteName="AuthStack">
    {/* <RoottStack.Screen name="RootScreen" component={RootScreen} /> */}
    <RoottStack.Screen name="AuthStack" component={AuthStack} />
    <RoottStack.Screen name="HomeStackScreen" component={HomeStackScreen} />
    {/* <RoottStack.Screen name="Test" component={Test} /> */}
  </RoottStack.Navigator>
);

//chứa modal , rootstack
const RootModallStack = createStackNavigator();
const RootModalStack = () => (
  <RootModallStack.Navigator headerMode="none" initialRouteName="RootStack">
    <RootModallStack.Screen name="RootStack" component={RootStack} />
  </RootModallStack.Navigator>
);

//chứa rootmodal stack
const Stack = createStackNavigator();
const AppStack = () => {
  return (
    <Stack.Navigator
      headerMode="none"
      initialRouteName="RootModalStack"
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
      <Stack.Screen name="RootModalStack" component={RootModalStack} />
      <Stack.Screen name="ModalComponent" component={ModalComponent} />
      <Stack.Screen name="PopUpModal_XoaSua" component={PopUpModal_XoaSua} />
      <Stack.Screen
        name="PopUpModal_XoaSua_Nhom"
        component={PopUpModal_XoaSua_Nhom}
      />
      <Stack.Screen name="ModalLike" component={ModalLike} />
      <Stack.Screen name="ModalLike_Detail" component={ModalLike_Detail} />

      <Stack.Screen name="ModalLike_Nhom" component={ModalLike_Nhom} />
      <Stack.Screen
        name="ModalLike_Detail_Nhom"
        component={ModalLike_Detail_Nhom}
      />

      <Stack.Screen
        name="PopUpModal_XoaSua_Detail"
        component={PopUpModal_XoaSua_Detail}
      />
      <Stack.Screen
        name="PopUpModal_XoaSua_Detail_Nhom"
        component={PopUpModal_XoaSua_Detail_Nhom}
      />
      <Stack.Screen name="PopUpModal_CMT" component={PopUpModal_CMT} />
      <Stack.Screen name="Modal_CaiDatNhom" component={Modal_CaiDatNhom} />
      <Stack.Screen name="PopUpModal_SuaCMT" component={PopUpModal_SuaCMT} />
    </Stack.Navigator>
  );
};
//   <NavigationContainer>

export default AppStack;
