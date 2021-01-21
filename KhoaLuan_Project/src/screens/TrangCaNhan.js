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
import {getTrangCaNhan, getDSBaiDangTrangCaNhan} from '../apis/apiUser';
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

export default class TrangCaNhan extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thongtin: '',
      avatar: '',
      username: '',
      DSBaiDang: '',
      refresh: true,
      image: '',
      path: '',
      image_bia: '',
      path_bia: '',
      databaidang: [],
      dataDSBaiDang: [],
      idcanhan: '',
    };
    // ROOTGlobal.GetProfileUserTrangCaNhan = this._GetUserProfile;
  }

  _GetUserProfile = async () => {
    let res = await getTrangCaNhan(await Utils.ngetStorage(nkey.id_user));
    console.log('res get user thoong tin ============', res);
    if (res.status == 1) {
      this.setState({
        thongtin: res.Data[0],
      });
      await this.GanData();
    } else {
      // alert('thất bại tải thông tin cá nhân');
    }
  };

  _GetDSBaiDangTrangCaNhan = async () => {
    let res = await getDSBaiDangTrangCaNhan(
      await Utils.ngetStorage(nkey.id_user),
    );
    console.log('res ds bài đăng cá nhân ============', res);
    if (res.status == 1) {
      this.setState({
        DSBaiDang: res.data.map((item) => item.DataBaiDang[0]),
        refresh: false,
      });

      this.setState({
        refresh: false,
      });
      alert('thất bại tải thông tin cá nhân');
    }
  };

  openGalary = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        // console.log('image--------', image);
        this.setState({
          image: image,
          path: image.path,
        });
        // console.log('state image =====', this.state.image);
        // console.log('path image =====', this.state.path);
        // this.hamTest();
      })
      .catch((e) => {
        // alert(e);
      });
  };

  openGalary_AnhBia = async () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        // console.log('image--------', image);
        this.setState({
          image_bia: image,
          path_bia: image.path,
        });
        // console.log('state image =====', this.state.image);
        // console.log('path image =====', this.state.path);
        // this.hamTest();
      })
      .catch((e) => {
        // alert(e);
      });
  };

  GanData = async () => {
    this.setState({
      username: this.state.thongtin.user_name,
      avatar: this.state.thongtin.Avatar,
      idcanhan: this.state.thongtin.id_canhan,
    });
    // await console.log(this.state.idcanhan);
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
          })
        }></BaiDang_TrangCaNhan_Component>
    );
  };

  componentDidMount = async () => {
    await this._GetUserProfile();
    await this._GetDSBaiDangTrangCaNhan();
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
              <ImageBackground
                source={
                  this.state.image_bia ? {uri: this.state.path_bia} : backgroud
                }
                style={{
                  height: FontSize.scale(200),
                  width: FontSize.verticalScale(340),
                }}>
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
                  <TouchableOpacity onPress={() => this.openGalary_AnhBia()}>
                    <Image
                      source={editpic}
                      style={{
                        height: FontSize.scale(20),
                        width: FontSize.verticalScale(20),
                      }}></Image>
                  </TouchableOpacity>
                </View>
                <View
                  style={{
                    alignItems: 'center',
                    padding: 10,
                    position: 'absolute',
                    bottom: -60,
                    left: 150,
                  }}>
                  <View
                    style={{
                      marginLeft: 5,
                      borderRadius: 50,
                      height: FontSize.scale(60),
                      width: FontSize.verticalScale(60),
                      // padding: 10,
                    }}>
                    {this.state.image == '' ? (
                      <ImageBackground
                        style={{
                          height: FontSize.scale(60),
                          width: FontSize.verticalScale(60),
                          borderRadius: 50,
                          // backgroundColor: 'yellow',
                        }}
                        resizeMode="cover"
                        source={
                          this.state.thongtin
                            ? {uri: this.state.avatar}
                            : avatar
                        }>
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#69696920',
                            width: '100%',
                            height: '40%',
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                          }}
                          onPress={() => this.openGalary()}>
                          <Image
                            source={editpic}
                            style={{
                              height: FontSize.scale(15),
                              width: FontSize.verticalScale(15),
                            }}></Image>
                        </TouchableOpacity>
                      </ImageBackground>
                    ) : (
                      <ImageBackground
                        style={{
                          height: FontSize.scale(60),
                          width: FontSize.verticalScale(60),
                          borderRadius: 50,
                          backgroundColor: 'blue',
                        }}
                        resizeMode="cover"
                        source={
                          this.state.path ? {uri: this.state.path} : avatar
                        }>
                        <TouchableOpacity
                          style={{
                            position: 'absolute',
                            bottom: 0,
                            alignItems: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#69696920',
                            width: '100%',
                            height: '40%',
                            borderTopRightRadius: 10,
                            borderTopLeftRadius: 10,
                          }}
                          onPress={() => this.openGalary()}>
                          <Image
                            source={editpic}
                            style={{
                              height: FontSize.scale(15),
                              width: FontSize.verticalScale(15),
                            }}></Image>
                        </TouchableOpacity>
                      </ImageBackground>
                    )}
                  </View>

                  <Text style={{fontSize: FontSize.reSize(25)}}>
                    {this.state.username}
                  </Text>
                </View>
              </ImageBackground>
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
