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
import * as Animatable from 'react-native-animatable';
import LinearGradient from 'react-native-linear-gradient';
import Utils from '../apis/Utils';
import {nkey} from '../apis/keyStore';
import AsyncStorage from '@react-native-community/async-storage';
import {Login, PostTinhTrang} from '../apis/apiUser';

const logo = require('../assets/images/Jee.png');
const bg = require('../assets/images/bg.png');
export default class SplashScreen2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loader: true,
      flagLuu: '0',
      avatar: '',
      name: '',
      id: '',
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
  componentDidMount() {
    this._getThongTin();
  }

  render() {
    return (
      <View style={styles.container}>
        <ImageBackground source={bg} style={styles.image_bg}>
          <View style={styles.header}>
            <Animatable.Image
              animation="bounceIn"
              duraton="1500"
              source={logo}
              style={styles.logo}
              resizeMode="stretch"
            />
          </View>
          {this.state.flagLuu === null ? (
            <Animatable.View
              style={[styles.footer]}
              animation="fadeInUp"
              duraton="1500">
              <Animatable.View
                style={styles.button}
                animation="fadeInDown"
                duraton="1500">
                <TouchableOpacity
                  onPress={() =>
                    this.props.navigation.navigate('SigninScreen')
                  }>
                  <LinearGradient
                    colors={['#00FFFF', '#006699']}
                    style={styles.signIn}>
                    <Text style={styles.textSign}>Sign In</Text>
                  </LinearGradient>
                </TouchableOpacity>
              </Animatable.View>
            </Animatable.View>
          ) : (
            <Animatable.View
              style={[styles.footer2]}
              animation="fadeInUp"
              duraton="1500">
              <Animatable.View
                style={styles.button}
                animation="fadeInDown"
                duraton="1500">
                <TouchableOpacity
                  style={styles.khung_Chuaava}
                  onPress={() =>
                    this.props.navigation.navigate('HomeStackScreen')
                  }>
                  <Image
                    source={{uri: this.state.avatar}}
                    style={styles.khung_ava}></Image>
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
                  <Text style={{fontSize: FontSize.reSize(20), marginLeft: 15}}>
                    Logout
                  </Text>
                </TouchableOpacity>
              </Animatable.View>
            </Animatable.View>
          )}
        </ImageBackground>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  footer: {
    height: '30%',
    backgroundColor: '#CCCCCC',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  footer2: {
    flex: 1,
    backgroundColor: '#CCCCCC',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 50,
    paddingHorizontal: 30,
  },
  image_bg: {
    flex: 1,
    height: '100%',
    width: '100%',
  },
  logo: {
    width: FontSize.scale(150),
    height: FontSize.verticalScale(150),
    borderRadius: 100,
  },
  button: {
    alignItems: 'center',
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
  },
  khung_ava: {
    height: FontSize.scale(100),
    width: FontSize.verticalScale(100),
    backgroundColor: 'black',
  },
  khung_Chuaava: {
    borderColor: '#FFFFFF',
    borderWidth: 5,
  },
  st_button: {
    backgroundColor: 'blue',
    height: FontSize.scale(40),
    width: '90%',
    justifyContent: 'center',
  },
});
