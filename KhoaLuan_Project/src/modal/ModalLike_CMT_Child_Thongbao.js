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
import {
  AddLike,
  AddThongBao,
  BanThongBao,
  Comment_like,
  AddThongBao_Like,
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {ROOTGlobal} from '../apis/dataGlobal';
export default class ModalLike_CMT_Child_Thongbao extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      DSLike: [],
    };
    // this.DSLike = [];
    this.idcmd = '';
    this.iduser = '';
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

  _AddThongBao_LikeCMT = async (idcmt) => {
    let strBody = JSON.stringify({
      title: 'Đã bày tỏ cảm xúc với một bình luận của bạn',
      create_tb_by: await Utils.ngetStorage(nkey.id_user),
    });

    // console.log('strBody add Thông báo like cmt', strBody);
    let res = await AddThongBao_Like(
      await Utils.ngetStorage(nkey.id_user),
      idcmt,
      0,
      strBody,
    );
    await this._BanThongBao();
    // console.log('res add thông báo like cmt', res);
  };

  _AddCommentLike = async (idcmt, idlike) => {
    let res = await Comment_like(
      await idcmt,
      idlike,
      await Utils.ngetStorage(nkey.id_user),
    );
    // console.log(res);
    if (res.status == 1) {
      // Utils.goscreen(this, 'ScreenDetailBaiDang');
      await ROOTGlobal.GetChiTietBaiDang_ThongBao();
      // await ROOTGlobal.GanDataChitiet();
      // await this._AddThongBao_Like();
      await this.change();
    }
    // await this._GetChiTietBaiDang();
    // await this.GanData();
    // await this._AddThongBao_Like();
    // console.log('res cmt like', res);
  };

  GanDSLike = async () => {
    // console.log('a like', await Utils.getGlobal(nGlobalKeys.DanhSachLike));
    if (await Utils.getGlobal(nGlobalKeys.DanhSachLike)) {
      this.setState({
        DSLike: await Utils.getGlobal(nGlobalKeys.DanhSachLike),
      });
    }
  };

  GanData = async () => {
    const {id_nguoidang = {}} = this.props.route.params;
    // console.log('this', this.props);
    this.idbcmt = await id_nguoidang.id_cmt;
    this.iduser = await Utils.ngetStorage(nkey.id_user);
    // console.log('item nhan ', id_nguoidang);
    // await console.log(this.idbcmt);
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{paddingHorizontal: 5, paddingVertical: 5}}
        onPress={async () => {
          await this._AddCommentLike(this.idbcmt, item.ID_like);
          await this._AddThongBao_LikeCMT(this.idbcmt);
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
