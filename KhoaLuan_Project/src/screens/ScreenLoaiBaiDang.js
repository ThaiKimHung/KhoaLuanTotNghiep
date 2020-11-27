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
import FontSize from '../components/size';
import LoaiBaiDang from '../components/LoaiBaiDang';
import {GetLoaiBaiDang} from '../apis/apiUser';

const thaoluan = require('../assets/images/conversation.png');
// const congratulation = require('../assets/images/congratulations.png');
export default class ScreenLoaiBaiDang extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsLoaiBaiDang: [],
    };
    this.userID = 1;
  }

  _GetDsLoaiBaiDang = async () => {
    let res = await GetLoaiBaiDang(this.userID);
    console.log('ress', res);
    this.setState({DsLoaiBaiDang: res.data});
  };

  componentDidMount() {
    this._GetDsLoaiBaiDang(this.userID);
  }

  loadBaiDang = () => {
    const {DsLoaiBaiDang} = this.state;
    console.log('=-=-=DsLoaiBaiDang', DsLoaiBaiDang);

    return DsLoaiBaiDang.map((e) => {
      return (
        <LoaiBaiDang anh={e.Icon_BaiDang} tennhom={e.TenLoaiDang}></LoaiBaiDang>
      );
    });
  };

  render() {
    return <View style={styles.container}>{this.loadBaiDang()}</View>;
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
});
