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
import AsyncStorage from '@react-native-community/async-storage';
import {Login, UpdatePass} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import moment from 'moment';
import {ROOTGlobal} from '../apis/dataGlobal';

const logo = require('../assets/images/Jeelogo.png');
const user = require('../assets/images/user.png');
const lock = require('../assets/images/locked-padlock.png');
const visibility = require('../assets/images/visibility.png');
const invisible = require('../assets/images/invisible.png');
// const bg = require('../assets/images/bg.png');
const goback = require('../assets/images/go-back-left-arrow.png');
const avatar = require('../assets/images/avatar.jpg');

const edite = require('../assets/images/edit2.png');
// const res = '';
export default class ScreenThayDoiPass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ShowPassword: true,
      ShowPassword_NhapLai: true,
      DsThongTinUser: [],
      DSLike: [],
      Pass: '',
      PassNhapLai: '',
      PassMoi: '',
    };

    this.Password = '';
    this.Password_NhapLai = '';
    this.Password_Moi = '';
  }

  handlePass = async (text) => {
    this.setState({
      Pass: text,
    });
  };

  handlePass_NhapLai = async (text) => {
    this.setState({
      PassNhapLai: text,
    });
  };

  handlePass_Moi = async (text) => {
    this.setState({
      PassMoi: text,
    });
  };

  _UpdatePasss = async () => {
    // alert(5);
    let passcu = await Utils.ngetStorage(nkey.password);
    let iduser = await Utils.ngetStorage(nkey.id_user);
    // console.log(this.state.Pass);
    // console.log(this.state.PassNhapLai);
    // console.log(this.state.PassMoi);
    // console.log(passcu);
    // console.log(iduser);
    if (
      passcu == this.state.Pass &&
      passcu == this.state.PassNhapLai &&
      this.state.PassMoi
    ) {
      let res = await UpdatePass(iduser, this.state.PassMoi);
      // console.log('res pass', res);
      if (res.status == 1) {
        showMessage({
          message: 'Thông báo',
          description: 'Thay đổi mật khẩu thành công',
          type: 'success',
          duration: 1500,
          icon: 'success',
        });
        await Utils.nsetStorage(nkey.password, this.Password_Moi);
        await Utils.nsetStorage(nkey.flag, '0');
        await this.chuyenTrang();
        await AsyncStorage.clear();
      }
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Vui lòng nhập lại, sai tài khoản hoặc mật khẩu',
        type: 'warning',
        duration: 1500,
        icon: 'warning',
      });
    }
  };

  chuyenTrang = async () => {
    // this.props.navigation.replace('HomeStackScreen');
    await this.props.navigation.navigate('AuthStack', {screen: 'SigninScreen'});
  };

  onPressShowPassword = () => {
    this.setState({
      ShowPassword: !this.state.ShowPassword,
    });
  };

  onPressShowPassword_NhapLai = () => {
    this.setState({
      ShowPassword_NhapLai: !this.state.ShowPassword_NhapLai,
    });
  };

  componentDidMount = () => {
    // this._GetDSLike();
  };

  render() {
    const {ShowPassword, ShowPassword_NhapLai} = this.state;
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={async () => {
                  Utils.goback(this, '');
                  ROOTGlobal.GetProfileUser();
                }}>
                <Image
                  source={goback}
                  style={{
                    height: FontSize.scale(13),
                    width: FontSize.verticalScale(18),
                  }}></Image>
              </TouchableOpacity>

              <Text style={styles.title}>Thay đổ mật khẩu</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.khung_baoboc}>
            <View style={{marginVertical: 10}}>
              <View>
                <Text style={styles.text_tkmk}>Nhập mật khẩu</Text>
                <View style={styles.khungtextinput}>
                  <TextInput
                    secureTextEntry={true}
                    autoCapitalize="none"
                    placeholder="Mật khẩu"
                    placeholderTextColor="black"
                    style={styles.textinput}
                    onChangeText={(text) => this.handlePass(text)}>
                    {this.Password}
                  </TextInput>
                </View>
              </View>

              <View>
                <Text style={styles.text_tkmk}>Nhập lại mật khẩu</Text>
                <View style={styles.khungtextinput}>
                  <TextInput
                    secureTextEntry={ShowPassword_NhapLai}
                    autoCapitalize="none"
                    placeholder="Mật khẩu"
                    placeholderTextColor="black"
                    style={styles.textinput}
                    onChangeText={(text) => this.handlePass_NhapLai(text)}>
                    {this.Password_NhapLai}
                  </TextInput>
                  <TouchableOpacity
                    onPress={() => this.onPressShowPassword_NhapLai()}>
                    <Image
                      source={
                        ShowPassword_NhapLai == true ? invisible : visibility
                      }
                      style={styles.image_icon_mk_visibility}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              <View style={{paddingTop: 10}}>
                <Text style={styles.text_tkmk}>Nhập mật khẩu mới</Text>
                <View style={styles.khungtextinputMK}>
                  <TextInput
                    secureTextEntry={ShowPassword}
                    autoCapitalize="none"
                    placeholder="Mật khẩu"
                    placeholderTextColor="black"
                    style={styles.textinput}
                    onChangeText={(text) => this.handlePass_Moi(text)}>
                    {this.Password_Moi}
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

            {this.state.PassMoi && this.state.Pass && this.state.PassNhapLai ? (
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.buttonDangnhap}
                  onPress={() => this._UpdatePasss()}>
                  <Text style={styles.textDangNhap}>Thay đổi mật khẩu</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.buttonContainer}>
                <View
                  style={{
                    backgroundColor: '#696969',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 10,
                    padding: 10,
                    // width: '6',
                    width: FontSize.verticalScale(200),
                    height: FontSize.scale(40),
                  }}
                  onPress={() => this._UpdatePasss()}>
                  <Text style={styles.textDangNhap}>Thay đổi mật khẩu</Text>
                </View>
              </View>
            )}
          </View>

          {/* <View
            style={{
              margin: 10,
              borderWidth: 1,
              borderRadius: 20,
              width: FontSize.verticalScale(150),
              height: FontSize.scale(30),
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#007DE3',
            }}>
            <TouchableOpacity
              onPress={() => Utils.goscreen(this, 'ScreenThayDoiPass')}>
              <Text>Thay đổi password</Text>
            </TouchableOpacity>
          </View> */}
        </View>
        {/* <TouchableOpacity
          style={{
            position: 'absolute',
            bottom: 20,
            right: 20,
            backgroundColor: 'blue',
            height: FontSize.scale(45),
            width: FontSize.verticalScale(45),
            borderRadius: 40,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Image
            style={{
              height: FontSize.scale(18),
              width: FontSize.verticalScale(18),
              // borderRadius: 50,
              tintColor: '#FFFFFF',
            }}
            resizeMode="contain"
            source={edite}></Image>
        </TouchableOpacity> */}
      </View>
    );
  }
}

const height = Dimensions.get('screen').height;
const width = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  header: {
    height: FontSize.scale(45),
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#007DE3',
    // backgroundColor: 'yellow',
  },
  footer: {
    flex: 1,
    paddingHorizontal: 20,
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
    // flex: 1,
    // backgroundColor: 'yellow',
  },
  buttonDangnhap: {
    backgroundColor: '#007DE3',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    padding: 10,
    // width: '6',
    width: FontSize.verticalScale(200),
    height: FontSize.scale(40),
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
