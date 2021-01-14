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
  deleteGroup,
} from '../apis/apiUser';
import {showMessage} from 'react-native-flash-message';
import Utils from '../apis/Utils';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import AsyncStorage from '@react-native-community/async-storage';
// import {useRoute} from '@react-navigation/native';
import {ROOTGlobal} from '../apis/dataGlobal';
const deviceHeight = Dimensions.get('window').height;
const edite = require('../assets/images/edit.png');
const delet = require('../assets/images/delete.png');
const add_group = require('../assets/images/add-group.png');
const team = require('../assets/images/team.png');

export default class Modal_CaiDatNhom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      id_user: '',
      idgroup: '',
      id_NguoiDang: '',
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
    // this.props.navigation.goBack();
    Utils.goback(this, '');
  }

  NhanThongTin = async () => {
    const {id_nguoidang = {}} = this.props.route.params.id_nguoidang;
    // console.log('this modal xóa sửa', this.props);
    // console.log('id_nguoidang modal xóa sửa', id_nguoidang);
    // let user = id_nguoidang ? id_nguoidang.User_DangBai[0] : {};

    await this.setState({
      idgroup: await id_nguoidang.ID_group,
    });
  };

  _Delete_Group = async () => {
    let res = await deleteGroup(await this.state.idgroup);
    // console.log('res', res);
    if (res.status == 1) {
      await ROOTGlobal.GetDsNhom();
      await Utils.goscreen(this, 'NhomScreen');
      showMessage({
        message: 'Thông báo',
        description: 'Xóa nhóm thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
    } else {
      await ROOTGlobal.GetDsNhom();
      showMessage({
        message: 'Thông báo',
        description: 'Xóa nhóm thất bại.',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
    }
  };

  async componentDidMount() {
    await this._getThongTin();
    await this.NhanThongTin();
  }

  render() {
    const {display} = this.state;
    // console.log('this cài đặt nhóm', this.props);
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
                  borderTopLeftRadius: 10,
                  borderTopRightRadius: 10,
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
                      Utils.goscreen(this, 'ScreenThanhVienNhom', {
                        id_nguoidang: this.props.route.params,
                      })
                    }>
                    <Image source={team} style={styles.image_st}></Image>
                    <Text style={{fontSize: 20}}>Tất cả các thành viên</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      padding: 5,
                    }}
                    onPress={() =>
                      Utils.goscreen(this, 'ScreenThemThanhVienNhom', {
                        id_nguoidang: this.props.route.params,
                      })
                    }>
                    <Image source={add_group} style={styles.image_st}></Image>
                    <Text style={{fontSize: 20}}>Thêm thành viên</Text>
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
                        'Bạn Muốn Xóa Nhóm ?',
                        [
                          {text: 'Đồng Ý', onPress: () => this._Delete_Group()},
                          {
                            text: 'Hủy',
                            //   onPress: () => console.log('Cancel Pressed'),
                            style: 'cancel',
                          },
                        ],
                        {cancelable: false},
                      )
                    }>
                    <Image source={delet} style={styles.image_st}></Image>
                    <Text style={{fontSize: 20}}>Xóa Nhóm</Text>
                  </TouchableOpacity>
                </View>
                {/* )} */}
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
