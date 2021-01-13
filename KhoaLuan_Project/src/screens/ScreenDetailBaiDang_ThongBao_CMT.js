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
  getDSComentViewDetail,
} from '../apis/apiUser';
import {ROOTGlobal} from '../apis/dataGlobal';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {showMessage, hideMessage} from 'react-native-flash-message';
import moment from 'moment';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

const avatar_mau = require('../assets/images/avatar.png');
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

export default class ScreenDetailBaiDang_ThongBao_CMT extends React.Component {
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
      dsCmt: [],
      title: '',
      noidung: '',
      day: '',
      group: '',
      idbaidang: '',
      idcmt: '',
      hinh: '',
      image: '',
    };
    // this.idBaiDang = '';
    // this.id_user = '';
    this.id_like = 1;
    ROOTGlobal.GetChiTietBaiDang_ThongBao = this._GetChiTietBaiDang;
    // ROOTGlobal.GanDataChitiet = this.GanData;
  }

  _BanThongBao = async () => {
    let res = await BanThongBao();
  };

  _AddThongBao = async () => {
    let strBody = JSON.stringify({
      title: 'Đã bình luận một bài viết',
      create_tb_by: await Utils.ngetStorage(nkey.id_user),
      id_cmt: 1,
    });

    // console.log('strBody add Thông báo', strBody);
    let res = await AddThongBao(await Utils.ngetStorage(nkey.id_user), strBody);
    await this._BanThongBao();
    // console.log('res add thông báo', res);
  };

  _AddThongBao_LikeBaiDang = async (idbaidang) => {
    let strBody = JSON.stringify({
      title: 'Đã bày tỏ cảm xúc một bài viết của bạn',
      create_tb_by: await Utils.ngetStorage(nkey.id_user),
    });

    // console.log('strBody add Thông báo like bài đăng', strBody);
    let res = await AddThongBao_Like(
      await Utils.ngetStorage(nkey.id_user),
      0,
      idbaidang,
      strBody,
    );
    await this._BanThongBao();
    // console.log('res add thông báo like bài đăng', res);
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

  _AddCommentLike = async (idcmt) => {
    let res = await Comment_like(
      await idcmt,
      1,
      await Utils.ngetStorage(nkey.id_user),
    );
    await this._GetChiTietBaiDang();
    await this.GanData();
    // await this._AddThongBao_LikeCMT();
    // console.log('res cmt like', res);
  };

  _DeleteCommentLike = async (idcmt) => {
    let res = await DeleteComment_Like(idcmt);
    // console.log('res dele like', res);
    await this._GetChiTietBaiDang();
    await this.GanData();
  };

  _GetChiTietBaiDang = async () => {
    // console.log('hi');
    let id_user = await Utils.ngetStorage(nkey.id_user);

    let res = await getDSComentViewDetail(id_user, this.state.idcmt);
    console.log('res chi tiết bài đăng', res);
    if (res.status == 1) {
      this.setState({
        ChiTietBD: res.data,
        refresh: false,
      });
      this.GanData();
      // await console.log('chi tiết bd', this.state.ChiTietBD);
      // await console.log('chi user', this.state.ChiTietBD[0].User_DangBai);
    } else {
      this.setState({
        refresh: false,
      });
    }
  };

  GanData = async () => {
    this.setState({
      user: await this.state.ChiTietBD[0].User_DangBai[0].ID_user,
      avatar_user: await this.state.ChiTietBD[0].User_DangBai[0].avatar,
      username: await this.state.ChiTietBD[0].User_DangBai[0].Username,
      solike: await this.state.ChiTietBD[0].Like_BaiDang.length,
      socmt: await this.state.ChiTietBD[0].Coment.length,
      dslike: await this.state.ChiTietBD[0].Like,
      dsCmt: await this.state.ChiTietBD[0].Coment,
      title: await this.state.ChiTietBD[0].title,
      noidung: await this.state.ChiTietBD[0].NoiDung,
      day: await this.state.ChiTietBD[0].CreatedDate,
      group: await this.state.ChiTietBD[0].Group,
      hinh: await this.state.ChiTietBD[0].hinhanh,
      image: await this.state.ChiTietBD[0].image,
      idbaidang: await this.state.ChiTietBD[0].Id_BaiDang,
      // title: await this.state.ChiTietBD[0].title,
      // thichcmt: await this.state.ChiTietBD[0].Like_Comment,
    });
    await Utils.setGlobal(nGlobalKeys.idbaidang, this.state.id_baidang);
    // this.solike = this.state.ChiTietBD[0].Like_BaiDang.length;
    // await console.log('length', this.state.ChiTietBD[0].Coment.Comment_child);
    // await console.log('day', this.state.day);
    await console.log('ngay', this.state.idbaidang);
    // await console.log('time', this.state.time);
  };

  DangCmt = async () => {
    let id_user = await Utils.ngetStorage(nkey.id_user);

    let strBody = JSON.stringify({
      ID_BaiDang: this.state.idbaidang,
      NoiDung_cmt: this.state.text_Cmt,
      typepost: '',
      // CreatedDate: date + 'T' + time,
      CreatedBy: id_user,
      UpdatedDate: '0',
      UpdatedBy: 0,
    });

    let res = await AddComment(strBody);
    // console.log('res cmt', res);
    // console.log('strBody cmt', strBody);

    if (res.status == 1) {
      this.setState({
        text_Cmt: '',
      });
      await this._AddThongBao();
      await this._GetChiTietBaiDang();
      await this.GanData();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Bình luận thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
      await this._GetChiTietBaiDang();
      await this.GanData();
    }
  };

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

  _renderItem = ({item, index}) => {
    let userCmt = item.User_comment ? item.User_comment[0] : '';
    let likecmt = item.Like;
    let like_comment = item.Like_Comment ? item.Like_Comment[0] : '';
    // console.log('length', item.Comment_child.length);
    return (
      <View>
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
                  userCmt.avatar ? {uri: userCmt.avatar} : avatar_mau
                }></Image>
            </View>
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.khung_tenUser_Cmt}
              onLongPress={() => {
                Utils.goscreen(this, 'PopUpModal_CMT_ThongBao_CMT', {
                  Detail_Cmt: item,
                });
              }}>
              <Text style={styles.txt_TenUser_Cmt}>{userCmt.Username}</Text>
              <Text style={{marginLeft: 15, marginBottom: 5}}>
                {item.NoiDung_cmt}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            marginHorizontal: 70,
          }}>
          {likecmt ? (
            <TouchableOpacity
              onLongPress={async () => {
                Utils.goscreen(this, 'ModalLike_CMT_Thongbao', {
                  id_nguoidang: item,
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
              onLongPress={async () => {
                Utils.goscreen(this, 'ModalLike_CMT_Thongbao', {
                  id_nguoidang: item,
                });
              }}
              onPress={async () => {
                await this._AddCommentLike(item.id_cmt);
                await this._AddThongBao_LikeCMT(item.id_cmt);
              }}>
              <Text style={{marginLeft: 10, color: 'black'}}>Thích</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity
            onPress={() =>
              Utils.goscreen(this, 'ScreenCMT_Child_ThongBao', {
                id_nguoidang: item,
                index: index.toString(),
              })
            }>
            <Text style={{marginLeft: 10}}>
              Trả lời ({item.Comment_child.length})
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  TaoLike = async (idlike) => {
    let res = await AddLike(
      this.state.idbaidang,
      idlike,
      await Utils.ngetStorage(nkey.id_user),
    );
    console.log('ress add like', res);
    if (res.status == 1) {
      await this._GetChiTietBaiDang();
      await this.GanData();
      // await this._AddThongBao_Like();
      // await ROOTGlobal.GetDsAllBaiDang();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Tương tác thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
      await this._GetChiTietBaiDang();
      await this.GanData();
    }
  };

  DeleteLike = async (idbaidang) => {
    let res = await DeleteBaiDang_Like(idbaidang);
    // console.log('ress xóa like', res);
    if (res.status == 1) {
      await this._GetChiTietBaiDang();
      await this.GanData();
      // await ROOTGlobal.GetDsAllBaiDang();
    } else {
      showMessage({
        message: 'Thông báo',
        description: 'Hủy tương tác thất bại',
        type: 'danger',
        duration: 1500,
        icon: 'danger',
      });
      await this._GetChiTietBaiDang();
      await this.GanData();
    }
  };

  nhanData = async () => {
    const {id_nguoidang = {}} = this.props.route.params;
    // await Utils.setGlobal(nGlobalKeys.idbaidang, id_nguoidang.id_baidang);
    // console.log('id bài đăng', id_nguoidang);
    // console.log('this', this.props.route.params);
    await this.setState({
      // idbaidang: await Utils.getGlobal(nGlobalKeys.idbaidang),
      idcmt: id_nguoidang.id_cmt,
    });
  };

  loadNoiDung = () => {
    // console.log('this detail', this);
    const {id_nguoidang = {}} = this.props.route.params;
    // console.log('this ChiTietBaiDang screen Detail bài đăng', id_nguoidang);
    let user = id_nguoidang.User_DangBai ? id_nguoidang.User_DangBai[0] : {};
    // this.idBaiDang = id_nguoidang.Id_BaiDang;
    // this.id_user = user.ID_user;
    let idbaidang = id_nguoidang.Id_LoaiBaiDang;
    let khenthuong = id_nguoidang.KhenThuong ? id_nguoidang.KhenThuong[0] : {};
    switch (idbaidang) {
      case 1:
        return (
          <View style={styles.footer} onPress={this.props.onPress}>
            <View style={{flexDirection: 'row'}}>
              <Animatable.Image
                animation="pulse"
                iterationCount={10}
                direction="alternate-reverse"
                // easing="ease-out"s
                duration={5000}
                source={sheld}
                style={{
                  height: FontSize.scale(40),
                  width: FontSize.verticalScale(40),
                }}></Animatable.Image>
              <View style={{marginLeft: 10}}>
                <Text>{this.state.title}</Text>
                <Text style={{fontSize: FontSize.reSize(20)}}>
                  {this.state.noidung}
                </Text>
              </View>
            </View>
          </View>
        );
      case 2:
        return (
          <View
            style={{
              // backgroundColor: '#1C86EE',
              margin: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Animatable.View
              animation="wobble"
              iterationCount={10}
              direction="alternate-reverse"
              // easing="ease-out"s
              duration={20000}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: '#007DE3',
                paddingHorizontal: 10,
                paddingVertical: 5,
                marginBottom: 5,
                borderRadius: 15,
              }}>
              <SvgUri
                width={FontSize.scale(45)}
                height={FontSize.verticalScale(45)}
                source={{
                  uri: khenthuong.icon,
                }}
              />
              <Text style={{fontWeight: 'bold', fontSize: FontSize.reSize(25)}}>
                {khenthuong.tieude_kt}
              </Text>
            </Animatable.View>

            <TouchableOpacity
              style={{
                // margin: 5,
                // paddingHorizontal: 10,
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={this.props.onPress}>
              <View
                style={{
                  marginLeft: 5,
                  borderRadius: 30,
                  height: FontSize.scale(40),
                  width: FontSize.verticalScale(40),
                }}>
                <Image
                  style={{
                    height: FontSize.scale(40),
                    width: FontSize.verticalScale(40),
                    borderRadius: 30,
                  }}
                  resizeMode="cover"
                  source={
                    this.state.avatar_user
                      ? {
                          uri: this.state.avatar_user,
                        }
                      : avatar_mau
                  }></Image>
              </View>
              <Text>{this.state.title}</Text>
              <Text style={{fontSize: FontSize.reSize(20)}}>
                {this.state.noidung}
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <View style={styles.footer} onPress={this.props.onPress}>
            <View style={{flexDirection: 'row'}}>
              <Animatable.Image
                animation="pulse"
                iterationCount={10}
                direction="alternate-reverse"
                // easing="ease-out"s
                duration={5000}
                source={noti}
                style={{
                  height: FontSize.scale(40),
                  width: FontSize.verticalScale(40),
                }}></Animatable.Image>
              <View style={{marginLeft: 10}}>
                <Text>{this.state.title}</Text>
                <Text style={{fontSize: FontSize.reSize(20)}}>
                  {this.state.noidung}
                </Text>
              </View>
            </View>
            {/* {this.state.hinhanh ? (
              <View style={{marginVertical: 5}}>
                <Image
                  source={{uri: this.state.image}}
                  style={{
                    height: FontSize.scale(200),
                    width: '100%',
                    backgroundColor: 'blue',
                  }}></Image>
              </View>
            ) : null} */}
          </View>
        );
      case 4:
        return (
          <View style={styles.footer1}>
            <ImageBackground source={welcome} style={styles.image}>
              <View
                style={{
                  marginLeft: 5,
                  borderRadius: 30,
                  height: FontSize.scale(40),
                  width: FontSize.verticalScale(40),
                }}>
                <Image
                  style={{
                    height: FontSize.scale(40),
                    width: FontSize.verticalScale(40),
                    borderRadius: 30,
                  }}
                  resizeMode="cover"
                  source={
                    this.state.avatar_user
                      ? {
                          uri: this.state.avatar_user,
                        }
                      : avatar_mau
                  }></Image>
              </View>
              <Text>{this.state.title}</Text>
              <Text>{this.state.noidung}</Text>
            </ImageBackground>
          </View>
        );
      case 6:
        return (
          <View style={styles.footer}>
            <Text>{this.state.title}</Text>
            {/* <Text>{this.state.noidung}</Text> */}
            {this.state.hinhanh ? (
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
        );
      case 7:
        return (
          <View style={styles.footer} onPress={this.props.onPress}>
            <View style={{flexDirection: 'row'}}>
              <Animatable.Image
                animation="pulse"
                iterationCount={10}
                direction="alternate-reverse"
                // easing="ease-out"s
                duration={5000}
                source={light}
                style={{
                  height: FontSize.scale(40),
                  width: FontSize.verticalScale(40),
                }}></Animatable.Image>
              <View style={{marginLeft: 10}}>
                <Text>{this.state.title}</Text>
                <Text style={{fontSize: FontSize.reSize(20)}}>
                  {this.state.noidung}
                </Text>
              </View>
            </View>
            {this.state.hinhanh ? (
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
        );
      default:
        return (
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
        );
    }
  };

  async componentDidMount() {
    await this.nhanData();
    // await this.GetData();
    await this._GetChiTietBaiDang();
    // await this.GanData();
    // console.log()
    // await this.hamloadLienTuc();
  }

  render() {
    // console.log('this detail', this);
    // const {id_nguoidang = {}} = this.props.route.params;
    // console.log('this detail', id_nguoidang);
    // this.idBaiDang = id_nguoidang.Id_BaiDang;
    // let day = id_nguoidang.CreatedDate;
    let ngay = this.state.day.substring(0, 10);
    let time = this.state.day.substring(11, 16);
    let group = this.state.group ? this.state.group[0] : {};
    return (
      <View style={styles.container}>
        <GoBack
          name=""
          onPress={() => {
            Utils.goscreen(this, 'ScreenThongBao');
            ROOTGlobal.GetDsThongBao();
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
                <View style={{flexDirection: 'row'}}>
                  <Text style={styles.txt_TenUser}>{this.state.username}</Text>
                  {group ? (
                    <View
                      style={{
                        flexDirection: 'row',
                        // justifyContent: 'center',
                        alignItems: 'center',
                        marginLeft: 5,
                      }}>
                      <Image
                        source={arrow}
                        style={{
                          height: FontSize.scale(10),
                          width: FontSize.verticalScale(10),
                        }}></Image>
                      <TouchableOpacity style={{marginLeft: 5}}>
                        <Text style={{textAlign: 'center', fontWeight: 'bold'}}>
                          {group.ten_group}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  ) : null}
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

            <TouchableOpacity
              style={styles.khung_daubacham}
              onPress={() => {
                Utils.goscreen(this, 'PopUpModal_XoaSua_Detail_ThongBao', {
                  id_nguoidang: this.state.ChiTietBD,
                });
              }}>
              <Image style={styles.imageLike_Commnet} source={daubacham} />
            </TouchableOpacity>
          </View>

          {this.loadNoiDung()}
        </View>

        <View style={{marginBottom: 5}}>
          <View style={styles.khungLike_Commnet}>
            {this.state.dslike ? (
              <TouchableOpacity
                style={styles.khung_Thich}
                onLongPress={async () => {
                  Utils.goscreen(this, 'ModalLike_Detail_ThongBao', {
                    id_nguoidang: this.props,
                  });
                }}
                onPress={() => {
                  this.DeleteLike(this.state.idbaidang);
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
                onLongPress={async () => {
                  Utils.goscreen(this, 'ModalLike_Detail_ThongBao', {
                    id_nguoidang: this.props,
                  });
                }}
                onPress={async () => {
                  await this.TaoLike(this.id_like);
                  await this._AddThongBao_LikeBaiDang(this.state.idbaidang);
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
        </View>

        <View style={styles.khung_CmtTong}>
          <FlatList
            data={this.state.dsCmt}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refresh}
            onRefresh={() => {
              this.setState({refresh: true}, this._GetChiTietBaiDang);
            }}
            ListEmptyComponent={this.EmptyListMessage}
          />
        </View>

        <View
          style={{
            // flex: 1,
            justifyContent: 'flex-end',
            // position: 'absolute',
            // bottom: 0,
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
        </View>
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
