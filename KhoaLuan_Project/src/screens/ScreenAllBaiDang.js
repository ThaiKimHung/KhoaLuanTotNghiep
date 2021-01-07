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
import {ROOTGlobal} from '../apis/dataGlobal';
import * as Animatable from 'react-native-animatable';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import {GetDSBaiDang} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {colors} from 'react-native-elements';
const avatar = require('../assets/images/avatar.png');
export default class ScreenAllBaiDang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DSBaiDang: [],
      DSBaiDang2: [],
      refresh: true,
      length: '',
      thanhcong: '',
      id_user: '',
      length2: '',
      tru: '',
    };
    ROOTGlobal.GetDsAllBaiDang = this._GetDSBaiDang;
  }
  componentDidMount = async () => {
    await this._GetDSBaiDang();
    // this._GetDSBaiDang2();
    await this.hamloadLienTuc();
  };

  _GetDSBaiDang2 = async () => {
    let res = '';
    this.setState({
      id_user: await Utils.ngetStorage(nkey.id_user),
    });
    // console.log('id bài đăng', this.state.id_user);

    res = await GetDSBaiDang(this.state.id_user);
    // console.log('Danh sách bài đăng Screen all bài đăng 2:', res.data.length);
    // console.log('Danh sách bài đăng Screen all bài đăng:', res);
    if (res.status == 1) {
      this.setState({
        DSBaiDang2: res.data,
        length2: res.data.length,
      });
      // await console.log('length2 ', this.state.DSBaiDang2.length);
    }
  };

  hamTru = async () => {
    await this.setState({
      tru: this.state.length2 - this.state.length,
    });
    // await console.log('tru', this.state.tru);
  };

  hamloadLienTuc = () => {
    setInterval(async () => {
      await this._GetDSBaiDang2();
      await this.hamTru();
    }, 1000);
  };

  _GetDSBaiDang = async () => {
    await this.setState({
      id_user: await Utils.ngetStorage(nkey.id_user),
    });
    // console.log('id bài đăng', this.state.id_user);

    let res = await GetDSBaiDang(this.state.id_user);
    // console.log('ress-------', res);

    if (res.status == 1) {
      await this.setState({
        DSBaiDang: res.data,
        refresh: false,
        length: res.data.length,
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

  _renderItem = ({item, index}) => {
    return (
      <BaiDangComponent
        key={index}
        item={item}
        nthis={this}
        onPress={() =>
          Utils.goscreen(this.props.nthis, 'ScreenDetailBaiDang', {
            id_nguoidang: item,
          })
        }></BaiDangComponent>
    );
  };

  _onRefresh = () => {
    this.setState({refresh: true}, () => this._GetDSBaiDang());
  };

  render() {
    const {tru} = this.state;
    return (
      <View>
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
            onPress={() => this._GetDSBaiDang()}
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
          data={this.state.DSBaiDang}
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
