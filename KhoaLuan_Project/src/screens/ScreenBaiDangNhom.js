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
import ScreenAllBaiDang_Nhom from './ScreenAllBaiDang_Nhom';

const windowWidth = Dimensions.get('window').width;
const goback = require('../assets/images/go-back-left-arrow.png');
const bachamdoc = require('../assets/images/daubacham_doc.png');

export default class ScreenBaiDangNhom extends React.Component {
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
            <Text style={styles.title}>{ten_group}</Text>

            {this.state.quyengroup == true ? (
              <TouchableOpacity
                onPress={() =>
                  Utils.goscreen(this, 'Modal_CaiDatNhom', {
                    id_nguoidang: this.props.route.params,
                  })
                }
                style={{
                  justifyContent: 'center',
                  margin: 5,
                  backgroundColor: '#FFFFFF',
                  height: FontSize.scale(22),
                  width: FontSize.verticalScale(22),
                  alignItems: 'center',
                }}>
                <Image
                  source={bachamdoc}
                  style={{
                    height: FontSize.scale(20),
                    width: FontSize.verticalScale(18),
                    // marginRight: 5,
                    // justifyContent: 'center',
                  }}></Image>
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <ChonLoaiBaiDang
          onPress={() => {
            // this.props.navigation.navigate('ScreenLoaiBaiDang');
            Utils.goscreen(this, 'ScreenLoaiBaiDang', {
              screennhom: this.props.route.params.id_nguoidang.ID_group,
              tennhom: this.props.route.params.id_nguoidang.Ten_Group,
            });
          }}></ChonLoaiBaiDang>

        <View style={{flex: 1}}>
          <ScreenAllBaiDang_Nhom nthis={this}></ScreenAllBaiDang_Nhom>
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
