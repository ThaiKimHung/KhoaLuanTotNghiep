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
  DeleteThongDiep,
} from '../apis/apiUser';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import Utils from '../apis/Utils';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import AsyncStorage from '@react-native-community/async-storage';
import {useRoute} from '@react-navigation/native';
import {ROOTGlobal} from '../apis/dataGlobal';
const deviceHeight = Dimensions.get('window').height;
const edite = require('../assets/images/edit.png');
const delet = require('../assets/images/delete.png');
export default class PopUpModal_XoaSua_Detail_ThongDiep_CEO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      id_user: '',
      idThongDiep: '',
      id_NguoiDang: '',
      xoathanhcong: true,
    };
  }
  async _getThongTin() {
    this.setState({
      id_user: await Utils.ngetStorage(nkey.id_user),
    });
    // await console.log('lưu iduser', this.state.id_user);
  }
  change = async () => {
    this.setState({
      display: !this.state.display,
    });
    // this.props.navigation.goBack();
    Utils.goback(this, '');
    await ROOTGlobal.GetDSDetailThongDiep();
  };

  XoaBaiDang = async () => {
    //xóa bài đăng
    let res = await DeleteThongDiep(this.state.idThongDiep);
    // console.log('xóa ', res);
    if (res.status == 1) {
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
      await ROOTGlobal.GetDSBThongDiep();
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
    // console.log('this detail modal', this.props);

    await this.setState({
      idThongDiep: id_nguoidang[0].id_thongdiep,
      id_NguoiDang: id_nguoidang[0].create_by,
      id_user: await Utils.ngetStorage(nkey.id_user),
    });
    // await console.log('this , truyền vào', this.state.id_NguoiDang);
  };

  xoathanhcong = () => {
    this.setState({
      display: !this.state.display,
    });
    Utils.goscreen(this, 'BaiDang_CEO');
  };

  loadNoiDungChinhSua = () => {};

  async componentDidMount() {
    await this._getThongTin();
    await this.NhanThongTin();
  }

  render() {
    const {display} = this.state;
    // console.log('this modal popup detail', this);
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
                  borderRadius: 10,
                }}>
                {this.state.id_NguoiDang == this.state.id_user ? (
                  <View style={{marginTop: 5}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                      }}
                      onPress={() => {
                        Utils.goscreen(
                          this,
                          'Screen_EditThongDiep_Detail_CEO',
                          {
                            id_nguoidang: this.props.route.params,
                          },
                        );
                      }}>
                      <Image source={edite} style={styles.image_st}></Image>
                      <Text style={{fontSize: 20}}>Sửa</Text>
                    </TouchableOpacity>

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
                      <Text style={{fontSize: 20}}>Xóa</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{marginTop: 5}}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                      }}
                      // onPress={() => {
                      //   this.change(),
                      //     this.props.navigation.navigate('SearchUser');
                      // }}
                    >
                      <Image source={edite} style={styles.image_st1}></Image>
                      <Text style={{fontSize: 20, color: '#696969'}}>Sửa</Text>
                    </View>

                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                      }}
                      onPress={() => this.change()}>
                      <Image source={delet} style={styles.image_st1}></Image>
                      <Text style={{fontSize: 20, color: '#696969'}}>Xóa</Text>
                    </View>
                  </View>
                )}
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
