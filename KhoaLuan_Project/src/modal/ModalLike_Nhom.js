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
import {AddLike} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {ROOTGlobal} from '../apis/dataGlobal';
export default class ModalLike_Nhom extends Component {
  constructor(props) {
    super(props);
    this.state = {
      display: true,
      DSLike: [],
    };
    // this.DSLike = [];
    this.idbaidang = '';
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
  TaoLike = async (idbaidang, idlike, iduser) => {
    let res = await AddLike(idbaidang, idlike, iduser);
    console.log('ress add like', res);
    if (res.status == 1) {
      Utils.goscreen(this, 'ScreenBaiDangNhom');
      await ROOTGlobal.GetDsAllBaiDang_Nhom();
    }
  };
  GanDSLike = async () => {
    console.log('a like', await Utils.getGlobal(nGlobalKeys.DanhSachLike));
    if (await Utils.getGlobal(nGlobalKeys.DanhSachLike)) {
      this.setState({
        DSLike: await Utils.getGlobal(nGlobalKeys.DanhSachLike),
      });
    }
  };
  GanData = async () => {
    const {item = {}} = this.props.route.params.id_nguoidang;
    this.idbaidang = item.Id_BaiDang;
    this.iduser = await Utils.ngetStorage(nkey.id_user);
    console.log('item nhan liek', this.idbaidang);
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={{paddingHorizontal: 5, paddingVertical: 5}}
        onPress={() => {
          this.TaoLike(this.idbaidang, item.ID_like, this.iduser);
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
    console.log('this modal like', this.props);
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
