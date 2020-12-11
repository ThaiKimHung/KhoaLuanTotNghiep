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
import FontSize from './size';

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
import {useRoute} from '@react-navigation/native';

const deviceHeight = Dimensions.get('window').height;
const edite = require('../assets/images/edit.png');
const delet = require('../assets/images/delete.png');
export default class PopUpModal_XoaSua extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      id_user: '0',
      idBaiDang: '0',
      id_NguoiDang: '0',
      xoathanhcong: true,
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
    this.props.navigation.goBack();
  }

  XoaBaiDang = async () => {
    //xóa like
    let res_like = await DeleteLikeTrongBaiDang(this.state.idBaiDang);
    // console.log('res like', res_like);
    let res_cmt = await DeleteCommentTrongBaiDang(this.state.idBaiDang);
    // console.log('res cmt', res_cmt);

    //xóa bài đăng
    let res = await DeleteBaiDang(this.state.idBaiDang);
    // console.log('id bài đăng fun xóa bài đăng', this.state.idBaiDang);
    // console.log('ress delete bài đăng', res);
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
    const {item = {}} = this.props.route.params;
    let user = item ? item.User_DangBai[0] : {};

    await this.setState({
      idBaiDang: item ? item.Id_BaiDang : '0',
      id_NguoiDang: user ? user.ID_user : '0',
    });
  };

  xoathanhcong = () => {
    let delete_thanhcong = 1;
    this.setState({
      display: !this.state.display,
    }),
      this.props.navigation.navigate('HomeScreen', {
        delete_thanhcong,
      });
  };

  componentDidMount() {
    this._getThongTin();
    this.NhanThongTin();
  }

  render() {
    // let idbaidang = item.Id_BaiDang;

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
                        this.change(),
                          this.props.navigation.navigate('SearchUser');
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
                      onPress={() => {
                        this.XoaBaiDang();
                      }}>
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
                      onPress={() => {
                        this.change(),
                          this.props.navigation.navigate('SearchUser');
                      }}>
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
