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
import * as Animatable from 'react-native-animatable';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import {addMedia} from '../apis/apiUser';
import ImagePicker from 'react-native-image-crop-picker';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {ROOTGlobal} from '../apis/dataGlobal';

const goback = require('../assets/images/go-back-left-arrow.png');
const search = require('../assets/images/search.png');
const dropdown = require('../assets/images/caret-down.png');
const pickimage = require('../assets/images/pickimage.png');
const camera = require('../assets/images/photo-camera-interface-symbol-for-button.png');
const close = require('../assets/images/cancel.png');

export default class Media extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveValue_TieuDe: '',
      value: null,
      dsNhom: [],
      mangtam: [],
      isOpen: false,
      nhomSelected: '',
      isActive: false,
      selectLyDo: '',
      idgroup: '',
      tengroup: '',
      Image: '',
      camera: '',
    };
  }
  handleTieude(text) {
    this.setState(
      {
        haveValue_TieuDe: text,
      },
      () => this._render_Dang(),
    );
  }

  _PostMedia = async () => {
    let strBody;
    {
      this.state.Image
        ? (strBody = JSON.stringify({
            image: this.state.Image.data,
            name: this.state.Image.path.split('/').slice(-1) + '',
          }))
        : (strBody = JSON.stringify({
            image: this.state.camera.data,
            name: this.state.camera.path.split('/').slice(-1) + '',
          }));
    }

    console.log('strBody tin nhanh', strBody);

    let res = await addMedia(
      this.state.haveValue_TieuDe,
      await Utils.ngetStorage(nkey.id_user),
      strBody,
    );
    console.log('ress media', res);
    if (res.status == 1) {
      Utils.goscreen(this, 'ScreenBangTin');
      showMessage({
        message: 'Thông báo',
        description: 'Đăng tin thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      // await this._AddThongBao();
      await ROOTGlobal.DsMedia();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Đăng bài thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
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
        this.setState({
          Image: image,
        });
      })
      .catch((e) => {});
  };

  openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        this.setState({
          camera: image,
        });
      })
      .catch((e) => {});
  };

  xoaAnh = () => {
    ImagePicker.clean()
      .then(() => {
        this.setState({
          Image: '',
          camera: '',
        });
      })
      .catch((e) => {
        alert(e);
      });
  };

  _render_Dang = () => {
    const {haveValue_TieuDe, Image, camera} = this.state;
    if (
      (haveValue_TieuDe && Image != '') ||
      (haveValue_TieuDe && camera != '')
    ) {
      return (
        <View>
          <TouchableOpacity
            onPress={() => {
              this._PostMedia();
              // this.AddAnh();
            }}>
            <Text style={styles.textDang}>Đăng</Text>
          </TouchableOpacity>
        </View>
      );
    } else {
      return (
        <View>
          <Text style={styles.textDang}>Đăng</Text>
        </View>
      );
    }
  };

  AddAnh = async () => {
    {
      this.state.Image != ''
        ? this._FileBaiDang_Galary()
        : this._FileBaiDang_Camera();
    }
  };

  componentDidMount = async () => {};

  render() {
    // console.log('tin nhanh ==========', this.props.route.params);
    const {isActive, selectLyDo} = this.state;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
            <View
              style={{flexDirection: 'row', margin: 5, alignItems: 'center'}}>
              <TouchableOpacity
                onPress={() => {
                  Utils.goback(this, '');
                }}>
                <Image
                  source={goback}
                  style={{
                    height: FontSize.scale(13),
                    width: FontSize.verticalScale(18),
                  }}></Image>
              </TouchableOpacity>

              <Text style={styles.title}>Tạo media</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              {this._render_Dang()}
            </View>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.khung_Nhap}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>Nhập tiêu đề</Text>
            <View style={styles.khung_tieude}>
              <TextInput
                multiline={true}
                placeholder="Mời bạn nhập tiêu đề"
                style={{fontSize: FontSize.reSize(20)}}
                onChangeText={(text) => this.handleTieude(text)}></TextInput>
            </View>

            <View>
              {this.state.camera == '' && this.state.Image != '' ? (
                <View
                  style={{
                    backgroundColor: '#DDDDDD80',
                    borderRadius: 20,
                    marginTop: 10,
                    padding: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => this.openCamera()}>
                  <Image
                    source={camera}
                    style={{
                      height: FontSize.scale(20),
                      width: FontSize.verticalScale(20),
                      marginHorizontal: 10,
                      tintColor: '#696969',
                    }}></Image>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#696969',
                    }}>
                    Camera
                  </Text>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#DDDDDD80',
                      borderRadius: 20,
                      marginTop: 10,
                      padding: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => this.openCamera()}>
                    <Image
                      source={camera}
                      style={{
                        height: FontSize.scale(20),
                        width: FontSize.verticalScale(20),
                        marginHorizontal: 10,
                      }}></Image>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                      Camera
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
              {this.state.camera ? (
                <View style={{marginLeft: 5}}>
                  <Image
                    style={{
                      height: FontSize.scale(200),
                      width: FontSize.verticalScale(200),
                      marginVertical: 10,
                    }}
                    source={{uri: this.state.camera.path}}></Image>
                  <TouchableOpacity
                    style={{
                      // height: FontSize.scale(40),
                      // width: FontSize.verticalScale(40),
                      borderRadius: 20,
                      backgroundColor: 'blue',
                      position: 'absolute',
                      top: 5,
                      right: 120,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => this.xoaAnh()}>
                    <Image
                      source={close}
                      style={{
                        height: FontSize.scale(15),
                        width: FontSize.verticalScale(15),
                        // position: 'absolute',
                        // top: 5,
                        // right: 10,
                      }}></Image>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>

            <View>
              {this.state.camera != '' && this.state.Image == '' ? (
                <View
                  style={{
                    backgroundColor: '#DDDDDD80',
                    borderRadius: 20,
                    marginTop: 10,
                    padding: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}
                  onPress={() => this.openGalary()}>
                  <Image
                    source={pickimage}
                    style={{
                      height: FontSize.scale(20),
                      width: FontSize.verticalScale(20),
                      marginHorizontal: 10,
                      tintColor: '#696969',
                    }}></Image>
                  <Text
                    style={{
                      fontSize: 15,
                      fontWeight: 'bold',
                      color: '#696969',
                    }}>
                    Ảnh
                  </Text>
                </View>
              ) : (
                <View>
                  <TouchableOpacity
                    style={{
                      backgroundColor: '#DDDDDD80',
                      borderRadius: 20,
                      marginVertical: 10,
                      padding: 5,
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}
                    onPress={() => this.openGalary()}>
                    <Image
                      source={pickimage}
                      style={{
                        height: FontSize.scale(20),
                        width: FontSize.verticalScale(20),
                        marginHorizontal: 10,
                      }}></Image>
                    <Text style={{fontSize: 15, fontWeight: 'bold'}}>Ảnh</Text>
                  </TouchableOpacity>
                </View>
              )}

              {this.state.Image ? (
                <View style={{marginLeft: 5}}>
                  <Image
                    style={{
                      height: FontSize.scale(200),
                      width: FontSize.verticalScale(200),
                      marginVertical: 10,
                    }}
                    source={{uri: this.state.Image.path}}></Image>
                  <TouchableOpacity
                    style={{
                      // height: FontSize.scale(40),
                      // width: FontSize.verticalScale(40),
                      borderRadius: 20,
                      backgroundColor: 'blue',
                      position: 'absolute',
                      top: 5,
                      right: 120,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => this.xoaAnh()}>
                    <Image
                      source={close}
                      style={{
                        height: FontSize.scale(15),
                        width: FontSize.verticalScale(15),
                        // position: 'absolute',
                        // top: 5,
                        // right: 10,
                      }}></Image>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
            {/* <View style={styles.khung_tieude}>
              <TextInput
                multiline={true}
                placeholder="Mời bạn nhập tiêu đề"
                style={{fontSize: FontSize.reSize(20)}}
                onChangeText={(text) => this.handleTieude(text)}></TextInput>
            </View> */}
          </View>
        </View>
      </ScrollView>
    );
  }
}

const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').width;
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