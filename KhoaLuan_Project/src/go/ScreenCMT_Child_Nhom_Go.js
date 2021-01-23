import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Platform,
  StyleSheet,
  StatusBar,
  Alert,
  SafeAreaView,
  Dimensions,
  Image,
  ImageBackground,
  FlatList,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import FontSize from '../components/size';
import GoBack from '../components/GoBack';
import DanhSachLike from '../components/DanhSachLike';
import Utils from '../apis/Utils';

import SvgUri from 'react-native-svg-uri';
import {
  Update_CMT,
  AddComment_Child,
  GetDSCommnet,
  AddThongBao,
  BanThongBao,
  Comment_like,
  DeleteComment_Like,
  AddThongBao_Like,
} from '../apis/apiUser';
import {ROOTGlobal} from '../apis/dataGlobal';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {showMessage, hideMessage} from 'react-native-flash-message';
import moment from 'moment';

const avatar_mau = require('../assets/images/avatar.jpg');

const like = require('../assets/images/like.png');
const commnet = require('../assets/images/comment.png');
const daubacham = require('../assets/images/daubacham.png');
const thich = require('../assets/images/thich.png');
const binhluan = require('../assets/images/binhluan.png');
const send = require('../assets/images/send.png');
const welcome = require('../assets/images/welcome.png');
const arrow = require('../assets/images/right-arrow-black-triangle.png');
const windowWidth = Dimensions.get('window').width;

export default class ScreenCMT_Child_Nhom_Go extends React.Component {
  constructor(props) {
    super(props);
    this.item = Utils.ngetParam(this, 'id_nguoidang');
    this.index = Utils.ngetParam(this, 'index');
    this.state = {
      refresh: true,
      dsCmt: '',
      avatar_cmtlong: '',
      id_cmtlon: '',
      id_baidang: '',
      username_cmtlon: '',
      noidung_cmtlon: '',
      text_Cmt: '',
      dsCmt_Child: '',
      hi: [],
      like: '',
      likecmt: '',
    };
    this.inter = 0;
    ROOTGlobal.GetDSCmt_Child_Nhom = this._GetDsCmt;
  }

  EmptyListMessage = ({item}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
          Chưa có bình luận nào.
        </Text>
        <Text style={{color: '#696969'}}>Hãy là người đầu tiên bình luận.</Text>
      </View>
    );
  };
  NhanData_Child = async () => {
    const {id_nguoidang = {}} = this.props.route.params;
    // console.log('idn guoi dang', id_nguoidang);
    this.setState({
      avatar_cmtlong: id_nguoidang.User_comment[0].avatar,
      username_cmtlon: id_nguoidang.User_comment[0].Username,
      noidung_cmtlon: id_nguoidang.NoiDung_cmt,
      id_baidang: id_nguoidang.Id_BaiDang,
      id_cmtlon: id_nguoidang.id_cmt,
      like: id_nguoidang.Like,
      likecmt: id_nguoidang.Like_Comment ? id_nguoidang.Like_Comment[0] : '',
    });
  };

  hamloadLienTuc = () => {
    this.inter = setInterval(async () => {
      await this._GetDsCmt();
      // console.log('hi');
    }, 5000);
  };

  hamclearInterval = () => {
    clearInterval(this.inter);
  };

  _GetDsCmt = async () => {
    let id_user = await Utils.ngetStorage(nkey.id_user);
    let res = await GetDSCommnet(id_user, this.state.id_baidang);

    const {Comment_child = []} = res.data;
    const arrNew = [];
    for (let index = 0; index < Comment_child.length; index++) {
      const element = Comment_child[index];
      arrNew = Comment_child.filter(
        (item) => item.id_cmt == element.id_comment_parent,
      );
    }

    if (res.status == 1) {
      this.setState({
        dsCmt: res.data,
        refresh: false,
      });
      await this.setState({
        dsCmt_Child: this.state.dsCmt.map((e) => e.Comment_child),
      });
    } else {
      this.setState({
        refresh: false,
      });
    }
  };

  _BanThongBao = async () => {
    let res = await BanThongBao();
  };

  _AddThongBao = async () => {
    let strBody = JSON.stringify({
      title: 'Đã trả lời bình luận của bạn :',
      create_tb_by: await Utils.ngetStorage(nkey.id_user),
    });

    // console.log('strBody add Thông báo', strBody);
    let res = await AddThongBao(await Utils.ngetStorage(nkey.id_user), strBody);
    await this._BanThongBao();
    // console.log('res add thông báo', res);
  };

  _AddCommentLike = async (idcmt) => {
    let res = await Comment_like(
      await idcmt,
      1,
      await Utils.ngetStorage(nkey.id_user),
    );
    await this._GetDsCmt();
    // await this._AddThongBao_LikeCMT();
    // await this.GanData();
    // console.log('res cmt like', res);
  };

  _DeleteCommentLike = async (idcmt) => {
    let res = await DeleteComment_Like(idcmt);
    // console.log('res dele like', res);
    await this._GetDsCmt();
    // await this.GanData();
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

  DangCmt_Child = async () => {
    let id_user = await Utils.ngetStorage(nkey.id_user);
    const today = new Date();
    const date =
      today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes();
    let strBody = JSON.stringify({
      ID_BaiDang: this.state.id_baidang,
      NoiDung_cmt: this.state.text_Cmt,
      id_cmt_parent: this.state.id_cmtlon,
      typepost: '',
      // CreatedDate: date + 'T' + time,
      CreatedBy: await Utils.ngetStorage(nkey.id_user),
      // UpdatedDate: date + 'T' + time,
      UpdatedBy: 0,
    });

    let res = await AddComment_Child(strBody);
    // console.log('res cmt', res);
    // console.log('strBody cmt', strBody);

    if (res.status == 1) {
      this.setState({
        text_Cmt: '',
      });
      await ROOTGlobal.GetChiTietBaiDang_Nhom_Go();
      // await ROOTGlobal.GanDataChitiet_Nhom();
      await this._GetDsCmt();
      await this._AddThongBao();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Bình luận thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
      await ROOTGlobal.GetChiTietBaiDang_Nhom_Go();
      // await ROOTGlobal.GanDataChitiet_Nhom();
    }
  };

  _onRefresh = () => {
    this.setState({refresh: true}, () => this._GetDsCmt());
  };

  _renderItem2 = ({item, index}) => {
    // console.log('item', item);
    let likecmt = item.Like_child;
    let like_comment = item.Like_Comment_child
      ? item.Like_Comment_child[0]
      : '';
    return (
      <View>
        <View style={{marginLeft: 10}}>
          <View style={styles.khung_TungCmt}>
            <View>
              <View
                style={{
                  marginLeft: 5,
                  borderRadius: 30,
                  height: FontSize.scale(30),
                  width: FontSize.verticalScale(30),
                }}>
                <Image
                  style={{
                    height: FontSize.scale(30),
                    width: FontSize.verticalScale(30),
                    borderRadius: 20,
                  }}
                  resizeMode="cover"
                  source={
                    item
                      ? {
                          uri: item.User_comment_child[0]?.avatar,
                        }
                      : avatar_mau
                  }></Image>
              </View>
            </View>
            <TouchableOpacity
              style={{flex: 1}}
              onLongPress={() => {
                // alert(5),
                Utils.goscreen(this, 'PopUpModal_CMT_Child_Nhom_Go', {
                  Detail_Cmt: item,
                });
              }}>
              <View style={styles.khung_tenUser_Cmt}>
                <Text style={styles.txt_TenUser_Cmt}>
                  {item.User_comment_child[0].Username}
                </Text>
                <Text style={{marginLeft: 15, marginBottom: 5}}>
                  {item.NoiDung_cmt}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 70,
            }}>
            {likecmt ? (
              <TouchableOpacity
                onLongPress={async (e) => {
                  Utils.goscreen(this, 'ModalLike_CMT_Child_Nhom', {
                    id_nguoidang: item,
                    x: e.nativeEvent.pageX,
                    y: e.nativeEvent.pageY,
                  });
                }}
                onPress={() => this._DeleteCommentLike(item.id_cmt)}>
                <Text style={{marginLeft: 10, color: '#007DE3'}}>
                  {likecmt.title}
                  {/* ({like_comment.tong}) */}
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onLongPress={async (e) => {
                  Utils.goscreen(this, 'ModalLike_CMT_Child_Nhom', {
                    id_nguoidang: item,
                    x: e.nativeEvent.pageX,
                    y: e.nativeEvent.pageY,
                  });
                }}
                onPress={() => {
                  this._AddCommentLike(item.id_cmt);
                  this._AddThongBao_LikeCMT(item.id_cmt);
                }}>
                <Text style={{marginLeft: 10, color: 'black'}}>Thích</Text>
              </TouchableOpacity>
            )}
          </View>
        </View>
      </View>
    );
  };

  componentDidMount = async () => {
    await this.NhanData_Child();
    // (await this.DSCMT_Child();
    await this._GetDsCmt();
    await this.hamloadLienTuc();
  };

  render() {
    return (
      <View style={styles.container}>
        <GoBack
          name=""
          onPress={async () => {
            Utils.goscreen(this, 'ScreenDetailBaiDang_Nhom_Go');
            await ROOTGlobal.GetChiTietBaiDang_Nhom();
            await ROOTGlobal.GanDataChitiet_Nhom();
            await this.hamclearInterval();
          }}></GoBack>
        <View style={styles.header}>
          <View style={styles.khung_TungCmt}>
            <TouchableOpacity>
              <View
                style={{
                  marginLeft: 5,
                  borderRadius: 30,
                  height: FontSize.scale(30),
                  width: FontSize.verticalScale(30),
                }}>
                <Image
                  style={{
                    height: FontSize.scale(30),
                    width: FontSize.verticalScale(30),
                    borderRadius: 20,
                  }}
                  resizeMode="cover"
                  source={
                    this.state.avatar_cmtlong
                      ? {uri: this.state.avatar_cmtlong}
                      : avatar_mau
                  }></Image>
              </View>
            </TouchableOpacity>
            <View
              style={{
                // flex: 1,
                width: FontSize.verticalScale(290),
              }}>
              <TouchableOpacity style={styles.khung_tenUser_Cmt}>
                <Text style={styles.txt_TenUser_Cmt}>
                  {this.state.username_cmtlon ? this.state.username_cmtlon : ''}
                </Text>
                <Text style={{marginLeft: 15, marginBottom: 5}}>
                  {this.state.noidung_cmtlon ? this.state.noidung_cmtlon : ''}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              marginHorizontal: 70,
            }}>
            {this.state.like ? (
              <View
              // onPress={() => this._DeleteCommentLike(this.state.id_cmtlon)}
              >
                <Text style={{marginLeft: 10, color: '#007DE3'}}>
                  {this.state.like.title}
                  {/* ({this.state.likecmt ? this.state.likecmt.tong : ''}) */}
                </Text>
              </View>
            ) : (
              <View
              // onPress={() => this._AddCommentLike(this.state.id_cmtlon)}
              >
                <Text style={{marginLeft: 10, color: 'black'}}>Thích</Text>
              </View>
            )}
          </View>
        </View>
        <View style={styles.footer}>
          <FlatList
            data={this.state.dsCmt_Child[this.index]}
            renderItem={this._renderItem2}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refresh}
            onRefresh={this._onRefresh}
            ListEmptyComponent={this.EmptyListMessage}
          />
        </View>
        <View
          style={{
            justifyContent: 'flex-end',
            flexDirection: 'row',
            alignItems: 'center',
            marginLeft: 5,
          }}>
          <TextInput
            placeholder="Nhập nội dung cmt"
            autoFocus={true}
            style={{
              margin: 5,
              backgroundColor: '#C0C0C0',
              borderRadius: 20,
              padding: 5,
              paddingLeft: 10,
              flex: 1,
              maxHeight: 150,
            }}
            multiline={true}
            value={this.state.text_Cmt}
            onChangeText={(text) =>
              this.setState({
                text_Cmt: text,
              })
            }></TextInput>

          {this.state.text_Cmt ? (
            <TouchableOpacity
              style={{
                marginRight: 5,
                height: FontSize.scale(30),
                width: FontSize.verticalScale(40),
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={() => this.DangCmt_Child()}>
              <Image
                source={send}
                style={{
                  height: FontSize.scale(28),
                  width: FontSize.verticalScale(28),
                  justifyContent: 'center',
                  // padding: 10,
                  // tintColor: '#007DE3',
                }}></Image>
            </TouchableOpacity>
          ) : (
            <View
              style={{
                marginRight: 5,
                height: FontSize.scale(30),
                width: FontSize.verticalScale(40),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                source={send}
                style={{
                  height: FontSize.scale(28),
                  width: FontSize.verticalScale(28),
                  justifyContent: 'center',
                  // padding: 10,
                  tintColor: '#696969',
                }}></Image>
            </View>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // flexDirection: 'row',
    padding: 5,
    // backgroundColor: 'yellow',
  },
  footer: {
    margin: 5,
    paddingHorizontal: 10,
    flex: 1,
    // backgroundColor: 'green',
  },
  khung_tenUser: {
    flexDirection: 'column',
  },
  khung_tenUser_Cmt: {
    backgroundColor: '#C0C0C080',
    // flex: 1,
    padding: 5,
    marginLeft: 5,
    borderRadius: 15,
  },
  khung_daubacham: {
    padding: 5,
  },
  txt_TenUser: {
    fontWeight: 'bold',
    fontSize: FontSize.reSize(20),
    margin: 5,
    justifyContent: 'center',
  },
  txt_TenUser_Cmt: {
    fontWeight: 'bold',
    fontSize: FontSize.reSize(20),
    marginLeft: 10,
    // textAlign: 'center',
  },

  footer1: {
    margin: 5,
    paddingHorizontal: 10,
    backgroundColor: '#1C86EE',
  },
  icon_bacham: {
    height: FontSize.scale(15),
    width: FontSize.verticalScale(15),
    // justifyContent: 'space-between',
  },
  khung_DemSoLike_Comt: {
    flexDirection: 'row',
    marginLeft: 5,
    // borderWidth: 1,
  },
  khung_DemSoLike: {
    flexDirection: 'row',
    padding: 3,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  khung_DemSoComment: {
    flexDirection: 'row',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLike_Commnet: {
    height: FontSize.scale(15),
    width: FontSize.verticalScale(15),
    tintColor: '#696969',
  },
  imageLike_Commnet1: {
    height: FontSize.scale(15),
    width: FontSize.verticalScale(15),
    // tintColor: '#007DE3',
  },
  khungLike_Commnet: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    flexDirection: 'row',
    padding: 5,
    borderColor: '#69696930',
  },
  khung_Thich: {
    flexDirection: 'row',
    padding: 3,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: 'yellow',
  },
  khung_BinhLuan: {
    flexDirection: 'row',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  khung_CmtTong: {
    flex: 1,
  },
  khung_TungCmt: {
    flexDirection: 'row',
    // padding: 5,
    // marginLeft: 5,
    alignItems: 'flex-start',
    // borderBottomWidth: 0.2,
    borderRadius: 10,
  },
  emptyListStyle: {
    textAlign: 'center',
    color: '#696969',
  },
  image: {
    // flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain',
    height: FontSize.scale(250),
    justifyContent: 'center',
    alignItems: 'center',
    // padding: 5,
    // tintColor: 'yellow',
    // marginBottom: -50,
  },
});
