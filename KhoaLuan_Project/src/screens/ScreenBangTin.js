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

import {GetDSMedia} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import GoBack from '../components/GoBack';
import {ImageBackground} from 'react-native';

export default class ScreenBangTin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dsBangTin: '',
      refresh: true,
    };
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
        refresh: !this.state.refresh,
      });
      // console.log('ds loại bài đăng', this.state.DsLoaiBaiDang);
    } else {
      this.setState({
        refresh: !this.state.refresh,
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
      <View>
        {item.img_media ? (
          <TouchableOpacity style={[styles.khung]}>
            <ImageBackground
              source={{uri: item.hinhanh}}
              style={{
                height: FontSize.scale(250),
                width: FontSize.verticalScale(250),
                backgroundColor: 'yellow',
              }}>
              <View style={styles.khung_DS}>
                {/* <Image
            style={{
              width: FontSize.scale(150),
              height: FontSize.verticalScale(130),
            }}
            // Icon_app
            // uri:// 'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg',
            source={item.Icon_app ? {uri: item.Icon_app} : avatar}
          /> */}
                <Text style={{margin: 5, textAlign: 'center'}}>
                  {item.id_media}
                </Text>
              </View>
            </ImageBackground>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={[styles.khung]}>
            <View style={styles.khung_DS}>
              {/* <Image
            style={{
              width: FontSize.scale(150),
              height: FontSize.verticalScale(130),
            }}
            // Icon_app
            // uri:// 'http://thenewcode.com/assets/images/thumbnails/homer-simpson.svg',
            source={item.Icon_app ? {uri: item.Icon_app} : avatar}
          /> */}
              <Text style={{margin: 5, textAlign: 'center'}}>
                {item.id_media}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
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
          name=""
          onPress={() => {
            Utils.goback(this, '');
          }}></GoBack>
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: FontSize.reSize(20)}}>
            Bạn muốn đăng bài gì?
          </Text>
        </View>
        <View style={styles.footer}>
          <FlatList
            data={this.state.dsBangTin}
            renderItem={this.renderItem}
            // ItemSeparatorComponent={() => <View style={{height: 5}}></View>}
            // numColumns={2}
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
    backgroundColor: '#00AFF0',
    height: FontSize.scale(50),
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    marginTop: 5,
  },
  footer: {
    height: '100%',
    width: '100%',
    paddingTop: 10,
  },
  khung: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: '#4F4F4F',
    borderWidth: 1,
    borderRadius: 10,
    height: FontSize.scale(300),
    width: FontSize.verticalScale(300),
    marginHorizontal: 25,
    marginVertical: 5,
  },
  container_khung: {
    width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
  khung_DS: {
    // width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    // margin: 2,
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});
