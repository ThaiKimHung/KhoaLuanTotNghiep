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
// import {
//   Avatar,
//   Title,
//   Caption,
//   Paragraph,
//   Drawer,
//   TouchableRipple,
//   Switch,
// } from 'react-native-paper';
import {Avatar, Accessory} from 'react-native-elements';
import FontSize from './size';
const avatar = require('../assets/images/avatar.png');
const like = require('../assets/images/like.png');
const commnet = require('../assets/images/comment.png');
const daubacham = require('../assets/images/daubacham.png');
const thich = require('../assets/images/thich.png');
const binhluan = require('../assets/images/binhluan.png');

const windowWidth = Dimensions.get('window').width;

export default class BaiDangComponenet extends React.Component {
  render() {
    const {item = {}, onPress} = this.props;
    // console.log('nthis của Bai dang component', this.props);
    // console.log('item', item);
    // console.log('onpress', onPress);
    let user = item.User_DangBai ? item.User_DangBai[0] : {};
    let Solike = item.Like_BaiDang.length;
    let SoComment = item.Coment.length;
    // console.log('onpress', this.props.onPress);
    return (
      <View style={styles.container}>
        {/* khung chứa avata và khung text input*/}
        <View>
          <View style={styles.header}>
            <TouchableOpacity style={{flexDirection: 'row'}}>
              {/* <Avatar.Image
                style={{margin: 5}}
                source={user ? {uri: user.avatar} : avatar}
                size={FontSize.reSize(40)}
              /> */}

              <Avatar
                size="small"
                rounded
                source={user ? {uri: user.avatar} : ''}
                activeOpacity={0.7}
              />
              <View style={styles.khung_tenUser}>
                <Text style={styles.txt_TenUser}>{user.Username}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.khung_daubacham}>
              <Image style={styles.imageLike_Commnet} source={daubacham} />
            </TouchableOpacity>
          </View>

          {/* khung chứa nội dung bài đăng và cmt*/}
          <TouchableOpacity style={styles.footer} onPress={this.props.onPress}>
            <Text>{item.NoiDung}</Text>
          </TouchableOpacity>
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
            <TouchableOpacity style={styles.khung_Thich}>
              <Image
                style={styles.imageLike_Commnet}
                source={thich}
                //   size={FontSize.reSize(20)}
              />
              <Text
                style={{marginLeft: FontSize.reSize(5), textAlign: 'center'}}>
                Thích
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.khung_BinhLuan}>
              <Image
                style={styles.imageLike_Commnet}
                source={binhluan}
                //   size={FontSize.reSize(20)}
              />
              <Text
                style={{marginLeft: FontSize.reSize(5), textAlign: 'center'}}>
                Bình luận
              </Text>
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
    borderColor: '#C0C0C0',
    // backgroundColor: 'red',
  },
  header: {
    flexDirection: 'row',
    padding: 5,
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
  },
  khung_tenUser: {
    // backgroundColor: 'blue',
    // flex: 1,
    flexDirection: 'row',
  },
  khung_daubacham: {
    // backgroundColor: 'red',
    padding: 5,
  },
  txt_TenUser: {
    fontWeight: 'bold',
    fontSize: FontSize.reSize(20),
    margin: 5,
  },
  footer: {
    // flex: 1,
    // backgroundColor: 'green',
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
    borderTopWidth: 1,
    borderColor: '#696969',
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
    // backgroundColor: 'green',
    flex: 1,
  },
});
