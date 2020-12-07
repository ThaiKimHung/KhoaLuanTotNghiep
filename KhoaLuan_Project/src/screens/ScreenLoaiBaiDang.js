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
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FontSize from '../components/size';
import {GetLoaiBaiDang} from '../apis/apiUser';
import Utils from '../apis/Utils';
import {nkey} from '../apis/keyStore';
import SvgUri from 'react-native-svg-uri';
import LoaiBaiDang from '../components/LoaiBaiDang';

const thaoluan = require('../assets/images/conversation.png');
// const congratulation = require('../assets/images/congratulations.png');

export default class ScreenLoaiBaiDang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsLoaiBaiDang: [],
      userID: 0,
      refresh: true,
      ds: 0,
    };
    // let id = '';
  }

  _GetAsync = async () => {
    this.setState({
      userID: await Utils.ngetStorage(nkey.id_user),
    });
    // console.log('iduser bên get asyn', this.state.userID);
  };

  _GetDsLoaiBaiDang = async () => {
    let res = await GetLoaiBaiDang(this.state.userID);
    console.log('res ds loại bài đăng', res);
    if (res.status === 1) {
      this.setState({
        DsLoaiBaiDang: res.data,
        refresh: !this.state.refresh,
      });
      // console.log('ds loại bài đăng', this.state.DsLoaiBaiDang);
    } else {
      this.setState({
        refresh: !this.state.refresh,
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

  _chuyenTrang(item) {
    let id = item;
    console.log('id', id);
    // alert(5);
    switch (id) {
      case 1:
        console.log('this', this);
        return this.props.navigation.push('KhenThuong');
      case 2:
        alert(2);
        break;
      case 3:
        alert(3);
        break;
      case 4:
        return alert(4);

      default:
        alert('defat');
    }
  }

  async componentDidMount() {
    await this._GetAsync();
    await this._GetDsLoaiBaiDang();
  }
  // Id_LoaiDang
  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[styles.khung, {marginLeft: index % 2 != 0 ? 10 : 0}]}
        onPress={() => this._chuyenTrang(item.Id_LoaiDang)}>
        <View style={styles.khung_DS}>
          <SvgUri
            width={FontSize.scale(100)}
            height={FontSize.verticalScale(100)}
            // source={{
            //   uri: item.Icon_BaiDang,
            // }}
            source={{
              uri:
                'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg',
            }}
          />
          <Text style={{margin: 5, textAlign: 'center'}}>
            {item.TenLoaiDang}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: FontSize.reSize(20)}}>
            Bạn muốn đăng bài gì?
          </Text>
        </View>
        <View style={styles.footer}>
          {this.state.DsLoaiBaiDang.length != 0 ? (
            <FlatList
              data={this.state.DsLoaiBaiDang}
              renderItem={this.renderItem}
              ItemSeparatorComponent={() => <View style={{height: 5}}></View>}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={this.EmptyListMessage}
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true}, this._GetDsLoaiBaiDang);
              }}
            />
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      </View>
    );
  }
}
const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    // height: '80%',
    backgroundColor: 'green',
  },
  header: {
    backgroundColor: '#4285F4',
    height: '8%',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
  footer: {
    // flex: 1,
    // backgroundColor: 'green',
    // flexDirection: 'row',
    height: '100%',
    width: '100%',
    paddingTop: 10,
  },
  khung: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'yellow',
    borderRadius: 10,
    height: FontSize.scale(heightScreen / 2.5),
    width: FontSize.verticalScale(widthScreen / 2.5),
  },
  container_khung: {
    width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  khung_DS: {
    // width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 2,
  },
});
