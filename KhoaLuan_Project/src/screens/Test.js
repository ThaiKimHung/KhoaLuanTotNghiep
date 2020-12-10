import React, {Component, Fragment} from 'react';
import {GetAllUser} from '../apis/apiUser';
import {
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
  StatusBar,
  Image,
  SafeAreaView,
  ImageBackground,
  Button,
  ActivityIndicator,
  Alert,
} from 'react-native';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {GetDSBaiDang} from '../apis/apiUser';
export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsUser: [],
      refresh: true,
      selectedItems: [],
    };
  }
  _GetDSBaiDang = async () => {
    let id_user = await Utils.ngetStorage(nkey.id_user);
    let res = await GetDSBaiDang(await Utils.ngetStorage(nkey.id_user));
    console.log('Danh sách bài đăng Screen all bài đăng:', res);
    // if (res.status == 1) {
    //   this.setState({
    //     DSBaiDang: res.data,
    //     refresh: !this.state.refresh,
    //     length: this.state.DSBaiDang.length,
    //   });
    // } else {
    //   this.setState({refresh: !this.state.refresh});
    //   alert('thất bại');
    // }
  };
  componentDidMount() {
    this._GetDSBaiDang();
    // console.log('this', this.state.DsUser);
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.headingText}>
          Searchable Dropdown from Dynamic Array from Server
        </Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 10,
  },
  titleText: {
    padding: 8,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  headingText: {
    padding: 8,
  },
});
