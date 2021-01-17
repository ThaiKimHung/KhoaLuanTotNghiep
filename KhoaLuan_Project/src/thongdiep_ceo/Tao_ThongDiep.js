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

import {
  PostBaiDang,
  PostBaiDang_Nhom,
  AddThongDiep,
  AddThongBao,
  BanThongBao,
  File_Updatebaidang,
  File_ThongDiep,
} from '../apis/apiUser';
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

export default class Tao_ThongDiep extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveValue_TieuDe: '',
      haveValue_Noidung: '',
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
    this.setState({
      haveValue_TieuDe: text,
    });
  }

  handleNoidung(text) {
    this.setState({
      haveValue_Noidung: text,
    });
  }

  _PostBaiDang = async () => {
    // const id_loaibaidang = this.props.route.params.id_loaibaidang;

    let strBody = JSON.stringify({
      title: this.state.haveValue_TieuDe,
      noidung: this.state.haveValue_Noidung,
      create_by: await Utils.ngetStorage(nkey.id_user),
    });

    // console.log('strBody tin nhanh', strBody);

    let res = await AddThongDiep(strBody);
    // console.log('ress tin nhanh', res);
    if (res.status == 1) {
      // this.props.navigation.navigate('Home', {DangBaiThanhCong: thanhcong});
      Utils.goscreen(this, 'BaiDang_CEO');
      showMessage({
        message: 'Thông báo',
        description: 'Đăng thông điệp thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      // await this._AddThongBao();
      await ROOTGlobal.GetDSBThongDiep();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Đăng thông điệp thất bại',
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

  openCamera = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((image) => {
        // console.log('camera =============', image);
        this.setState({
          camera: image,
        });
        // console.log('state camera =====', this.state.camera);
      })
      .catch((e) => {
        // alert(e);
      });
  };

  xoaAnh = () => {
    ImagePicker.clean()
      .then(() => {
        // console.log('removed all tmp images from tmp directory');
        this.setState({
          Image: '',
          camera: '',
        });
      })
      .catch((e) => {
        alert(e);
      });
  };

  _FileBaiDang_Galary = async () => {
    let strBody;
    {
      this.state.Image != ''
        ? (strBody = JSON.stringify({
            image: this.state.Image.data,
            name: this.state.Image.path.split('/').slice(-1) + '',
          }))
        : (strBody = JSON.stringify({
            image: '',
            name: '',
          }));
    }
    console.log('strBody file ảnh Galary---------', strBody);
    let res = await File_ThongDiep(strBody);
    console.log('res file ảnh Galary-----', res);
  };

  _FileBaiDang_Camera = async () => {
    let strBody;
    {
      this.state.camera != ''
        ? (strBody = JSON.stringify({
            image: this.state.camera ? this.state.camera.data : null,
            name: this.state.camera
              ? this.state.camera.path.split('/').slice(-1) + ''
              : null,
          }))
        : (strBody = JSON.stringify({
            image: '',
            name: '',
          }));
    }
    // console.log('strBody file ảnh Camera ---------', strBody);
    let res = await File_ThongDiep(strBody);
    // console.log('res file ảnh Camera-----', res);
  };
  // _BanThongBao = async () => {
  //   let res = await BanThongBao();
  // };

  // _AddThongBao = async () => {
  //   let strBody = JSON.stringify({
  //     title: 'Đã tạo một đề xuất',
  //     create_tb_by: await Utils.ngetStorage(nkey.id_user),
  //   });

  //   // console.log('strBody add Thông báo', strBody);
  //   let res = await AddThongBao(await Utils.ngetStorage(nkey.id_user), strBody);
  //   await this._BanThongBao();
  //   // console.log('res add thông báo', res);
  // };

  AddAnh = async () => {
    {
      this.state.Image != ''
        ? this._FileBaiDang_Galary()
        : this._FileBaiDang_Camera();
    }
  };

  componentDidMount = async () => {
    await this._GetDSGroup();
  };

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

              <Text style={styles.title}>Tạo thông điệp</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              <View>
                {this.state.haveValue_TieuDe && this.state.haveValue_Noidung ? (
                  <TouchableOpacity
                    onPress={() => {
                      this._PostBaiDang();
                      this.AddAnh();
                    }}>
                    <Text style={styles.textDang}>Đăng</Text>
                  </TouchableOpacity>
                ) : (
                  <View>
                    <Text style={styles.textDang_invisibale}>Đăng</Text>
                  </View>
                )}
              </View>
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
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>
              Nhập nội dung
            </Text>
            <View style={styles.khung_tieude}>
              <TextInput
                multiline={true}
                placeholder="Mời bạn nhập nội dung"
                style={{fontSize: FontSize.reSize(20)}}
                onChangeText={(text) => this.handleNoidung(text)}></TextInput>
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
