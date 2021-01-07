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
import {Update_BaiDang, File_Updatebaidang} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const goback = require('../assets/images/go-back-left-arrow.png');
const search = require('../assets/images/search.png');
const pickimage = require('../assets/images/pickimage.png');
const camera = require('../assets/images/photo-camera-interface-symbol-for-button.png');
const close = require('../assets/images/cancel.png');
export default class Screen_EditBaiDang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      noidung: '',
      tieude: '',
      Image: '',
      camera: '',
      idbaidang: 0,
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
    this.id_nguoidang = this.props.route.params.id_nguoidang.id_nguoidang;
    // console.log('this id người đăng ', this.id_nguoidang);
    this.setState({
      tieude: this.id_nguoidang[0].title,
      noidung: this.id_nguoidang[0].NoiDung,
      idbaidang: this.id_nguoidang[0].Id_BaiDang,
    });
    // const {id_nguoidang = {}} = this.props.route.params;
    // await console.log('tieu de', this.id_nguoidang);
    // await console.log('noi dung', this.state.idbaidang);
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
    let res = await File_Updatebaidang(await this.state.idbaidang, strBody);
    // console.log('res file ảnh Galary-----', res);
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
      // }
      // console.log('strBody file ảnh Camera ---------', strBody);
      let res = await File_Updatebaidang(await this.state.idbaidang, strBody);
      // console.log('res file ảnh Camera-----', res);
    }
  };

  AddAnh = async () => {
    {
      this.state.Image != ''
        ? this._UP_FileBaiDang_Galary()
        : this._UP_FileBaiDang_Camera();
    }
  };

  EditBaiDang = async () => {
    let idbaidang = this.id_nguoidang[0].Id_BaiDang;
    let id_loaibaidang = this.id_nguoidang[0].Id_LoaiBaiDang;
    // const today = new Date();
    // const date =
    //   today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    // const time = today.getHours() + ':' + today.getMinutes();
    let strBody = JSON.stringify({
      ID_BaiDang: idbaidang,
      Id_LoaiBaiDang: id_loaibaidang,
      title: this.state.tieude,
      NoiDung: this.state.noidung,
      id_khenthuong: 0,
      typepost: '',
      // UpdateDate: date + 'T' + time,
      UpdateBy: await Utils.ngetStorage(nkey.id_user),
    });

    // console.log('strBody tin nhanh', strBody);
    let res = await Update_BaiDang(strBody);
    // console.log('res update bài đăng', res);
    if (res.status == 1) {
      showMessage({
        message: 'Thông báo',
        description: 'Sửa thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      Utils.goscreen(this, 'ScreenDetailBaiDang');
      //   Utils.gobac;
      // await ROOTGlobal.GetDsAllBaiDang();
      await ROOTGlobal.GetChiTietBaiDang();
      await ROOTGlobal.GanDataChitiet();
      await ROOTGlobal.GetDsAllBaiDang();
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

  loadNoidungChiTiet = () => {
    // console.log('this detail', this);
    const {id_nguoidang = {}} = this.props.route.params.id_nguoidang;
    // console.log('this ChiTietBaiDang screen Detail bài đăng', id_nguoidang);
    let user = id_nguoidang.User_DangBai ? id_nguoidang.User_DangBai[0] : {};
    this.idBaiDang = id_nguoidang.Id_BaiDang;
    this.id_user = user.ID_user;
    let idloaibaidang = id_nguoidang[0].Id_LoaiBaiDang;
    // console.log('id loai bd', id_nguoidang[0].hinhanh);
    let khenthuong = id_nguoidang.KhenThuong ? id_nguoidang.KhenThuong[0] : {};
    switch (idloaibaidang) {
      case 1:
        return (
          <View style={{flex: 1}}>
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
                  <Text style={{fontSize: FontSize.reSize(20), marginLeft: 5}}>
                    Sửa tin tức nội bộ
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                    }}></View>

                  <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => this.EditBaiDang()}>
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
            </View>
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
            </View>
          </View>
        );

      case 2:
        return Utils.goscreen(this, 'Edit_KhenThuong_Detail', {
          id_nguoidang: this.props.route.params,
        });
      case 3:
        return (
          <View style={{flex: 1}}>
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
                  <Text style={{fontSize: FontSize.reSize(20), marginLeft: 5}}>
                    Sửa thông báo
                  </Text>
                  <View
                    style={{
                      flex: 1,
                      alignItems: 'center',
                    }}></View>

                  <View style={{justifyContent: 'center'}}>
                    <TouchableOpacity onPress={() => this.EditBaiDang()}>
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
            </View>
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
            </View>
          </View>
        );
      case 4:
        return Utils.goscreen(this, 'Edit_ChaoMungTV_Detail', {
          id_nguoidang: this.props.route.params,
        });
      case 6:
        return (
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
                  <Text style={{fontSize: FontSize.reSize(20), marginLeft: 5}}>
                    Sửa tin nhanh
                  </Text>
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
              {id_nguoidang[0].hinhanh ? (
                <View style={{marginTop: 5}}>
                  <Image
                    source={{uri: id_nguoidang.image}}
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
          </ScrollView>
        );
      case 7:
        return (
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
                  <Text style={{fontSize: FontSize.reSize(20), marginLeft: 5}}>
                    Sửa đề xuất
                  </Text>
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
            </View>
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

              {id_nguoidang[0].hinhanh ? (
                <View style={{marginTop: 5}}>
                  <Image
                    source={{uri: id_nguoidang.image}}
                    style={{
                      height: FontSize.scale(200),
                      width: '100%',
                      backgroundColor: 'blue',
                    }}></Image>
                </View>
              ) : null}

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
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                        Ảnh
                      </Text>
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
        );
      default:
        return (
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
                        this.EditBaiDang(), this, AddAnh();
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

              {id_nguoidang[0].hinhanh ? (
                <View style={{marginTop: 5, marginLeft: 5}}>
                  <Image
                    source={{uri: id_nguoidang.image}}
                    style={{
                      height: FontSize.scale(200),
                      width: '100%',
                      backgroundColor: 'blue',
                    }}></Image>
                </View>
              ) : null}
            </View>
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
                      <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                        Ảnh
                      </Text>
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
        );
    }
  };

  componentDidMount = async () => {
    await this.nhanData();
  };

  render() {
    // const user = this.props.route.params ? this.props.route.params : '';
    // console.log('this .props edit detail', user);
    // console.log('props edit bài đăng chi tiết', this.props);
    return <View style={styles.container}>{this.loadNoidungChiTiet()}</View>;
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
