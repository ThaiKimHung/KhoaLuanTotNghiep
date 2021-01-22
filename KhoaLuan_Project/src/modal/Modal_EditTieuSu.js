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
  Image,
  TextInput,
} from 'react-native';
// import ModalComponent from '../components/ModalComponent';
import Utils from '../apis/Utils';
const logo = require('../assets/images/Jeelogo.png');
const disconnected = require('../assets/images/disconected.png');
import FontSize from '../components/size';
import {ROOTGlobal} from '../apis/dataGlobal';
import {showMessage, hideMessage} from 'react-native-flash-message';
import {
  getTrangCaNhan,
  getDSBaiDangTrangCaNhan,
  UpdateTrangCaNhan,
} from '../apis/apiUser';

export default class Modal_EditTieuSu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      texttieusu: '',
      idcanhan: '',
      idusser: '',
    };
  }

  _UpdateTrangCaNhan = async () => {
    let strBody = JSON.stringify({
      id_canhan: this.state.idcanhan,
      id_user: this.state.idusser,
      anhbia: '',
      tieusu: this.state.texttieusu,
    });
    let res = await UpdateTrangCaNhan(strBody);
    console.log('res updaet', res);
    if (res.status == 1) {
      showMessage({
        message: 'Thông báo',
        description: 'Cập nhật thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
      await this.change();
      await ROOTGlobal.GetUserTrangCaNhan();
      await ROOTGlobal.GetDSBaiDang_CaNhan();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Cập nhật thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
    }
  };

  change() {
    this.setState({
      display: !this.state.display,
    });
    // this.props.navigation.goBack();
    Utils.goback(this, '');
  }

  ganData = async () => {
    const {id_nguoidang = {}} = this.props.route.params;
    this.setState({
      texttieusu: id_nguoidang.tieusu,
      idcanhan: id_nguoidang.id_canhan,
      idusser: id_nguoidang.Id_user,
    });
  };

  handleTieude = (text) => {
    this.setState({
      texttieusu: text,
    });
  };

  componentDidMount = async () => {
    await this.ganData();
  };

  render() {
    const {display} = this.state;

    // const {id_nguoidang = {}} = this.props.route.params;
    // console.log(' this', id_nguoidang);
    return (
      <View style={styles.container}>
        <Modal animationType="slide" visible={display} transparent={true}>
          <TouchableOpacity
            onPress={() => this.change()}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  // height: '40%',
                  width: '60%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={{fontSize: 15, fontWeight: 'bold'}}>
                  Chỉnh sửa tiếu sử
                </Text>
                <View
                  style={{
                    backgroundColor: '#DDDDDD80',
                    borderRadius: 20,
                    marginBottom: 10,
                    marginTop: 10,
                    padding: 5,
                  }}>
                  <TextInput
                    multiline={true}
                    placeholder="Chỉnh sửa tiểu sử"
                    style={{fontSize: FontSize.reSize(20)}}
                    onChangeText={(text) => this.handleTieude(text)}
                    value={this.state.texttieusu}></TextInput>
                </View>
                <TouchableOpacity
                  onPress={() => this._UpdateTrangCaNhan()}
                  style={{
                    backgroundColor: '#007DE3',
                    height: FontSize.scale(30),
                    width: FontSize.verticalScale(60),
                    justifyContent: 'center',
                    alignItems: 'center',
                    marginBottom: 5,
                    borderRadius: 20,
                  }}>
                  <Text>Sửa</Text>
                </TouchableOpacity>
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
    flex: 1,
    backgroundColor: '#C0C0C020',
  },
});
