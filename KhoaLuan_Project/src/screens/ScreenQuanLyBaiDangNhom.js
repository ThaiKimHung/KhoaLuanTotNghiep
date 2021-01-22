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
} from '../apis/apiUser';
import {ROOTGlobal} from '../apis/dataGlobal';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {showMessage, hideMessage} from 'react-native-flash-message';
import moment from 'moment';

import ChonLoaiBaiDang from '../components/ChonLoaiBaiDang';
import ScreenAllBaiDang_QuanLy_Nhom from './ScreenAllBaiDang_QuanLy_Nhom';

const windowWidth = Dimensions.get('window').width;
const goback = require('../assets/images/go-back-left-arrow.png');
const bachamdoc = require('../assets/images/daubacham_doc.png');

export default class ScreenQuanLyBaiDangNhom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      quyengroup: false,
    };
  }
  Nhandata = async () => {
    const {id_nguoidang = {}} = this.props.route.params;
    this.setState({
      quyengroup: id_nguoidang.quyen_group,
    });

    // console.log('this bài đăng nhóm', id_nguoidang);
    // await console.log('quyyeenf nhóm ======', await this.state.quyengroup);
  };

  componentDidMount = async () => {
    await this.Nhandata();
  };

  render() {
    // let id_gruop = this.props.route.params.id_nguoidang.ID_group;
    let ten_group = this.props.route.params.id_nguoidang.Ten_Group;
    // console.log('id group screen all bài đăng', id_gruop, ten_group);
    // console.log('this bai dang nhom:', this);
    return (
      <View style={styles.container}>
        <View style={styles.back}>
          <View
            style={{
              justifyContent: 'center',
              flexDirection: 'row',
              alignItems: 'center',
            }}>
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
            <Text style={styles.title}>Quản lý bài đăng nhóm</Text>
          </View>
        </View>

        <View style={{flex: 1}}>
          <ScreenAllBaiDang_QuanLy_Nhom
            nthis={this}></ScreenAllBaiDang_QuanLy_Nhom>
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
