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
import {nGlobalKeys} from '../apis/globalKey';
import Utils from '../apis/Utils';
export default class PhanChonLoaiBaiDang extends React.Component {
  render() {
    // console.log('this của chọn loại bài đăng', this);
    let ava = Utils.getGlobal(nGlobalKeys.Avatar, '');
    console.log('ava ne', ava);
    return (
      <View>
        {/* khung chứa avata và khung text input*/}
        <View style={styles.khungchua}>
          <Avatar.Image
            style={{margin: 5}}
            source={{uri: ava}}
            size={FontSize.reSize(50)}
          />
          <TouchableOpacity
            style={styles.khung_textinput}
            onPress={this.props.onPress}>
            <Text>Bạn muốn đăng thông tin gi?</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    // backgroundColor: 'green',
    // height: '10%',
  },
  khungchua: {
    flexDirection: 'row',
    // padding: 10,
    marginTop: 5,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    backgroundColor: '#C0C0C020',
  },
  khung_textinput: {
    // backgroundColor: 'blue',
    flex: 1,
    margin: 5,
    borderRadius: 50,
    borderColor: '#000000',
    borderWidth: 1,
    height: FontSize.scale(30),
    justifyContent: 'center',
    paddingLeft: 10,
  },
});
