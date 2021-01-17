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
  getDSThongDiep,
  AddLuotXem,
} from '../apis/apiUser';
import {ROOTGlobal} from '../apis/dataGlobal';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {showMessage, hideMessage} from 'react-native-flash-message';
import moment from 'moment';

import ChonLoaiBaiDang from '../components/ChonLoaiBaiDang';
import BaiDang_CEO_Component from './BaiDang_CEO_Component';
const windowWidth = Dimensions.get('window').width;
const goback = require('../assets/images/go-back-left-arrow.png');
const bachamdoc = require('../assets/images/daubacham_doc.png');
const arrow = require('../assets/images/right-arrow.png');
export default class BaiDang extends React.Component {
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
    ROOTGlobal.GetDSBThongDiep = this._GetDSBThongDiep;
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

  _GetDSBThongDiep = async () => {
    // const idgroup = this.props.nthis.props.route.params.screennhom;
    // const {id_nguoidang = {}} = this.props.nthis.props.route.params;
    let res = await getDSThongDiep();
    // console.log('Danh sách thông điệp:', res);
    if (res.status == 1) {
      this.setState({
        DSBaiThongDiep: res.Data,
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

  _AddLuotXem = async (idthongdiep) => {
    let strBody = JSON.stringify({
      id_thongdiep: idthongdiep,
      id_user: await Utils.ngetStorage(nkey.id_user),
    });
    // console.log('boday', strBody);

    let res = await AddLuotXem(strBody);
    // console.log('res add lượt xem', res);
  };

  _renderItem = ({item, index}) => {
    // console.log(item.id_thongdiep);
    return (
      <BaiDang_CEO_Component
        key={index}
        item={item}
        nthis={this}
        onPress={async () => {
          await this._AddLuotXem(item.id_thongdiep);
          await Utils.goscreen(this, 'ScreenDetailBaiDang_CEO', {
            id_nguoidang: item,
          });
        }}></BaiDang_CEO_Component>
    );
  };

  _onRefresh = () => {
    this.setState({refresh: true}, () => this._GetDSBThongDiep());
  };

  layChucVu = async () => {
    await this.setState({
      chucvu: await Utils.ngetStorage(nkey.ChucVu),
    });
    // await console.log(this.state.chucvu);
    // await console.log(await Utils.ngetStorage(nkey.ChucVu));
  };

  componentDidMount = async () => {
    // await this.Nhandata();
    await this._GetDSBThongDiep();
    await this.layChucVu();
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
            <Text style={styles.title}>Thông Điệp CEO</Text>
          </View>
        </View>
        {this.state.chucvu === 'Phó giám đốc' ||
        this.state.chucvu === 'Giám Đốc' ? (
          <View
            style={{
              height: FontSize.scale(40),
              justifyContent: 'center',
              borderBottomColor: '#C0C0C0',
              borderBottomWidth: 1,
            }}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 10,
              }}
              onPress={() => Utils.goscreen(this, 'Tao_ThongDiep')}>
              <Text style={{textAlign: 'center', fontSize: 18}}>
                Tạo Thông Điệp
              </Text>
              <Image
                source={arrow}
                style={{
                  height: FontSize.scale(15),
                  width: FontSize.verticalScale(15),
                }}></Image>
            </TouchableOpacity>
          </View>
        ) : null}

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
