import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';
import FontSize from '../components/size';
import {showMessage, hideMessage} from 'react-native-flash-message';
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import {Avatar, Accessory} from 'react-native-elements';

import Utils from '../apis/Utils';
import {nkey} from '../apis/keyStore';
import AsyncStorage from '@react-native-community/async-storage';
import {Login, PostTinhTrang} from '../apis/apiUser';

const logo = require('../assets/images/Jeelogo.png');
const bg = require('../assets/images/bg.png');
const add = require('../assets/images/add.png');

export default class SplashScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      flagLuu: '0',
      avatar: '',
      name: '',
      id: '',
      loading: true,
    };
  }

  async _getThongTin() {
    this.setState({
      avatar: await Utils.ngetStorage(nkey.avatar),
      name: await Utils.ngetStorage(nkey.Username),
      flagLuu: await Utils.ngetStorage(nkey.flag),
      id: await Utils.ngetStorage(nkey.id_user),
    });
    // console.log('ava thoing tin', avatar);
  }
  async _logout() {
    let flag = await Utils.ngetStorage(nkey.flag);
    console.log('flag trc out', flag);
    let flag1 = await Utils.nsetStorage(nkey.flag, '0');
    console.log('flag1 sau out', flag1);
    AsyncStorage.clear();
    this.updateTinhTrangUser();
    this.props.navigation.navigate('SigninScreen');
  }

  updateTinhTrangUser = async () => {
    let strBody = JSON.stringify({
      ID_User: this.state.id,
      TinhTrang: false,
    });

    console.log('strBody', strBody);
    let res = await PostTinhTrang(strBody);
    console.log('res update tình trạng sau khi đăng xuất', res);
  };

  chuyenTrang() {
    this.props.navigation.navigate('HomeStackScreen');
    showMessage({
      message: 'Thông báo',
      description: 'Chào mừng bạn quay lại',
      type: 'success',
      duration: 1500,
      backgroundColor: '#1A90D9',
      icon: 'success',
    });
  }

  closeActivityIndicator = () =>
    setTimeout(
      () =>
        this.setState({
          loading: false,
        }),
      2000,
    );

  componentDidMount() {
    this._getThongTin();
    this.closeActivityIndicator();
  }

  render() {
    const Load = () => {
      return (
        <View style={styles.footerTong}>
          {this.state.flagLuu === null ? (
            <View style={[styles.footer]}>
              <Animatable.View
                style={styles.button}
                animation="bounceInLeft"
                duraton="1500">
                <TouchableOpacity
                  style={styles.khung_buttonSignin}
                  onPress={() =>
                    this.props.navigation.navigate('SigninScreen')
                  }>
                  <Text style={styles.textSign}>Sign In</Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
          ) : (
            <View style={[styles.footer2]}>
              <Animatable.View
                style={styles.button1}
                animation="fadeInDown"
                duraton="1500">
                <TouchableOpacity
                  style={styles.khung_Chuaava}
                  onPress={() => this.chuyenTrang()}>
                  {this.state.avatar ? (
                    <Avatar
                      size="medium"
                      source={{uri: this.state.avatar}}
                      activeOpacity={0.7}
                      rounded
                    />
                  ) : (
                    <ActivityIndicator size="small" color="#0078D7" />
                  )}

                  <View style={{justifyContent: 'center', margin: 10}}>
                    <Text style={styles.name}>{this.state.name}</Text>
                  </View>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.st_button}
                  onPress={() =>
                    Alert.alert(
                      'Thông Báo',
                      'Bạn Muốn Đăng Xuất',
                      [
                        {text: 'OK', onPress: () => this._logout()},
                        {
                          text: 'Cancel',
                          //   onPress: () => console.log('Cancel Pressed'),
                          style: 'cancel',
                        },
                      ],
                      {cancelable: false},
                    )
                  }>
                  <View style={styles.khung_Add}>
                    <Image source={add} style={styles.add}></Image>
                  </View>

                  <Text style={styles.text_DangNhapOder}>
                    Đăng nhập bằng tài khoản khác
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            </View>
          )}
        </View>
      );
    };

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <Animatable.Image
            animation="bounceInLeft"
            duraton="1500"
            source={logo}
            style={styles.logo}
            resizeMode="stretch"
          />
        </View>

        {this.state.loading ? (
          <Animatable.View
            style={{flex: 1, backgroundColor: '#E9EBEE'}}
            animation="zoomInUp"
            duraton="2000">
            <ActivityIndicator
              size="large"
              color="#0078D7"
              animating={this.state.loading}
            />
          </Animatable.View>
        ) : (
          <Load></Load>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E9EBEE',
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#E9EBEE',
    alignItems: 'center',
  },
  footerTong: {
    flex: 1,
    backgroundColor: '#E9EBEE',
    justifyContent: 'center',
  },

  footer: {
    // backgroundColor: '#CCCCCC',
    // paddingVertical: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer2: {
    flex: 1,
    paddingVertical: 50,
    paddingHorizontal: 10,
  },
  logo: {
    width: FontSize.scale(150),
    height: FontSize.verticalScale(150),
    borderRadius: 100,
    tintColor: '#007DE3',
  },
  button: {
    alignItems: 'center',
    // marginBottom: 30,
    justifyContent: 'center',
  },
  button1: {
    // alignItems: 'center',
    // marginBottom: 30,
    justifyContent: 'center',
  },
  signIn: {
    width: FontSize.scale(150),
    height: FontSize.verticalScale(40),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
    flexDirection: 'row',
  },
  textSign: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: FontSize.reSize(20),
    // fontFamily: 'Zocail',
  },
  khung_ava: {
    backgroundColor: 'black',
  },
  khung_Chuaava: {
    // backgroundColor: '#00CCCC',
    borderWidth: 1,
    borderColor: '#69696980',
    flexDirection: 'row',
    padding: 5,
    marginBottom: 10,
    borderRadius: 20,
  },
  st_button: {
    // borderWidth: 1,
    // borderColor: '#69696980',
    alignItems: 'center',
    padding: 5,
    flexDirection: 'row',
    borderRadius: 20,
  },
  khung_Add: {
    backgroundColor: '#00BFFF20',
    height: FontSize.scale(25),
    width: FontSize.verticalScale(25),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
  },
  add: {
    height: FontSize.scale(15),
    width: FontSize.verticalScale(15),
    tintColor: '#0078D7',
  },
  name: {
    fontSize: FontSize.reSize(30),
    fontWeight: '800',
  },
  khung_buttonSignin: {
    backgroundColor: '#007DE3',
    height: FontSize.scale(40),
    width: FontSize.verticalScale(140),
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text_DangNhapOder: {
    fontSize: FontSize.reSize(20),
    marginLeft: 10,
    color: '#007DE3',
    fontWeight: 'bold',
  },
});
