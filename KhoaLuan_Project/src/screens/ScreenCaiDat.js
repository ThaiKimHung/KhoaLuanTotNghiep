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
} from 'react-native';
import FontSize from '../components/size';
import {Avatar, Accessory} from 'react-native-elements';
import FlashMessage, {showMessage} from 'react-native-flash-message';

import {GetAllUser} from '../apis/apiUser';
import Utils from '../apis/Utils';

import {Login, PostTinhTrang} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import AsyncStorage from '@react-native-community/async-storage';

const logout = require('../assets/images/logout.png');
export default class ScreenCaiDat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      avatar: '',
      name: '',
      id: '',
    };
  }

  async _getThongTin() {
    this.setState({
      avatar: await Utils.ngetStorage(nkey.avatar),
      name: await Utils.ngetStorage(nkey.Username),
      id: await Utils.ngetStorage(nkey.id_user),
    });
    // console.log('ava thoing tin', this.state.id);
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

    console.log('strBody update tinh trang user', strBody);
    let res = await PostTinhTrang(strBody);
    console.log('res update tình trạng sau khi đăng xuất cai dat', res);
  };

  componentDidMount() {
    this._getThongTin();
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.khung_title}>
            <Text style={styles.title}> Menu</Text>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.khungchua}>
            <Avatar
              size="medium"
              source={
                this.state.avatar
                  ? {uri: this.state.avatar}
                  : {
                      uri:
                        'https://png.pngtree.com/png-clipart/20190904/original/pngtree-black-round-pattern-user-cartoon-avatar-png-image_4492904.jpg',
                    }
              }
              activeOpacity={0.7}
              rounded
            />
            <Text style={{fontSize: FontSize.reSize(25), marginLeft: 5}}>
              {this.state.name ? this.state.name : 'Loading...'}
            </Text>
          </View>
          <View style={styles.khung_CaiDat}>
            <TouchableOpacity
              style={styles.st_button}
              onPress={() =>
                Alert.alert(
                  'Thông Báo',
                  'Bạn Muốn Đăng Xuất',
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
                Logout
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
    backgroundColor: '#3399FF',
    height: FontSize.scale(50),
  },
  footer: {
    flex: 1,
    backgroundColor: '#E9EBEE',
  },
  khungchua: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    backgroundColor: '#E9EBEE',
    margin: 10,
  },
  khung_CaiDat: {
    paddingHorizontal: 10,
  },
  st_button: {
    height: FontSize.scale(50),
    alignItems: 'center',
    flexDirection: 'row',
    paddingHorizontal: 10,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderTopColor: '#4F4F4F50',
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
