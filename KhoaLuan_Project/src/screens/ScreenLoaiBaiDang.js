import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
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
import GoBack from '../components/GoBack';

export default class ScreenLoaiBaiDang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsLoaiBaiDang: [],
      userID: 0,
      refresh: true,
      ds: 0,
      avatar: '',
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
      console.log('ds loại bài đăng', this.state.DsLoaiBaiDang);
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
  callBack = (item) => {
    let hi = item;
    // console.log('hi', hi);
  };

  _chuyenTrang(item) {
    // let id_loaibaidang = item;
    // console.log('id_loaibaidang', id_loaibaidang);
    // alert(5);
    switch (item) {
      case 1:
        // console.log('this', this);
        return Utils.goscreen(this, 'KhenThuong');
      case 2:
        //  return this.props.navigation.navigate(
        //    'KhenThuong',
        //    this.callBack(item),
        //  );
        return Utils.goscreen(this, 'KhenThuong');
      case 3:
        alert(3);
        break;
      case 4:
        // return this.props.navigation.navigate('ChaoMungTV', item);
        return Utils.goscreen(this, 'ChaoMungTV', item);
      case 5:
        alert(4);
        break;
      case 6:
        return Utils.goscreen(this, 'TinNhanh', {id_loaibaidang: item});
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
        style={[styles.khung, {marginLeft: index % 2 != 0 ? 10 : 10}]}
        onPress={() => this._chuyenTrang(item.Id_LoaiDang)}>
        <View style={styles.khung_DS}>
          <SvgUri
            width={FontSize.scale(100)}
            height={FontSize.verticalScale(100)}
            // Icon_app
            // uri:// 'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg',
            source={
              item
                ? {uri: item.Icon_app}
                : {
                    uri:
                      'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg',
                  }
            }
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
        <GoBack
          // nthis={this}
          name="Chọn loại bài đăng"
          onPress={() => {
            Utils.goback(this, '');
          }}></GoBack>
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
  },
  header: {
    backgroundColor: '#00AFF0',
    height: FontSize.scale(50),
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  footer: {
    height: '100%',
    width: '100%',
    paddingTop: 10,
  },
  khung: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    // backgroundColor: 'yellow',
    borderColor: '#4F4F4F',
    borderWidth: 1,
    borderRadius: 10,
    height: FontSize.scale(heightScreen / 2.5),
    width: FontSize.verticalScale(widthScreen / 2.5),
    // paddingHorizontal: 10,
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
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});
