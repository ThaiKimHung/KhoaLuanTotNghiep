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
  FlatList,
} from 'react-native';
// import ModalComponent from '../components/ModalComponent';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';
import Utils from '../apis/Utils';
import {AddLike, AddThongBao, BanThongBao} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {ROOTGlobal} from '../apis/dataGlobal';
export default class ModalLike_Detail_ThongBao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      DSLike: [],
      idbaidang: '',
    };
    // this.DSLike = [];
    this.idbaidang = '';
  }
  change() {
    this.setState({
      display: !this.state.display,
    });
    // this.props.navigation.goBack();
    Utils.goback(this, '');
  }
  // _GetDSLike = async () => {
  //   let res = await GetDSLike();
  //   console.log('ress ds like', res);
  //   if (res.status == 1) {
  //     this.setState({
  //       DSLike: res.Data,
  //     });
  //   }
  // };

  _BanThongBao = async () => {
    let res = await BanThongBao();
  };
  _AddThongBao_Like = async () => {
    let strBody = JSON.stringify({
      title: 'Đã tương tác một bài viết',
      create_tb_by: await Utils.ngetStorage(nkey.id_user),
    });

    // console.log('strBody add Thông báo', strBody);
    let res = await AddThongBao(strBody);
    await this._BanThongBao();
    // console.log('res add thông báo', res);
  };

  TaoLike = async (idlike) => {
    let res = await AddLike(
      this.state.idbaidang,
      idlike,
      await Utils.ngetStorage(nkey.id_user),
    );
    // console.log('ress add like', res);
    if (res.status == 1) {
      Utils.goscreen(this, 'ScreenDetailBaiDang_ThongBao');
      await ROOTGlobal.GetChiTietBaiDang();
      await ROOTGlobal.GanDataChitiet();
      await this._AddThongBao_Like();
    }
  };
  GanDSLike = async () => {
    // console.log(
    //   'danh sách like lưu ở global key ',
    //   await Utils.getGlobal(nGlobalKeys.DanhSachLike),
    // );
    if (await Utils.getGlobal(nGlobalKeys.DanhSachLike)) {
      this.setState({
        DSLike: await Utils.getGlobal(nGlobalKeys.DanhSachLike),
      });
    }
  };

  GanData = async () => {
    // let id_nguoidang = this.props.route.params.id_nguoidang.route.params
    //   .id_nguoidang;
    // this.idbaidang = id_nguoidang.Id_BaiDang;
    this.setState({
      idbaidang: await Utils.getGlobal(nGlobalKeys.idbaidang),
    });
    // this.iduser = await Utils.ngetStorage(nkey.id_user);
    // console.log('item nhan liek', id_nguoidang);
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{paddingHorizontal: 5, paddingVertical: 5}}
        onPress={() => {
          this.TaoLike(item.ID_like);
        }}>
        <SvgUri
          width={FontSize.scale(25)}
          height={FontSize.verticalScale(25)}
          source={{
            uri: item.link_icon_like,
          }}
        />
      </TouchableOpacity>
    );
  };

  async componentDidMount() {
    // await this._GetDSLike();
    await this.GanDSLike();
    await this.GanData();
  }

  render() {
    const {display} = this.state;
    // const id_nguoidang = this.props.route.params.id_nguoidang.route.params
    //   .id_nguoidang;
    // console.log('id nguoi dang', id_nguoidang);
    // console.log(
    //   'this modal like',
    //   this.props.route.params.id_nguoidang.route.params.id_nguoidang,
    // );
    return (
      <View style={styles.container}>
        <Modal animationType="slide" visible={display} transparent={true}>
          <TouchableOpacity
            onPress={() => this.change()}
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <TouchableWithoutFeedback>
              <View
                style={{
                  height: FontSize.scale(38),
                  //   width: '50%',
                  backgroundColor: 'white',
                  justifyContent: 'center',
                  borderRadius: 10,
                }}>
                <View
                  style={{flex: 1, backgroundColor: 'blue', borderRadius: 10}}>
                  <FlatList
                    // data={this.DSLike ? this.DSLike : this.GanDSLike()}
                    data={this.state.DSLike}
                    renderItem={this._renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    horizontal={true}
                  />
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
});
