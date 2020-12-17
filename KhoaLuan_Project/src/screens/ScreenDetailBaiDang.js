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

import FontSize from '../components/size';
import GoBack from '../components/GoBack';
import DanhSachLike from '../components/DanhSachLike';
import Utils from '../apis/Utils';
import {nkey} from '../apis/keyStore';
import SvgUri from 'react-native-svg-uri';
import {AddComment} from '../apis/apiUser';

import {showMessage, hideMessage} from 'react-native-flash-message';

const avatar = require('../assets/images/avatar.png');
const like = require('../assets/images/like.png');
const commnet = require('../assets/images/comment.png');
const daubacham = require('../assets/images/daubacham.png');
const thich = require('../assets/images/thich.png');
const binhluan = require('../assets/images/binhluan.png');
const send = require('../assets/images/send.png');
const welcome = require('../assets/images/welcome.png');
const windowWidth = Dimensions.get('window').width;

export default class BaiDangComponenet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true,
      thich: false,
      text_Cmt: '',
    };
    this.idBaiDang = '';
    // this.NoiDung_Cmt = '';
  }
  GetData = () => {
    if (this.props.route.params != null) {
      this.setState({
        refresh: !this.state.refresh,
      });
    } else {
      this.setState({refresh: !this.state.refresh});
    }
  };

  DangCmt = async () => {
    // const id_loaibaidang = this.props.route.params.id_loaibaidang;
    const today = new Date();
    const date =
      today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes();

    let id_user = await Utils.ngetStorage(nkey.id_user);

    let strBody = JSON.stringify({
      ID_BaiDang: this.idBaiDang,
      NoiDung_cmt: this.state.text_Cmt,
      typepost: '',
      CreatedDate: date + 'T' + time,
      CreatedBy: id_user,
      UpdatedDate: '0',
      UpdatedBy: 0,
    });

    let res = await AddComment(strBody);
    console.log('res cmt', res);
    console.log('strBody cmt', strBody);

    if (res.status == 1) {
      this.setState({
        text_Cmt: '',
      });
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
                  userCmt.avatar ? {uri: userCmt.avatar} : avatar
                }></Image>
            </View>
          </TouchableOpacity>
          <View style={{flex: 1}}>
            <TouchableOpacity
              style={styles.khung_tenUser_Cmt}
              onLongPress={() => {
                Utils.goscreen(this, 'PopUpModal_CMT', {
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
          <TouchableOpacity>
            <Text style={{marginLeft: 10}}>Thích</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{marginLeft: 10}}>Trả lời</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  TaoLike = () => {
    this.setState({
      thich: !this.state.thich,
    });
  };

  async componentDidMount() {
    await this.GetData();
  }

  render() {
    console.log('this detail', this);
    const {id_nguoidang = {}} = this.props.route.params;
    // console.log('this ChiTietBaiDang screen Detail bài đăng', id_nguoidang);
    let user = id_nguoidang.User_DangBai ? id_nguoidang.User_DangBai[0] : {};
    let Solike = id_nguoidang.Like_BaiDang.length;
    let SoComment = id_nguoidang.Coment.length;
    this.idBaiDang = id_nguoidang.Id_BaiDang;
    let dslike = id_nguoidang.Like ? id_nguoidang.Like : null;
    let idbaidang = id_nguoidang.Id_LoaiBaiDang;
    return (
      <View style={styles.container}>
        <GoBack
          name=""
          onPress={() => {
            Utils.goback(this, '');
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
                  source={user.avatar ? {uri: user.avatar} : avatar}></Image>
              </View>

              <View style={styles.khung_tenUser}>
                <Text style={styles.txt_TenUser}>{user.Username}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.khung_daubacham}
              onPress={() => {
                Utils.goscreen(this, 'PopUpModal_XoaSua', {
                  id_nguoidang: id_nguoidang,
                });
              }}>
              <Image style={styles.imageLike_Commnet} source={daubacham} />
            </TouchableOpacity>
          </View>

          {idbaidang === 4 ? (
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
                    source={user.avatar ? {uri: user.avatar} : avatar}></Image>
                </View>
                <Text>{id_nguoidang.title}</Text>
                <Text>{id_nguoidang.NoiDung}</Text>
              </ImageBackground>
            </View>
          ) : (
            <View style={styles.footer}>
              <Text>{id_nguoidang.title}</Text>
              <Text>{id_nguoidang.NoiDung}</Text>
            </View>
          )}
        </View>
        <View style={{marginBottom: 5}}>
          <View style={styles.khungLike_Commnet}>
            {dslike ? (
              <TouchableOpacity
                style={styles.khung_Thich}
                onPress={() => {
                  this.TaoLike();
                }}>
                <SvgUri
                  width={FontSize.scale(20)}
                  height={FontSize.verticalScale(20)}
                  source={{
                    uri: dslike.icon,
                  }}
                />
                <Text
                  style={{
                    marginLeft: FontSize.reSize(5),
                    textAlign: 'center',
                    color: '#007DE3',
                  }}>
                  {dslike.title} ({Solike})
                </Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                style={styles.khung_Thich}
                onPress={() => {
                  this.TaoLike();
                }}>
                <Image style={styles.imageLike_Commnet1} source={thich} />
                <Text
                  style={{
                    marginLeft: FontSize.reSize(5),
                    textAlign: 'center',
                    color: '#007DE3',
                  }}>
                  Thích ({Solike})
                </Text>
              </TouchableOpacity>
            )}

            {/* <TouchableOpacity
                style={styles.khung_Thich}
                onPress={() => {
                  this.TaoLike();
                }}>
                <Image style={styles.imageLike_Commnet1} source={thich} />
                <Text
                  style={{
                    marginLeft: FontSize.reSize(5),
                    textAlign: 'center',
                    color: '#007DE3',
                  }}>
                  Thích ({Solike})
                </Text>
              </TouchableOpacity>
             */}

            <TouchableOpacity style={styles.khung_BinhLuan}>
              <Image style={styles.imageLike_Commnet} source={binhluan} />
              <Text
                style={{
                  marginLeft: FontSize.reSize(5),
                  textAlign: 'center',
                  color: '#696969',
                }}>
                Bình luận ({SoComment})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.khung_CmtTong}>
          <FlatList
            data={id_nguoidang.Coment}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refresh}
            onRefresh={() => {
              this.setState({refresh: true}, id_nguoidang.Coment);
            }}
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
              // marginLeft: 5,
              flex: 1,
            }}
            value={this.state.text_Cmt}
            onChangeText={(text) =>
              this.setState({
                text_Cmt: text,
              })
            }></TextInput>
          {this.state.text_Cmt ? (
            <TouchableOpacity
              style={{marginRight: 5}}
              onPress={() => this.DangCmt()}>
              <Image
                source={send}
                style={{
                  height: FontSize.scale(20),
                  width: FontSize.verticalScale(20),
                  // padding: 10,
                }}></Image>
            </TouchableOpacity>
          ) : (
            <View style={{marginRight: 5}}>
              <Image
                source={send}
                style={{
                  height: FontSize.scale(20),
                  width: FontSize.verticalScale(20),
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
    flexDirection: 'row',
    padding: 5,
    // backgroundColor: 'yellow',
    justifyContent: 'space-between',
  },
  khung_tenUser: {
    // backgroundColor: 'blue',
    // flex: 1,
    flexDirection: 'row',
  },
  khung_tenUser_Cmt: {
    backgroundColor: '#C0C0C080',
    flex: 1,
    // flexDirection: 'row',
    // alignItems: 'center',
    // marginLeft: 10,
    padding: 5,
    marginLeft: 5,
    borderRadius: 15,
  },
  khung_daubacham: {
    // backgroundColor: 'red',
    padding: 5,
    // justifyContent: 'space-between',
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
  footer: {
    margin: 5,
    paddingHorizontal: 10,
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
    tintColor: '#007DE3',
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
