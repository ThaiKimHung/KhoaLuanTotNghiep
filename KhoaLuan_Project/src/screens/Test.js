import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';
import GoBack from '../components/GoBack';
import {
  GetDSKhenThuong,
  AddBaiDang_KhenThuong,
  AddBaiDang_KhenThuong_Nhom,
  GetDSGroup,
  GetChiTietBaiDang,
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import ImagePicker from 'react-native-image-crop-picker';
const search = require('../assets/images/search.png');
// var commonStyles = require('../assets/style');
export default class Test extends Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   Image: '',
    // };
    this.state = {
      image: null,
      images: null,
    };
  }

  open = () => {
    // ImagePicker.openPicker({
    //   width: 300,
    //   height: 400,
    //   cropping: true,
    // }).then((image) => {
    //   console.log(image);
    //   this.setState({
    //     Image: image.path,
    //   });
    //   console.log('staet =====', this.state.Image);
    // });
    ImagePicker.openPicker({
      multiple: true,
    }).then((images) => {
      console.log(images);
      this.setState({
        Image: image.path,
      });
    });
  };

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

  pickMultiple() {
    ImagePicker.openPicker({
      multiple: true,
      waitAnimationEnd: false,
      includeExif: true,
      forceJpg: true,
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
      })
      .catch((e) => alert(e));
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
      return this.renderVideo(image);
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

  chupAnh = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
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

  render() {
    return (
      <View style={{flex: 1}}>
        {/* <TouchableOpacity
          style={{height: 100, width: 200, backgroundColor: 'green'}}
          onPress={this.open}>
          <Text>hi</Text>
        </TouchableOpacity>
        {this.state.Image ? (
          <View style={{flex: 1}}>
            <Text>hello</Text>
            <Image
              source={{uri: this.state.Image}}
              style={{width: 400, height: 40}}
            />
          </View>
        ) : null} */}

        <View style={{flexDirection: 'column'}}>
          <TouchableOpacity
            onPress={() => {
              this.pickMultipleImage();
            }}
            style={{
              backgroundColor: '#7B7070',
              borderRadius: 5,
              height: 30,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text> Chọn nhiều hình... </Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              this.cleanupImages();
            }}
            style={{
              backgroundColor: '#7B7070',
              borderRadius: 5,
              height: 30,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text> Clear.. </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              this.chupAnh();
            }}
            style={{
              backgroundColor: '#7B7070',
              borderRadius: 5,
              height: 30,
              width: 120,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text> Chụp ảnh </Text>
          </TouchableOpacity>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{marginTop: 5}}>
            {/* {/ {this.state.image ? this.renderAsset(this.state.image) : null} /} */}
            {this.state.images
              ? this.state.images.map((i) => (
                  <View key={i.uri}>
                    {this.renderAsset(i)}
                    {console.log('i----------', i)}
                  </View>
                ))
              : null}
          </ScrollView>
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    // backgroundColor: CarColors.white,
  },
  imgContainer: {
    marginVertical: 20,
  },
  button: {
    backgroundColor: 'blue',
    marginBottom: 10,
  },
  text: {
    color: 'white',
    fontSize: 20,
    textAlign: 'center',
  },
  title: {
    fontWeight: 'bold',
    fontSize: 22,
  },
  safeArea: {
    marginTop: 20,
  },
  dateContainer: {
    flexDirection: 'row',
  },
  imgView: {
    width: '50%',
    marginVertical: 10,
  },
});
