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
  AddComment,
  AddComment_Child,
  GetChiTietBaiDang,
  AddLike,
  DeleteBaiDang_Like,
  AddThongBao,
  BanThongBao,
  Comment_like,
  DeleteComment_Like,
  AddThongBao_Like,
  getDSThongDiepDetail,
  CountLuotXem,
  GetDSLuotXem,
} from '../apis/apiUser';
import {ROOTGlobal} from '../apis/dataGlobal';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {showMessage, hideMessage} from 'react-native-flash-message';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const avatar_mau = require('../assets/images/avatar.jpg');
const like = require('../assets/images/like.png');
const commnet = require('../assets/images/comment.png');
const daubacham = require('../assets/images/daubacham.png');
const thich = require('../assets/images/thich.png');
const binhluan = require('../assets/images/binhluan.png');
const send = require('../assets/images/send.png');
const welcome = require('../assets/images/welcome.png');
const arrow = require('../assets/images/right-arrow-black-triangle.png');
const noti = require('../assets/images/bell.png');
const sheld = require('../assets/images/shield.png');
const light = require('../assets/images/light-bulb.png');

const windowWidth = Dimensions.get('window').width;

export default class ScreenDetailBaiDang_CEO extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true,
      thich: false,
      text_Cmt: '',
      ChiTietBD: [],
      user: [],
      avatar_user: '',
      solike: 0,
      socmt: 0,
      dslike: {},
      username: '',
      dsLuotXem: '',
      title: '',
      noidung: '',
      day: '',
      khenthuong: '',
      thichcmt: '',
      hinh: '',
      image: '',
      // ngay: '',
      // time: '',
      idthongdiep: '',
      chucvu: '',
      iduser: '',
      creaetby: '',
      soluotxem: '',
    };
    this.idBaiDang = '';
    this.id_user = '';
    this.id_like = 1;
    ROOTGlobal.GetDSDetailThongDiep = this._GetChiTietBaiDang;
    // ROOTGlobal.GanDataChitiet_Nhom = this.GanData;
  }

  _GetChiTietBaiDang = async () => {
    let id_user = await Utils.ngetStorage(nkey.id_user);

    let res = await getDSThongDiepDetail(this.state.idthongdiep);
    // console.log('res chi tiết bài đăng', res);
    if (res.status == 1) {
      this.setState({
        ChiTietBD: res.Data,
        refresh: false,
      });
      // await console.log('chi tiết bd', this.state.ChiTietBD);
      // await console.log('chi user', this.state.ChiTietBD[0].User_DangBai);
      await this.GanData();
    } else {
      this.setState({
        refresh: true,
      });
    }
  };

  GanData = async () => {
    await this.setState({
      // user: await this.state.ChiTietBD[0].User_DangBai[0].ID_user,
      avatar_user: await this.state.ChiTietBD[0].Avatar,
      username: await this.state.ChiTietBD[0].hoten,
      // solike: await this.state.ChiTietBD[0].Like_BaiDang.length,
      // socmt: await this.state.ChiTietBD[0].Coment.length,
      // dslike: await this.state.ChiTietBD[0].Like,
      // dsCmt: await this.state.ChiTietBD[0].Coment,
      title: await this.state.ChiTietBD[0].title,
      noidung: await this.state.ChiTietBD[0].noidung,
      day: await this.state.ChiTietBD[0].createdate,
      // khenthuong: await this.state.ChiTietBD[0].KhenThuong,
      hinh: await this.state.ChiTietBD[0].media,
      image: await this.state.ChiTietBD[0].imgmedia,
      chucvu: await this.state.ChiTietBD[0].chucvu,
      creaetby: await this.state.ChiTietBD[0].create_by,
      // thichcmt: await this.state.ChiTietBD[0].Like_Comment,
    });
    // this.solike = this.state.ChiTietBD[0].Like_BaiDang.length;
    // await console.log('length', this.state.ChiTietBD[0].Coment.Comment_child);
    // await console.log('day', this.state.day);
    // await console.log('ngay', this.state.ngay);
    // await console.log('time', this.state.hinh);
    await this.setState({
      iduser: await Utils.ngetStorage(nkey.id_user),
    });
  };

  GetData = async () => {
    const {id_nguoidang = {}} = this.props.route.params;
    await this.setState({
      idthongdiep: id_nguoidang.id_thongdiep,
    });
  };

  EmptyListMessage = ({item}) => {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
          Chưa có dữ liệu.
        </Text>
        {/* <Text style={{color: '#696969'}}>Hãy là người đầu tiên bình luận.</Text> */}
      </View>
    );
  };

  _GetLuotXem = async () => {
    let res = await GetDSLuotXem(this.state.idthongdiep);
    // console.log('res lượt xem', res);
    if (res.status == 1) {
      this.setState({
        dsLuotXem: res.Data,
      });
    }
  };

  DemLuotXem = async () => {
    let res = await CountLuotXem(this.state.idthongdiep);
    // console.log('số lượt xem', res.Data[0].luotxem);
    if (res.status == 1) {
      this.setState({
        soluotxem: res.Data[0].luotxem,
      });
    }
  };

  _renderItem = ({item, index}) => {
    // console.log('item', item);
    let user = item.User_Xem ? item.User_Xem[0] : '';
    // console.log('user', user);
    return (
      <View style={{padding: 5}}>
        <Image
          style={{
            height: FontSize.scale(40),
            width: FontSize.verticalScale(40),
            borderRadius: 30,
          }}
          source={user.Avatar ? {uri: user.Avatar} : avatar_mau}></Image>
        {/* <Image
          source={avatar_mau}
          style={{
            height: FontSize.scale(40),
            width: FontSize.verticalScale(40),
            borderRadius: 30,
          }}></Image> */}
        <Text></Text>
      </View>
    );
  };

  async componentDidMount() {
    await this.GetData();
    await this._GetChiTietBaiDang();
    await this.DemLuotXem();
    await this._GetLuotXem();
    // await this.GanData();
    // await this.hamloadLienTuc();
    // console.log()
  }

  render() {
    // console.log('this detail', this.props);
    const {id_nguoidang = {}} = this.props.route.params;
    this.idBaiDang = id_nguoidang.Id_BaiDang;
    // let day = id_nguoidang.CreatedDate;
    let ngay = this.state.day.substring(0, 10);
    let time = this.state.day.substring(11, 16);
    let group = id_nguoidang.Group ? id_nguoidang.Group[0] : {};
    // console.log('this detail', id_nguoidang);
    let avatar = id_nguoidang.Avatar;

    return (
      <View style={styles.container}>
        <GoBack
          name=""
          onPress={async () => {
            Utils.goscreen(this, 'BaiDang_CEO');
            await ROOTGlobal.GetDSBThongDiep();
          }}></GoBack>
        {/* khung chứa avata và khung text input*/}

        <View>
          <View style={styles.header}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
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
                  soure={
                    this.state.avatar_user
                      ? {
                          uri: this.state.avatar_user,
                        }
                      : avatar_mau
                  }></Image>
              </View>

              <View style={styles.khung_tenUser}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={styles.txt_TenUser}>{this.state.username}</Text>
                  <Text>{this.state.chucvu}</Text>
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    marginHorizontal: 5,
                    marginTop: -2,
                  }}>
                  <Text style={{marginRight: 2}}>
                    {moment(ngay, 'YYYY-MM-DD').format('DD-MM-YYYY')}
                  </Text>
                  <Text>{time}</Text>
                </View>
              </View>
            </TouchableOpacity>

            {this.state.creaetby == this.state.iduser ? (
              <TouchableOpacity
                style={styles.khung_daubacham}
                onPress={() => {
                  Utils.goscreen(
                    this,
                    'PopUpModal_XoaSua_Detail_ThongDiep_CEO',
                    {
                      id_nguoidang: this.state.ChiTietBD,
                    },
                  );
                }}>
                <Image style={styles.imageLike_Commnet} source={daubacham} />
              </TouchableOpacity>
            ) : null}
          </View>

          <View style={styles.footer}>
            <Text>{this.state.title}</Text>
            <Text>{this.state.noidung}</Text>
            {this.state.hinh ? (
              <View style={{marginVertical: 5}}>
                <Image
                  source={{uri: this.state.image}}
                  style={{
                    height: FontSize.scale(200),
                    width: '100%',
                    backgroundColor: 'blue',
                  }}></Image>
              </View>
            ) : null}
          </View>
        </View>

        <View style={{marginLeft: 5}}>
          <Text>Số lượt xem: {this.state.soluotxem}</Text>
        </View>

        <View style={styles.khung_CmtTong}>
          <FlatList
            data={this.state.dsLuotXem}
            renderItem={this._renderItem}
            horizontal={true}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refresh}
            onRefresh={() => {
              this.setState({refresh: true}, this._GetChiTietBaiDang);
            }}
            ListEmptyComponent={this.EmptyListMessage}
          />
        </View>

        {/* <View style={{marginBottom: 5}}>
          <View style={styles.khungLike_Commnet}>
            {this.state.dslike ? (
              <TouchableOpacity
                style={styles.khung_Thich}
                onLongPress={async (e) => {
                  Utils.goscreen(this, 'ModalLike_Detail_Nhom_Go', {
                    id_nguoidang: this.props,
                    x: e.nativeEvent.pageX,
                    y: e.nativeEvent.pageY,
                  });
                }}
                onPress={() => {
                  this.DeleteLike(this.idBaiDang);
                }}>
                <SvgUri
                  width={FontSize.scale(20)}
                  height={FontSize.verticalScale(20)}
                  source={{
                    uri: this.state.dslike.icon,
                  }}
                />
                <Text
                  style={{
                    marginLeft: FontSize.reSize(5),
                    textAlign: 'center',
                    color: '#007DE3',
                  }}>
                  {this.state.dslike.title} ({this.state.solike})
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.khung_Thich}
                onLongPress={async (e) => {
                  Utils.goscreen(this, 'ModalLike_Detail_Nhom_Go', {
                    id_nguoidang: this.props,
                    x: e.nativeEvent.pageX,
                    y: e.nativeEvent.pageY,
                  });
                }}
                onPress={async () => {
                  this.TaoLike(
                    this.idBaiDang,
                    this.id_like,
                    await Utils.ngetStorage(nkey.id_user),
                  );
                  this._AddThongBao_LikeBaiDang(this.idBaiDang);
                }}>
                <Image style={styles.imageLike_Commnet1} source={thich} />
                <Text
                  style={{
                    marginLeft: FontSize.reSize(5),
                    textAlign: 'center',
                    color: '#696969',
                  }}>
                  Like ({this.state.solike})
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity style={styles.khung_BinhLuan}>
              <Image style={styles.imageLike_Commnet} source={binhluan} />
              <Text
                style={{
                  marginLeft: FontSize.reSize(5),
                  textAlign: 'center',
                  color: '#696969',
                }}>
                Bình luận ({this.state.socmt})
              </Text>
            </TouchableOpacity>
          </View>
        </View> */}

        {/* <View
          style={{
            // flex: 1,
            // justifyContent: 'flex-end',
            position: 'absolute',
            bottom: 0,
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
              onPress={() => this.DangCmt()}>
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
        </View> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'yellow',
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
  },
  footer: {
    margin: 5,
    paddingHorizontal: 10,
  },
  khung_tenUser: {
    flexDirection: 'column',
  },
  khung_tenUser_Cmt: {
    backgroundColor: '#C0C0C080',
    flex: 1,
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
    height: FontSize.scale(20),
    width: FontSize.verticalScale(20),
    // tintColor: '#696969',
  },
  imageLike_Commnet1: {
    height: FontSize.scale(20),
    width: FontSize.verticalScale(20),
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
    padding: 5,
    marginLeft: 5,
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
