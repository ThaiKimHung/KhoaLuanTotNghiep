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
import _ from 'lodash';
// import DanhSachLike from './DanhSachLike';
// import ModalComponent from '../components/ModalComponent';

import FontSize from './size';
import SvgUri from 'react-native-svg-uri';
import * as Animatable from 'react-native-animatable';

import {ROOTGlobal} from '../apis/dataGlobal';
import {
  GetDSLike,
  AddLike,
  DeleteBaiDang_Like,
  AddThongBao,
  BanThongBao,
  AddThongBao_Like,
  ShareBaiDang,
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const avatar = require('../assets/images/avatar.jpg');
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
const share = require('../assets/images/share.png');

import moment from 'moment';
import Utils from '../apis/Utils';

export default class BaiDangNhom_QuanLy_Component extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thich: false,
      toolTipVisible: false,
      DaLike: [],
      DataChuyenVe: [],
      likeSelected: {},
      iduser: '',
    };
    this.id_like = 1;
    this.id_user = '';
    this.item = {};
    // ROOTGlobal.GetDsAllBaiDang_Nhom = this.GetDsAllBaiDang_Nhom;
  }

  _ShareBaiDang = async (idbaidang) => {
    let res = await ShareBaiDang(
      await Utils.ngetStorage(nkey.id_user),
      idbaidang,
    );
    // console.log('res share bài đăng', res);
    if (res.status == 1) {
      showMessage({
        message: 'Thông báo',
        description: 'Chia sẻ thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
    }
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

  loadNoiDung = () => {
    const {item = {}} = this.props;

    // let user = item.User_DangBai ? item.User_DangBai[0] : {};
    let loaibaidang = item.Id_LoaiBaiDang;
    // let khenthuong = item.KhenThuong ? item.KhenThuong[0] : {};

    switch (loaibaidang) {
      case 1:
        return (
          <TouchableOpacity style={styles.footer} onPress={this.props.onPress}>
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
          </TouchableOpacity>
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
              {/* <SvgUri
                width={FontSize.scale(45)}
                height={FontSize.verticalScale(45)}
                source={{
                  uri: khenthuong.icon,
                }}
              /> */}
              <Text style={{fontWeight: 'bold', fontSize: FontSize.reSize(25)}}>
                {/* {khenthuong.tieude_kt} */}khen thưởng
              </Text>
            </Animatable.View>

            <TouchableOpacity
              style={styles.footer1}
              onPress={this.props.onPress}>
              {/* <View
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
              </View> */}
              <Text style={{fontSize: FontSize.reSize(30), fontWeight: 'bold'}}>
                {item.title}
              </Text>
              <Text style={{fontSize: FontSize.reSize(20)}}>
                {item.NoiDung}
              </Text>
            </TouchableOpacity>
          </View>
        );
      case 3:
        return (
          <TouchableOpacity style={styles.footer} onPress={this.props.onPress}>
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
            {/* {item.hinhanh ? (
              <View>
                <Image
                  source={{uri: item.image}}
                  style={{
                    height: FontSize.scale(200),
                    width: '100%',
                    backgroundColor: 'blue',
                  }}></Image>
              </View>
            ) : null} */}
          </TouchableOpacity>
        );
      case 4:
        return (
          <View
            style={{
              backgroundColor: '#1C86EE',
              margin: 5,
            }}>
            <ImageBackground source={welcome} style={styles.image}>
              <TouchableOpacity
                style={styles.footer1}
                onPress={this.props.onPress}>
                <Text
                  style={{fontSize: FontSize.reSize(25), fontWeight: 'bold'}}>
                  {item.title}
                </Text>
                <Text style={{fontSize: FontSize.reSize(20)}}>
                  {item.NoiDung}
                </Text>
              </TouchableOpacity>
            </ImageBackground>
          </View>
        );
      case 6:
        return (
          <TouchableOpacity style={styles.footer} onPress={this.props.onPress}>
            <Text>{item.title}</Text>

            {item.hinhanh ? (
              <View style={{marginVertical: 5}}>
                <Image
                  source={{uri: item.image}}
                  style={{
                    height: FontSize.scale(200),
                    width: '100%',
                    // backgroundColor: 'blue',
                  }}></Image>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      case 7:
        return (
          <TouchableOpacity style={styles.footer} onPress={this.props.onPress}>
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
                    // backgroundColor: 'blue',
                  }}></Image>
              </View>
            ) : null}
          </TouchableOpacity>
        );
      default:
        return (
          <TouchableOpacity style={styles.footer} onPress={this.props.onPress}>
            <Text>{item.title}</Text>
            <Text style={{fontSize: FontSize.reSize(20)}}>{item.NoiDung}</Text>
            {item.hinhanh ? (
              <View>
                <Image
                  source={{uri: item.image}}
                  style={{
                    height: FontSize.scale(200),
                    width: '100%',
                    // backgroundColor: 'blue',
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
  };

  _renderItem_DS = ({item, index}) => {
    // console.log(item);
    return (
      <View>
        {index < 2 ? (
          <View style={{flexDirection: 'row'}}>
            <SvgUri
              width={FontSize.scale(20)}
              height={FontSize.verticalScale(20)}
              source={{
                uri: item.icon,
              }}
            />
            <Text>{item.tong}</Text>
          </View>
        ) : (
          <View style={{flexDirection: 'row'}}>
            {/* <SvgUri
              width={FontSize.scale(20)}
              height={FontSize.verticalScale(20)}
              source={{
                uri: item.icon,
              }}
            /> */}
            <View
              style={{
                height: FontSize.scale(20),
                width: FontSize.verticalScale(20),
                backgroundColor: '#696969',
                justifyContent: 'center',
                alignItems: 'center',
                borderRadius: 20,
              }}>
              <Text>...</Text>
            </View>
          </View>
        )}
      </View>
    );
  };

  componentDidMount = async () => {
    // this._GetDSLike();
    // console.log('this bài đăng component did mount', this);
    // this.CheckLike();
    // await this.GanDataSauKhiChuyenVe();
    this.setState({
      iduser: await Utils.ngetStorage(nkey.id_user),
    });
  };

  render() {
    const {item = {}} = this.props;
    // console.log(' this', this.props);
    let user = item.username;
    // let iduserr = user ? user.ID_user : '';
    // let Solike = item.Like_BaiDang.length;
    // let SoComment = item.Coment.length;
    // // console.log('onpress', this.props.onPress);
    let day = item.CreatedDate;
    let ngay = day.substring(0, 10);
    let time = day.substring(11, 16);
    // // this.idbaidang = item.Id_BaiDang;
    // let dslike = item.Like ? item.Like : null;
    // let loaibaidang = item.Id_LoaiBaiDang;
    // let group = item.Group ? item.Group[0] : {};
    // console.log('this bài đăng component', group);
    // this.item = item.Id_BaiDang;
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
                  source={item.hinhanh ? {uri: item.avatar} : avatar}></Image>
              </View>
            </TouchableOpacity>
            <View style={styles.khung_tenUser}>
              <View style={{flexDirection: 'row'}}>
                <Text style={styles.txt_TenUser}>{item.username}</Text>
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

            <TouchableOpacity
              style={styles.khung_daubacham}
              onPress={() =>
                Utils.goscreen(
                  this.props.nthis.props.nthis,
                  'PopUpModal_Xoa_QuanLy_Nhom',
                  {
                    id_nguoidang: item,
                  },
                )
              }>
              <Image
                style={{
                  height: FontSize.scale(20),
                  width: FontSize.verticalScale(20),
                  // tintColor: '#007DE3',
                }}
                source={daubacham}
              />
            </TouchableOpacity>
          </View>

          {/* khung chứa nội dung bài đăng và cmt*/}

          <this.loadNoiDung></this.loadNoiDung>

          {/* khung chứa số like và cmt */}

          {/* <View
            style={{
              flexDirection: 'row',
              marginLeft: 5,
            }}>
            <View style={{flexDirection: 'row'}}>
              {_.size(item.Like_BaiDang) > 0 ? (
                <TouchableOpacity
                  style={{
                    // flexDirection: 'row',
                    padding: 3,
                    marginRight: 5,
                    // justifyContent: 'center',
                    // alignItems: 'center',
                  }}>
                  <View style={{flexDirection: 'row', padding: 3}}>
                    <FlatList
                      horizontal={true}
                      data={item.Like_BaiDang}
                      renderItem={this._renderItem_DS}
                      keyExtractor={(item, index) => index.toString()}
                      // refreshing={this.state.refresh}
                      // onRefresh={this._onRefresh}
                      // ListEmptyComponent={this.EmptyListMessage}
                      // ListFooterComponent={this.FoodterMessage}
                      // initialNumToRender={10}
                    ></FlatList>
                  </View>
                </TouchableOpacity>
              ) : (
                <View style={{flexDirection: 'row', padding: 3}}>
                  <Image style={styles.imageLike_Commnet} source={like} />
                  <Text style={{textAlign: 'center'}}> {Solike}</Text>
                </View>
              )}
            </View>

            <TouchableOpacity style={styles.khung_DemSoLike}>
              <View style={{flexDirection: 'row', marginLeft: 5}}>
                <Image style={styles.imageLike_Commnet} source={commnet} />
                <Text> {SoComment}</Text>
              </View>
            </TouchableOpacity>
          </View> */}
        </View>

        {/* <View>
          <View style={styles.khungLike_Commnet}>
            {dslike ? (
              // đây sẽ là  delete
              <TouchableOpacity
                style={styles.khung_Thich}
                onLongPress={async (e) => {
                  Utils.goscreen(
                    this.props.nthis.props.nthis,
                    'ModalLike_Nhom',
                    {
                      id_nguoidang: this.props,
                      x: e.nativeEvent.pageX,
                      y: e.nativeEvent.pageY,
                    },
                  );
                }}
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
                onLongPress={async (e) => {
                  Utils.goscreen(
                    this.props.nthis.props.nthis,
                    'ModalLike_Nhom',
                    {
                      id_nguoidang: this.props,
                      x: e.nativeEvent.pageX,
                      y: e.nativeEvent.pageY,
                    },
                  );
                }}
                onPress={async () => {
                  this.TaoLike(
                    item.Id_BaiDang,
                    this.id_like,
                    await Utils.ngetStorage(nkey.id_user),
                  );
                  this._AddThongBao_LikeBaiDang(item.Id_BaiDang);
                }}>
                <View style={{flexDirection: 'row'}}>
                  <Image style={styles.imageLike_Commnet} source={thich} />
                  <Text style={styles.text_Like_cmt}>Like</Text>
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.khung_BinhLuan}
              onPress={this.props.onPress}>
              <Image style={styles.imageLike_Commnet} source={binhluan} />
              <Text style={styles.text_Like_cmt}>Bình luận</Text>
            </TouchableOpacity>

            {iduserr != this.state.iduser ? (
              <TouchableOpacity
                style={styles.khung_BinhLuan}
                // activeOpacity={0.8}
                onPress={() => this._ShareBaiDang(item.Id_BaiDang)}>
                <Image style={styles.imageLike_Commnet} source={share} />
                <Text style={styles.text_Like_cmt}>Chia sẻ</Text>
              </TouchableOpacity>
            ) : (
              <View
                style={styles.khung_BinhLuan}
                // activeOpacity={0.8}
                // onPress={this.props.onPress}
              >
                <Image
                  style={{
                    height: FontSize.scale(17),
                    width: FontSize.verticalScale(18),
                    marginRight: 2,
                    tintColor: '#696969',
                  }}
                  source={share}
                />
                <Text
                  style={{
                    marginLeft: FontSize.reSize(5),
                    textAlign: 'center',
                    color: '#696969',
                  }}>
                  Chia sẻ
                </Text>
              </View>
            )}
          </View>
        </View> */}
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
    tintColor: '#4F4F4F',
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
