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
import * as Animatable from 'react-native-animatable';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';
import {ROOTGlobal} from '../apis/dataGlobal';
import {
  PostBaiDang,
  PostBaiDang_Nhom,
  GetDSGroup,
  Update_BaiDang,
  GetDSNhanVien,
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

import _ from 'lodash';
const search = require('../assets/images/search.png');
const goback = require('../assets/images/go-back-left-arrow.png');
const dropdown = require('../assets/images/caret-down.png');
const cancel = require('../assets/images/cancel.png');
export default class Edit_ChaoMungTV_Nhom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsKhenThuong: [],
      refresh: true,
      selectedItem: 0,
      userSelected: 0,
      noidung: '',
      user: {},
      DataChuyenVe: '',
      // DataNhom: {},
      value: null,
      dsNhom: [],
      mangtam: [],
      isOpen: false,
      nhomSelected: '',
      idbaidang: '',
      idloaibaidang: '',
      title: '',
      noidung: '',
      itemSelec_chuyenve: 0,
      isActive_User: false,
      dsUser: '',
      tenUser: [],
      refresh: true,
    };
  }
  handleNoiDung(text) {
    this.setState({
      noidung: text,
    });
    // alert(text);
  }
  // handleNoidung(text) {
  //   this.setState({
  //     haveValue_Noidung: text,
  //   });
  // }

  _GetAllUser = async () => {
    let res = await GetDSNhanVien();
    // console.log('ress all user bên search user', res);
    if (res.status == 1) {
      this.setState({
        dsUser: res.Data,
        refresh: false,
      });
    } else {
      this.setState({refresh: false});
      alert('thất bại tải ds user');
    }
    // await console.log('ds thành viên', this.state.dsUser);
  };

  _renderActiveUser = () => {
    this.setState({isActive_User: !this.state.isActive_User});
  };
  // _keyExtractor = ({ item, index }) => index.toString();

  _callBackUser = async (item) => {
    // this.setState({
    //   noidung:
    // });
    this.state.tenUser.push(item.hoten);
    // await console.log(this.state.tenUser);
    // this.setState(() => {
    this._renderActiveUser();
    // () => this._render_Dang();
    // });
  };

  _keyExtracUser = (item, index) => `${item.id_NV}`;
  _renderPHUser = ({item, index}) => {
    // console.log(item);
    return (
      <View
        key={index}
        style={{
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => this._callBackUser(item)}
          style={{paddingHorizontal: 15, paddingVertical: 16}}>
          <Text>{item.hoten}</Text>
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

  ChuyenData = async (item) => {
    Utils.goscreen(this, 'Edit_ChaoMungTV_Nhom');
    this.setState({
      DataChuyenVe: item,
    });
  };

  GanDataSauKhiChuyenVe = () => {
    this.state.DataChuyenVe
      ? this.setState({
          userSelected: this.state.DataChuyenVe.ID_user,
        })
      : null;
    // console.log('user selected', this.state.userSelected);
  };

  EditBaiDang = async () => {
    // const today = new Date();
    // const date =
    //   today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    // const time = today.getHours() + ':' + today.getMinutes();
    let ten = '';
    for (var i = 0; i < this.state.tenUser.length; i++) {
      ten += this.state.tenUser[i] + ' ';
    }
    // let user = _.size(tenUser);
    let title_ne = _.size(this.state.tenUser) > 0 ? ten : this.state.title;
    let strBody = JSON.stringify({
      ID_BaiDang: await this.state.idbaidang,
      Id_LoaiBaiDang: await this.state.idloaibaidang,
      title: title_ne,
      NoiDung: this.state.noidung,
      Id_Group: this.state.group ? this.state.group.id_group : 0,
      id_khenthuong: 0,
      typepost: '',
      // UpdateDate: date + 'T' + time,
      UpdateBy: await Utils.ngetStorage(nkey.id_user),
    });

    // console.log('strBody edit CMTVM', strBody);
    let res = await Update_BaiDang(strBody);
    // console.log('res update edit CMTVM', res);
    if (res.status == 1) {
      showMessage({
        message: 'Thông báo',
        description: 'Sửa thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      Utils.goscreen(this, 'ScreenBaiDangNhom');
      // await ROOTGlobal.GetDsAllBaiDang();
      // await ROOTGlobal.GetChiTietBaiDang();
      await ROOTGlobal.GetDsAllBaiDang_Nhom();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Sửa thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
    }
  };

  _GetDSGroup = async () => {
    let res = await GetDSGroup(await Utils.ngetStorage(nkey.id_user));
    // let res = await GetDSGroup(1);
    // console.log('res ds group', res);
    if (res.status == 1) {
      this.setState({
        dsNhom: res.Data,
      });
      // console.log('state', this.state.dsNhom);
    }
  };

  ganData = async () => {
    const {
      id_nguoidang = {},
    } = this.props.route.params.id_nguoidang.id_nguoidang;
    // console.log('id người đằng', id_nguoidang);
    this.setState({
      title: id_nguoidang.title,
      noidung: id_nguoidang.NoiDung,
      group: id_nguoidang ? id_nguoidang.Group[0] : '',
      idbaidang: id_nguoidang.Id_BaiDang,
      idloaibaidang: id_nguoidang.Id_LoaiBaiDang,
    });
    // await console.log('data mang ve', this.state.DataChuyenVe);
    // await console.log('ten', this.state.title);
    // await console.log('id bai dang', this.state.idbaidang);

    // console.log('noi dung', this.noidung);
  };

  componentDidMount = async () => {
    await this._GetAllUser();
    await this._GetDSGroup();
    // await this.LaymangTam();
    await this.ganData();
  };

  render() {
    const {isActive_User, selectLyDo, tenUser} = this.state;
    const {
      id_nguoidang = {},
    } = this.props.route.params.id_nguoidang.id_nguoidang;
    // let group = id_nguoidang.Group[0].ten_group;
    // console.log('check group', group);
    // console.log('id nguoi dang', id_nguoidang);
    // console.log('this detail props chào mừng', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  Utils.goscreen(this, 'ScreenBaiDangNhom');
                  // Utils.goback(this/);
                }}>
                <Image
                  source={goback}
                  style={{
                    height: FontSize.scale(13),
                    width: FontSize.verticalScale(18),
                  }}></Image>
              </TouchableOpacity>

              <Text style={styles.title}>Sửa bài đăng CMTVM</Text>
            </View>
            <TouchableOpacity
              onPress={() => this.EditBaiDang()}
              style={{justifyContent: 'center'}}>
              <Text style={styles.textDang}>Sửa</Text>

              {/* {this._render_Dang()} */}
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.khung_Nhap}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: FontSize.reSize(20),
                marginBottom: 5,
              }}>
              Chọn thành viên:
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
                  onPress={this._renderActiveUser}
                  style={[
                    {
                      fontSize: 14,
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginTop: 5,
                    },
                  ]}>
                  <Text style={[{fontSize: 18, flex: 1}]}>
                    {_.size(tenUser) > 0
                      ? tenUser.map((item, index) => item + ' ')
                      : this.state.title}
                    {/* {tenUser.map((item, index) => item + ' ')} */}

                    {/* {noidung} */}
                  </Text>

                  <Image
                    source={dropdown}
                    style={[{tintColor: '#4F4F4F80', width: 20, height: 18}]}
                    resizeMode="contain"
                  />
                </TouchableOpacity>
                {_.size(tenUser) > 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      this.setState({
                        tenUser: [],
                      });
                    }}>
                    <Image
                      source={cancel}
                      style={{
                        height: FontSize.scale(20),
                        width: FontSize.verticalScale(20),
                      }}></Image>
                  </TouchableOpacity>
                ) : null}
              </View>
              {isActive_User == true ? (
                <FlatList
                  style={{
                    marginTop: 1,
                    backgroundColor: 'white',
                    height: FontSize.scale(200),
                    borderRadius: 10,
                    borderWidth: 2,
                    borderColor: 'gray',
                    borderBottomColor: 'white',
                  }}
                  data={this.state.dsUser}
                  renderItem={this._renderPHUser}
                  keyExtractor={this._keyExtracUser}
                />
              ) : null}
            </View>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: FontSize.reSize(20),
                marginBottom: 5,
              }}>
              Nhập nội dung
            </Text>
            <View style={styles.khung_tieude}>
              <TextInput
                multiline={true}
                placeholder="Mời bạn nhập nội dung"
                style={{fontSize: FontSize.reSize(20)}}
                onChangeText={(text) => this.handleNoiDung(text)}
                value={this.state.noidung}></TextInput>
            </View>
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
    // backgroundColor: 'yellow',
  },
  header: {
    height: FontSize.scale(45),
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#007DE3',
  },
  footer: {
    flex: 1,
    // backgroundColor: '#FFCC99',
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
    marginBottom: 5,
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
  thanh_search: {
    height: FontSize.scale(40),
    backgroundColor: '#DDDDDD80',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 5,
  },
  icon: {
    width: FontSize.scale(25),
    height: FontSize.verticalScale(25),
    marginLeft: 5,
    tintColor: '#696969',
    marginLeft: 10,
  },
});
