import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  SafeAreaView,
  Dimensions,
  Image,
  ImageBackground,
  Button,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {showMessage, hideMessage} from 'react-native-flash-message';

import Utils from '../apis/Utils';
import FontSize from '../components/size';

import {Login, PostTinhTrang, GetDSLike} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const logo = require('../assets/images/Jeelogo.png');
const user = require('../assets/images/user.png');
const lock = require('../assets/images/locked-padlock.png');
const visibility = require('../assets/images/visibility.png');
const invisible = require('../assets/images/invisible.png');
const bg = require('../assets/images/bg.png');

// const res = '';
export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowPassword: true,
      DsThongTinUser: [],
      DSLike: [],
    };
    this.Username = 'hung@gmail.com';
    this.Password = '111111';
  }

  _loginJee = async () => {
    let res = await Login(this.Username, this.Password);
    // console.log('ress đăng nhập', res);
    if (res.status == 1) {
      showMessage({
        message: 'Thông báo',
        description: 'Đăng nhập thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      this.setState({DsThongTinUser: res.data});
      this.chuyenTrang();

      // lưu giá trị
      await Utils.nsetStorage(
        nkey.id_user,
        this.state.DsThongTinUser[0].ID_user,
      );
      // console.log(
      //   'id khi đăng nhập screen đănh nhập',
      //   await Utils.ngetStorage(nkey.id_user),
      // );
      //lưu lại avatar
      await Utils.nsetStorage(nkey.avatar, this.state.DsThongTinUser[0].Avatar);
      //lưu user name
      await Utils.nsetStorage(
        nkey.Username,
        this.state.DsThongTinUser[0].Username,
      );
      // nếu là 1 thì đăng nhập thành công
      await Utils.nsetStorage(nkey.flag, '1');

      this.updateTinhTrangUser();
    } else {
      showMessage({
        message: 'Thông báo',
        description:
          'Đăng nhập thất bại.\nTài khoản hoặc Mật khẩu không đúng! ',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
    }
  };

  chuyenTrang = () => {
    // this.props.navigation.replace('HomeStackScreen');
    Utils.goscreenReplace(this, 'HomeStackScreen');
  };

  onPressShowPassword = () => {
    this.setState({
      ShowPassword: !this.state.ShowPassword,
    });
  };

  updateTinhTrangUser = async () => {
    let strBody;
    if ((await Utils.ngetStorage(nkey.flag)) === 1) {
      strBody = JSON.stringify({
        ID_User: await Utils.ngetStorage(nkey.id_user),
        TinhTrang: true,
      });
    }
    // console.log('strBody tình trạng sau khi đăng nhập', strBody);
    let res = await PostTinhTrang(strBody);
    // console.log('res update tình trạng sau khi đăng nhập', res);
  };
  _GetDSLike = async () => {
    let res = await GetDSLike();
    // console.log('ress ds like', res);
    if (res.status == 1) {
      this.setState({
        DSLike: res.Data,
      });
      await Utils.setGlobal(nGlobalKeys.DanhSachLike, this.state.DSLike);
    }
  };
  componentDidMount = () => {
    this._GetDSLike();
  };
  render() {
    var {ShowPassword} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.khung_logo}>
            <Animatable.Image
              animation="bounceInLeft"
              duraton="1500"
              source={logo}
              style={styles.logo}></Animatable.Image>
          </View>
        </View>
        <Animatable.View
          style={[styles.footer]}
          animation="bounceInLeft"
          duraton="2000">
          <View style={styles.khung_baoboc}>
            <View style={{marginVertical: 10}}>
              <View>
                <Text style={styles.text_tkmk}>Tài khoản</Text>
                <View style={styles.khungtextinput}>
                  <Image source={user} style={styles.image_icon}></Image>
                  <TextInput
                    autoCapitalize="none"
                    placeholderTextColor="black"
                    placeholder="Tài khoản"
                    style={styles.textinput}
                    onChangeText={(text) => (this.Username = text)}>
                    {this.Username}
                  </TextInput>
                </View>
              </View>

              {/* mật khẩu */}
              <View style={{paddingTop: 10}}>
                <Text style={styles.text_tkmk}>Mật khẩu</Text>
                <View style={styles.khungtextinputMK}>
                  <Image source={lock} style={styles.image_icon_mk}></Image>
                  <TextInput
                    secureTextEntry={ShowPassword}
                    autoCapitalize="none"
                    placeholder="Mật khẩu"
                    placeholderTextColor="black"
                    style={styles.textinput}
                    onChangeText={(text) => (this.Password = text)}>
                    {this.Password}
                  </TextInput>
                  <TouchableOpacity onPress={() => this.onPressShowPassword()}>
                    <Image
                      source={ShowPassword == true ? invisible : visibility}
                      style={styles.image_icon_mk_visibility}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
            {/* button đăng nhập */}
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.buttonDangnhap}
                onPress={() => this._loginJee()}>
                <Text style={styles.textDangNhap}>Đăng Nhập</Text>
              </TouchableOpacity>
            </View>
          </View>
          {/* tài khoản */}
        </Animatable.View>
      </SafeAreaView>
    );
  }
}

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#C0C0C020',
  },
  header: {
    height: '35%',
    // flex: 1,
    backgroundColor: '#C0C0C020',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 1,
    backgroundColor: '#C0C0C020',
    // backgroundColor: 'yellow',
    paddingHorizontal: 10,
    paddingVertical: 30,
  },

  khung: {
    backgroundColor: '#00000080',
    borderRadius: 10,
    padding: 10,
  },
  khung_logo: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    width: FontSize.scale(150),
    height: FontSize.verticalScale(150),
    borderRadius: 100,
    tintColor: '#007DE3',
  },
  textVuiLong: {
    fontSize: FontSize.reText(20),
    textAlign: 'center',
    marginVertical: 20,
  },
  khungtextinput: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#B5B5B5',
    padding: 3,
    borderRadius: 10,
  },
  image_icon: {
    height: FontSize.scale(20),
    width: FontSize.verticalScale(20),
    tintColor: '#4F4F4F',
    marginLeft: 5,
  },
  image_icon_mk: {
    height: FontSize.scale(20),
    width: FontSize.verticalScale(20),
    tintColor: '#4F4F4F',
    marginLeft: 5,
  },
  image_icon_mk_visibility: {
    height: FontSize.scale(15),
    width: FontSize.verticalScale(15),
    tintColor: '#4F4F4F',
    marginRight: 5,
  },
  khungtextinputMK: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    backgroundColor: '#B5B5B5',
    padding: 3,
    borderRadius: 10,
  },
  imageback: {
    resizeMode: 'cover',
    justifyContent: 'center',
    height: height,
    width: width,
    flex: 1,
  },

  textHeader: {
    color: '#fff',
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginHorizontal: 50,
    marginTop: 12,
  },
  imagest: {
    borderTopLeftRadius: 35,
    borderTopRightRadius: 35,
    borderBottomLeftRadius: 35,
    borderBottomRightRadius: 35,
  },
  ContainerDangNhap: {
    borderTopRightRadius: 10,
    borderBottomRightRadius: 30,
    marginBottom: 20,
  },

  Title: {
    fontSize: 20,
    color: 'white',
    marginHorizontal: 20,
    textAlign: 'center',
    marginTop: 10,
  },

  textinput: {
    color: 'black',
    flex: 1,
  },
  buttonContainer: {
    marginTop: 5,
    alignItems: 'center',
    flex: 1,
  },
  buttonDangnhap: {
    backgroundColor: '#007DE3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    width: '60%',
  },
  textDangNhap: {
    fontSize: 20,
    color: 'white',
    fontWeight: 'bold',
  },
  image_background: {
    resizeMode: 'cover',
    justifyContent: 'center',
    height: height,
    width: width,
    flex: 1,
  },
  text_tkmk: {
    fontSize: FontSize.reSize(20),
    marginBottom: 5,
    color: '#504B44',
  },
  khung_baoboc: {
    // backgroundColor: '#0078D7',
    padding: 10,
    height: FontSize.scale(250),
    // width: '100%',
    borderRadius: 10,
  },
});
