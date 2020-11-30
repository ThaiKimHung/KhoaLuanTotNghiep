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

import {Login} from '../apis/apiUser';
// import {Id_user} from '../apis/GetIdUser';

const logo = require('../assets/images/Jee.png');
const user = require('../assets/images/user.png');
const lock = require('../assets/images/locked-padlock.png');
const visibility = require('../assets/images/visibility.png');
const invisible = require('../assets/images/invisible.png');
const imagebackgroung = require('../assets/images/backgroundTong.png');

// const res = '';
export default class SignInScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowPassword: true,
      DsThongTinUser: [],
      id_userne: '',
    };
    this.Username = '';
    this.Password = '';
  }

  _loginJee = async () => {
    console.log('=-=-=mail', this.Username);
    console.log('=-=-=pass', this.Password);

    let res = await Login(this.Username, this.Password);
    console.log('ress', res);

    if (res.status == 1) {
      alert('Đăng nhập thành công');
      this.chuyenTrang();
      this.setState({DsThongTinUser: res.data});
      this._SetAsync();
    } else {
      alert('Đăng nhập thất bại');
    }

    console.log('res stat', res.status);
    console.log('ds thong tin', this.state.DsThongTinUser);
  };

  chuyenTrang = () => {
    this.props.navigation.navigate('HomeStackScreen');
  };

  onPressShowPassword = () => {
    this.setState({
      ShowPassword: !this.state.ShowPassword,
    });
  };

  _SetAsync = async () => {
    this.state.DsThongTinUser.map((e) => {
      return this.setState({id_userne: e.ID_user});
    });
    await Utils.nsetStorage('idUser', this.state.id_userne);
    console.log('iduser bên aysn set', this.state.id_userne);
  };

  componentDidMoun() {
    // this._SetAsync();
  }

  render() {
    var {ShowPassword} = this.state;
    return (
      <SafeAreaView style={styles.container}>
        <ImageBackground
          source={imagebackgroung}
          style={styles.image_background}>
          <View style={styles.header}>
            <View style={styles.khung_logo}>
              <Image source={logo} style={styles.logo}></Image>
            </View>
          </View>
          <View style={[styles.footer]}>
            <View style={styles.khung}>
              <Text style={styles.textVuiLong}>
                Vui lòng sử dụng tài khoản đã đăng ký để đăng nhập
              </Text>
              <View>
                {/* tài khoản */}
                <View style={styles.khungtextinput}>
                  <Image source={user} style={styles.image_icon}></Image>
                  <TextInput
                    autoCapitalize="none"
                    placeholderTextColor="white"
                    placeholder="Tài khoản"
                    style={styles.textinput}
                    onChangeText={(text) => (this.Username = text)}>
                    {this.Username}
                  </TextInput>
                </View>
                {/* mật khẩu */}
                <View style={styles.khungtextinputMK}>
                  <Image source={lock} style={styles.image_icon_mk}></Image>
                  <TextInput
                    secureTextEntry={ShowPassword}
                    autoCapitalize="none"
                    placeholder="Mật khẩu"
                    placeholderTextColor="white"
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
              {/* button đăng nhập */}
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonDangnhap}
                  onPress={() => this._loginJee()}>
                  <Text style={styles.textDangNhap}>ĐĂNG NHẬP</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
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
    // backgroundColor: 'green',
  },
  header: {
    // backgroundColor: 'blue',
    height: '30%',
    justifyContent: 'center',
  },
  footer: {
    flex: 1,
    // backgroundColor: 'yellow',
    padding: 20,
  },

  khung: {
    backgroundColor: '#00000080',
    borderRadius: 10,
    padding: 10,
  },
  khung_logo: {
    justifyContent: 'center',
    alignItems: 'center',
    // borderRadius: 30,
    // height: '30%',
    // height: '30%',
    // width: '20%',
  },
  logo: {
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    height: '80%',
    width: '40%',
  },
  textVuiLong: {
    fontSize: FontSize.reText(20),
    textAlign: 'center',
    marginVertical: 20,
  },
  khungtextinput: {
    borderColor: 'white',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: 'white',
  },
  image_icon: {
    height: FontSize.scale(20),
    width: FontSize.verticalScale(20),
    tintColor: '#fff',
  },
  image_icon_mk: {
    height: FontSize.scale(20),
    width: FontSize.verticalScale(20),
    tintColor: '#fff',
  },
  image_icon_mk_visibility: {
    height: FontSize.scale(15),
    width: FontSize.verticalScale(15),
    tintColor: '#fff',
  },
  khungtextinputMK: {
    borderColor: 'white',
    borderBottomWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    color: 'white',
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
    color: 'white',
    flex: 1,
  },
  buttonContainer: {
    height: FontSize.scale(50),
    marginTop: 20,
    alignItems: 'center',
    // backgroundColor: 'red',
  },
  buttonDangnhap: {
    backgroundColor: '#3180CC',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    marginHorizontal: 5,
    padding: 20,
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
});
