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
} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';

const search = require('../assets/images/search.png');

const lstPH = [
  {
    id: 0,
    name: 'Cơ sở vật chất',
  },
  {
    id: 1,
    name: 'Chi phí dịch vụ',
  },
  {
    id: 2,
    name: 'Quyền lợi',
  },
  {
    id: 3,
    name: 'Khác',
  },
];
export class ThemPhanHoi extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      selectLyDo: '',
      dsNhom: [],
    };
  }
  _GetDSGroup = async () => {
    // let res = await GetDSGroup(await Utils.ngetStorage(nkey.id_user));
    let res = await GetDSGroup(1);
    console.log('res', res);
    if (res.status == 1) {
      this.setState({
        dsNhom: res.Data,
      });
      console.log('state', this.state.dsNhom);
    }
  };

  _renderActive = () => {
    this.setState({isActive: !this.state.isActive});
  };
  // _keyExtractor = ({ item, index }) => index.toString();
  _callBack = (item) => {
    this.setState(
      {
        selectLyDo: item,
      },
      () => this._renderActive(),
    );
  };

  _keyExtrac = (item, index) => `${item.ID_group}`;
  _renderPH = ({item, index}) => {
    return (
      <View
        key={index}
        style={{
          backgroundColor: 'white',
        }}>
        <TouchableOpacity
          onPress={() => this._callBack(item)}
          style={{paddingHorizontal: 15, paddingVertical: 16}}>
          <Text>{item.Ten_Group}</Text>
        </TouchableOpacity>
        <View
          style={{
            height: 2,
            width: '100%',
            // backgroundColor: colors.black_20,
          }}></View>
      </View>
    );
  };

  componentDidMount = () => {
    this._GetDSGroup();
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
        <View style={{marginHorizontal: 15, marginTop: 20}}>
          <Text
            style={[
              {
                fontSize: 12,
                color: 'gray',
                paddingLeft: 5,
              },
            ]}>
            Lý do phản hồi
          </Text>
          <TouchableOpacity
            onPress={this._renderActive}
            style={[
              {
                fontSize: 14,
                paddingLeft: 5,
                borderBottomWidth: 1.5,
                borderRadius: 2,
                borderBottomColor: 'gray',
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginTop: 5,
              },
            ]}>
            <Text numberOfLines={1} style={[{fontSize: 14, flex: 1}]}>
              {selectLyDo.Ten_Group ? selectLyDo.Ten_Group : ''}
            </Text>
            <Image
              source={search}
              style={[{tintColor: 'gray', width: 14, height: 14}]}
              resizeMode="contain"
            />
          </TouchableOpacity>
          {
            isActive == true ? (
              <FlatList
                style={{
                  marginTop: 1,
                  backgroundColor: 'white',
                  height: 'auto',
                  borderRadius: 10,
                  borderWidth: 2,
                  borderColor: 'gray',
                  borderBottomColor: 'white',
                }}
                data={this.state.dsNhom}
                renderItem={this._renderPH}
                // keyExtractor={(item, index) => index.toString()}
                keyExtractor={this._keyExtrac}
              />
            ) : null
            // <View style={{ backgroundColor: 'red', height: 30, }}></View> : null
          }
        </View>
      </View>
    );
  }
}

export default ThemPhanHoi;
