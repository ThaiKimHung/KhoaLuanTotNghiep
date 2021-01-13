import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import {Avatar, SearchBar} from 'react-native-elements';
import {GetUserProfile} from '../apis/apiUser';
import Utils from '../apis/Utils';
import FontSize from '../components/size';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {ROOTGlobal} from '../apis/dataGlobal';
import {showMessage, hideMessage} from 'react-native-flash-message';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';

const avatar = require('../assets/images/avatar.png');
const goback = require('../assets/images/go-back-left-arrow.png');
const edite = require('../assets/images/edit2.png');

export default class ScreenTaoNhom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thongtin: '',
      ngay: '',
    };
    ROOTGlobal.GetProfileUserTrangCaNhan = this._GetUserProfile;
  }
  _GetUserProfile = async () => {
    let res = await GetUserProfile(await Utils.ngetStorage(nkey.id_user));
    // console.log('res get user thoong tin ============', res);
    if (res.status == 1) {
      this.setState({
        thongtin: res.Data,
      });
      // await console.log('state ', this.state.thongtin);
      await this.setState({
        ngay: await this.state.thongtin[0].ngaysinh,
      });
      // await console.log('ngay ', this.state.ngay);
      await Utils.nsetStorage(nkey.avatar, this.state.thongtin[0].Avatar);
      await Utils.nsetStorage(nkey.Username, this.state.thongtin[0].Username);
    } else {
      alert('thất bại tải thông tin cá nhân');
    }
  };

  componentDidMount = async () => {
    await this._GetUserProfile();
  };

  render() {
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

              <Text style={styles.title}>Thông tin cá nhân</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View>
            <TouchableOpacity
              style={{
                alignItems: 'center',
                padding: 10,
              }}>
              <View
                style={{
                  marginLeft: 5,
                  borderRadius: 30,
                  height: FontSize.scale(60),
                  width: FontSize.verticalScale(60),
                  // padding: 10,
                }}>
                <Image
                  style={{
                    height: FontSize.scale(60),
                    width: FontSize.verticalScale(60),
                    borderRadius: 50,
                  }}
                  resizeMode="cover"
                  source={
                    this.state.thongtin
                      ? {uri: this.state.thongtin[0].Avatar}
                      : avatar
                  }></Image>
              </View>
            </TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#4F4F4F50',
                borderRadius: 10,
                height: FontSize.scale(50),
              }}>
              <Text style={{color: '#4F4F4F80', marginHorizontal: 10}}>
                Username:
              </Text>
              <Text style={{fontSize: FontSize.reSize(25)}}>
                {this.state.thongtin
                  ? this.state.thongtin[0].Username
                  : 'Loading...'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#4F4F4F50',
                borderRadius: 10,
                height: FontSize.scale(50),
              }}>
              <Text style={{color: '#4F4F4F80', marginHorizontal: 10}}>
                {' '}
                Địa chỉ:{' '}
              </Text>
              <Text style={{fontSize: FontSize.reSize(25)}}>
                {this.state.thongtin
                  ? this.state.thongtin[0].diachi
                  : 'Loading...'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#4F4F4F50',
                borderRadius: 10,
                height: FontSize.scale(50),
              }}>
              <Text style={{color: '#4F4F4F80', marginHorizontal: 10}}>
                Giới tính:
              </Text>
              <Text style={{fontSize: FontSize.reSize(25)}}>
                {this.state.thongtin
                  ? this.state.thongtin[0].gioitinh
                  : 'Loading...'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#4F4F4F50',
                borderRadius: 10,
                height: FontSize.scale(50),
              }}>
              <Text style={{color: '#4F4F4F80', marginHorizontal: 10}}>
                Ngày sinh
              </Text>
              <Text style={{fontSize: FontSize.reSize(25)}}>
                {moment(this.state.ngay.substring(0, 10), 'YYYY-MM-DD').format(
                  'DD-MM-YYYY',
                )}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomWidth: 1,
                borderColor: '#4F4F4F50',
                borderRadius: 10,
                height: FontSize.scale(50),
              }}>
              <Text style={{color: '#4F4F4F80', marginHorizontal: 10}}>
                Số điện thoại
              </Text>
              <Text style={{fontSize: FontSize.reSize(25)}}>
                {this.state.thongtin
                  ? this.state.thongtin[0].sdt
                  : 'Loading...'}
              </Text>
            </View>
          </View>
          <View
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
            <TouchableOpacity>
              <Text>Thay đổi password</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity
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
          }}
          onPress={() =>
            Utils.goscreen(this, 'Edit_TrangThongTinCaNhan', {
              thongtin: this.state.thongtin,
            })
          }>
          <Image
            style={{
              height: FontSize.scale(18),
              width: FontSize.verticalScale(18),
              // borderRadius: 50,
              tintColor: '#FFFFFF',
            }}
            resizeMode="contain"
            source={edite}></Image>
        </TouchableOpacity>
      </View>
    );
  }
}
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
  },
  title: {
    fontSize: FontSize.reSize(20),
    marginLeft: 10,
  },
  textDang: {
    fontSize: FontSize.reSize(20),
    marginRight: 10,
  },
  textDang_invisibale: {
    fontSize: FontSize.reSize(20),
    marginRight: 10,
    color: '#696969',
  },
  khung_tieude: {
    // height: FontSize.scale(40),
    backgroundColor: '#DDDDDD80',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
  },
  khung_noidung: {
    // height: FontSize.scale(40),
    backgroundColor: '#DDDDDD80',
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 10,
    padding: 5,
  },
  khung_DS: {
    // width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  textinput: {
    backgroundColor: '#DDDDDD80',
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: FontSize.reSize(20),
  },
  khung_Nhap: {
    marginHorizontal: 10,
    marginTop: 20,
  },
});
