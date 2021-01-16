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
  TextInput,
} from 'react-native';
// import ModalComponent from '../components/ModalComponent';

import FontSize from '../components/size';
import {Update_CMT} from '../apis/apiUser';
import FlashMessage, {showMessage} from 'react-native-flash-message';
import Utils from '../apis/Utils';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import AsyncStorage from '@react-native-community/async-storage';
// import {useRoute} from '@react-navigation/native';
import {ROOTGlobal} from '../apis/dataGlobal';
const logo = require('../assets/images/Jeelogo.png');

const deviceHeight = Dimensions.get('window').height;
export default class PopUpModal_SuaCMT extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      noidung_cmt: '',
      id_cmt: '',
      id_baidang: '',
    };
  }
  change() {
    this.setState({
      display: !this.state.display,
    });
    // this.props.navigation.goBack();
    Utils.goscreen(this, 'ScreenDetailBaiDang');
  }
  handleNoiDung_CMT(text) {
    this.setState({
      noidung_cmt: text,
    });
  }
  GanData = async () => {
    const {id_nguoidang = {}} = this.props.route.params;
    // await console.log('id nguoi dang', id_nguoidang);
    this.setState({
      id_baidang: id_nguoidang.Id_BaiDang,
      id_cmt: id_nguoidang.id_cmt,
      noidung_cmt: id_nguoidang.NoiDung_cmt,
    });
    // await console.log('id bai dang', this.state.id_baidang);
    // await console.log('id cmt', this.state.id_cmt);
    // await console.log('noi dung cmt', this.state.noidung_cmt);
  };
  Sua_Cmt = async () => {
    let id_user = await Utils.ngetStorage(nkey.id_user);

    let strBody = JSON.stringify({
      id_cmt: this.state.id_cmt,
      ID_BaiDang: this.state.id_baidang,
      NoiDung_cmt: this.state.noidung_cmt,
      id_cmt_parent: 0,
      typepost: '',
      // CreatedDate: null,
      CreatedBy: 0,
      // UpdatedDate: null,
      UpdatedBy: id_user,
    });
    // console.log('strBody cmt', strBody);
    let res = await Update_CMT(strBody);
    // console.log('res cmt', res);

    if (res.status == 1) {
      showMessage({
        message: 'Thông báo',
        description: 'Sửa bình luận thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      this.change();
      await ROOTGlobal.GetChiTietBaiDang();
      await ROOTGlobal.GanDataChitiet();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Sửa bình luận thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
      // await ROOTGlobal.GetChiTietBaiDang();
      // await ROOTGlobal.GanDataChitiet();
    }
  };
  componentDidMount = async () => {
    await this.GanData();
  };

  render() {
    const {display} = this.state;
    // console.log('this sửa cmt', this.props.route.params.id_nguoidang);
    return (
      <View style={styles.container}>
        <Modal animationType="slide" visible={display} transparent={true}>
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
                <View
                  style={{
                    marginTop: 5,
                    // alignItems: 'center',
                    height: FontSize.Height(50),
                  }}>
                  <View style={styles.khung_tieude}>
                    <TextInput
                      multiline={true}
                      placeholder="Mời bạn nhập bình luận"
                      style={{
                        fontSize: FontSize.reSize(20),
                        maxHeight: FontSize.scale(150),
                      }}
                      onChangeText={(text) => this.handleNoiDung_CMT(text)}
                      value={this.state.noidung_cmt}></TextInput>
                  </View>

                  <View
                    style={{
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <TouchableOpacity
                      style={{
                        backgroundColor: '#007DE3',
                        justifyContent: 'center',
                        width: FontSize.verticalScale(100),
                        height: FontSize.scale(35),
                        alignItems: 'center',
                        borderRadius: 10,
                      }}
                      onPress={() => this.Sua_Cmt()}>
                      <Text style={{fontSize: 20}}>Sửa</Text>
                    </TouchableOpacity>
                  </View>
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
  container: {
    // flex: 1,
    // backgroundColor: '#C0C0C020',
  },
  khung_tieude: {
    // height: FontSize.scale(40),
    backgroundColor: '#DDDDDD80',
    borderRadius: 20,
    marginBottom: 10,
    marginTop: 10,
    padding: 5,
  },
});
