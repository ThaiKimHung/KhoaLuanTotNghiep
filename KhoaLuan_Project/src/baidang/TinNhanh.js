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
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import {PostBaiDang} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const goback = require('../assets/images/go-back-left-arrow.png');
export default class TinNhanh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      haveValue_TieuDe: '',
      haveValue_Noidung: '',
    };
  }
  handleTieude(text) {
    this.setState({
      haveValue_TieuDe: text,
    });
    // alert(text);
  }
  handleNoidung(text) {
    this.setState({
      haveValue_Noidung: text,
    });
  }
  _PostBaiDang = async () => {
    const item = this.props.route.params;
    const today = new Date();
    const date =
      today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes();
    console.log('item loại bài bài đăng', item);
    console.log('ngày1', date);
    console.log('time', time);
    console.log('this tin nhanh', this.props);
    let strBody = JSON.stringify({
      Id_LoaiBaiDang: item,
      title: this.state.haveValue_TieuDe,
      NoiDung: this.state.haveValue_Noidung,
      typepost: 'null',
      CreatedDate: date + 'T' + time,
      CreatedBy: await Utils.ngetStorage(nkey.id_user),
      UpdateDate: '0',
      UpdateBy: 0,
    });

    console.log('strBody tin nhanh', strBody);
    let res = await PostBaiDang(strBody);
    if (res.status == 1) {
      let thanhcong = res.status;
      this.props.navigation.navigate('HomeScreen', {
        thanhcong,
      });
      showMessage({
        message: 'Thông báo',
        description: 'Đăng bài thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
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
              <TouchableOpacity onPress={this.props.navigation.goBack}>
                <Image
                  source={goback}
                  style={{
                    height: FontSize.scale(13),
                    width: FontSize.verticalScale(18),
                  }}></Image>
              </TouchableOpacity>

              <Text style={styles.title}>Tạo tin nhanh</Text>
            </View>
            <View style={{justifyContent: 'center'}}>
              {this.state.haveValue_TieuDe && this.state.haveValue_Noidung ? (
                <TouchableOpacity
                  onPress={() => {
                    this._PostBaiDang();
                  }}>
                  <Text style={styles.textDang}>Đăng</Text>
                </TouchableOpacity>
              ) : (
                <Text style={styles.textDang_invisibale}>Đăng</Text>
              )}
            </View>
          </View>
        </View>

        <ScrollView style={styles.footer}>
          <View style={styles.khung_Nhap}>
            <Text>Nhập tiêu đề</Text>
            <View style={styles.khung_tieude}>
              <TextInput
                multiline={true}
                placeholder="Mời bạn nhập tiêu đề"
                style={{fontSize: FontSize.reSize(20)}}
                onChangeText={(text) => this.handleTieude(text)}></TextInput>
            </View>

            <Text style={{marginTop: 10}}>Nội dung</Text>
            <View style={styles.khung_noidung}>
              <TextInput
                placeholder="Nội dung"
                multiline={true}
                style={{fontSize: FontSize.reSize(20)}}
                onChangeText={(text) => this.handleNoidung(text)}></TextInput>
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
    // backgroundColor: 'yellow',
  },
  header: {
    height: FontSize.scale(45),
    justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#007DE3',
  },
  footer: {
    flex: 1,
    // backgroundColor: '#FFCC99',
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
    marginBottom: 5,
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
