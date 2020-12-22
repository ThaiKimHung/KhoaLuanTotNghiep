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
import {ROOTGlobal} from '../apis/dataGlobal';
const goback = require('../assets/images/go-back-left-arrow.png');
const search = require('../assets/images/search.png');
const dropdown = require('../assets/images/caret-down.png');
export default class TinNhanh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveValue_TieuDe: '',
      // haveValue_Noidung: '',
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
  handleTieude(text) {
    this.setState(
      {
        haveValue_TieuDe: text,
      },
      () => this._render_Dang(),
    );
    // alert(text);
  }
  // handleNoidung(text) {
  //   this.setState({
  //     haveValue_Noidung: text,
  //   });
  // }
  _PostBaiDang = async () => {
    const id_loaibaidang = this.props.route.params.id_loaibaidang;
    // const today = new Date();
    // const date =
    //   today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    // const time = today.getHours() + ':' + today.getMinutes();
    let strBody = JSON.stringify({
      Id_LoaiBaiDang: id_loaibaidang,
      title: this.state.haveValue_TieuDe,
      NoiDung: '',
      Id_Group: 0,
      id_khenthuong: 0,
      typepost: '',
      // CreatedDate: date + 'T' + time,
      CreatedBy: await Utils.ngetStorage(nkey.id_user),
      UpdateDate: '0',
      UpdateBy: 0,
    });

    console.log('strBody tin nhanh', strBody);

    let res = await PostBaiDang(strBody);
    console.log('ress tin nhanh', res);
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
      ROOTGlobal.GetDsAllBaiDang();
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

  _PostBaiDang_Nhom = async () => {
    const id_loaibaidang = this.props.route.params.id_loaibaidang;
    // const today = new Date();
    // const date =
    //   today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    // const time = today.getHours() + ':' + today.getMinutes();
    let strBody = JSON.stringify({
      Id_LoaiBaiDang: id_loaibaidang,
      title: this.state.haveValue_TieuDe,
      NoiDung: '',
      Id_Group: this.state.selectLyDo.ID_group,
      id_khenthuong: 0,
      typepost: '',
      CreatedDate: date + 'T' + time,
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
    let {haveValue_TieuDe, selectLyDo} = this.state;
    if (haveValue_TieuDe && selectLyDo == '') {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              this._PostBaiDang();
            }}>
            <Text style={styles.textDang}>Đăng</Text>
          </TouchableOpacity>
        </View>
      );
    } else if (haveValue_TieuDe && selectLyDo) {
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

  componentDidMount = async () => {
    await this._GetDSGroup();
    await this.LaymangTam();
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

              <Text style={styles.title}>Tạo tin nhanh</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              {this._render_Dang()}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.khung_Nhap}>
            <Text>Nhập tiêu đề</Text>
            <View style={styles.khung_tieude}>
              <TextInput
                multiline={true}
                placeholder="Mời bạn nhập tiêu đề"
                style={{fontSize: FontSize.reSize(20)}}
                onChangeText={(text) => this.handleTieude(text)}></TextInput>
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
