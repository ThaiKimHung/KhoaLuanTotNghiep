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
import GoBack from '../components/GoBack';

import {
  GetDSKhenThuong,
  AddBaiDang_KhenThuong,
  AddBaiDang_KhenThuong_Nhom,
  Update_BaiDang_KhenThuong,
  GetDSNhanVien,
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

import {ROOTGlobal} from '../apis/dataGlobal';
import _ from 'lodash';
const cancel = require('../assets/images/cancel.png');
const goback = require('../assets/images/go-back-left-arrow.png');
const search = require('../assets/images/search.png');
const group = require('../assets/images/group_people.png');
const dropdown = require('../assets/images/caret-down.png');
export default class Edit_KhenThuong extends React.Component {
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
      title: '',
      noidung: '',
      itemSelec_chuyenve: 0,
      idbaidang: '',
      idloaibaidang: '',
      isActive_User: false,
      dsUser: '',
      tenUser: [],
      refresh: true,
    };
  }

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

  EmptyListMessage = ({item}) => {
    return (
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };
  _GetDsKhenThuong = async () => {
    let res = await GetDSKhenThuong();
    // console.log('res ds khen thưởng', res);
    if (res.status === 1) {
      this.setState({
        DsKhenThuong: res.Data,
        refresh: false,
      });
    } else {
      this.setState({
        refresh: false,
      });
    }
  };

  handleNoiDung(text) {
    this.setState({
      noidung: text,
    });
  }

  ChuyenData = async (item) => {
    Utils.goscreen(this, 'Edit_KhenThuong_Detail');
    this.setState({
      DataChuyenVe: item,
    });
  };

  renderItem = ({item, index}) => {
    return (
      <View>
        {this.state.selectedItem == item.ID_khenthuong ? (
          <TouchableOpacity
            onPress={() => {
              if (this.state.selectedItem == item.ID_khenthuong) {
                this.setState({
                  selectedItem: '',
                });
              }
            }}
            style={[
              styles.khung,
              {
                marginLeft: index % 2 != 0 ? 5 : 0,
                backgroundColor: '#87CEFF',
              },
            ]}>
            <View style={styles.khung_DS}>
              <SvgUri
                width={FontSize.scale(100)}
                height={FontSize.verticalScale(100)}
                source={{
                  uri: item.icon,
                }}
              />
              <Text style={{margin: 5, textAlign: 'center'}}>
                {item.tieude}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.setState({
                selectedItem: item.ID_khenthuong,
              });
            }}
            style={[
              styles.khung,
              {marginLeft: index % 2 != 0 ? 5 : 0, backgroundColor: 'yellow'},
            ]}>
            <View style={styles.khung_DS}>
              <SvgUri
                width={FontSize.scale(100)}
                height={FontSize.verticalScale(100)}
                source={{
                  uri: item.icon,
                }}
              />
              <Text style={{margin: 5, textAlign: 'center'}}>
                {item.tieude}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  GanData = async () => {
    const {
      id_nguoidang = {},
    } = this.props.route.params.id_nguoidang.id_nguoidang;
    // console.log('id', id_nguoidang);
    let tit = id_nguoidang.title;
    let khenthuong = id_nguoidang[0].KhenThuong
      ? id_nguoidang[0].KhenThuong[0]
      : '';
    this.setState({
      title: id_nguoidang[0].title,
      noidung: id_nguoidang[0].NoiDung,
      selectedItem: khenthuong.id_khenthuong,
      idbaidang: id_nguoidang[0].Id_BaiDang,
      idloaibaidang: id_nguoidang[0].Id_LoaiBaiDang,
    });
    // await console.log('loại khen thưởng', this.state.itemSelec_chuyenve);
    // await console.log('title', this.state.title);
    // await console.log('noi dung', this.state.noidung);
    // await console.log('item', this.state.selectedItem);
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
      id_khenthuong: await this.state.selectedItem,
      typepost: '',
      // UpdateDate: date + 'T' + time,
      UpdateBy: await Utils.ngetStorage(nkey.id_user),
    });

    // console.log('strBody edit khen thưởng', strBody);
    let res = await Update_BaiDang_KhenThuong(strBody);
    // console.log('res update edit khen thưởng', res);
    if (res.status == 1) {
      showMessage({
        message: 'Thông báo',
        description: 'Sửa thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      // Utils.goscreen(this, 'Home');
      Utils.goscreen(this, 'ScreenDetailBaiDang');
      await ROOTGlobal.GetDsAllBaiDang();
      await ROOTGlobal.GetChiTietBaiDang();
      await ROOTGlobal.GanDataChitiet();
      // await ROOTGlobal.GetChiTietBaiDang();
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
  componentDidMount = async () => {
    await this._GetAllUser();
    await this._GetDsKhenThuong();
    await this.GanData();
  };
  render() {
    const {isActive_User, selectLyDo, tenUser} = this.state;
    const {
      id_nguoidang = {},
    } = this.props.route.params.id_nguoidang.id_nguoidang;

    return (
      <ScrollView style={styles.container}>
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
                onPress={() => {
                  Utils.goscreen(this, 'Home');
                  // this.setState({
                  //   DataChuyenVe: {},
                  // });
                }}>
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
                }}>
                <Text style={styles.title}>Sửa khen thưởng</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                <TouchableOpacity onPress={() => this.EditBaiDang()}>
                  <Text style={styles.textDang}>Sửa</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.header}>
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
                value={
                  this.state.noidung
                  // ? this.setState({})
                  // : this.state.haveValue_NoiDung
                }></TextInput>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          {this.state.DsKhenThuong.length != 0 ? (
            <FlatList
              data={this.state.DsKhenThuong}
              renderItem={this.renderItem}
              ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={this.EmptyListMessage}
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true}, this._GetDsKhenThuong);
              }}
            />
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      </ScrollView>
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
    backgroundColor: '#9C9C9C',
    // justifyContent: 'center',
    // flex: 1,
    height: 'auto',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    // marginVertical: 10,
  },
  footer: {
    height: 'auto',
    // width: '100%',
    padding: 10,
    // position: 'absolute',
  },
  khung: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    height: FontSize.scale(heightScreen / 2.5),
    width: FontSize.verticalScale(widthScreen / 2.5),
  },
  container_khung: {
    width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
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
    maxHeight: 150,
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
  back: {
    flexDirection: 'row',
    height: FontSize.scale(45),
    backgroundColor: '#007DE3',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginBottom: 10,
  },
  title: {
    fontSize: FontSize.reSize(20),
    marginLeft: 10,
    // textAlign: 'center',
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
  khung_tieude: {
    // height: FontSize.scale(40),
    backgroundColor: '#DDDDDD80',
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 10,
    padding: 5,
  },
});
