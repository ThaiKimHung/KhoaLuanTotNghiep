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
  ScrollView,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FontSize from '../components/size';
import {GetLoaiBaiDang} from '../apis/apiUser';
import Utils from '../apis/Utils';
import {nkey} from '../apis/keyStore';
import SvgUri from 'react-native-svg-uri';
import LoaiBaiDang from '../components/LoaiBaiDang';

const thaoluan = require('../assets/images/conversation.png');
// const congratulation = require('../assets/images/congratulations.png');

export default class ScreenLoaiBaiDang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsLoaiBaiDang: [],
      userID: 0,
    };
  }
  // await Utils.nsetStorage(nkey.id_user, this.state.id_userne);
  _GetAsync = async () => {
    this.setState({
      userID: await Utils.ngetStorage(nkey.id_user),
    });
    console.log('iduser bên get asyn', this.state.userID);
  };

  _GetDsLoaiBaiDang = async () => {
    // console.log('userid khi truyền lấy ds:', this.state.userID);
    let res = await GetLoaiBaiDang(this.state.userID);
    // console.log('ress', res);
    this.setState({DsLoaiBaiDang: res.data});
  };

  async componentDidMount() {
    await this._GetAsync();
    await this._GetDsLoaiBaiDang();
  }

  renderItem = ({item, index}) => {
    return (
      <TouchableOpacity
        style={[styles.khung, {marginLeft: index % 3 != 0 ? 5 : 0}]}>
        <LoaiBaiDang
          anh={item.Icon_BaiDang}
          tennhom={item.TenLoaiDang}></LoaiBaiDang>
      </TouchableOpacity>
    );
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: FontSize.reSize(20)}}>
            Bạn muốn đăng bài gì?
          </Text>
        </View>
        <View style={styles.footer}>
          {this.state.DsLoaiBaiDang.length != 0 ? (
            <FlatList
              data={this.state.DsLoaiBaiDang}
              renderItem={this.renderItem}
              ItemSeparatorComponent={() => <View style={{height: 5}}></View>}
              numColumns={3}
              keyExtractor={(item, index) => index.toString()}
            />
          ) : (
            <ActivityIndicator size="large" color="#0000ff" />
          )}
        </View>
      </View>
    );
  }
}
const widthScreen = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    // backgroundColor: 'yellow',
  },
  header: {
    backgroundColor: '#4285F4',
    height: '8%',
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 10,
  },
  footer: {
    // flex: 1,
    // backgroundColor: 'green',
    // flexDirection: 'row',
    height: '100%',
    width: '100%',
    paddingTop: 5,
  },
  khung: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: 'yellow',
    borderRadius: 10,
  },
  container_khung: {
    width: FontSize.verticalScale(100),
    justifyContent: 'center',
    alignItems: 'center',
    margin: 2,
  },
});
