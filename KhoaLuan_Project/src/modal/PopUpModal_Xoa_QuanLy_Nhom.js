import React, {Component} from 'react';
import {
  Alert,
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from 'react-native';
import FontSize from '../components/size';

import {
  DeleteBaiDang,
  DeleteCommentTrongBaiDang,
  DeleteLikeTrongBaiDang,
} from '../apis/apiUser';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import Utils from '../apis/Utils';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import AsyncStorage from '@react-native-community/async-storage';
// import {useRoute} from '@react-navigation/native';
import {ROOTGlobal} from '../apis/dataGlobal';
const deviceHeight = Dimensions.get('window').height;
const edite = require('../assets/images/edit.png');
const delet = require('../assets/images/delete.png');
const manager = require('../assets/images/product-management.png');
export default class PopUpModal_Xoa_QuanLy_Nhom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      id_user: '',
      idBaiDang: '',
      id_NguoiDang: '',
      xoathanhcong: true,
      id: '',
    };
  }
  async _getThongTin() {
    this.setState({
      id_user: await Utils.ngetStorage(nkey.id_user),
    });
  }

  change() {
    this.setState({
      display: !this.state.display,
    });
    // this.props.navigation.goBack();
    Utils.goback(this, '');
  }

  XoaBaiDang = async () => {
    // console.log(this.state.idBaiDang);
    //xóa like
    let res_like = await DeleteLikeTrongBaiDang(this.state.id);
    // console.log('res like', res_like);
    let res_cmt = await DeleteCommentTrongBaiDang(this.state.id);
    // console.log('res cmt', res_cmt);

    //xóa bài đăng
    let res = await DeleteBaiDang(this.state.id);
    // console.log('res', res);
    if (res_like.status == 1 && res_cmt.status == 1 && res.status == 1) {
      showMessage({
        message: 'Thông báo',
        description: 'Xóa bài thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      this.setState({
        thanhcong: true,
      });
      this.xoathanhcong();
      ROOTGlobal.GetDSBaiDang_QL_Nhom();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Xóa bài thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
      this.setState({
        thanhcong: false,
      });
      this.change();
    }
  };

  NhanThongTin = async () => {
    const {id_nguoidang = {}} = this.props.route.params;
    // console.log('this modal xóa sửa', this.props);
    // console.log('id_nguoidang modal xóa quản lý', id_nguoidang);
    // let user = id_nguoidang ? id_nguoidang.User_DangBai[0] : {};
    this.setState({
      id: id_nguoidang.Id_BaiDang,
    });
    // await console.log('id nè ', this.state.id);
    // await this.setState(
    //   {
    //     idBaiDang: id_nguoidang ? id_nguoidang.Id_BaiDang : null,
    //     // id_NguoiDang: user ? user.ID_user : null,
    //   },
    //   // console.log('state', this.state.idBaiDang),
    // );
  };

  xoathanhcong = () => {
    this.setState({
      display: !this.state.display,
    });
    // this.props.navigation.navigate('HomeScreen', {
    //   delete_thanhcong,
    // });
    Utils.goscreen(this, 'ScreenQuanLyBaiDangNhom');
  };

  async componentDidMount() {
    await this._getThongTin();
    await this.NhanThongTin();
  }

  render() {
    const {display} = this.state;
    return (
      <View>
        <Modal
          animationType="slide"
          visible={display}
          transparent={true}
          onRequestClose={this.state.display}>
          <TouchableOpacity
            style={{
              flex: 1,
              backgroundColor: '#000000AA',
              justifyContent: 'flex-end',
            }}
            onPress={() => this.change()}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  backgroundColor: '#FFFFFF',
                  width: '100%',
                  paddingHorizontal: 10,
                  maxHeight: deviceHeight * 0.4,
                  // height: '50%',
                }}>
                <View style={{marginTop: 5, height: FontSize.Height(50)}}>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 5,
                    }}
                    onPress={() =>
                      Alert.alert(
                        'Thông Báo',
                        'Bạn Muốn Xóa Bài Đăng?',
                        [
                          {text: 'Đồng ý', onPress: () => this.XoaBaiDang()},
                          {
                            text: 'Hủy',
                            style: 'cancel',
                          },
                        ],
                        {cancelable: false},
                      )
                    }>
                    <Image source={delet} style={styles.image_st}></Image>
                    <Text style={{fontSize: 20}}>Xóa bài đăng</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </TouchableOpacity>
        </Modal>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  image_st: {
    height: FontSize.scale(15),
    width: FontSize.verticalScale(15),
    marginRight: 10,
  },
  image_st1: {
    height: FontSize.scale(15),
    width: FontSize.verticalScale(15),
    marginRight: 10,
    tintColor: '#696969',
  },
});
