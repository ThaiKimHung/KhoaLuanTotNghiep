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
} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import FontSize from '../components/size';
import GoBack from '../components/GoBack';
import DanhSachLike from '../components/DanhSachLike';
import Utils from '../apis/Utils';

import {AddComment} from '../apis/apiUser';

const avatar = require('../assets/images/avatar.png');
const like = require('../assets/images/like.png');
const commnet = require('../assets/images/comment.png');
const daubacham = require('../assets/images/daubacham.png');
const thich = require('../assets/images/thich.png');
const binhluan = require('../assets/images/binhluan.png');
const send = require('../assets/images/send.png');
const windowWidth = Dimensions.get('window').width;

export default class BaiDangComponenet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true,
      thich: false,
    };
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

  DangCmt = () => {
    // const id_loaibaidang = this.props.route.params.id_loaibaidang;
    const today = new Date();
    const date =
      today.getDate() + '/' + today.getMonth() + '/' + today.getFullYear();
    const time = today.getHours() + ':' + today.getMinutes();
    let strBody = JSON.stringify({
      ID_BaiDang: 0,
      NoiDung_cm: '',
      id_cmt_parent: 0,
      typepost: string,
      CreatedDate: '2020-12-15T03:49:15.422Z',
      CreatedBy: 0,
      UpdatedDate: '',
      UpdatedBy: 0,
    });

    // console.log('strBody tin nhanh', strBody);
    // let res = await PostBaiDang(strBody);
    // if (res.status == 1) {
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
              source={userCmt.avatar ? {uri: userCmt.avatar} : avatar}></Image>
          </View>
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <View style={styles.khung_tenUser_Cmt}>
            {/* <Text style={styles.txt_TenUser}>{user.Username}</Text> */}
            <Text style={styles.txt_TenUser_Cmt}>{userCmt.Username}</Text>
            <Text style={{marginLeft: 5, marginBottom: 5}}>
              {item.NoiDung_cmt}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              //   backgroundColor: 'yellow',
              //   padding: 2,
              marginHorizontal: 30,
              marginTop: -5,
            }}>
            <TouchableOpacity>
              <Text style={{marginLeft: 10}}>Thích</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text style={{marginLeft: 10}}>Trả lời</Text>
            </TouchableOpacity>
          </View>
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
  // async componentDidMount() {
  //   await this.GetData();
  // };
  render() {
    console.log('this detail', this);
    // const {item = {}} = Utils.ngetParam(this, 'ChiTietBaiDang', '');
    const {ChiTietBaiDang = {}} = this.props.route.params;
    // console.log('this Detail', this);
    // console.log('item Detail', this.props.route.params);
    console.log('this ChiTietBaiDang screen Detail bài đăng', ChiTietBaiDang);
    let user = ChiTietBaiDang.User_DangBai
      ? ChiTietBaiDang.User_DangBai[0]
      : {};
    let Solike = ChiTietBaiDang.Like_BaiDang.length;
    let SoComment = ChiTietBaiDang.Coment.length;
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

            <TouchableOpacity style={styles.khung_daubacham}>
              <Image style={styles.imageLike_Commnet} source={daubacham} />
            </TouchableOpacity>
          </View>

          <View style={styles.footer}>
            <Text>{ChiTietBaiDang.title}</Text>
            <Text>{ChiTietBaiDang.NoiDung}</Text>
          </View>
        </View>
        <View style={{marginBottom: 5}}>
          <View style={styles.khungLike_Commnet}>
            {this.state.thich === false ? (
              <TouchableOpacity
                style={styles.khung_Thich}
                onPress={() => {
                  this.TaoLike();
                }}>
                <Image
                  style={[styles.imageLike_Commnet, {tintColor: '#696969'}]}
                  source={thich}
                />
                <Text
                  style={{
                    marginLeft: FontSize.reSize(5),
                    textAlign: 'center',
                    color: '#696969',
                  }}>
                  Thích ({Solike})
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
            data={ChiTietBaiDang.Coment}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refresh}
            onRefresh={() => {
              this.setState({refresh: true}, ChiTietBaiDang.Coment);
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
            }}></TextInput>
          <TouchableOpacity style={{padding: 10}}>
            <Image
              source={send}
              style={{
                height: FontSize.scale(20),
                width: FontSize.verticalScale(20),
                // padding: 10,
              }}></Image>
          </TouchableOpacity>
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
    padding: 3,
    margin: 5,
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
    marginLeft: 3,
    // textAlign: 'center',
  },
  footer: {
    // flex: 1,
    // backgroundColor: 'green',
    margin: 5,
    paddingHorizontal: 10,
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
});
