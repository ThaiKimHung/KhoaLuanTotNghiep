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
import Tooltip from 'react-native-walkthrough-tooltip';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';

import {GetDSLike, AddLike, DeleteBaiDang_Like} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const avatar = require('../assets/images/avatar.png');
const like = require('../assets/images/like.png');
const commnet = require('../assets/images/comment.png');
const daubacham = require('../assets/images/daubacham.png');
const thich = require('../assets/images/thich.png');
const binhluan = require('../assets/images/binhluan.png');
const welcome = require('../assets/images/welcome.png');

const windowWidth = Dimensions.get('window').width;
import moment from 'moment';
import Utils from '../apis/Utils';

export default class BaiDangComponenet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      thich: false,
      toolTipVisible: false,
      DaLike: [],
    };
    this.id_like = 1;
    this.id_user = '';
    this.item = {};
  }

  TaoLike = async (idbaidang, idlike, iduser) => {
    let res = await AddLike(idbaidang, idlike, iduser);
    console.log('ress add like', res);
    // this.setState({
    //   thich: !this.state.thich,
    // });
  };

  DeleteLike = async (idbaidang) => {
    let res = await DeleteBaiDang_Like(idbaidang);
    console.log('ress xóa like', res);
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

  async call(item) {
    await Utils.goscreen(this.props.nthis.props.nthis, 'Home', {
      Dulieu: item,
    });
    // console.log('item truyền về', item);
  }

  CheckLike = async () => {
    // let a = this.item.Like;
    // let iduser = await Utils.ngetStorage(nkey.id_user);
    // let idcreatelike = a ? a.CreateBy : a;
    // let loailike = '' ;
    // console.log('a', a);
    // console.log('người tạo like , loại like', idcreatelike, loailike);
  };

  componentDidMount() {
    // this._GetDSLike();
    // console.log('this bài đăng component did mount', this);
    this.CheckLike();
  }

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
    // console.log('this bài đăng component', this.props);

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

              <View style={styles.khung_tenUser}>
                <Text style={styles.txt_TenUser}>{user.Username}</Text>
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
              onPress={() =>
                Utils.goscreen(
                  this.props.nthis.props.nthis,
                  'PopUpModal_XoaSua',
                  {
                    id_nguoidang: item,
                  },
                )
              }>
              <Image style={styles.daubacham} source={daubacham} />
            </TouchableOpacity>
          </View>

          {/* khung chứa nội dung bài đăng và cmt*/}

          {loaibaidang === 4 ? (
            <View
              style={{
                backgroundColor: '#1C86EE',
                margin: 5,
              }}>
              <ImageBackground source={welcome} style={styles.image}>
                <TouchableOpacity
                  style={styles.footer1}
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
                        user.avatar ? {uri: user.avatar} : avatar
                      }></Image>
                  </View>
                  <Text>{item.title}</Text>
                  <Text style={{fontSize: FontSize.reSize(20)}}>
                    {item.NoiDung}
                  </Text>
                </TouchableOpacity>
              </ImageBackground>
            </View>
          ) : (
            <TouchableOpacity
              style={styles.footer}
              onPress={this.props.onPress}>
              <Text>{item.title}</Text>
              <Text style={{fontSize: FontSize.reSize(20)}}>
                {item.NoiDung}
              </Text>
            </TouchableOpacity>
          )}

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
                onLongPress={(e) =>
                  Utils.goscreen(this.props.nthis.props.nthis, 'ModalLike', {
                    layve: () => {
                      // alert('vo');
                      this.call(this.props);
                      // console.log('item về', this);
                    },
                  })
                }
                onPress={async () => {
                  this.TaoLike(
                    item.Id_BaiDang,
                    this.id_like,
                    await Utils.ngetStorage(nkey.id_user),
                  );
                  // this.setState({
                  //   toolTipVisible: true,
                  // });
                }}>
                {this.state.thich ? (
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={[styles.imageLike_Commnet, {tintColor: '#007DE3'}]}
                      source={thich}
                    />
                    <Text style={styles.text_Like_cmt1}>Like</Text>
                  </View>
                ) : (
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      style={[styles.imageLike_Commnet, {tintColor: '#696969'}]}
                      source={thich}
                    />
                    <Text style={styles.text_Like_cmt}>Like</Text>
                  </View>
                )}
                {/* {this.state.toolTipVisible ? (
                <Tooltip
                  isVisible={this.state.toolTipVisible}
                  // content={<DanhSachLike></DanhSachLike>}
                  content={
                    <View style={{flex: 1, backgroundColor: 'blue'}}>
                      <FlatList
                        data={this.state.DSLike}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        horizontal={true}
                      />
                    </View>
                  }
                  arrowSize={{width: 200, height: 200}}
                  placement="top"
                  onClose={() => this.setState({toolTipVisible: false})}
                />
              ) : null} */}
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.khung_BinhLuan}
              onPress={this.props.onPress}>
              <Image style={styles.imageLike_Commnet} source={binhluan} />
              <Text style={styles.text_Like_cmt}>Bình luận</Text>
            </TouchableOpacity>
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
    justifyContent: 'space-between',
  },
  khung_tenUser: {
    // flexDirection: 'row',
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
