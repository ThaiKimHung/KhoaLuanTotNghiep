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

import BaiDangNhomComponent from '../components/BaiDangNhomComponent';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {ROOTGlobal} from '../apis/dataGlobal';
import * as Animatable from 'react-native-animatable';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import {GetDSBaiDang} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
const avatar = require('../assets/images/avatar.png');
export default class ScreenAllBaiDang_Nhom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DSBaiDangNhom: [],
      refresh: true,
      length: '',
      thanhcong: '',
      id_user: '',
    };
    ROOTGlobal.GetDsAllBaiDang = this._GetDSBaiDang;
  }

  componentDidMount = () => {
    this._GetDSBaiDang();
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
          DSBaiDangNhom: res.data,
          refresh: false,
        });
      } else {
        this.setState({
          refresh: false,
        });
      }
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

  _renderItem = ({item, index}) => {
    return (
      <BaiDangNhomComponent
        key={index}
        item={item}
        nthis={this}
        onPress={() =>
          Utils.goscreen(this.props.nthis, 'ScreenDetailBaiDang', {
            id_nguoidang: item,
          })
        }></BaiDangNhomComponent>
    );
  };

  _onRefresh = () => {
    this.setState({refresh: true}, () => this._GetDSBaiDang());
  };
  render() {
    console.log('this screel all bai dang nhom', this);
    return (
      <View>
        <FlatList
          data={this.state.DSBaiDangNhom}
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
