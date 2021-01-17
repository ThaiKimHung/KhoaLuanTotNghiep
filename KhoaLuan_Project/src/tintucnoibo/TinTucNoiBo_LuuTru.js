import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  SafeAreaView,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontSize from '../components/size';
import GoBack from '../components/GoBack';
import DanhSachLike from '../components/DanhSachLike';
import Utils from '../apis/Utils';

import SvgUri from 'react-native-svg-uri';
import {
  AddComment_Child,
  GetChiTietBaiDang,
  AddLike,
  DeleteBaiDang_Like,
  getDSBaiDang_TinTucNoiBo,
  AddLuotXem,
} from '../apis/apiUser';
import {ROOTGlobal} from '../apis/dataGlobal';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {showMessage, hideMessage} from 'react-native-flash-message';
import moment from 'moment';

// import ChonLoaiBaiDang from '../components/ChonLoaiBaiDang';
// import BaiDang_CEO_Component from './BaiDang_CEO_Component';
const windowWidth = Dimensions.get('window').width;
const goback = require('../assets/images/go-back-left-arrow.png');
const bachamdoc = require('../assets/images/daubacham_doc.png');
const arrow = require('../assets/images/right-arrow.png');
const avatar = require('../assets/images/avatar.jpg');
const daubacham = require('../assets/images/daubacham.png');
const sheld = require('../assets/images/shield.png');
export default class TinTucNoiBo_LuuTru extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      //   quyengroup: false,
      tennhom: '',
      idnhom: '',
      DSBaiThongDiep: '',
      refresh: true,
      chucvu: '',
    };
    // ROOTGlobal.GetDSBThongDiep = this._GetDSBThongDiep;
  }
  // Nhandata = async () => {
  //   const {id_nguoidang = {}} = this.props.route.params;
  //   let nhom = id_nguoidang.Group ? id_nguoidang.Group[0] : {};
  //   this.setState({
  //     idnhom: nhom.id_group,
  //     tennhom: nhom.ten_group,
  //   });
  //   // console.log('this bài đăng nhóm', id_nguoidang);
  //   // await console.log('ten nhóm ======', await this.state.tennhom);
  // };

  _GetLuuTruKhenThuongUser = async () => {
    // const idgroup = this.props.nthis.props.route.params.screennhom;
    // const {id_nguoidang = {}} = this.props.nthis.props.route.params;
    let res = await getDSBaiDang_TinTucNoiBo();
    // console.log('Danh sách thông điệp:', res);
    if (res.status == 1) {
      this.setState({
        DSBaiThongDiep: res.data,
        refresh: false,
      });
    } else {
      this.setState({
        refresh: false,
      });
    }
  };

  EmptyListMessage = ({item}) => {
    return (
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };

  FoodterMessage = ({item}) => {
    return (
      <View onPress={() => getItem(item)}>
        <ActivityIndicator size="small" color="#0078D7"></ActivityIndicator>
      </View>
    );
  };

  // NhanData = async () => {
  //   // console.log('id group', this.props.nthis.props.route.params.screennhom);
  //   this.setState({
  //     idgroup: this.props.nthis.props.route.params.screennhom,
  //   });
  //   // await console.log('state id group', this.state.idgroup);
  // };

  _renderItem = ({item, index}) => {
    // console.log(item);
    // let day = item.createdate;
    // let ngay = day.substring(0, 10);
    // let time = day.substring(11, 16);
    return (
      <View
        style={{
          borderBottomWidth: 5,
          borderColor: '#69696920',
          backgroundColor: '#E9EBEE',
        }}>
        <View
          style={{
            // backgroundColor: '#1C86EE',
            margin: 5,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <View style={{flexDirection: 'row', padding: 5}}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              <View
                style={{
                  marginLeft: 5,
                  borderRadius: 30,
                  height: FontSize.scale(30),
                  width: FontSize.verticalScale(30),
                }}>
                <Image
                  style={{
                    height: FontSize.scale(30),
                    width: FontSize.verticalScale(30),
                    borderRadius: 20,
                  }}
                  resizeMode="cover"
                  source={item.avatar ? {uri: item.avatar} : avatar}></Image>
              </View>
            </TouchableOpacity>
            <View style={{flex: 1}}>
              <View style={{flexDirection: 'row'}}>
                <Text
                  style={{
                    fontWeight: 'bold',
                    fontSize: FontSize.reSize(20),
                    marginHorizontal: 5,
                  }}>
                  {item.username}
                </Text>
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  marginHorizontal: 5,
                  marginTop: -2,
                }}>
                {/* <Text style={{marginRight: 2}}>
                  {moment(ngay, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                </Text>
                <Text>{time}</Text> */}
              </View>
            </View>

            {/* <TouchableOpacity
              style={{padding: 5}}
              // onPress={() =>
              //   Utils.goscreen(
              //     this.props.nthis.props.nthis,
              //     'PopUpModal_XoaSua',
              //     {
              //       id_nguoidang: item,
              //     },
              //   )
              // }
            >
              <Image
                style={{
                  height: FontSize.scale(20),
                  width: FontSize.verticalScale(20),
                  // tintColor: '#007DE3',
                }}
                source={daubacham}
              />
            </TouchableOpacity> */}
          </View>
          <TouchableOpacity
            style={{paddingHorizontal: 10}}
            // onPress={this.props.onPress}
          >
            <View style={{flexDirection: 'row'}}>
              <Animatable.Image
                animation="pulse"
                iterationCount={10}
                direction="alternate-reverse"
                // easing="ease-out"s
                duration={5000}
                source={sheld}
                style={{
                  height: FontSize.scale(40),
                  width: FontSize.verticalScale(40),
                }}></Animatable.Image>
              <View style={{marginLeft: 10}}>
                <Text>{item.title}</Text>
                <Text style={{fontSize: FontSize.reSize(20)}}>
                  {item.NoiDung}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  _onRefresh = () => {
    this.setState({refresh: true}, () => this._GetLuuTruKhenThuongUser());
  };

  // layChucVu = async () => {
  //   await this.setState({
  //     chucvu: await Utils.ngetStorage(nkey.ChucVu),
  //   });
  // await console.log(this.state.chucvu);
  // await console.log(await Utils.ngetStorage(nkey.ChucVu));
  // };

  componentDidMount = async () => {
    // await this.Nhandata();
    await this._GetLuuTruKhenThuongUser();
    // await this.layChucVu();
  };

  render() {
    // let id_gruop = this.props.route.params.id_nguoidang.ID_group;
    // let ten_group = this.props.route.params.id_nguoidang.Ten_Group;
    // console.log('id group screen all bài đăng', id_gruop, ten_group);
    // console.log('this bai dang nhom:', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.back}>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => Utils.goback(this, '')}
              style={{justifyContent: 'center', marginLeft: 5}}>
              <Image
                source={goback}
                style={{
                  height: FontSize.scale(13),
                  width: FontSize.verticalScale(18),
                }}></Image>
            </TouchableOpacity>
            <Text style={styles.title}>Danh sách lưu trữ khen thưởng</Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <View>
            <FlatList
              data={this.state.DSBaiThongDiep}
              renderItem={this._renderItem}
              keyExtractor={(item, index) => index.toString()}
              refreshing={this.state.refresh}
              onRefresh={this._onRefresh}
              ListEmptyComponent={this.EmptyListMessage}
              ListFooterComponent={this.FoodterMessage}
              initialNumToRender={10}
              // ListHeaderComponent={this.HeaderMessage}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    flex: 1,
  },
});
