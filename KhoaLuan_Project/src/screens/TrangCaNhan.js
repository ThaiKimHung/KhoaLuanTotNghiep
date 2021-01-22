import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {Avatar, SearchBar} from 'react-native-elements';
import {
  getTrangCaNhan,
  getDSBaiDangTrangCaNhan,
  UpdateTrangCaNhan,
  UpdateAnhBia,
  getFlow,
} from '../apis/apiUser';
import Utils from '../apis/Utils';
import FontSize from '../components/size';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {ROOTGlobal} from '../apis/dataGlobal';
import {showMessage, hideMessage} from 'react-native-flash-message';
import ImagePicker from 'react-native-image-crop-picker';
import moment from 'moment';
import BaiDang_TrangCaNhan_Component from '../components/BaiDang_TrangCaNhan_Component';
const editpic = require('../assets/images/photo-camera-interface-symbol-for-button.png');
const avatar = require('../assets/images/avatar.jpg');
const goback = require('../assets/images/go-back-left-arrow.png');
const edite = require('../assets/images/edit2.png');
const backgroud = require('../assets/images/background.png');
const edit = require('../assets/images/edit2.png');
const check = require('../assets/images/check.png');
const cancel = require('../assets/images/cancel.png');
const follow = require('../assets/images/follow_user.png');
export default class TrangCaNhan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thongtin: '',
      avatar: '',
      username: '',
      DSBaiDang: '',
      dsBaidangcanhan: '',
      refresh: true,
      Image: '',
      databaidang: [],
      dataDSBaiDang: [],
      idcanhan: '',
      tieusu: '',
      iduser: '',
      hinhanhbia: '',
      anhbia: '',
      getfl: '',
      tongfl: '',
    };
    ROOTGlobal.GetUserTrangCaNhan = this._GetUserProfile;
    ROOTGlobal.GetDSBaiDang_CaNhan = this._GetDSBaiDangTrangCaNhan;
  }

  _GetFlow = async () => {
    let res = await getFlow(await Utils.ngetStorage(nkey.id_user));
    console.log('res get flow', res);
    if (res.status == 1) {
      this.setState({
        // tongfl: res.Data.map((item) => item.tong),
        tongfl: res.Data[0].tong,
        getfl: res.Data.map((item) =>
          item.Flow.map((item1) => item1.TT_User_Flow[0]),
        ),
      });
      // await console.log('tong fl', await this.state.tongfl);
      // await console.log('ds fl', await this.state.getfl);
    }
  };

  _GetUserProfile = async () => {
    let res = await getTrangCaNhan(await Utils.ngetStorage(nkey.id_user));
    // console.log('res get user thoong tin ============', res);
    if (res.status == 1) {
      this.setState({
        thongtin: res.Data[0],
      });
      await this.GanData();
    } else {
      // alert('thất bại tải thông tin cá nhân');
    }
  };

  GanData = async () => {
    this.setState({
      username: this.state.thongtin.user_name,
      avatar: this.state.thongtin.Avatar,
      idcanhan: this.state.thongtin.id_canhan,
      tieusu: this.state.thongtin.tieusu,
      iduser: this.state.thongtin.Id_user,
      hinhanhbia: this.state.thongtin.hinhanhbia,
      anhbia: this.state.thongtin.anhbia,
    });
    // await console.log('ca nhấn', this.state.idcanhan);
  };

  _GetDSBaiDangTrangCaNhan = async () => {
    let res = await getDSBaiDangTrangCaNhan(
      await Utils.ngetStorage(nkey.id_user),
    );
    // console.log('res ds bài đăng cá nhân ============', res);
    if (res.status == 1) {
      this.setState({
        DSBaiDang: res.data.map((item) => item.DataBaiDang[0]),
        dsBaidangcanhan: res.data.map((item) => item.Id_baidang_canhan),
        refresh: false,
      });

      this.setState({
        refresh: false,
      });
      // alert('thất bại tải thông tin cá nhân');
      // await console.log(this.state.dsBaidangcanhan);
    }
  };

  _UpdateAnhBia = async () => {
    let strBody = JSON.stringify({
      image: this.state.Image.data,
      name: this.state.Image.path.split('/').slice(-1) + '',
    });
    // console.log('body ảnh', strBody);
    let res = await UpdateAnhBia(this.state.idcanhan, strBody);
    // console.log('res update ảnh bìa', res);

    if (res.status == 1) {
      await this._GetUserProfile();
      await this._GetDSBaiDangTrangCaNhan();
      await this.setState({
        Image: '',
      });
    }
  };

  openGalary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        // console.log('image--------', image);
        this.setState({
          Image: image,
        });
        // console.log('state image =====', this.state.Image);
        // this.hamTest();
      })
      .catch((e) => {
        // alert(e);
      });
  };
  _onScroll = () => {
    // alert('5');
    this.flatListRef.scrollToIndex({animated: true, index: 0});
    // flatListRef.scrollToIndex({animated: true, index: 0});
  };

  _onRefresh = () => {
    this.setState({refresh: true}, () => this._GetDSBaiDangTrangCaNhan());
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

  xoaAnh = () => {
    ImagePicker.clean()
      .then(() => {
        // console.log('removed all tmp images from tmp directory');
        this.setState({
          Image: '',
        });
      })
      .catch((e) => {
        alert(e);
      });
  };

  _renderItem = ({item, index}) => {
    // console.log(item);
    return (
      <BaiDang_TrangCaNhan_Component
        key={index}
        item={item}
        nthis={this}
        onPress={() =>
          Utils.goscreen(this, 'ScreenDetailBaiDang', {
            id_nguoidang: item,
            // baidangcanhan: this.state.dsBaidangcanhan,
          })
        }></BaiDang_TrangCaNhan_Component>
    );
  };

  componentDidMount = async () => {
    await this._GetUserProfile();
    await this._GetDSBaiDangTrangCaNhan();
    await this._GetFlow();
  };

  render() {
    // console.log('list bai đang nhé em:', this.state.DSBaiDang);
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={async () => {
                  Utils.goback(this, '');
                  // ROOTGlobal.GetProfileUser();
                }}>
                <Image
                  source={goback}
                  style={{
                    height: FontSize.scale(13),
                    width: FontSize.verticalScale(18),
                  }}></Image>
              </TouchableOpacity>

              <Text style={styles.title}>Trang cá nhân</Text>
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={{marginTop: 10}}>
            <View>
              {this.state.Image == '' ? (
                <ImageBackground
                  source={
                    this.state.hinhanhbia ? {uri: this.state.anhbia} : backgroud
                  }
                  style={{
                    height: FontSize.scale(200),
                    width: FontSize.verticalScale(340),
                  }}>
                  {this.state.Image == '' ? (
                    <View
                      style={{
                        backgroundColor: '#FFFFFF',
                        height: FontSize.scale(30),
                        width: FontSize.verticalScale(30),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30,
                        position: 'absolute',
                        top: 0,
                        right: 10,
                      }}>
                      <TouchableOpacity onPress={() => this.openGalary()}>
                        <Image
                          source={editpic}
                          style={{
                            height: FontSize.scale(20),
                            width: FontSize.verticalScale(20),
                          }}></Image>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <TouchableOpacity onPress={() => this._UpdateAnhBia()}>
                        <Image
                          source={check}
                          style={{
                            height: FontSize.scale(20),
                            width: FontSize.verticalScale(20),
                            margin: 5,
                          }}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.xoaAnh()}>
                        <Image
                          source={cancel}
                          style={{
                            margin: 5,
                            height: FontSize.scale(20),
                            width: FontSize.verticalScale(20),
                          }}></Image>
                      </TouchableOpacity>
                    </View>
                  )}
                </ImageBackground>
              ) : (
                <ImageBackground
                  source={
                    this.state.Image
                      ? {uri: this.state.Image.path}
                      : this.state.anhbia
                  }
                  style={{
                    height: FontSize.scale(200),
                    width: FontSize.verticalScale(340),
                  }}>
                  {this.state.Image == '' ? (
                    <View
                      style={{
                        backgroundColor: '#FFFFFF',
                        height: FontSize.scale(30),
                        width: FontSize.verticalScale(30),
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderRadius: 30,
                        position: 'absolute',
                        top: 0,
                        right: 10,
                      }}>
                      <TouchableOpacity onPress={() => this.openGalary()}>
                        <Image
                          source={editpic}
                          style={{
                            height: FontSize.scale(20),
                            width: FontSize.verticalScale(20),
                          }}></Image>
                      </TouchableOpacity>
                    </View>
                  ) : (
                    <View>
                      <TouchableOpacity onPress={() => this._UpdateAnhBia()}>
                        <Image
                          source={check}
                          style={{
                            height: FontSize.scale(20),
                            width: FontSize.verticalScale(20),
                            margin: 5,
                          }}></Image>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={() => this.xoaAnh()}>
                        <Image
                          source={cancel}
                          style={{
                            margin: 5,
                            height: FontSize.scale(20),
                            width: FontSize.verticalScale(20),
                          }}></Image>
                      </TouchableOpacity>
                    </View>
                  )}
                </ImageBackground>
              )}
            </View>
          </View>

          <View style={{height: FontSize.scale(100), alignItems: 'center'}}>
            <View
              style={{
                alignItems: 'center',
                padding: 10,
                // position: 'absolute',
                // bottom: -60,
                // left: 150,
              }}>
              <View
                style={{
                  marginLeft: 5,
                  borderRadius: 50,
                  height: FontSize.scale(60),
                  width: FontSize.verticalScale(60),
                  // padding: 10,
                }}>
                <Image
                  source={
                    // this.state.thongtin ? {uri: this.state.avatar} :
                    avatar
                  }
                  style={{
                    height: FontSize.scale(50),
                    width: FontSize.verticalScale(50),
                    borderRadius: 50,
                  }}></Image>
              </View>

              <Text style={{fontSize: FontSize.reSize(25)}}>
                {this.state.username}
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  // justifyContent: 'space-between',
                  // backgroundColor: 'green',
                }}>
                <Text>{this.state.tieusu}</Text>
                <TouchableOpacity
                  style={{
                    backgroundColor: ' blue',
                    height: FontSize.scale(20),
                    width: FontSize.verticalScale(20),
                  }}
                  onPress={() =>
                    Utils.goscreen(this, 'Modal_EditTieuSu', {
                      id_nguoidang: this.state.thongtin,
                    })
                  }>
                  <Image
                    source={edit}
                    style={{
                      height: FontSize.scale(15),
                      width: FontSize.verticalScale(15),
                      marginLeft: 5,
                    }}></Image>
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginBottom: 10,
                  flexDirection: 'row',
                  // backgroundColor: 'blue',
                  // width: FontSize.verticalScale(200),
                }}>
                <TouchableOpacity
                  style={{flexDirection: 'row'}}
                  onPress={() =>
                    Utils.goscreen(this, 'User_TheoDoi', {
                      id_nguoidang: this.state.getfl,
                    })
                  }>
                  <Image
                    source={follow}
                    style={{
                      height: FontSize.scale(20),
                      width: FontSize.verticalScale(20),
                    }}></Image>
                  <Text>Có {this.state.tongfl} người theo dõi</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={{marginTop: 60}}>
            <FlatList
              ref={(ref) => {
                this.flatListRef = ref;
              }}
              data={this.state.DSBaiDang}
              onScroll={(e) => {
                this.setState({search: e.nativeEvent.contentOffset.y});
              }}
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
        </View>
      </ScrollView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  header: {
    height: FontSize.scale(45),
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#007DE3',
    // backgroundColor: 'yellow',
  },
  footer: {
    flex: 1,
  },
  title: {
    fontSize: FontSize.reSize(20),
    marginLeft: 10,
  },
  textDang: {
    fontSize: FontSize.reSize(20),
    marginRight: 10,
  },
  textDang_invisibale: {
    fontSize: FontSize.reSize(20),
    marginRight: 10,
    color: '#696969',
  },
  khung_tieude: {
    // height: FontSize.scale(40),
    backgroundColor: '#DDDDDD80',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
  },
  khung_noidung: {
    // height: FontSize.scale(40),
    backgroundColor: '#DDDDDD80',
    borderRadius: 20,
    marginBottom: 5,
    marginTop: 10,
    padding: 5,
  },
  khung_DS: {
    // width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  textinput: {
    backgroundColor: '#DDDDDD80',
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: FontSize.reSize(20),
  },
  khung_Nhap: {
    marginHorizontal: 10,
    marginTop: 20,
  },
});
