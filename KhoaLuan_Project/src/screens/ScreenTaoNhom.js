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
import {Avatar, SearchBar} from 'react-native-elements';
import {AddGroup} from '../apis/apiUser';
import Utils from '../apis/Utils';
import FontSize from '../components/size';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {ROOTGlobal} from '../apis/dataGlobal';
import {showMessage, hideMessage} from 'react-native-flash-message';
import ImagePicker from 'react-native-image-crop-picker';

const goback = require('../assets/images/go-back-left-arrow.png');
const pickimage = require('../assets/images/pickimage.png');

export default class ScreenTaoNhom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      images: null,
      tennhom: '',
    };
  }

  cleanupImages() {
    ImagePicker.clean()
      .then(() => {
        // console.log('removed tmp images from tmp directory');
        this.setState({
          images: '',
        });
        alert('Temporary images history cleared');
      })
      .catch((e) => {
        alert(e);
      });
  }

  scaledHeight(oldW, oldH, newW) {
    return (oldH / oldW) * newW;
  }

  renderImage(image) {
    return (
      <Image
        style={{width: 200, height: 200, resizeMode: 'contain'}}
        source={image}
      />
    );
  }

  renderAsset(image) {
    if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
      //   return this.renderVideo(image);
      return alert('Chưa hỗ trợ video');
    }

    return this.renderImage(image);
  }

  pickMultipleImage = async () => {
    ImagePicker.openPicker({
      multiple: true,
    })
      .then((images) => {
        this.setState({
          image: null,
          images: images.map((i) => {
            console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
        });
        console.log('state===== images', this.state.images);
      })
      .catch((e) => alert(e));
  };

  chon_Anh = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then((image) => {
      console.log(image);
      console.log('path', image.path);
      this.setState({
        image: image.path,
      });
    });
  };

  chupAnh = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    })
      .then((images) => {
        this.setState({
          image: null,
          images: images.map((i) => {
            console.log('received image', i);
            return {
              uri: i.path,
              width: i.width,
              height: i.height,
              mime: i.mime,
            };
          }),
        });
        console.log('state===== images chụp ảnh', this.state.images);
      })
      .catch((e) => alert(e));
  };

  handleTenNhom(text) {
    this.setState({
      tennhom: text,
    });
    // alert(text);
  }

  _AddGroup = async () => {
    // const id_loaibaidang = this.props.route.params.id_loaibaidang;
    let id_user = await Utils.ngetStorage(nkey.id_user);
    let strBody = JSON.stringify({
      ten_group: this.state.tennhom,
      avatar_group: 'null',
      CreatedBy: id_user,
      UpdatedBy: 0,
    });
    console.log('strBody tạo nhóm---------', strBody);
    let res = await AddGroup(strBody);
    console.log('res add nhóm-----', res);
    if (res.status == 1) {
      let thanhcong = res.status;
      // this.props.navigation.navigate('Home', {DangBaiThanhCong: thanhcong});
      Utils.goscreen(this, 'Nhom');
      showMessage({
        message: 'Thông báo',
        description: 'Tạo nhóm thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      await ROOTGlobal.GetDsNhom();
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

  render() {
    return (
      <View style={styles.container}>
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

              <Text style={styles.title}>Tạo Group</Text>
            </View>
            <TouchableOpacity
              style={{justifyContent: 'center'}}
              onPress={() => this._AddGroup()}>
              <Text style={styles.textDang}>Tạo</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.footer}>
          <View style={styles.khung_Nhap}>
            <Text>Nhập tên nhóm</Text>
            <View style={styles.khung_tieude}>
              <TextInput
                multiline={true}
                placeholder="Mời bạn nhập tên nhóm"
                style={{fontSize: FontSize.reSize(20)}}
                onChangeText={(text) => this.handleTenNhom(text)}></TextInput>
            </View>

            <TouchableOpacity
              style={{
                padding: 10,
                backgroundColor: 'green',
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 20,
              }}
              onPress={() => {
                this.chon_Anh();
              }}>
              <Image
                source={pickimage}
                style={{
                  height: FontSize.scale(25),
                  width: FontSize.verticalScale(25),
                  margin: 5,
                }}></Image>

              <Text>Chọn ảnh đại diện nhóm</Text>
            </TouchableOpacity>
            <View style={{margin: 10}}>
              <Image
                source={{uri: this.state.image}}
                style={{width: 200, height: 300}}
              />
            </View>
          </View>
        </View>
      </View>
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
