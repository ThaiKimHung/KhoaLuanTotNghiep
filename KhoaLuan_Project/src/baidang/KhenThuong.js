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
  GetDSGroup,
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import DropDownPicker from 'react-native-custom-dropdown';
import {ROOTGlobal} from '../apis/dataGlobal';

const goback = require('../assets/images/go-back-left-arrow.png');
const search = require('../assets/images/search.png');
const group = require('../assets/images/group_people.png');
const dropdown = require('../assets/images/caret-down.png');
export default class KhenThuong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsKhenThuong: [],
      refresh: true,
      selectedItem: 0,
      userSelected: 0,
      noidung: '',
      user: {},
      DataChuyenVe: {},
      // DataNhom: {},
      value: null,
      dsNhom: [],
      mangtam: [],
      isOpen: false,
      nhomSelected: '',
      isActive: false,
      selectLyDo: '',
    };
  }
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
        refresh: !this.state.refresh,
      });
    } else {
      this.setState({
        refresh: !this.state.refresh,
      });
    }
  };

  // updateSearch = (search) => {
  //   this.setState({search});
  // };
  handleNoiDung(text) {
    this.setState({
      noidung: text,
    });
  }
  _AddThongBao = async () => {
    let strBody = JSON.stringify({
      title: 'Đã thêm 1 bài đăng khen thưởng',
      create_tb_by: await Utils.ngetStorage(nkey.id_user),
    });

    console.log('strBody add Thông báo', strBody);
    let res = await AddThongBao(strBody);
    console.log('res add thông báo', res);
  };

  ChuyenData = async (item) => {
    Utils.goscreen(this, 'KhenThuong');
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

  _GetDSGroup = async () => {
    let res = await GetDSGroup(await Utils.ngetStorage(nkey.id_user));
    // let res = await GetDSGroup(1);
    console.log('res', res);
    if (res.status == 1) {
      this.setState({
        dsNhom: res.Data,
      });
      console.log('state', this.state.dsNhom);
    }
  };
  LaymangTam = async () => {
    let temp = this.state.dsNhom.map((e) => {
      var ritem = {};
      ritem['value'] = e.ID_group + '';
      ritem['label'] = e.Ten_Group;
      return ritem;
    });
    await this.setState({mangtam: temp});
  };

  DangBaiDang_KhenThuong = async () => {
    const id_loaibaidang = this.props.route.params.id_loaibaidang;

    let strBody = JSON.stringify({
      Id_LoaiBaiDang: id_loaibaidang,
      title: this.state.DataChuyenVe.Username,
      NoiDung: this.state.noidung,
      Id_Group: 0,
      id_khenthuong: this.state.selectedItem,
      typepost: 'string',
      // CreatedDate: date + 'T' + time,
      CreatedBy: await Utils.ngetStorage(nkey.id_user),
      UpdateDate: '',
      UpdateBy: 0,
    });

    console.log('strBody khen thưởng k nhóm', strBody);
    let res = await AddBaiDang_KhenThuong(strBody);
    console.log('res khen thưởng k nhóm', res);
    if (res.status == 1) {
      showMessage({
        message: 'Thông báo',
        description: 'Đăng bài thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      Utils.goscreen(this, 'Home');
      this.setState({
        userSelected: '',
        DataChuyenVe: {},
      });
      await this._AddThongBao();
      await ROOTGlobal.GetDsAllBaiDang();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Đăng bài thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
    }
  };

  DangBaiDang_KhenThuong_Group = async () => {
    const id_loaibaidang = this.props.route.params.id_loaibaidang;
    let strBody = JSON.stringify({
      Id_LoaiBaiDang: id_loaibaidang,
      title: this.state.DataChuyenVe.Username,
      NoiDung: this.state.noidung,
      Id_Group: this.state.selectLyDo.ID_group,
      id_khenthuong: this.state.selectedItem,
      typepost: 'string',
      // CreatedDate: date + 'T' + time,
      CreatedBy: await Utils.ngetStorage(nkey.id_user),
      UpdateDate: '',
      UpdateBy: 0,
    });

    console.log('strBody khen thưởng nhóm', strBody);
    let res = await AddBaiDang_KhenThuong_Nhom(strBody);
    console.log('res khen thưởng nhóm', res);
    if (res.status == 1) {
      showMessage({
        message: 'Thông báo',
        description: 'Đăng bài thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      Utils.goscreen(this, 'Home');
      this.setState({
        userSelected: '',
        DataChuyenVe: {},
      });
      await this._AddThongBao();
      await ROOTGlobal.GetDsAllBaiDang();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Đăng bài thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
    }
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
        this._render_Dang();
      },
    );
  };

  _keyExtrac = (item, index) => `${item.ID_group}`;
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
          <Text>{item.Ten_Group}</Text>
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

  _render_Dang = () => {
    let {userSelected, selectLyDo, noidung, selectedItem} = this.state;
    if (
      userSelected != 0 &&
      noidung != '' &&
      selectLyDo == '' &&
      selectedItem != 0
    ) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.DangBaiDang_KhenThuong();
            }}>
            <Text style={styles.textDang}>Đăng</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (
      userSelected != 0 &&
      noidung != '' &&
      selectLyDo != '' &&
      selectedItem != 0
    ) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              this.DangBaiDang_KhenThuong_Group();
            }}>
            <Text style={styles.textDang}>Đăng</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.textDang_invisibale}>Đăng</Text>
        </View>
      );
    }
  };

  componentDidMount = async () => {
    await this._GetDsKhenThuong();
    await this.GanDataSauKhiChuyenVe();
    await this._GetDSGroup();
    await this.LaymangTam();
  };
  render() {
    const {isActive, selectLyDo} = this.state;
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
                  Utils.goback(this, '');
                  this.setState({
                    DataChuyenVe: {},
                  });
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
                <Text style={styles.title}>Tạo tin khen thưởng</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                {this._render_Dang()}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.header}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSize.reSize(20),
              marginBottom: 5,
            }}>
            Chọn thành viên:
          </Text>
          <TouchableOpacity
            style={styles.thanh_search}
            onPress={() => {
              Utils.goscreen(this, 'SearchUser', {
                chuyenData: this.ChuyenData,
              });
            }}>
            <Image source={search} style={styles.icon}></Image>
            {this.state.DataChuyenVe ? (
              <Text
                style={{
                  fontSize: FontSize.reSize(20),
                  marginLeft: 10,
                  color: '#000000',
                  flex: 1,
                }}>
                {this.state.DataChuyenVe.Username}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: FontSize.reSize(20),
                  marginLeft: 10,
                  color: '#69696980',
                  flex: 1,
                }}>
                Mời bạn chọn nhân viên
              </Text>
            )}
          </TouchableOpacity>

          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSize.reSize(20),
              marginBottom: 5,
            }}>
            Nhập nội dung:
          </Text>
          <TextInput
            autoCapitalize="none"
            placeholderTextColor="#69696980"
            placeholder="Nội dung bài đăng"
            multiline={true}
            style={styles.textinput}
            onChangeText={(text) => this.handleNoiDung(text)}></TextInput>

          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSize.reSize(20),
              marginBottom: 5,
            }}>
            Chọn Nhóm:
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
                  {selectLyDo.Ten_Group ? selectLyDo.Ten_Group : ''}
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
                data={this.state.dsNhom}
                renderItem={this._renderPH}
                keyExtractor={this._keyExtrac}
              />
            ) : null}
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
});
