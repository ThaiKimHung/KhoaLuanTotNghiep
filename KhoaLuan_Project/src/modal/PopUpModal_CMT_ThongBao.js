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

import {DeleteComment, DeleteComment_Like, Update_CMT} from '../apis/apiUser';
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
const answer = require('../assets/images/chat.png');
export default class PopUpModal_CMT_ThongBao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      id_user: '',
      id_NguoiDang: '',
      xoathanhcong: true,
      Idcmt: '',
    };
  }
  async _getThongTin() {
    this.setState({
      id_user: await Utils.ngetStorage(nkey.id_user),
    });
  }
  change = async () => {
    this.setState({
      display: !this.state.display,
    });
    // this.props.navigation.goBack();
    Utils.goback(this, '');
    await ROOTGlobal.GetChiTietBaiDang_ThongBao();
    // await ROOTGlobal.GanDataChitiet();
  };

  // XoaBaiDang = async () => {
  //   //xóa like
  //   let res_like = await DeleteLikeTrongBaiDang(this.state.idBaiDang);
  //   // console.log('res like', res_like);
  //   let res_cmt = await DeleteCommentTrongBaiDang(this.state.idBaiDang);
  //   // console.log('res cmt', res_cmt);

  //   //xóa bài đăng
  //   let res = await DeleteBaiDang(this.state.idBaiDang);
  //   if (res_like.status == 1 && res_cmt.status == 1 && res.status == 1) {
  //     showMessage({
  //       message: 'Thông báo',
  //       description: 'Xóa bài thành công',
  //       type: 'success',
  //       duration: 1500,
  //       icon: 'success',
  //     });
  //     this.setState({
  //       thanhcong: true,
  //     });
  //     this.xoathanhcong();
  //     await ROOTGlobal.GetDsAllBaiDang();
  //   } else {
  //     showMessage({
  //       message: 'Thông báo',
  //       description: 'Xóa bài thất bại',
  //       type: 'danger',
  //       duration: 1500,
  //       icon: 'danger',
  //     });
  //     this.setState({
  //       thanhcong: false,
  //     });
  //     this.change();
  //   }
  // };

  Xoa_Cmt = async () => {
    let res_like = await DeleteComment_Like(this.state.Idcmt);
    // console.log('res detele like cmt', res_like);
    let res = await DeleteComment(this.state.Idcmt);
    // console.log('res delete cmt', res);
    if (res_like.status == 1 && res.status == 1) {
      //   Utils.goscreen(this, 'ScreenDetailBaiDang');
      // Utils.goback(this);
      // await ROOTGlobal.GetChiTietBaiDang();
      // await ROOTGlobal.GanDataChitiet();
      this.change();
    }
  };

  NhanThongTin = async () => {
    const {Detail_Cmt = {}} = this.props.route.params;
    // console.log('Detail_Cmt modal', Detail_Cmt);
    let user = Detail_Cmt ? Detail_Cmt.User_comment[0] : {};

    await this.setState({
      //   idBaiDang: Detail_Cmt ? Detail_Cmt.Id_BaiDang : null,
      id_NguoiDang: user ? user.ID_user : null,
      Idcmt: Detail_Cmt.id_cmt,
    });
  };

  componentDidMount() {
    this._getThongTin();
    this.NhanThongTin();
  }

  render() {
    const {display} = this.state;
    const {Detail_Cmt = {}} = this.props.route.params;
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
                  <View style={{marginTop: 5, height: FontSize.scale(150)}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                      }}>
                      <Image source={answer} style={styles.image_st}></Image>
                      <Text style={{fontSize: 20}}>Trả lời</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                      }}
                      onPress={() => {
                        Utils.goscreen(this, 'PopUpModal_SuaCMT_ThongBao', {
                          id_nguoidang: Detail_Cmt,
                        });
                        this.setState({
                          display: !this.state.display,
                        });
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
                        this.Xoa_Cmt();
                      }}>
                      <Image source={delet} style={styles.image_st}></Image>
                      <Text style={{fontSize: 20}}>Xóa</Text>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <View style={{marginTop: 5, height: FontSize.scale(150)}}>
                    <TouchableOpacity
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        padding: 5,
                      }}>
                      <Image source={answer} style={styles.image_st}></Image>
                      <Text style={{fontSize: 20}}>Trả lời</Text>
                    </TouchableOpacity>
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
