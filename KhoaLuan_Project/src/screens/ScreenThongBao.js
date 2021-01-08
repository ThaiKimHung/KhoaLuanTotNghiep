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
import FontSize from '../components/size';
import {Avatar, SearchBar} from 'react-native-elements';
import {
  GetAllUser,
  GetDSThongBao,
  Update_ThongBao,
  Delete_ThongBao,
  Danhdaudadoc,
} from '../apis/apiUser';
import Utils from '../apis/Utils';
import {nkey} from '../apis/keyStore';
import moment from 'moment';
import {ROOTGlobal} from '../apis/dataGlobal';

const avatar = require('../assets/images/avatar.png');
const goback = require('../assets/images/go-back-left-arrow.png');
const daubacham = require('../assets/images/daubacham_doc.png');
const seen = require('../assets/images/double-check.png');
const deletee = require('../assets/images/delete.png');
// const congratulation = require('../assets/images/congratulations.png');
export default class SearchUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsUser: [],
      refresh: true,
      searchText: '',
      filteredData: [],
    };
    ROOTGlobal.GetDsThongBao = this._GetDSThongBao;
  }
  _GetDSThongBao = async () => {
    let res = await GetDSThongBao(await Utils.ngetStorage(nkey.id_user));
    // console.log('ress all thong báo', res);
    if (res.status == 1) {
      this.setState({
        DsUser: res.Data,
        refresh: false,
      });
    } else {
      this.setState({refresh: false});
      alert('thất bại');
    }
  };

  _DanhdaudadocAll = async () => {
    let res = await Danhdaudadoc();
    // console.log('res dánh dấu đã dọc', res);
    await this._GetDSThongBao();
  };

  _UpdateThongBao = async (idthongbao) => {
    let res = await Update_ThongBao(idthongbao);
    // console.log('res update thông báo', res);
    await this._GetDSThongBao();
  };

  _DeleteThongBao = async (idthongbao) => {
    let res = await Delete_ThongBao(idthongbao);
    // console.log('res delete thông báo', res);
    await this._GetDSThongBao();
  };

  hamloadLienTuc = async () => {
    setInterval(async () => {
      await this._GetDSThongBao();
    }, 1000);
  };

  componentDidMount = async () => {
    await this._GetDSThongBao();
    await this.hamloadLienTuc();
  };

  _renderItem = ({item, index}) => {
    // console.log(item);
    return (
      <View>
        {item.tinhtrang == true ? (
          <TouchableOpacity
            style={[styles.khungchua]}
            onPress={() =>
              Utils.goscreen(this, 'ScreenDetailBaiDang_ThongBao', {
                id_nguoidang: item,
              })
            }>
            <View
              style={{
                marginLeft: 5,
                borderRadius: 30,
                height: FontSize.scale(30),
                width: FontSize.verticalScale(30),
                margin: 10,
              }}>
              <Image
                style={{
                  height: FontSize.scale(30),
                  width: FontSize.verticalScale(30),
                  borderRadius: 30,
                }}
                resizeMode="cover"
                source={item.avatar ? {uri: item.avatar} : avatar}></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                paddingRight: 10,
              }}>
              <View>
                <Text>{item.user_name}</Text>
                <Text>{item.title}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text>
                    {moment(item.timetb.substring(0, 10), 'YYYY-MM-DD').format(
                      'DD-MM-YYYY',
                    )}
                  </Text>
                  <Text style={{marginLeft: 5}}>
                    {item.timetb.substring(11, 16)}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                {/* <TouchableOpacity
                  onPress={() => this._UpdateThongBao(item.id_tb)}>
                  <Image
                    source={seen}
                    style={{
                      height: FontSize.scale(15),
                      width: FontSize.verticalScale(15),
                    }}></Image>
                </TouchableOpacity> */}
                <TouchableOpacity
                  style={{marginLeft: 5}}
                  onPress={() => this._DeleteThongBao(item.id_tb)}>
                  <Image
                    source={deletee}
                    style={{
                      height: FontSize.scale(15),
                      width: FontSize.verticalScale(15),
                    }}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              // padding: 10,
              marginTop: 5,
              backgroundColor: '#007DE320',
              alignItems: 'center',
              borderBottomWidth: 1,
              borderBottomColor: '#C0C0C0',
              //   backgroundColor: '#C0C0C020',
            }}
            onPress={() => {
              this._UpdateThongBao(item.id_tb),
                Utils.goscreen(this, 'ScreenDetailBaiDang_ThongBao', {
                  id_nguoidang: item,
                });
            }}>
            <View
              style={{
                marginLeft: 5,
                borderRadius: 30,
                height: FontSize.scale(30),
                width: FontSize.verticalScale(30),
                margin: 10,
              }}>
              <Image
                style={{
                  height: FontSize.scale(30),
                  width: FontSize.verticalScale(30),
                  borderRadius: 30,
                }}
                resizeMode="cover"
                source={item.avatar ? {uri: item.avatar} : avatar}></Image>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                flex: 1,
                paddingRight: 10,
              }}>
              <View>
                <Text>{item.user_name}</Text>
                <Text>{item.title}</Text>
                <View style={{flexDirection: 'row'}}>
                  <Text>
                    {moment(item.timetb.substring(0, 10), 'YYYY-MM-DD').format(
                      'DD-MM-YYYY',
                    )}
                  </Text>
                  <Text style={{marginLeft: 5}}>
                    {item.timetb.substring(11, 16)}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <TouchableOpacity
                  onPress={() => this._UpdateThongBao(item.id_tb)}>
                  <Image
                    source={seen}
                    style={{
                      height: FontSize.scale(15),
                      width: FontSize.verticalScale(15),
                    }}></Image>
                </TouchableOpacity>
                <TouchableOpacity
                  style={{margin: 5}}
                  onPress={() => this._DeleteThongBao(item.id_tb)}>
                  <Image
                    source={deletee}
                    style={{
                      height: FontSize.scale(15),
                      width: FontSize.verticalScale(15),
                    }}></Image>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableOpacity>
        )}
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

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.back}>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <Text style={styles.title}>Thông báo</Text>
          </View>
        </View>
        <View style={styles.header}>
          <TouchableOpacity
            style={{alignItems: 'flex-end'}}
            onPress={() => this._DanhdaudadocAll()}>
            <Text>Đánh dấu đã đọc tất cả</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <FlatList
            data={this.state.DsUser}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refresh}
            onRefresh={() => {
              this.setState({refresh: true}, this._GetDSThongBao);
            }}
            ListEmptyComponent={this.EmptyListMessage}
          />
        </View>
      </View>
    );
  }
}
const widthScreen = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 10,
    // backgroundColor: 'yellow',
  },
  header: {
    backgroundColor: '#007DE3',
    margin: 5,
    height: FontSize.scale(20),
    justifyContent: 'center',
    // width: '100%',
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  footer: {
    // flex: 1,
    // backgroundColor: 'green',
    // flexDirection: 'row',
    height: '92%',
    width: '100%',
    // paddingTop: 5,
    // padding: 10,
  },
  khungchua: {
    flexDirection: 'row',
    // padding: 10,
    marginTop: 5,
    // justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    backgroundColor: '#C0C0C020',
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
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
  },
});
