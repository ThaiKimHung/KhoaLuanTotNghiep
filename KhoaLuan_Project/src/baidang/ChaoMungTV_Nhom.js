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
  AddThongBao,
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const search = require('../assets/images/search.png');
const goback = require('../assets/images/go-back-left-arrow.png');
const dropdown = require('../assets/images/caret-down.png');
export default class ChaoMungTV extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveValue_NoiDung: '',

      idgroup: '',
      tengroup: '',
      DataChuyenVe: '',
    };
  }
  handleNoiDung(text) {
    this.setState({
      haveValue_NoiDung: text,
    });
  }

  ChuyenData = async (item) => {
    Utils.goscreen(this, 'ChaoMungTV_Nhom');
    this.setState({
      DataChuyenVe: item,
    });
  };

  _AddThongBao = async () => {
    let strBody = JSON.stringify({
      title: 'Đã thêm 1 bài đăng chào mừng thành viên mới',
      create_tb_by: await Utils.ngetStorage(nkey.id_user),
    });

    console.log('strBody add Thông báo', strBody);
    let res = await AddThongBao(strBody);
    console.log('res add thông báo', res);
  };

  _PostBaiDang_Nhom = async () => {
    const id_loaibaidang = this.props.route.params.id_loaibaidang;
    let strBody = JSON.stringify({
      Id_LoaiBaiDang: id_loaibaidang,
      title: this.state.DataChuyenVe.Username,
      NoiDung: this.state.haveValue_NoiDung,
      Id_Group: this.state.idgroup,
      id_khenthuong: 0,
      typepost: '',
      // CreatedDate: date + 'T' + time,
      CreatedBy: await Utils.ngetStorage(nkey.id_user),
      UpdateDate: '0',
      UpdateBy: 0,
    });

    console.log('strBody tin nhanh nhóm', strBody);
    let res = await PostBaiDang_Nhom(strBody);
    console.log('res tin nhanh nhóm', res);
    if (res.status == 1) {
      let thanhcong = res.status;
      // this.props.navigation.navigate('Home', {DangBaiThanhCong: thanhcong});
      Utils.goscreen(this, 'ScreenBaiDangNhom');
      showMessage({
        message: 'Thông báo',
        description: 'Đăng bài thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      await this._AddThongBao();
      await ROOTGlobal.GetDsAllBaiDang_Nhom();
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
  _render_Dang = () => {
    const {idgroup, tengroup, DataChuyenVe, haveValue_NoiDung} = this.state;
    if (
      DataChuyenVe != '' &&
      idgroup != '' &&
      tengroup != '' &&
      haveValue_NoiDung != ''
    ) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              this._PostBaiDang_Nhom();
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
  GanData = async () => {
    {
      this.props &&
      this.props.route.params &&
      this.props.route.params.screennhom &&
      this.props.route.params.tennhom
        ? this.setState({
            idgroup: this.props.route.params.screennhom,
            tengroup: this.props.route.params.tennhom,
          })
        : null;
      await console.log(
        'this.state.idgroup và tên group =====',
        this.state.idgroup,
        this.state.tengroup,
      );
    }
  };
  componentDidMount = async () => {
    await this.GanData();
  };

  render() {
    const {isActive, selectLyDo} = this.state;
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

              <Text style={styles.title}>
                Tạo tin chào mừng thành viên mới nhóm
              </Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              {this._render_Dang()}
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
                    {this.state.tengroup}
                  </Text>
                </TouchableOpacity>
              </View>
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
