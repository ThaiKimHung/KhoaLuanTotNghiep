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
import {SearchBar} from 'react-native-elements';
import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import {GetDSBaiDang_Nhom} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
const avatar = require('../assets/images/avatar.jpg');
import {colors} from 'react-native-elements';
export default class ScreenAllBaiDang_Nhom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DSBaiDangNhom: [],
      DSBaiDangNhom2: [],
      refresh: true,
      length: '',
      length2: '',
      thanhcong: '',
      id_user: '',
      tru: '',
      searchText: '',
      filteredData: [],
      search: '',
      // idgroup: '',
    };
    this.inter = 0;
    ROOTGlobal.GetDsAllBaiDang_Nhom = this._GetDSBaiDang_Nhom;
  }

  _GetDSBaiDang_Nhom = async () => {
    const idgroup = this.props.nthis.props.route.params.screennhom;
    const {id_nguoidang = {}} = this.props.nthis.props.route.params;
    let res = '';
    await this.setState({
      id_user: await Utils.ngetStorage(nkey.id_user),
    });
    // console.log('id bài đăng', this.state.id_user, idgroup);

    res = await GetDSBaiDang_Nhom(this.state.id_user, id_nguoidang.ID_group);
    // console.log('Danh sách bài đăng Screen all bài đăng:', res);
    if (res.status == 1) {
      await this.setState({
        DSBaiDangNhom: res.data,
        refresh: false,
        length: res.data.length,
      });
    } else {
      this.setState({
        refresh: false,
      });
    }
  };

  _GetDSBaiDang_Nhom2 = async () => {
    const idgroup = this.props.nthis.props.route.params.screennhom;
    const {id_nguoidang = {}} = this.props.nthis.props.route.params;
    let res = '';
    await this.setState({
      id_user: await Utils.ngetStorage(nkey.id_user),
    });
    // console.log('id bài đăng', this.state.id_user, idgroup);

    res = await GetDSBaiDang_Nhom(this.state.id_user, id_nguoidang.ID_group);
    // console.log('Danh sách bài đăng Screen all bài đăng:', res);
    if (res.status == 1) {
      await this.setState({
        DSBaiDangNhom2: res.data,
        length2: res.data.length,
      });
    }
  };

  hamTru = async () => {
    await this.setState({
      tru: this.state.length2 - this.state.length,
    });
    // await console.log('tru', this.state.tru);
  };

  hamloadLienTuc = () => {
    this.inter = setInterval(async () => {
      await this._GetDSBaiDang_Nhom2();
      await this.hamTru();
    }, 1000);
  };
  hamclearInterval = () => {
    clearInterval(this.inter);
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

  NhanData = async () => {
    // console.log('id group', this.props.nthis.props.route.params.screennhom);
    this.setState({
      idgroup: this.props.nthis.props.route.params.screennhom,
    });
    // await console.log('state id group', this.state.idgroup);
  };

  _renderItem = ({item, index}) => {
    return (
      <BaiDangNhomComponent
        key={index}
        item={item}
        nthis={this}
        onPress={() =>
          Utils.goscreen(this.props.nthis, 'ScreenDetailBaiDang_Nhom', {
            id_nguoidang: item,
          })
        }></BaiDangNhomComponent>
    );
  };

  _onRefresh = () => {
    this.setState({refresh: true}, () => this._GetDSBaiDang_Nhom());
  };

  search = async (searchText) => {
    await this.setState({searchText: searchText});
    // let filteredData = this.state.DsUser.filter(function (item) {
    //   return item.Username.includes(searchText);
    // });
    let filteredData = this.state.DSBaiDangNhom.filter((item) =>
      Utils.removeAccents(item['title'])
        .toUpperCase()
        .includes(Utils.removeAccents(searchText.toUpperCase())),
    );
    await this.setState({filteredData: filteredData});
  };

  componentDidMount = async () => {
    await this._GetDSBaiDang_Nhom();
    await this.NhanData();
    await this.hamloadLienTuc();
  };
  render() {
    const {id_nguoidang = {}} = this.props.nthis.props.route.params;
    // console.log('this screel all bai dang nhom', id_nguoidang);
    const {tru, search} = this.state;
    return (
      <View>
        {search == 0 ? (
          <Animatable.View
            animation={'fadeInDown'}
            // delay={1000}
            duration={1000}
            style={{
              backgroundColor: '#FFFFFF',
              padding: 10,
              borderRadius: 10,
              // backgroundColor: 'blue',
            }}>
            <SearchBar
              placeholder="Nhập tiêu đề để tìm kiếm bài đăng..."
              showCancel="true"
              platform="android"
              containerStyle={{
                backgroundColor: '#DDDDDD80',
                borderRadius: 20,
                height: FontSize.scale(40),
                justifyContent: 'center',
              }}
              onChangeText={this.search}
              value={this.state.searchText}
            />
          </Animatable.View>
        ) : null}
        <Animatable.View
          style={{
            position: 'absolute',
            zIndex: 99,
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
          }}
          animation={tru > 0 ? 'fadeInDownBig' : 'fadeOutUpBig'}
          delay={1000}
          duration={1000}>
          <TouchableOpacity
            onPress={() => this._onRefresh()}
            style={{
              borderRadius: 20,
              height: FontSize.scale(30),
              width: 150,
              justifyContent: 'center',
              alignItems: 'center',
              alignSelf: 'center',
              backgroundColor: colors.primary,
            }}>
            <Text>Có bài đăng mới</Text>
          </TouchableOpacity>
        </Animatable.View>
        <FlatList
          data={
            this.state.filteredData && this.state.filteredData.length > 0
              ? this.state.filteredData
              : this.state.DSBaiDangNhom
          }
          onScroll={(e) => {
            this.setState({search: e.nativeEvent.contentOffset.y});
          }}
          style={{marginBottom: 10}}
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
