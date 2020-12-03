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
} from 'react-native';
import FontSize from '../components/size';
import {Avatar} from 'react-native-paper';
import {GetAllUser} from '../apis/apiUser';
import Utils from '../apis/Utils';

import {Login, PostTinhTrang} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import AsyncStorage from '@react-native-community/async-storage';

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
    console.log('ava thoing tin', this.state.id);
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
    console.log('res update tình trạng sau khi đăng xuất cai dat', res);
  };

  componentDidMount() {
    this._getThongTin();
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          {/* khung chứa avata và khung text input*/}
          <View style={styles.khungchua}>
            <Avatar.Image
              style={{margin: 5}}
              source={{uri: this.state.avatar}}
              size={FontSize.reSize(50)}
            />
            <Text style={{fontSize: FontSize.reSize(20)}}>
              {this.state.name}
            </Text>
          </View>
        </View>
        <View style={styles.footer}>
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
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#009387',
  },
  header: {
    backgroundColor: '#3399FF',
    justifyContent: 'flex-start',
  },
  footer: {
    flex: 1,
    padding: 10,
  },
  khungchua: {
    flexDirection: 'row',
    padding: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    backgroundColor: '#C0C0C020',
  },
  st_button: {
    backgroundColor: 'blue',
    height: FontSize.scale(40),
    width: '90%',
    justifyContent: 'center',
  },
});
