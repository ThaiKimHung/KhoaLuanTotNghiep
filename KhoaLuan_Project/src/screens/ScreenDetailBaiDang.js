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
import {Avatar, Accessory} from 'react-native-elements';
import FontSize from '../components/size';
import GoBack from '../components/GoBack';

const avatar = require('../assets/images/avatar.png');
const like = require('../assets/images/like.png');
const commnet = require('../assets/images/comment.png');
const daubacham = require('../assets/images/daubacham.png');
const thich = require('../assets/images/thich.png');
const binhluan = require('../assets/images/binhluan.png');

const windowWidth = Dimensions.get('window').width;

export default class BaiDangComponenet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: true,
    };
  }
  GetData = () => {
    if (this.props.route.params != null) {
      this.setState({
        refresh: !this.state.refresh,
      });
      console.log('state refesh', this.state.refresh);
    } else {
      this.setState({refresh: !this.state.refresh});
    }
  };

  EmptyListMessage = ({item}) => {
    return (
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };

  _renderItem = ({item, index}) => {
    let userCmt = item.User_comment ? item.User_comment[0] : '';
    return (
      <View style={styles.khung_TungCmt}>
        <TouchableOpacity>
          <Avatar
            size="small"
            rounded
            source={userCmt ? {uri: userCmt.avatar} : avatar}
            activeOpacity={0.7}
          />
        </TouchableOpacity>
        <View style={{flex: 1}}>
          <View style={styles.khung_tenUser_Cmt}>
            {/* <Text style={styles.txt_TenUser}>{user.Username}</Text> */}
            <Text style={styles.txt_TenUser_Cmt}>{userCmt.Username}</Text>
            <Text style={{marginHorizontal: 3}}>{item.NoiDung}</Text>
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

  async componentDidMount() {
    await this.GetData();
  }
  render() {
    const {item = {}} = this.props.route.params;
    // console.log('item Detail', this.props.route.params);
    let user = item.User_DangBai ? item.User_DangBai[0] : {};
    let Solike = item.Like_BaiDang.length;
    let SoComment = item.Coment.length;
    return (
      <View style={styles.container}>
        <GoBack nthis={this.props} name=""></GoBack>
        {/* khung chứa avata và khung text input*/}
        <View style={{margin: 5}}>
          <View style={styles.header}>
            <TouchableOpacity
              style={{
                flexDirection: 'row',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Avatar
                size="small"
                rounded
                source={user ? {uri: user.avatar} : ''}
                activeOpacity={0.7}
              />

              <View style={styles.khung_tenUser}>
                <Text style={styles.txt_TenUser}>{user.Username}</Text>
                {/* <Text style={styles.txt_TenUser}>Hùng</Text> */}
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.khung_daubacham}>
              <Image style={styles.imageLike_Commnet} source={daubacham} />
            </TouchableOpacity>
          </View>

          {/* khung chứa nội dung bài đăng và cmt*/}
          <View style={styles.footer}>
            {/* <Text>{item.NoiDung}</Text> */}
            <Text>{item.NoiDung}</Text>
          </View>
        </View>
        <View style={{padding: 5, margin: 5}}>
          <View style={styles.khungLike_Commnet}>
            <TouchableOpacity style={styles.khung_Thich}>
              <Image style={styles.imageLike_Commnet} source={thich} />
              <Text
                style={{marginLeft: FontSize.reSize(5), textAlign: 'center'}}>
                Thích ({Solike})
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.khung_BinhLuan}>
              <Image style={styles.imageLike_Commnet} source={binhluan} />
              <Text
                style={{marginLeft: FontSize.reSize(5), textAlign: 'center'}}>
                Bình luận ({SoComment})
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.khung_CmtTong}>
          <FlatList
            data={item.Coment}
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refresh}
            onRefresh={() => {
              this.setState({refresh: true}, item.Coment);
            }}
            ListEmptyComponent={this.EmptyListMessage}
          />
        </View>

        <View style={{justifyContent: 'flex-end'}}>
          <TextInput
            placeholder="Nhập nội dung cmt"
            autoFocus={true}
            style={{
              margin: 5,
              backgroundColor: '#C0C0C0',
              borderRadius: 20,
              padding: 5,
              paddingLeft: 10,
            }}></TextInput>
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
  },
  khungLike_Commnet: {
    borderTopWidth: 0.5,
    borderBottomWidth: 0.5,
    flexDirection: 'row',
    padding: 5,
    // backgroundColor: 'blue',
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
});
