import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
  Button,
  TextInput,
} from 'react-native';
import FontSize from '../components/size';
import {showMessage, hideMessage} from 'react-native-flash-message';

import {GetUserProfile} from '../apis/apiUser';
import Utils from '../apis/Utils';

import {ROOTGlobal} from '../apis/dataGlobal';
import {Login, PostTinhTrang} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import AsyncStorage from '@react-native-community/async-storage';
const avatar = require('../assets/images/avatar.jpg');
const logout = require('../assets/images/logout.png');
const addgroup = require('../assets/images/add-group.png');
export default class ScreenCaiDat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      name: '',
      id: '',
      thongtin: '',
    };
    ROOTGlobal.GetProfileUser = this._GetUserProfile;
  }

  _getThongTin = async () => {
    await this.setState({
      id: await Utils.ngetStorage(nkey.id_user),
      avatar: await this.state.thongtin[0].Avatar,
      name: await this.state.thongtin[0].Username,
    });
    await Utils.nsetStorage(nkey.avatar, this.state.thongtin[0].Avatar);
    await Utils.nsetStorage(nkey.Username, this.state.thongtin[0].Username);
    // console.log('ava thoing tin', this.state.thongtin[0].Avatar);
    // console.log('name thoing tin', this.state.thongtin[0].Username);
  };

  _GetUserProfile = async () => {
    let res = await GetUserProfile(await Utils.ngetStorage(nkey.id_user));
    // console.log('res get user thoong tin ============', res);
    if (res.status == 1) {
      this.setState({
        thongtin: res.Data,
      });
      // await console.log('state ', this.state.thongtin);
    }
  };

  _logout = async () => {
    let flag = await Utils.ngetStorage(nkey.flag);
    // console.log('flag trc out', flag);
    let flag1 = await Utils.nsetStorage(nkey.flag, '0');
    // console.log('flag1 sau out', flag1);
    AsyncStorage.clear();
    this.updateTinhTrangUser();

    this.props.navigation.navigate('AuthStack', {screen: 'SigninScreen'});
  };
  updateTinhTrangUser = async () => {
    let strBody = JSON.stringify({
      ID_User: this.state.id,
      TinhTrang: false,
    });

    // console.log('strBody update tinh trang user', strBody);
    let res = await PostTinhTrang(strBody);
    // console.log('res update tình trạng sau khi đăng xuất cai dat', res);
  };

  componentDidMount = async () => {
    await this._GetUserProfile();
    await this._getThongTin();
  };

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.khung_title}>
            <Text style={styles.title}> Menu</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.khungchua}
            onPress={() => Utils.goscreen(this, 'ScreenThongTinCaNhan')}>
            <View
              style={{
                marginLeft: 5,
                borderRadius: 30,
                height: FontSize.scale(30),
                width: FontSize.verticalScale(30),
                // padding: 10,
              }}>
              <Image
                style={{
                  height: FontSize.scale(30),
                  width: FontSize.verticalScale(30),
                  borderRadius: 30,
                }}
                resizeMode="cover"
                source={
                  this.state.thongtin
                    ? {uri: this.state.thongtin[0].Avatar}
                    : avatar
                }></Image>
            </View>
            <Text style={{fontSize: FontSize.reSize(25), marginLeft: 5}}>
              {this.state.thongtin
                ? this.state.thongtin[0].Username
                : 'Loading...'}
            </Text>
          </TouchableOpacity>
          <View style={styles.khung_CaiDat}>
            <TouchableOpacity
              style={styles.st_button}
              onPress={() => Utils.goscreen(this, 'ScreenTaoNhom')}>
              <Image source={addgroup} style={styles.sizeimage}></Image>
              <Text style={{fontSize: FontSize.reSize(20), marginLeft: 5}}>
                Tạo Nhóm
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.st_button}
              onPress={() =>
                Alert.alert(
                  'Thông Báo',
                  'Bạn Muốn Đăng Xuất?',
                  [
                    {text: 'Đồng ý', onPress: () => this._logout()},
                    {
                      text: 'Hủy',
                      style: 'cancel',
                    },
                  ],
                  {cancelable: false},
                )
              }>
              <Image source={logout} style={styles.sizeimage}></Image>
              <Text style={{fontSize: FontSize.reSize(20), marginLeft: 5}}>
                Đăng Xuất
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#007DE3',
    height: FontSize.scale(50),
  },
  footer: {
    flex: 1,
    backgroundColor: '#E9EBEE',
  },
  khungchua: {
    flexDirection: 'row',
    padding: 10,
    alignItems: 'center',
    backgroundColor: '#E9EBEE',
    margin: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#4F4F4F50',
    // padding: 10,
  },
  khung_CaiDat: {
    paddingHorizontal: 10,
  },
  st_button: {
    height: FontSize.scale(50),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    // borderTopWidth: 1,
    borderBottomWidth: 1,
    // borderTopColor: '#4F4F4F50',
    borderBottomColor: '#4F4F4F50',
    borderRadius: 10,
  },
  khung_title: {
    justifyContent: 'center',
    // alignItems: 'center',
    paddingVertical: 10,
  },
  title: {
    fontSize: FontSize.reSize(35),
    textAlign: 'center',
    fontWeight: 'bold',
  },

  sizeimage: {
    height: FontSize.scale(20),
    width: FontSize.verticalScale(20),
  },
});
