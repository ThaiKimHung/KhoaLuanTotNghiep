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
import DropDownPicker from 'react-native-custom-dropdown';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import {PostBaiDang, PostBaiDang_Nhom, GetDSGroup} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const search = require('../assets/images/search.png');
const goback = require('../assets/images/go-back-left-arrow.png');
export default class ChaoMungTV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveValue_NoiDung: '',
      // haveValue_Noidung: '',
      // DataNhom: {},
      value: null,
      dsNhom: [],
      mangtam: [],
      isOpen: false,
      nhomSelected: '',
    };
  }
  handleNoiDung(text) {
    this.setState({
      haveValue_NoiDung: text,
    });
    // alert(text);
  }
  // handleNoidung(text) {
  //   this.setState({
  //     haveValue_Noidung: text,
  //   });
  // }

  ChuyenData = async (item) => {
    Utils.goscreen(this, 'ChaoMungTV');
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

  _PostBaiDang = async () => {
    const id_loaibaidang = this.props.route.params.id_loaibaidang;
    const today = new Date();
    const date =
      today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes();
    let strBody = JSON.stringify({
      Id_LoaiBaiDang: id_loaibaidang,
      title: this.state.DataChuyenVe.Username,
      NoiDung: this.state.haveValue_NoiDung,
      Id_Group: this.state.nhomSelected ? this.state.nhomSelected : 0,
      id_khenthuong: 0,
      typepost: '',
      CreatedDate: date + 'T' + time,
      CreatedBy: await Utils.ngetStorage(nkey.id_user),
      UpdateDate: '0',
      UpdateBy: 0,
    });

    console.log('strBody tin nhanh', strBody);
    let res = await PostBaiDang(strBody);
    if (res.status == 1) {
      let thanhcong = res.status;
      // this.props.navigation.navigate('Home', {DangBaiThanhCong: thanhcong});
      Utils.goscreen(this, 'Home', {PostThanhCong: thanhcong});
      showMessage({
        message: 'Thông báo',
        description: 'Đăng bài thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
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

  componentDidMount = async () => {
    await this._GetDSGroup();
    await this.LaymangTam();
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  Utils.goback(this, '');
                }}>
                <Image
                  source={goback}
                  style={{
                    height: FontSize.scale(13),
                    width: FontSize.verticalScale(18),
                  }}></Image>
              </TouchableOpacity>

              <Text style={styles.title}>Tạo tin chào mừng thành viên mới</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              {this.state.haveValue_NoiDung ? (
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      this._PostBaiDang();
                    }}>
                    <Text style={styles.textDang}>Đăng</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <Text style={styles.textDang_invisibale}>Đăng</Text>
              )}
            </View>
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
            <Text>Nhập nội dung</Text>
            <View style={styles.khung_tieude}>
              <TextInput
                multiline={true}
                placeholder="Mời bạn nhập tiêu đề"
                style={{fontSize: FontSize.reSize(20)}}
                onChangeText={(text) => this.handleNoiDung(text)}></TextInput>
            </View>

            <Text>Chọn nhóm</Text>
            <View
              style={{
                minHeight: this.state.isOpen
                  ? 60 * this.state.mangtam.length
                  : 0,
                marginTop: 5,
              }}>
              <DropDownPicker
                onOpen={() => {
                  this.setState({
                    isOpen: true,
                  });
                }}
                // defaultValue="Chọn nhóm"
                items={this.state.mangtam}
                // defaultValue={}
                style={{backgroundColor: '#DDDDDD80', minHeight: 50}}
                itemStyle={{
                  justifyContent: 'flex-start',
                }}
                onClose={() => {
                  this.setState({isOpen: false});
                }}
                dropDownStyle={{
                  backgroundColor: '#DDDDDD80',
                  position: 'absolute',
                }}
                selectedtLabelStyle={{
                  color: 'blue',
                }}
                // containerStyle={{height: 70}}
                min={0}
                onChangeItem={(item) =>
                  this.setState({
                    nhomSelected: item.value,
                  })
                }
                searchable={true}
                searchablePlaceholder="Search for an item"
                searchablePlaceholderTextColor="gray"
                seachableStyle={{}}
                searchableError={() => <Text>Not Found</Text>}></DropDownPicker>
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
