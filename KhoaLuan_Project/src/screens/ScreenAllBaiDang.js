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
    };
  }

  _GetDSBaiDang = async () => {
    let res = await GetDSBaiDang();
    console.log('Danh sách bài đăng Screen all bài đăng:', res);
    if (res.status == 1) {
      this.setState({
        DSBaiDang: res.data,
        refresh: !this.state.refresh,
      });
    } else {
      this.setState({refresh: !this.state.refresh});
      alert('thất bại');
    }
  };

  EmptyListMessage = ({item}) => {
    return (
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };

  componentDidMount() {
    this._GetDSBaiDang();
  }
  _renderItem = ({item, index}) => {
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
            this.setState({refresh: true}, this._GetDSBaiDang);
          }}
          ListEmptyComponent={this.EmptyListMessage}
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
