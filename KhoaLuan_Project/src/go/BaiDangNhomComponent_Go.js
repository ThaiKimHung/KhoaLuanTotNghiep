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
  TouchableWithoutFeedback,
  FlatList,
} from 'react-native';

// import DanhSachLike from './DanhSachLike';
// import ModalComponent from '../components/ModalComponent';

import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';
import * as Animatable from 'react-native-animatable';

import {ROOTGlobal} from '../apis/dataGlobal';
import {
  GetDSLike,
  AddLike,
  DeleteBaiDang_Like,
  AddThongBao,
  BanThongBao,
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const avatar = require('../assets/images/avatar.png');
const like = require('../assets/images/like.png');
const commnet = require('../assets/images/comment.png');
const daubacham = require('../assets/images/daubacham.png');
const thich = require('../assets/images/thich.png');
const binhluan = require('../assets/images/binhluan.png');
const welcome = require('../assets/images/welcome.png');
const noti = require('../assets/images/bell.png');
const sheld = require('../assets/images/shield.png');
const light = require('../assets/images/light-bulb.png');
const windowWidth = Dimensions.get('window').width;
const arrow = require('../assets/images/right-arrow-black-triangle.png');
import moment from 'moment';
import Utils from '../apis/Utils';

export default class BaiDangNhomComponent_Go extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thich: false,
      toolTipVisible: false,
      DaLike: [],
      DataChuyenVe: [],
      likeSelected: {},
    };
    this.id_like = 1;
    this.id_user = '';
    this.item = {};
    // ROOTGlobal.GetDsAllBaiDang_Nhom = this.GetDsAllBaiDang_Nhom;
  }
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

  TaoLike = async (idbaidang, idlike, iduser) => {
    let res = await AddLike(idbaidang, idlike, iduser);
    // console.log('ress add like', res);
    // this.setState({
    //   thich: !this.state.thich,
    // });
    await ROOTGlobal.getGo();
    await this._AddThongBao_Like();
  };

  DeleteLike = async (idbaidang) => {
    let res = await DeleteBaiDang_Like(idbaidang);
    // console.log('ress xóa like', res);
    await ROOTGlobal.getGo();
    // await this.GetDsAllBaiDang_Nhom;
  };

  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={{paddingHorizontal: 5}}>
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

  ChuyenData = async (item) => {
    // const {ds = {}} = item;
    // console.log('item', item);
    // console.log('ds', ds);
    Utils.goscreen(this.props.nthis.props.nthis, 'ScreenBaiDangNhom');
    await this.setState({
      DataChuyenVe: item,
    });
    this.GanDataSauKhiChuyenVe();
    // await console.log('data liek chuyeern veef', this.state.DataChuyenVe);
  };

  GanDataSauKhiChuyenVe = async () => {
    await this.setState({
      likeSelected: this.state.DataChuyenVe.ID_like,
    });

    // await console.log('data liek ', this.state.likeSelected);
  };

  loadNoiDung = () => {
    const {item = {}} = this.props;

    let user = item.User_DangBai ? item.User_DangBai[0] : {};
    let loaibaidang = item.Id_LoaiBaiDang;
    let khenthuong = item.KhenThuong ? item.KhenThuong[0] : {};

    switch (loaibaidang) {
      case 1:
        return (
          <View
            style={styles.footer}
            //  onPress={this.props.onPress}
          >
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
                <Text>{item.title}</Text>
                <Text style={{fontSize: FontSize.reSize(20)}}>
                  {item.NoiDung}
                </Text>
              </View>
            </View>
            {item.hinhanh ? (
              <View>
                <Image
                  source={{uri: item.image}}
                  style={{
                    height: FontSize.scale(200),
                    width: '100%',
                    backgroundColor: 'blue',
                  }}></Image>
              </View>
            ) : null}
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

            <View
              style={styles.footer1}
              // onPress={this.props.onPress}
            >
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
                  source={user.avatar ? {uri: user.avatar} : avatar}></Image>
              </View>
              <Text style={{fontSize: FontSize.reSize(30), fontWeight: 'bold'}}>
                {item.title}
              </Text>
              <Text style={{fontSize: FontSize.reSize(20)}}>
                {item.NoiDung}
              </Text>
            </View>
          </View>
        );
      case 3:
        return (
          <View
            style={styles.footer}
            // onPress={this.props.onPress}
          >
            <View style={{flexDirection: 'row'}}>
              <Animatable.Image
                animation="shake"
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
                <Text>{item.title}</Text>
                <Text style={{fontSize: FontSize.reSize(20)}}>
                  {item.NoiDung}
                </Text>
              </View>
            </View>
            {item.hinhanh ? (
              <View>
                <Image
                  source={{uri: item.image}}
                  style={{
                    height: FontSize.scale(200),
                    width: '100%',
                    backgroundColor: 'blue',
                  }}></Image>
              </View>
            ) : null}
          </View>
        );
      case 4:
        return (
          <View
            style={{
              backgroundColor: '#1C86EE',
              margin: 5,
            }}>
            <ImageBackground source={welcome} style={styles.image}>
              <View
                style={styles.footer1}
                // onPress={this.props.onPress}
              >
                <Text>{item.title}</Text>
                <Text style={{fontSize: FontSize.reSize(20)}}>
                  {item.NoiDung}
                </Text>
              </View>
            </ImageBackground>
          </View>
        );
      case 6:
        return (
          <View
            style={styles.footer}
            // onPress={this.props.onPress}
          >
            <Text>{item.title}</Text>

            {item.hinhanh ? (
              <View style={{marginVertical: 5}}>
                <Image
                  source={{uri: item.image}}
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
          <View
            style={styles.footer}
            // onPress={this.props.onPress}
          >
            <View style={{flexDirection: 'row'}}>
              <Animatable.Image
                animation="tada"
                iterationCount={10}
                direction="alternate-reverse"
                // easing="ease-out"s
                duration={5000}
                source={light}
                style={{
                  height: FontSize.scale(50),
                  width: FontSize.verticalScale(50),
                }}></Animatable.Image>
              <View>
                <Text>{item.title}</Text>
                <Text style={{fontSize: FontSize.reSize(20)}}>
                  {item.NoiDung}
                </Text>
              </View>
            </View>
            {item.hinhanh ? (
              <View style={{marginVertical: 5}}>
                <Image
                  source={{uri: item.image}}
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
          <TouchableOpacity style={styles.footer} onPress={this.props.onPress}>
            <Text>{item.title}</Text>
            <Text style={{fontSize: FontSize.reSize(20)}}>{item.NoiDung}</Text>
            {item.hinhanh ? (
              <View style={{marginVertical: 5}}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    height: FontSize.scale(200),
                    width: '100%',
                    backgroundColor: 'blue',
                  }}></Image>
              </View>
            ) : null}
          </TouchableOpacity>
        );
    }
  };

  TaoLike_Like = async () => {
    Utils.goscreen(this.props.nthis.props.nthis, 'ModalLike', {
      chuyenData: this.ChuyenData,
    });

    await this.TaoLike(
      this.item.Id_BaiDang,
      this.state.likeSelected,
      await Utils.ngetStorage(nkey.id_user),
    );

    // switch(this.state.likeSelected){
    //   case 1:

    // }
  };

  componentDidMount = async () => {
    // this._GetDSLike();
    // console.log('this bài đăng component did mount', this);
    // this.CheckLike();
    // await this.GanDataSauKhiChuyenVe();
  };

  render() {
    const {item = {}} = this.props;

    let user = item.User_DangBai ? item.User_DangBai[0] : {};
    let Solike = item.Like_BaiDang.length;
    let SoComment = item.Coment.length;
    // console.log('onpress', this.props.onPress);
    let day = item.CreatedDate;
    let ngay = day.substring(0, 10);
    let time = day.substring(11, 16);
    // this.idbaidang = item.Id_BaiDang;
    let dslike = item.Like ? item.Like : null;
    let loaibaidang = item.Id_LoaiBaiDang;
    let group = item.Group ? item.Group[0] : {};
    // console.log('this bài đăng component', group);
    this.item = item.Id_BaiDang;
    return (
      <View style={styles.container}>
        {/* khung chứa avata và khung text input*/}
        <View>
          <View style={styles.header}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
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
                  source={user.avatar ? {uri: user.avatar} : avatar}></Image>
              </View>
            </TouchableOpacity>
            <View style={styles.khung_tenUser}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.txt_TenUser}>{user.Username}</Text>
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

            <View style={styles.khung_daubacham}>
              <Image style={styles.daubacham} source={daubacham} />
            </View>
          </View>

          {/* khung chứa nội dung bài đăng và cmt*/}

          <this.loadNoiDung></this.loadNoiDung>

          {/* khung chứa số like và cmt */}
          <View style={styles.khung_DemSoLike_Comt}>
            <TouchableOpacity style={styles.khung_DemSoLike}>
              <View style={{flexDirection: 'row', padding: 3}}>
                <Image style={styles.imageLike_Commnet} source={like} />
                <Text style={{textAlign: 'center'}}> {Solike}</Text>
              </View>
              <View style={{flexDirection: 'row', marginLeft: 5}}>
                <Image style={styles.imageLike_Commnet} source={commnet} />
                <Text> {SoComment}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        <View>
          <View style={styles.khungLike_Commnet}>
            {dslike ? (
              // đây sẽ là  delete
              <TouchableOpacity
                style={styles.khung_Thich}
                onPress={() => {
                  this.DeleteLike(item.Id_BaiDang);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <SvgUri
                    width={FontSize.scale(20)}
                    height={FontSize.verticalScale(20)}
                    source={{
                      uri: dslike.icon,
                    }}
                  />
                  <Text style={styles.text_Like_cmt1}>{dslike.title}</Text>
                </View>
              </TouchableOpacity>
            ) : (
              // đây là tạo like

              <TouchableOpacity
                style={styles.khung_Thich}
                onLongPress={async () => {
                  Utils.goscreen(
                    this.props.nthis.props.nthis,
                    'ModalLike_Nhom',
                    {
                      id_nguoidang: this.props,
                    },
                  );
                }}
                onPress={async () => {
                  this.TaoLike(
                    item.Id_BaiDang,
                    this.id_like,
                    await Utils.ngetStorage(nkey.id_user),
                  );
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image style={styles.imageLike_Commnet} source={thich} />
                  <Text style={styles.text_Like_cmt}>Like</Text>
                </View>
              </TouchableOpacity>
            )}

            <View style={styles.khung_BinhLuan} onPress={this.props.onPress}>
              <Image
                style={{
                  height: FontSize.scale(17),
                  width: FontSize.verticalScale(18),
                  marginRight: 2,
                  tintColor: '#69696930',
                }}
                source={binhluan}
              />
              <Text
                style={{
                  marginLeft: FontSize.reSize(5),
                  textAlign: 'center',
                  color: '#69696930',
                }}>
                Bình luận
              </Text>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderBottomWidth: 5,
    borderColor: '#69696920',
    backgroundColor: '#E9EBEE',
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    // justifyContent: 'space-between',
  },
  khung_tenUser: {
    // flexDirection: 'row',
    flex: 1,
  },
  khung_daubacham: {
    padding: 5,
  },
  txt_TenUser: {
    fontWeight: 'bold',
    fontSize: FontSize.reSize(20),
    marginHorizontal: 5,
  },
  footer: {
    paddingHorizontal: 10,
  },
  footer1: {
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon_bacham: {
    height: FontSize.scale(15),
    width: FontSize.verticalScale(15),
  },
  khung_DemSoLike_Comt: {
    flexDirection: 'row',
    marginLeft: 5,
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
    height: FontSize.scale(17),
    width: FontSize.verticalScale(18),
    marginRight: 2,
  },
  daubacham: {
    height: FontSize.scale(17),
    width: FontSize.verticalScale(18),
    marginRight: 2,
    tintColor: '#69696930',
  },
  khungLike_Commnet: {
    borderTopWidth: 1,
    borderColor: '#69696930',
    flexDirection: 'row',
    padding: 5,
  },
  khung_Thich: {
    flexDirection: 'row',
    padding: 3,
    marginRight: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
  },
  khung_BinhLuan: {
    flexDirection: 'row',
    padding: 3,
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    // backgroundColor: '#69696920',
  },
  text_Like_cmt: {
    marginLeft: FontSize.reSize(5),
    textAlign: 'center',
    color: '#4F4F4F',
  },
  text_Like_cmt1: {
    marginLeft: FontSize.reSize(5),
    textAlign: 'center',
    color: '#007DE3',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
    resizeMode: 'contain',
    height: FontSize.scale(250),
    // padding: 5,
    // tintColor: 'yellow',
    // marginBottom: -50,
  },
});
