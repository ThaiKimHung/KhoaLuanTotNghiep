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
const add_group = require('../assets/images/add-group.png');
const team = require('../assets/images/team.png');

export default class Modal_CaiDatNhom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      id_user: '',
      idBaiDang: '',
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
    const {id_nguoidang = {}} = this.props.route.params;
    // console.log('this modal xóa sửa', this.props);
    // console.log('id_nguoidang modal xóa sửa', id_nguoidang);
    let user = id_nguoidang ? id_nguoidang.User_DangBai[0] : {};

    await this.setState({
      idBaiDang: id_nguoidang ? id_nguoidang.Id_BaiDang : null,
      id_NguoiDang: user ? user.ID_user : null,
    });
  };

  async componentDidMount() {
    await this._getThongTin();
    // await this.NhanThongTin();
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
