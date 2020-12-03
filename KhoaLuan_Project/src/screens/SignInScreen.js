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

import Utils from '../apis/Utils';
import FontSize from '../components/size';

import {Login, PostTinhTrang} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const logo = require('../assets/images/Jee.png');
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
    };
    this.Username = 'hung@gmail.com';
    this.Password = '111111';
  }

  _loginJee = async () => {
    let res = await Login(this.Username, this.Password);
    console.log('ress', res);
    if (res.status == 1) {
      alert('Đăng nhập thành công');
      this.setState({DsThongTinUser: res.data});
      this.chuyenTrang();

      // lưu giá trị
      await Utils.nsetStorage(
        nkey.id_user,
        this.state.DsThongTinUser[0].ID_user,
      );
      console.log('id khi đăng nhập', await Utils.ngetStorage(nkey.id_user));
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
      alert('Đăng nhập thất bại');
    }
  };

  chuyenTrang = () => {
    this.props.navigation.navigate('HomeStackScreen');
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
    console.log('strBody', strBody);
    let res = await PostTinhTrang(strBody);
    console.log('res update tình trạng', res);
  };

  render() {
    var {ShowPassword} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground source={bg} style={styles.image_background}>
          <View style={styles.header}>
            <View style={styles.khung_logo}>
              <Animatable.Image
                animation="bounceIn"
                duraton="1500"
                source={logo}
                style={styles.logo}></Animatable.Image>
            </View>
          </View>
          <Animatable.View
            style={[styles.footer]}
            animation="bounceInLeft"
            duraton="2000">
            {/* <View style={styles.khung}> */}
            <Text style={styles.textVuiLong}>
              Vui lòng sử dụng tài khoản đã đăng ký để đăng nhập
            </Text>
            <View>
              {/* tài khoản */}
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
                <Text style={styles.textDangNhap}>ĐĂNG NHẬP</Text>
              </TouchableOpacity>
            </View>
            {/* </View> */}
          </Animatable.View>
        </ImageBackground>
      </SafeAreaView>
    );
  }
}

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#009387',
  },
  header: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 50,
  },
  footer: {
    flex: 2,
    backgroundColor: '#EEEEEE',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingHorizontal: 20,
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
    // color: 'black',
    backgroundColor: 'gray',
    padding: 3,
    borderRadius: 10,
  },
  image_icon: {
    height: FontSize.scale(20),
    width: FontSize.verticalScale(20),
    tintColor: 'black',
    marginLeft: 5,
  },
  image_icon_mk: {
    height: FontSize.scale(20),
    width: FontSize.verticalScale(20),
    tintColor: 'black',
    marginLeft: 5,
  },
  image_icon_mk_visibility: {
    height: FontSize.scale(15),
    width: FontSize.verticalScale(15),
    tintColor: 'black',
    marginRight: 5,
  },
  khungtextinputMK: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    // color: 'black',
    backgroundColor: 'gray',
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
    // height: FontSize.scale(50),
    marginTop: 20,
    alignItems: 'center',
    // backgroundColor: 'red',
    flex: 1,
    // width: '90%',
  },
  buttonDangnhap: {
    backgroundColor: '#3180CC',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    // marginHorizontal: 5,
    padding: 10,
    width: '90%',
  },
  textDangNhap: {
    fontSize: 20,
    color: '#fff',
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
  },
});
