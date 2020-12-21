import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';
import GoBack from '../components/GoBack';
import {
  GetDSKhenThuong,
  AddBaiDang_KhenThuong,
  AddBaiDang_KhenThuong_Nhom,
  GetDSGroup,
  GetChiTietBaiDang,
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const search = require('../assets/images/search.png');

export class ThemPhanHoi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      selectLyDo: '',
      ChiTietBD: [],
    };
  }
  _GetChiTietBaiDang = async () => {
    let res = await GetChiTietBaiDang(2, 2326);
    console.log('res chi tiết bài đăng', res);
    if (res.status == 1) {
      this.setState({
        ChiTietBD: res.data,
      });
      this.setState({
        user: this.state.ChiTietBD ? this.state.ChiTietBD[0].User_DangBai : [],
      });
      await console.log('chi tiết bd', this.state.ChiTietBD);
      await console.log(
        'chi user',
        this.state.ChiTietBD[0].User_DangBai[0].Username,
      );
      await console.log('chi user 2', this.state.user[0].Username);
    }
  };

  componentDidMount = () => {
    this._GetChiTietBaiDang();
  };
  render() {
    const {isActive, selectLyDo} = this.state;
    return (
      <View style={{flex: 1}}>
        {/* <HeaderCom
          nthis={this}
          iconRight={Images.icSave}
          onPressRight={() => Utils.nlog('Luu du lieu')}
        /> */}
        <Text>hi</Text>
      </View>
    );
  }
}

export default ThemPhanHoi;
