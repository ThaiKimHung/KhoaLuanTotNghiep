import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';

import BaiDangComponent from '../components/BaiDangComponent';
import {showMessage, hideMessage} from 'react-native-flash-message';

import * as Animatable from 'react-native-animatable';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import {GetDSBaiDang} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
const avatar = require('../assets/images/avatar.png');
export default class BaiDangComponentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DSBaiDang: [],
      refresh: true,
      length: '',
      thanhcong: '',
      id_user: '',
    };
  }

  componentDidMount = () => {
    this._GetDSBaiDang();
  };

  componentDidUpdate = () => {
    // this.props &&
    // this.props.route &&
    // this.props.route.params &&
    // this.props.route.params.thanhcong == 1
    //   ? this._GetDSBaiDang()
    //   : null;
  };

  _GetDSBaiDang = async () => {
    let res = '';
    this.setState({
      id_user: await Utils.ngetStorage(nkey.id_user),
    });
    console.log('id bài đăng', this.state.id_user);

    if (this.state.id_user == null) {
      this.setState({
        id_user: await Utils.ngetStorage(nkey.id_user),
      });
    }
    {
      res = await GetDSBaiDang(this.state.id_user);
      console.log('Danh sách bài đăng Screen all bài đăng:', res);
      // console.log('Danh sách bài đăng Screen all bài đăng:', res);
      if (res.status == 1) {
        this.setState({
          DSBaiDang: res.data,
          refresh: !this.state.refresh,
          length: this.state.DSBaiDang.length,
        });
        // console.log('ds bài đăng screen all bài đăng:', this.state.DSBaiDang);
      } else {
        this.setState({refresh: !this.state.refresh});
        // alert('thất bại');
      }
    }
  };

  Reload_baiDang() {
    let tiepnhan = this.props.route.params.thanhcong
      ? this.props.route.params.thanhcong
      : 0;
    if (tiepnhan === 1) {
      this._GetDSBaiDang();
    }
  }

  Reload_baiDang_SauKhiXoa = () => {
    // let oki = this.props.nthis ? this.props.nthis : 0;
    // let hi = oki ? oki.props.route.params : oki;
    // console.log('this.props.route.params.dêtte', delele_ok);
    // if (hi.delete_thanhcong === 1) {
    //   alert(5);
    //   this._GetDSBaiDang();
    // }
    this.setState({
      refresh: false,
    });
  };

  buttonBaiDangMoi = () => {
    return (
      <View style={{position: 'absolute', top: '0'}}>
        <TouchableOpacity onPress={() => this._GetDSBaiDang()}>
          <Text>Có bài đăng mới</Text>
        </TouchableOpacity>
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
  FoodterMessage = ({item}) => {
    return (
      <View onPress={() => getItem(item)}>
        <ActivityIndicator size="small" color="#0078D7"></ActivityIndicator>
      </View>
    );
  };

  // HeaderMessage = ({item}) => {
  //   return (
  //     <View onPress={() => getItem(item)}>
  //       {this.state.thanhcong ? this.buttonBaiDangMoi() : <View></View>}
  //     </View>
  //   );
  // };

  _renderItem = ({item, index}) => {
    return (
      <BaiDangComponent
        key={index}
        item={item}
        nthis={this}
        onPress={() =>
          Utils.goscreen(this.props.nthis, 'ScreenDetailBaiDang', {
            ChiTietBaiDang: item,
          })
        }></BaiDangComponent>
    );
  };
  render() {
    return (
      <View>
        <FlatList
          data={this.state.DSBaiDang}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
          refreshing={this.state.refresh}
          onRefresh={() => {
            this.setState({refresh: true});
            this._GetDSBaiDang();
          }}
          ListEmptyComponent={this.EmptyListMessage}
          ListFooterComponent={this.FoodterMessage}
          // ListHeaderComponent={this.HeaderMessage}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});
