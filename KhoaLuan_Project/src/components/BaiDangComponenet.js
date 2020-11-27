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
import {
  Avatar,
  Title,
  Caption,
  Paragraph,
  Drawer,
  TouchableRipple,
  Switch,
} from 'react-native-paper';
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
    return (
      <View style={styles.container}>
        {/* khung chứa avata và khung text input*/}
        <View>
          <View style={styles.header}>
            <TouchableOpacity>
              <Avatar.Image
                style={{margin: 5}}
                source={avatar}
                size={FontSize.reSize(40)}
              />
            </TouchableOpacity>

            <View style={styles.khung_tenUser}>
              <TouchableOpacity>
                <Text style={styles.txt_TenUser}>Tên user</Text>
              </TouchableOpacity>
            </View>

            <TouchableOpacity style={styles.khung_daubacham}>
              <Image style={styles.imageLike_Commnet} source={daubacham} />
            </TouchableOpacity>
          </View>

          {/* khung chứa nội dung bài đăng và cmt*/}
          <View style={styles.footer}>
            <Text>
              đây là 1 loại bài đăng gì đó rất dài, rất dai iiiiiiiiiiiiii
              iiiiiiiiiiiiiiiii iiiiiiiiiiiiiiii iiiiiiiiiiiii
              iiiiiiiiiiiiiiiiiiiiiiiiii iiiiiiiiiiiiiii iiiiiiiiiiiiiii
              iiiiiiiiiiiiii iiiiiiiiiiiiiiiii iiiiiiiiiiiiiiii iiiiiiiiiiiii
              iiiiiiiiiiiiiiiiiiiiiiiiii iiiiiiiiiiiiiii iiiiiiiiiiiiiii
              iiiiiiiiiiiiii iiiiiiiiiiiiiiiii iiiiiiiiiiiiiiii iiiiiiiiiiiii
              iiiiiiiiiiiiiiiiiiiiiiiiii iiiiiiiiiiiiiii iiiiiiiiiiiiiii
              iiiiiiiiiiiiii iiiiiiiiiiiiiiiii iiiiiiiiiiiiiiii iiiiiiiiiiiii
              iiiiiiiiiiiiiiiiiiiiiiiiii iiiiiiiiiiiiiii iiiiiiiiiiiiiii
              iiiiiiiiiiiiii iiiiiiiiiiiiiiiii iiiiiiiiiiiiiiii iiiiiiiiiiiii
              iiiiiiiiiiiiiiiiiiiiiiiiii iiiiiiiiiiiiiii iiiiiiiiiiiiiii
              iiiiiiiiiiiiii iiiiiiiiiiiiiiiii iiiiiiiiiiiiiiii iiiiiiiiiiiii
              iiiiiiiiiiiiiiiiiiiiiiiiii iiiiiiiiiiiiiii iiiiiiiiiiiiiii hhhhhh
              hhhhhh hhhhhh hhhhhhhhhhhh hhhhhhhhhhhh hhhhhhhhhhhh hhhhhhhhhhhh
              hhhhhhhhhhhhhhhhhhhhhhhh hhhhhhhhhhhhhhhhhh
            </Text>
          </View>
          {/* khung chứa số like và cmt */}
          <View style={styles.khung_DemSoLike_Comt}>
            <TouchableOpacity style={styles.khung_DemSoLike}>
              <Image
                style={styles.imageLike_Commnet}
                source={like}
                //   size={FontSize.reSize(20)}
              />
              <Text style={{textAlign: 'center'}}> 1</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.khung_DemSoComment}>
              <Image
                style={styles.imageLike_Commnet}
                source={commnet}
                //   size={FontSize.reSize(20)}
              />
              <Text> 1</Text>
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
    // backgroundColor: 'yellow',
  },
  khung_tenUser: {
    // backgroundColor: 'blue',
    flex: 1,
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
    borderTopWidth: 0.5,
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
