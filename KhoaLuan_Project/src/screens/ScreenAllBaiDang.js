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
// import {Avatar} from 'react-native-paper';
// import {GetAllUser} from '../apis/apiUser';
import flatListData from '../data/Dulieu';
import BaiDangComponent from '../components/BaiDangComponent';
import {showMessage, hideMessage} from 'react-native-flash-message';

import * as Animatable from 'react-native-animatable';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import {GetDSBaiDang} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
export default class BaiDangComponentScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DSBaiDang: [],
      refresh: true,
      length: '',
      thanhcong: '',
    };
  }

  _GetDSBaiDang = async () => {
    let res = await GetDSBaiDang();
    console.log('Danh sách bài đăng Screen all bài đăng:', res);
    if (res.status == 1) {
      this.setState({
        DSBaiDang: res.data,
        refresh: !this.state.refresh,
        length: this.state.DSBaiDang.length,
      });
    } else {
      this.setState({refresh: !this.state.refresh});
      alert('thất bại');
    }
  };

  // Reload_baiDang() {
  //   let tiepnhan = this.props.route.params;
  //   if (tiepnhan === '1') {
  //     this.GetDSBaiDang();
  //   }
  // }

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

  componentDidMount() {
    this._GetDSBaiDang();
    // {
    //   this.props.route.params
    //     ? this.setState({
    //         thanhcong: this.props.route.params,
    //       })
    //     : this.setState({
    //         thanhcong: this.state.thanhcong,
    //       });
    // }
    // setInterval(this._GetDSBaiDang, 20000);
  }
  _renderItem = ({item, index}) => {
    console.log();
    return (
      <BaiDangComponent
        key={index}
        item={item}
        onPress={() =>
          this.props.nthis.props.navigation.navigate('ScreenDetailBaiDang', {
            item,
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
            this.setState(
              {refresh: true},
              this._GetDSBaiDang,
              // this.Reload_baiDang,
            );
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
