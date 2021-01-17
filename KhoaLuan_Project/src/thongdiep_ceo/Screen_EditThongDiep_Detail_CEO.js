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
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {ROOTGlobal} from '../apis/dataGlobal';
import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';
import GoBack from '../components/GoBack';
import ImagePicker from 'react-native-image-crop-picker';
import {UpdateThongDiep, File_Updatethongdiep} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const goback = require('../assets/images/go-back-left-arrow.png');
const search = require('../assets/images/search.png');
const pickimage = require('../assets/images/pickimage.png');
const camera = require('../assets/images/photo-camera-interface-symbol-for-button.png');
const close = require('../assets/images/cancel.png');
export default class Screen_EditThongDiep_Detail_CEO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noidung: '',
      tieude: '',
      Image: '',
      camera: '',
      idbaidang: 0,
      media: '',
      imgmedia: '',
    };
    this.id_nguoidang = {};
  }
  handleTieuDe(text) {
    this.setState({
      tieude: text,
    });
  }
  handleNoiDung(text) {
    this.setState({
      noidung: text,
    });
  }

  nhanData = async () => {
    // this.id_nguoidang = this.props.route.params.id_nguoidang.id_nguoidang;
    // console.log('this id người đăng ', this.id_nguoidang);
    const {id_nguoidang} = this.props.route.params.id_nguoidang;
    this.setState({
      tieude: id_nguoidang[0].title,
      noidung: id_nguoidang[0].noidung,
      idbaidang: id_nguoidang[0].id_thongdiep,
      media: id_nguoidang[0].media,
      imgmedia: id_nguoidang[0].imgmedia,
    });
    // const {id_nguoidang = {}} = this.props.route.params;
    // await console.log('tieu de', this.id_nguoidang);
    // await console.log(
    //   'noi dung',
    //   this.props.route.params.id_nguoidang.id_nguoidang,
    // );
    // await console.log('id_nguoidang dung', id_nguoidang);
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
  _UP_FileBaiDang_Galary = async () => {
    let strBody;
    {
      this.state.Image != ''
        ? (strBody = JSON.stringify({
            image: this.state.Image.data,
            name: this.state.Image.path.split('/').slice(-1) + '',
          }))
        : (strBody = JSON.stringify({
            image: null,
            name: null,
          }));
    }
    // console.log('strBody file ảnh Galary---------', strBody);
    let res = await File_Updatethongdiep(await this.state.idbaidang, strBody);
    console.log('res file ảnh Galary-----', res);
  };

  _UP_FileBaiDang_Camera = async () => {
    let strBody;
    {
      this.state.camera != ''
        ? (strBody = JSON.stringify({
            image: this.state.camera.data,
            name: this.state.camera.path.split('/').slice(-1) + '',
          }))
        : (strBody = JSON.stringify({
            image: null,
            name: null,
          }));
    }
    // console.log('strBody file ảnh Camera ---------', strBody);
    let res = await File_Updatethongdiep(await this.state.idbaidang, strBody);
    // console.log('res file ảnh Camera-----', res);
  };

  AddAnh = async () => {
    {
      this.state.Image != ''
        ? this._UP_FileBaiDang_Galary()
        : this._UP_FileBaiDang_Camera();
    }
  };

  EditBaiDang = async () => {
    // let idbaidang = this.id_nguoidang[0].Id_BaiDang;
    // let id_loaibaidang = this.id_nguoidang[0].Id_LoaiBaiDang;
    // const today = new Date();
    // const date =
    //   today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    // const time = today.getHours() + ':' + today.getMinutes();
    let strBody = JSON.stringify({
      id_thongdiep: this.state.idbaidang,
      title: this.state.tieude,
      noidung: this.state.noidung,
      create_by: await Utils.ngetStorage(nkey.id_user),
      // createdate: '2021-01-16T11:12:57.223Z',
    });

    // console.log('strBody tin nhanh', strBody);
    let res = await UpdateThongDiep(strBody);
    // console.log('res update bài đăng', res);
    if (res.status == 1) {
      showMessage({
        message: 'Thông báo',
        description: 'Sửa thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      Utils.goscreen(this, 'ScreenDetailBaiDang_CEO');
      //   Utils.gobac;
      // await ROOTGlobal.GetDsAllBaiDang();
      await ROOTGlobal.GetDSDetailThongDiep();

      // await ROOTGlobal.GetDsAllBaiDang_Nhom();
      // await ROOTGlobal.GanDataChitiet_Nhom();
      await ROOTGlobal.GetDSBThongDiep();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Sửa thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
    }
  };

  componentDidMount = async () => {
    await this.nhanData();
  };

  render() {
    // const user = this.props.route.params ? this.props.route.params : '';
    // console.log('this .props edit detail', user);
    // console.log('props edit bài đăng chi tiết', this.props);
    return (
      <View style={styles.container}>
        <ScrollView style={{flex: 1}}>
          <View style={styles.back}>
            <View
              style={{
                flexDirection: 'row',
                width: '100%',
                justifyContent: 'space-between',
                // backgroundColor: '#007DE3',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  margin: 5,
                  alignItems: 'center',
                  width: '100%',
                }}>
                <TouchableOpacity
                  // onPress={this.props.navigation.goBack}
                  // onPress={() => Utils.goback(this, '')}
                  onPress={() =>
                    Alert.alert(
                      'Thông Báo',
                      'Bạn Không Muốn Lưu Thay Đổi?',
                      [
                        {
                          text: 'Đồng ý',
                          onPress: () => Utils.goback(this, ''),
                        },
                        {
                          text: 'Hủy',
                          style: 'cancel',
                        },
                      ],
                      {cancelable: false},
                    )
                  }>
                  <Image
                    source={goback}
                    style={{
                      height: FontSize.scale(13),
                      width: FontSize.verticalScale(18),
                    }}></Image>
                </TouchableOpacity>
                <View
                  style={{
                    flex: 1,
                    alignItems: 'center',
                  }}></View>

                <View style={{justifyContent: 'center'}}>
                  <TouchableOpacity
                    onPress={() => {
                      this.EditBaiDang(), this.AddAnh();
                    }}>
                    <Text style={styles.textDang}>Sửa</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.header}>
            <Text
              style={{
                fontWeight: 'bold',
                fontSize: FontSize.reSize(20),
                marginBottom: 5,
              }}>
              Tiêu đề:
            </Text>
            <TextInput
              autoCapitalize="none"
              placeholderTextColor="#69696980"
              placeholder="Nội dung bài đăng"
              multiline={true}
              style={styles.textinput}
              onChangeText={(text) => this.handleTieuDe(text)}
              value={this.state.tieude}></TextInput>

            <View style={styles.footer}>
              <Text
                style={{
                  fontWeight: 'bold',
                  fontSize: FontSize.reSize(20),
                  marginBottom: 5,
                }}>
                Nội dung:
              </Text>
              <TextInput
                autoCapitalize="none"
                placeholderTextColor="#69696980"
                placeholder="Nội dung bài đăng"
                multiline={true}
                style={styles.textinput}
                onChangeText={(text) => this.handleNoiDung(text)}
                value={this.state.noidung}></TextInput>

              {this.state.media ? (
                <View style={{marginTop: 5}}>
                  <Image
                    source={{uri: this.state.imgmedia}}
                    style={{
                      height: FontSize.scale(200),
                      width: '100%',
                      backgroundColor: 'blue',
                    }}></Image>
                </View>
              ) : null}
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
          </View>
        </ScrollView>
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
    // backgroundColor: '#9C9C9C',
    justifyContent: 'center',
    // padding: 10,
    // borderRadius: 10,
    // marginHorizontal: 10,
    // marginVertical: 10,
    padding: 10,
  },
  footer: {
    // height: '10%',
    // width: '100%',
    padding: 10,
    // backgroundColor: 'green',
  },

  textinput: {
    backgroundColor: '#DDDDDD80',
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: FontSize.reSize(20),
    maxHeight: 150,
  },

  back: {
    flexDirection: 'row',
    height: FontSize.scale(45),
    backgroundColor: '#007DE3',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginBottom: 10,
  },
  textDang: {
    fontSize: FontSize.reSize(20),
    marginRight: 10,
  },
  textDang_invisibale: {
    fontSize: FontSize.reSize(20),
    marginRight: 10,
    color: '#696969',
    textAlign: 'center',
  },
});
