import React from 'react';
import {
  View,
  Text,
  Button,
  StyleSheet,
  StatusBar,
  ScrollView,
  Image,
  Dimensions,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import Utils from '../apis/Utils';
import Header from '../components/Header';
import ChonLoaiBaiDang from '../components/ChonLoaiBaiDang';
// import {useTheme} from '@react-navigation/native';
// const {colors} = useTheme();
import ScreenAllBaiDang from './ScreenAllBaiDang';
import FontSize from '../components/size';
import {ROOTGlobal, rootGlobal} from '../apis/dataGlobal';
import {GetDSMedia} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import GoBack from '../components/GoBack';
import {ImageBackground} from 'react-native';

const plus = require('../assets/images/plus.png');
const avatar = require('../assets/images/avatar.png');
export default class ScreenBangTin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dsBangTin: '',
      refresh: true,
    };
    ROOTGlobal.DsMedia = this._GetDsMedia;
  }

  _GetAsync = async () => {
    this.setState({
      userID: await Utils.ngetStorage(nkey.id_user),
    });
    // console.log('iduser bên get asyn', this.state.userID);
  };

  _GetDsMedia = async () => {
    let res = await GetDSMedia();
    console.log('res ds loại bài đăng', res);
    if (res.status == 1) {
      this.setState({
        dsBangTin: res.Data,
        refresh: false,
      });
      console.log('ds loại bài đăng', this.state.dsBangTin);
    } else {
      this.setState({
        refresh: false,
      });
    }
  };

  EmptyListMessage = ({item}) => {
    return (
      // <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
      //   No Data Found
      // </Text>
      <ActivityIndicator size="large" color="#0000ff" />
    );
  };

  renderItem = ({item, index}) => {
    // console.log('item', item);
    return (
      <TouchableOpacity
        onPress={() =>
          Utils.goscreen(this, 'Modal_DetailBangTin', {
            id_media: item.id_media,
          })
        }
        style={[styles.khung, {marginLeft: index % 2 != 0 ? 10 : 10}]}>
        {item.img_media != '' || item.img_media != null ? (
          <ImageBackground
            source={{uri: item.hinhanh}}
            style={{
              borderRadius: 10,
              height: FontSize.scale(75),
              width: FontSize.verticalScale(145),
              backgroundColor: 'yellow',
            }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
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
                    // item.hinhanh_user ? {uri: item.Avatar} :
                    avatar
                  }></Image>
              </View>
              <Text style={{fontSize: FontSize.reSize(20)}}>
                {item.username}
              </Text>
            </View>
            {/* <Text style={{margin: 5, textAlign: 'center'}}>{item.username}</Text> */}
          </ImageBackground>
        ) : (
          <TouchableOpacity>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 10,
              }}>
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
                    // item.hinhanh_user ? {uri: item.Avatar} :
                    avatar
                  }></Image>
              </View>
              <Text style={{fontSize: FontSize.reSize(20)}}>
                {item.username}
              </Text>
            </View>
            <Text> đay là k có ảnh</Text>
          </TouchableOpacity>
        )}
      </TouchableOpacity>
    );
  };

  async componentDidMount() {
    await this._GetAsync();
    await this._GetDsMedia();
  }
  render() {
    return (
      <View style={styles.container}>
        <GoBack
          // nthis={this}
          name="Bảng tin"
          onPress={() => {
            Utils.goback(this, '');
          }}></GoBack>
        <TouchableOpacity
          onPress={() => Utils.goscreen(this, 'Media')}
          style={{
            height: FontSize.scale(30),
            justifyContent: 'space-between',
            padding: 10,
            borderRadius: 20,
            marginHorizontal: 10,
            marginTop: 5,
            flexDirection: 'row',
            borderWidth: 1,
            alignItems: 'center',
          }}>
          <Text
            style={{
              marginLeft: 10,
              textAlign: 'center',
              fontSize: FontSize.reSize(20),
            }}>
            Thêm tin
          </Text>
          <Image
            source={plus}
            style={{
              height: FontSize.scale(20),
              width: FontSize.verticalScale(20),
              justifyContent: 'center',
            }}></Image>
        </TouchableOpacity>
        <View style={styles.footer}>
          <FlatList
            data={this.state.dsBangTin}
            renderItem={this.renderItem}
            ItemSeparatorComponent={() => <View style={{height: 5}}></View>}
            numColumns={2}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={this.EmptyListMessage}
            refreshing={this.state.refresh}
            onRefresh={() => {
              this.setState({refresh: true}, this._GetDsMedia);
            }}
          />
        </View>
      </View>
    );
  }
}

const widthScreen = Dimensions.get('screen').width;
const heightScreen = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // backgroundColor: '#00AFF0',
    height: FontSize.scale(50),
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 5,
  },
  footer: {
    // height: '100%',
    // width: '100%',
    paddingTop: 10,
  },
  khung: {
    // flex: 1,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    // backgroundColor: 'yellow',
    borderColor: '#4F4F4F',
    borderWidth: 1,
    borderRadius: 10,
    height: FontSize.scale(80),
    width: FontSize.verticalScale(150),
    justifyContent: 'center',
    // alignItems: 'center',
    // paddingHorizontal: 10,
    margin: 10,
  },
  container_khung: {
    width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  khung_DS: {
    // width: FontSize.verticalScale(100),
    // justifyContent: 'center',
    // alignItems: 'center',
    // margin: 2,
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});
