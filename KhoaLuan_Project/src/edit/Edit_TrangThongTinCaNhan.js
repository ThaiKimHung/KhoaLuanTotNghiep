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
  Button,
  ImageBackground,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {ROOTGlobal} from '../apis/dataGlobal';
import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';
import GoBack from '../components/GoBack';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import moment from 'moment';

import {
  Update_BaiDang,
  AvatarUser,
  UpdateUserProfile_NV,
  UpdateUserProfile_User,
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import ImagePicker from 'react-native-image-crop-picker';
import dataGioitinh from '../data/Dulieu';

const goback = require('../assets/images/go-back-left-arrow.png');
const check = require('../assets/images/check.png');
const calendar = require('../assets/images/calendar.png');
const avatar = require('../assets/images/avatar.png');
const editpic = require('../assets/images/photo-camera-interface-symbol-for-button.png');
const dropdown = require('../assets/images/caret-down.png');
export default class Screen_EditBaiDang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noidung: '',
      tieude: '',
      thongtin: '',
      username: '',
      diachi: '',
      gioitinh: '',
      ngaysinh: '',
      sdt: '',
      ava: '',
      visibility: false,
      DateDisplay: '',
      image: '',
      path: '',
      isActive: false,
      selectLyDo: '',
      idnv: '',
    };
    this.id_nguoidang = {};
  }
  handleUsername(text) {
    this.setState({
      username: text,
    });
  }
  handleDiaChi(text) {
    this.setState({
      diachi: text,
    });
  }
  handleSDT(text) {
    this.setState({
      sdt: text,
    });
  }

  handleConfirm = async (date) => {
    this.setState({
      DateDisplay: new Date(date).toUTCString(),
      visibility: false,
    });
  };

  onPressCancel = () => {
    this.setState({
      visibility: false,
    });
  };
  onPressButton = () => {
    this.setState({
      visibility: true,
    });
  };

  openGalary = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      // console.log('image--------', image);
      this.setState({
        image: image,
        path: image.path,
      });
      // console.log('state image =====', this.state.image);
      // console.log('path image =====', this.state.path);
      // this.hamTest();
    });
  };

  _renderActive = () => {
    this.setState({isActive: !this.state.isActive});
  };
  // _keyExtractor = ({ item, index }) => index.toString();
  _callBack = (item) => {
    this.setState(
      {
        selectLyDo: item,
      },
      () => {
        this._renderActive();
        // this._render_Dang();
      },
    );
  };

  _keyExtrac = (item, index) => `${item.id}`;
  _renderPH = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => this._callBack(item)}
          style={{paddingHorizontal: 15, paddingVertical: 16}}>
          <Text>{item.gioitinh}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: 2,
            width: '100%',
            // backgroundColor: colors.black_20,
          }}></View>
      </View>
    );
  };

  nhanData = async () => {
    const {thongtin = {}} = this.props.route.params;
    // await console.log('thong tin state', thongtin);
    await this.setState({
      username: thongtin[0].Username,
      diachi: thongtin[0].diachi,
      gioitinh: thongtin[0].gioitinh,
      ngaysinh: thongtin[0].ngaysinh,
      sdt: thongtin[0].sdt,
      ava: thongtin[0].Avatar,
      gioitinh: thongtin[0].gioitinh,
      idnv: thongtin[0].ID_NV,
    });
    // await console.log('thong tin state', this.state.ava);
  };

  _UpdateUser = async () => {
    //Avatar user
    let strBody = JSON.stringify({
      image: this.state.image ? await this.state.image.data : null,
      name: this.state.image
        ? (await this.state.image.path.split('/').slice(-1)) + ''
        : null,
    });
    // console.log('strBody file ảnh---------', strBody);
    let res = this.state.image
      ? await AvatarUser(await Utils.ngetStorage(nkey.id_user), strBody)
      : null;
    // console.log('res file ảnh-----', res);

    //UpdateUserProfile_User
    let strBody_UpdateUserProfile_User = JSON.stringify({
      id_user: await Utils.ngetStorage(nkey.id_user),
      username: this.state.username,
    });
    // console.log('strBody UpdateUserProfile_User---------', strBody);
    let res_UpdateUserProfile_User = await UpdateUserProfile_User(
      await Utils.ngetStorage(nkey.id_user),
      await this.state.idnv,
      strBody_UpdateUserProfile_User,
    );
    // console.log(
    //   ' res UpdateUserProfile_User---------',
    //   res_UpdateUserProfile_User,
    // );

    //_UpdateUserProfile_NV
    let strBody_UpdateUserProfile_NV = JSON.stringify({
      id_nv: 0,
      diachi: this.state.diachi,
      sdt: this.state.sdt,
      gioitinh: this.state.selectLyDo
        ? this.state.selectLyDo.gioitinh
        : this.state.gioitinh,
      ngaysinh: this.state.DateDisplay
        ? await moment(this.state.DateDisplay).format('MM/DD/YYYY')
        : this.state.ngaysinh,
    });
    // console.log(
    //   'strBody UpdateUserProfile_NV---------',
    //   strBody_UpdateUserProfile_NV,
    // );
    let res_UpdateUserProfile_NV = await UpdateUserProfile_NV(
      await Utils.ngetStorage(nkey.id_user),
      await this.state.idnv,
      strBody_UpdateUserProfile_NV,
    );
    // console.log(' res UpdateUserProfile_NV---------', res_UpdateUserProfile_NV);

    if (
      this.state.image
        ? res.status == 1
        : res == null &&
          res_UpdateUserProfile_NV.status == 1 &&
          res_UpdateUserProfile_User.status == 1
    ) {
      showMessage({
        message: 'Thông báo',
        description: 'Sửa thông tin thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });

      await Utils.goback(this, '');
      await ROOTGlobal.GetProfileUserTrangCaNhan();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Sửa thông tin thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
    }
  };

  _UpdateUserProfile_User = async () => {
    let strBody = JSON.stringify({
      id_user: await Utils.ngetStorage(nkey.id_user),
      username: this.state.username,
    });
    // console.log('strBody UpdateUserProfile_User---------', strBody);
    let res = await UpdateUserProfile_User(
      await Utils.ngetStorage(nkey.id_user),
      strBody,
    );
    // console.log(' res UpdateUserProfile_User---------', res);
  };

  _UpdateUserProfile_NV = async () => {
    let strBody = JSON.stringify({
      id_nv: 0,
      diachi: this.state.diachi,
      sdt: this.state.sdt,
      gioitinh: this.state.selectLyDo
        ? this.state.selectLyDo.gioitinh
        : this.state.gioitinh,
      ngaysinh: this.state.DateDisplay,
    });
    // console.log('strBody UpdateUserProfile_NV---------', strBody);
    let res = await UpdateUserProfile_NV(
      await Utils.ngetStorage(nkey.id_user),
      strBody,
    );
    // console.log(' res UpdateUserProfile_NV---------', res);
  };

  ThucThi = async () => {
    // await this._AvatarUser();
    await this._UpdateUserProfile_User();
    await this._UpdateUserProfile_NV();
  };

  componentDidMount = async () => {
    await this.nhanData();
  };

  render() {
    const {isActive, selectLyDo} = this.state;
    // console.log('trang edit thong tin ca nhan', this.props);
    return (
      <View style={{flex: 1}}>
        <View style={styles.back}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              // backgroundColor: '#007DE3',
            }}>
            <View
              style={{
                flexDirection: 'row',
                margin: 5,
                alignItems: 'center',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={async () =>
                  Alert.alert(
                    'Thông Báo',
                    'Bạn Không Muốn Lưu Thay Đổi?',
                    [
                      {
                        text: 'Đồng ý',
                        onPress: async () => {
                          Utils.goback(this, ''),
                            await ROOTGlobal.GetProfileUser();
                        },
                      },
                      {
                        text: 'Hủy',
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  )
                }>
                <Image
                  source={goback}
                  style={{
                    height: FontSize.scale(13),
                    width: FontSize.verticalScale(18),
                  }}></Image>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}></View>

              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => this._UpdateUser()}>
                  <Text style={styles.textDang}>Sửa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View
            style={{
              alignItems: 'center',
              padding: 10,
            }}>
            <View
              style={{
                marginLeft: 5,
                borderRadius: 50,
                height: FontSize.scale(60),
                width: FontSize.verticalScale(60),
                // padding: 10,
              }}>
              {this.state.image == '' ? (
                <ImageBackground
                  style={{
                    height: FontSize.scale(60),
                    width: FontSize.verticalScale(60),
                    borderRadius: 50,
                    backgroundColor: 'yellow',
                  }}
                  resizeMode="cover"
                  source={this.state.ava ? {uri: this.state.ava} : avatar}>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#69696920',
                      width: '100%',
                      height: '40%',
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                    onPress={() => this.openGalary()}>
                    <Image
                      source={editpic}
                      style={{
                        height: FontSize.scale(15),
                        width: FontSize.verticalScale(15),
                      }}></Image>
                  </TouchableOpacity>
                </ImageBackground>
              ) : (
                <ImageBackground
                  style={{
                    height: FontSize.scale(60),
                    width: FontSize.verticalScale(60),
                    borderRadius: 50,
                    backgroundColor: 'blue',
                  }}
                  resizeMode="cover"
                  source={this.state.path ? {uri: this.state.path} : avatar}>
                  <TouchableOpacity
                    style={{
                      position: 'absolute',
                      bottom: 0,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: '#69696920',
                      width: '100%',
                      height: '40%',
                      borderTopRightRadius: 10,
                      borderTopLeftRadius: 10,
                    }}
                    onPress={() => this.openGalary()}>
                    <Image
                      source={editpic}
                      style={{
                        height: FontSize.scale(15),
                        width: FontSize.verticalScale(15),
                      }}></Image>
                  </TouchableOpacity>
                </ImageBackground>
              )}
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: FontSize.reSize(20),
                marginBottom: 5,
              }}>
              Username:
            </Text>
            <TextInput
              autoCapitalize="none"
              placeholderTextColor="#69696980"
              placeholder="username"
              multiline={true}
              style={styles.textinput}
              onChangeText={(text) => this.handleUsername(text)}
              value={this.state.username}></TextInput>
          </View>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: FontSize.reSize(20),
                marginBottom: 5,
              }}>
              Địa chi:
            </Text>
            <TextInput
              autoCapitalize="none"
              placeholderTextColor="#69696980"
              placeholder="Nội dung bài đăng"
              multiline={true}
              style={styles.textinput}
              onChangeText={(text) => this.handleDiaChi(text)}
              value={this.state.diachi}></TextInput>
          </View>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: FontSize.reSize(20),
                marginBottom: 5,
              }}>
              Giới tính:
            </Text>
            <View style={{marginTop: 5}}>
              <View
                style={{
                  borderWidth: 1,
                  padding: 15,
                  borderRadius: 20,
                  borderColor: '#DDDDDD80',
                  backgroundColor: '#DDDDDD80',
                }}>
                <TouchableOpacity
                  onPress={this._renderActive}
                  style={[
                    {
                      fontSize: 14,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 5,
                    },
                  ]}>
                  <Text numberOfLines={1} style={[{fontSize: 18, flex: 1}]}>
                    {selectLyDo.gioitinh
                      ? selectLyDo.gioitinh
                      : this.state.gioitinh}
                  </Text>

                  <Image
                    source={dropdown}
                    style={[{tintColor: '#4F4F4F80', width: 20, height: 18}]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
              </View>
              {isActive == true ? (
                <FlatList
                  style={{
                    marginTop: 1,
                    backgroundColor: 'white',
                    height: 'auto',
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'gray',
                    borderBottomColor: 'white',
                  }}
                  data={dataGioitinh}
                  renderItem={this._renderPH}
                  keyExtractor={this._keyExtrac}
                />
              ) : null}
            </View>
          </View>
          <View style={{marginBottom: 10}}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: FontSize.reSize(20),
                  marginBottom: 5,
                  marginRight: 10,
                }}>
                Ngày sinh:
              </Text>
              <TouchableOpacity onPress={this.onPressButton}>
                <Image
                  source={calendar}
                  style={{
                    height: FontSize.scale(20),
                    width: FontSize.verticalScale(20),
                  }}></Image>
              </TouchableOpacity>
            </View>

            {this.state.DateDisplay == '' ? (
              <View
                style={{
                  backgroundColor: '#69696920',
                  height: FontSize.scale(40),
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <Text style={{fontSize: 18, marginLeft: 15}}>
                  {moment(
                    this.state.ngaysinh.substring(0, 10),
                    'YYYY-MM-DD',
                  ).format('DD-MM-YYYY')}
                </Text>
              </View>
            ) : (
              <View
                style={{
                  backgroundColor: '#69696920',
                  height: FontSize.scale(40),
                  justifyContent: 'center',
                  borderRadius: 20,
                }}>
                <Text style={{fontSize: 18, marginLeft: 15}}>
                  {moment(this.state.DateDisplay).format('DD-MM-YYYY')}
                </Text>
              </View>
            )}

            <DateTimePickerModal
              mode="date"
              isDarkModeEnabled={true}
              isVisible={this.state.visibility}
              onConfirm={this.handleConfirm}
              onCancel={this.onPressCancel}></DateTimePickerModal>
          </View>
          <View style={{marginBottom: 10}}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: FontSize.reSize(20),
                marginBottom: 5,
              }}>
              Số điện thoại:
            </Text>
            <TextInput
              autoCapitalize="none"
              placeholderTextColor="#69696980"
              placeholder="Nhập số điện thoại"
              keyboardType="number-pad"
              maxLength={10}
              returnKeyType="done"
              style={styles.textinput}
              onChangeText={(text) => this.handleSDT(text)}
              value={this.state.sdt}></TextInput>
          </View>
        </View>
      </View>
    );
  }
}
const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // backgroundColor: '#9C9C9C',
    justifyContent: 'center',
    // padding: 10,
    // borderRadius: 10,
    // marginHorizontal: 10,
    // marginVertical: 10,
    padding: 10,
  },
  footer: {
    // height: '10%',
    // width: '100%',
    padding: 10,
    // margin: 5,
  },

  textinput: {
    backgroundColor: '#DDDDDD80',
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: FontSize.reSize(20),
    maxHeight: 150,
  },

  back: {
    flexDirection: 'row',
    height: FontSize.scale(45),
    backgroundColor: '#007DE3',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginBottom: 10,
  },
  textDang: {
    fontSize: FontSize.reSize(20),
    marginRight: 10,
  },
  textDang_invisibale: {
    fontSize: FontSize.reSize(20),
    marginRight: 10,
    color: '#696969',
    textAlign: 'center',
  },
});
