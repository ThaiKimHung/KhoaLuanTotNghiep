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
import ScreenCMT_Child_Nhom from '../screens/ScreenCMT_Child_Nhom';
import ScreenCMT_Child_ThongBao from '../screens/ScreenCMT_Child_ThongBao';
import ScreenDetailBaiDang_ThongBao_CMT from '../screens/ScreenDetailBaiDang_ThongBao_CMT';
import ScreenCMT_Child_ThongBao_CMT from '../screens/ScreenCMT_Child_ThongBao_CMT';
import ScreenThayDoiPass from '../screens/ScreenThayDoiPass';
import TrangCaNhan from '../screens/TrangCaNhan';
import TrangCaNhan_User from '../screens/TrangCaNhan_User';
import ScreenBangTin from '../screens/ScreenBangTin';
import BangTinCuaToi from '../screens/BangTinCuaToi';
import User_TheoDoi from '../screens/User_TheoDoi';
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
import ModalLike_Detail_ThongBao from '../modal/ModalLike_Detail_ThongBao';
import PopUpModal_CMT_ThongBao from '../modal/PopUpModal_CMT_ThongBao';
import PopUpModal_SuaCMT_ThongBao from '../modal/PopUpModal_SuaCMT_ThongBao';
import PopUpModal_CMT_Nhom from '../modal/PopUpModal_CMT_Nhom';
import PopUpModal_CMT_Child from '../modal/PopUpModal_CMT_Child';
import PopUpModal_XoaSua_Detail_ThongBao from '../modal/PopUpModal_XoaSua_Detail_ThongBao';
import PopUpModal_CMT_Child_Nhom from '../modal/PopUpModal_CMT_Child_Nhom';
import PopUpModal_SuaCMT_Child from '../modal/PopUpModal_SuaCMT_Child';
import PopUpModal_SuaCMT_Child_Nhom from '../modal/PopUpModal_SuaCMT_Child_Nhom';
import Modal_DetailBangTin from '../modal/Modal_DetailBangTin';
import ModalLike_CMT from '../modal/ModalLike_CMT';
import ModalLike_CMT_Nhom from '../modal/ModalLike_CMT_Nhom';
import ModalLike_CMT_Thongbao from '../modal/ModalLike_CMT_Thongbao';
import ModalLike_CMT_Child from '../modal/ModalLike_CMT_Child';
import ModalLike_CMT_Child_Nhom from '../modal/ModalLike_CMT_Child_Nhom';
import ModalLike_CMT_Child_Thongbao from '../modal/ModalLike_CMT_Child_Thongbao';
import ModalLike_Nhom_Go from '../modal/ModalLike_Nhom_Go';
import Modal_EditTieuSu from '../modal/Modal_EditTieuSu';
import PopUpModal_Xoa_ChiaSe from '../modal/PopUpModal_Xoa_ChiaSe';

import KhenThuong from '../baidang/KhenThuong';
import KhenThuong_V2 from '../baidang/KhenThuong_V2';

import KhenThuong_Nhom from '../baidang/KhenThuong_Nhom';
import KhenThuong_Nhom_V2 from '../baidang/KhenThuong_Nhom_V2';
import ChaoMungTV_V2 from '../baidang/ChaoMungTV_V2';
import ChaoMungTV_Nhom_V2 from '../baidang/ChaoMungTV_Nhom_V2';

import TinNhanh from '../baidang/TinNhanh';
import TinNhanh_Nhom from '../baidang/TinNhanh_Nhom';
import ChaoMungTV from '../baidang/ChaoMungTV';
import ChaoMungTV_Nhom from '../baidang/ChaoMungTV_Nhom';
import DeXuat from '../baidang/DeXuat';
import DeXuat_Nhom from '../baidang/DeXuat_Nhom';
import ThongBao from '../baidang/ThongBao';
import ThongBao_Nhom from '../baidang/ThongBao_Nhom';
import TinTucNoiBo from '../baidang/TinTucNoiBo';
import TinTucNoiBo_Nhom from '../baidang/TinTucNoiBo_Nhom';
import Media from '../baidang/Media';

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
// import Edit_KhenThuong_Detail_Nhom from '../edit/Edit_KhenThuong_Detail_Nhom';
// import Edit_ChaoMungTV_Detail_Nhom from '../edit/Edit_ChaoMungTV_Detail_Nhom';
import Edit_TrangThongTinCaNhan from '../edit/Edit_TrangThongTinCaNhan';
import Edit_ChaoMung_Detail_Nhom from '../edit/Edit_ChaoMung_Detail_Nhom';
import Edit_KhenThuong_DetailNhom from '../edit/Edit_KhenThuong_DetailNhom';

import ScreenDetailBaiDang_ThongBao from '../screens/ScreenDetailBaiDang_ThongBao';

import BaiDangNhom from '../go/BaiDangNhom';
import ScreenCMT_Child_Nhom_Go from '../go/ScreenCMT_Child_Nhom_Go';
import Screen_EditBaiDang_Nhom_Go from '../go/Screen_EditBaiDang_Nhom_Go';
import ScreenDetailBaiDang_Nhom_Go from '../go/ScreenDetailBaiDang_Nhom_Go';
import PopUpModal_XoaSua_Nhom_Go from '../go/PopUpModal_XoaSua_Nhom_Go';
import ModalLike_Detail_Nhom_Go from '../go/ModalLike_Detail_Nhom_Go';
import PopUpModal_XoaSua_Detail_Nhom_Go from '../go/PopUpModal_XoaSua_Detail_Nhom_Go';
import PopUpModal_CMT_Child_Nhom_Go from '../go/PopUpModal_CMT_Child_Nhom_Go';
import PopUpModal_CMT_Nhom_Go from '../go/PopUpModal_CMT_Nhom_Go';
import Screen_EditBaiDang_Detail_Nhom_Go from '../go/Screen_EditBaiDang_Detail_Nhom_Go';
import PopUpModal_SuaCMT_Child_Nhom_Go from '../go/PopUpModal_SuaCMT_Child_Nhom_Go';
import Edit_ChaoMungTV_Nhom_Go from '../go/Edit_ChaoMungTV_Nhom_Go';
import Edit_KhenThuong_Nhom_Go from '../go/Edit_KhenThuong_Nhom_Go';
import Edit_ChaoMung_Detail_Nhom_Go from '../go/Edit_ChaoMung_Detail_Nhom_Go';
import Edit_KhenThuong_DetailNhom_Go from '../go/Edit_KhenThuong_DetailNhom_Go';

import BaiDang_CEO from '../thongdiep_ceo/BaiDang_CEO';
import ScreenDetailBaiDang_CEO from '../thongdiep_ceo/ScreenDetailBaiDang_CEO';
import Tao_ThongDiep from '../thongdiep_ceo/Tao_ThongDiep';
import PopUpModal_XoaSua_Detail_ThongDiep_CEO from '../thongdiep_ceo/PopUpModal_XoaSua_Detail_ThongDiep_CEO';
import Screen_EditThongDiep_Detail_CEO from '../thongdiep_ceo/Screen_EditThongDiep_Detail_CEO';

import KhenThuong_LuuTru from '../khenthuong/KhenThuong_LuuTru';

import TinTucNoiBo_LuuTru from '../tintucnoibo/TinTucNoiBo_LuuTru';

import ThongBao_LuuTru from '../thongbao/ThongBao_LuuTru';

import BaiDang_Ghim from '../thongdiep_ceo/BaiDang_Ghim';

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
    <HomeStack.Screen name="KhenThuong_V2" component={KhenThuong_V2} />
    <HomeStack.Screen name="KhenThuong_Nhom" component={KhenThuong_Nhom} />
    <HomeStack.Screen
      name="KhenThuong_Nhom_V2"
      component={KhenThuong_Nhom_V2}
    />
    <HomeStack.Screen name="SearchUser" component={SearchUser} />
    <HomeStack.Screen name="TinNhanh" component={TinNhanh} />
    <HomeStack.Screen name="TinNhanh_Nhom" component={TinNhanh_Nhom} />
    <HomeStack.Screen
      name="ScreenDetailBaiDang"
      component={ScreenDetailBaiDang}
    />
    <HomeStack.Screen name="ScreenCMT_Child" component={ScreenCMT_Child} />
    <HomeStack.Screen name="ChaoMungTV" component={ChaoMungTV} />
    <HomeStack.Screen name="ChaoMungTV_V2" component={ChaoMungTV_V2} />
    <HomeStack.Screen name="ChaoMungTV_Nhom" component={ChaoMungTV_Nhom} />
    <HomeStack.Screen
      name="ChaoMungTV_Nhom_V2"
      component={ChaoMungTV_Nhom_V2}
    />
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
    <HomeStack.Screen name="DeXuat" component={DeXuat} />
    <HomeStack.Screen name="DeXuat_Nhom" component={DeXuat_Nhom} />
    <HomeStack.Screen name="ThongBao" component={ThongBao} />
    <HomeStack.Screen name="ThongBao_Nhom" component={ThongBao_Nhom} />
    <HomeStack.Screen name="TinTucNoiBo" component={TinTucNoiBo} />
    <HomeStack.Screen name="TinTucNoiBo_Nhom" component={TinTucNoiBo_Nhom} />
    <HomeStack.Screen
      name="Edit_ChaoMung_Detail_Nhom"
      component={Edit_ChaoMung_Detail_Nhom}
    />
    <HomeStack.Screen
      name="Edit_KhenThuong_DetailNhom"
      component={Edit_KhenThuong_DetailNhom}
    />
    <HomeStack.Screen name="BaiDangNhom" component={BaiDangNhom} />
    <HomeStack.Screen
      name="ScreenDetailBaiDang_ThongBao"
      component={ScreenDetailBaiDang_ThongBao}
    />
    <HomeStack.Screen
      name="ScreenCMT_Child_Nhom"
      component={ScreenCMT_Child_Nhom}
    />
    <HomeStack.Screen
      name="ScreenCMT_Child_ThongBao"
      component={ScreenCMT_Child_ThongBao}
    />
    <HomeStack.Screen
      name="ScreenDetailBaiDang_ThongBao_CMT"
      component={ScreenDetailBaiDang_ThongBao_CMT}
    />
    <HomeStack.Screen name="ScreenBangTin" component={ScreenBangTin} />
    <HomeStack.Screen name="Media" component={Media} />
    <HomeStack.Screen
      name="ScreenCMT_Child_ThongBao_CMT"
      component={ScreenCMT_Child_ThongBao_CMT}
    />
    <HomeStack.Screen name="ScreenThayDoiPass" component={ScreenThayDoiPass} />
    <HomeStack.Screen
      name="Screen_EditBaiDang_Nhom_Go"
      component={Screen_EditBaiDang_Nhom_Go}
    />
    <HomeStack.Screen
      name="ScreenDetailBaiDang_Nhom_Go"
      component={ScreenDetailBaiDang_Nhom_Go}
    />
    <HomeStack.Screen
      name="ScreenCMT_Child_Nhom_Go"
      component={ScreenCMT_Child_Nhom_Go}
    />
    <HomeStack.Screen
      name="Screen_EditBaiDang_Detail_Nhom_Go"
      component={Screen_EditBaiDang_Detail_Nhom_Go}
    />
    <HomeStack.Screen
      name="Edit_ChaoMungTV_Nhom_Go"
      component={Edit_ChaoMungTV_Nhom_Go}
    />
    <HomeStack.Screen
      name="Edit_KhenThuong_Nhom_Go"
      component={Edit_KhenThuong_Nhom_Go}
    />
    <HomeStack.Screen
      name="Edit_ChaoMung_Detail_Nhom_Go"
      component={Edit_ChaoMung_Detail_Nhom_Go}
    />
    <HomeStack.Screen
      name="Edit_KhenThuong_DetailNhom_Go"
      component={Edit_KhenThuong_DetailNhom_Go}
    />
    <HomeStack.Screen name="BaiDang_CEO" component={BaiDang_CEO} />
    <HomeStack.Screen
      name="ScreenDetailBaiDang_CEO"
      component={ScreenDetailBaiDang_CEO}
    />
    <HomeStack.Screen name="Tao_ThongDiep" component={Tao_ThongDiep} />
    <HomeStack.Screen
      name="Screen_EditThongDiep_Detail_CEO"
      component={Screen_EditThongDiep_Detail_CEO}
    />

    <HomeStack.Screen name="KhenThuong_LuuTru" component={KhenThuong_LuuTru} />
    <HomeStack.Screen
      name="TinTucNoiBo_LuuTru"
      component={TinTucNoiBo_LuuTru}
    />
    <HomeStack.Screen name="ThongBao_LuuTru" component={ThongBao_LuuTru} />
    <HomeStack.Screen name="BaiDang_Ghim" component={BaiDang_Ghim} />
    <HomeStack.Screen name="BangTinCuaToi" component={BangTinCuaToi} />
    <HomeStack.Screen name="TrangCaNhan" component={TrangCaNhan} />
    <HomeStack.Screen name="TrangCaNhan_User" component={TrangCaNhan_User} />
    <HomeStack.Screen name="User_TheoDoi" component={User_TheoDoi} />
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
      <Stack.Screen
        name="ModalLike_Detail_ThongBao"
        component={ModalLike_Detail_ThongBao}
      />
      <Stack.Screen
        name="PopUpModal_CMT_ThongBao"
        component={PopUpModal_CMT_ThongBao}
      />
      <Stack.Screen
        name="PopUpModal_SuaCMT_ThongBao"
        component={PopUpModal_SuaCMT_ThongBao}
      />
      <Stack.Screen
        name="PopUpModal_CMT_Nhom"
        component={PopUpModal_CMT_Nhom}
      />
      <Stack.Screen
        name="PopUpModal_CMT_Child"
        component={PopUpModal_CMT_Child}
      />
      <Stack.Screen
        name="PopUpModal_XoaSua_Detail_ThongBao"
        component={PopUpModal_XoaSua_Detail_ThongBao}
      />
      <Stack.Screen
        name="PopUpModal_CMT_Child_Nhom"
        component={PopUpModal_CMT_Child_Nhom}
      />
      <Stack.Screen
        name="PopUpModal_SuaCMT_Child"
        component={PopUpModal_SuaCMT_Child}
      />
      <Stack.Screen
        name="PopUpModal_SuaCMT_Child_Nhom"
        component={PopUpModal_SuaCMT_Child_Nhom}
      />
      <Stack.Screen
        name="Modal_DetailBangTin"
        component={Modal_DetailBangTin}
      />
      <Stack.Screen name="ModalLike_CMT" component={ModalLike_CMT} />
      <Stack.Screen name="ModalLike_CMT_Nhom" component={ModalLike_CMT_Nhom} />
      <Stack.Screen
        name="ModalLike_CMT_Thongbao"
        component={ModalLike_CMT_Thongbao}
      />
      <Stack.Screen
        name="ModalLike_CMT_Child"
        component={ModalLike_CMT_Child}
      />
      <Stack.Screen
        name="ModalLike_CMT_Child_Nhom"
        component={ModalLike_CMT_Child_Nhom}
      />
      <Stack.Screen
        name="ModalLike_CMT_Child_Thongbao"
        component={ModalLike_CMT_Child_Thongbao}
      />
      <Stack.Screen name="ModalLike_Nhom_Go" component={ModalLike_Nhom_Go} />
      <Stack.Screen
        name="PopUpModal_XoaSua_Nhom_Go"
        component={PopUpModal_XoaSua_Nhom_Go}
      />
      <Stack.Screen
        name="PopUpModal_XoaSua_Detail_Nhom_Go"
        component={PopUpModal_XoaSua_Detail_Nhom_Go}
      />
      <Stack.Screen
        name="ModalLike_Detail_Nhom_Go"
        component={ModalLike_Detail_Nhom_Go}
      />
      <Stack.Screen
        name="PopUpModal_CMT_Nhom_Go"
        component={PopUpModal_CMT_Nhom_Go}
      />
      <Stack.Screen
        name="PopUpModal_CMT_Child_Nhom_Go"
        component={PopUpModal_CMT_Child_Nhom_Go}
      />
      <Stack.Screen
        name="PopUpModal_SuaCMT_Child_Nhom_Go"
        component={PopUpModal_SuaCMT_Child_Nhom_Go}
      />
      <Stack.Screen
        name="PopUpModal_XoaSua_Detail_ThongDiep_CEO"
        component={PopUpModal_XoaSua_Detail_ThongDiep_CEO}
      />
      <Stack.Screen name="Modal_EditTieuSu" component={Modal_EditTieuSu} />
      <Stack.Screen
        name="PopUpModal_Xoa_ChiaSe"
        component={PopUpModal_Xoa_ChiaSe}
      />
    </Stack.Navigator>
  );
};
//   <NavigationContainer>

export default AppStack;
