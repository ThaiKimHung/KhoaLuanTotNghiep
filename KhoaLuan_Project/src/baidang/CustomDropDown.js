import React, {Component} from 'react';
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

// import HeaderCom from '../../components/HeaderCom'
// import ItemDrop from './ItemDrop'
// import { nstyles, Height, Width } from '../../styles/styles'
// import InputCus from '../../components/ComponentApps/InputCus'
// import { reText } from '../../styles/size'
// import { colors } from '../../styles'
// import { Images } from '../../images'
const search = require('../assets/images/search.png');
import Utils from '../apis/Utils';
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
      selectLyDo: lstPH[0],
      dsNhom: [],
    };
  }
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
    // Utils.nlog('Buoc xu ly', item);
  };
  // _DropDown = () => {
  //     this.setState({
  //         lstPH[this.state.selectLyDo.id]: this.state.selectLyDo
  //     }, () => this._callBack())
  // }
  _keyExtrac = (item, index) => `${item.id}`;
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
          <Text>{item.name}</Text>
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
              {selectLyDo.name ? selectLyDo.name : ''}
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
                data={lstPH}
                renderItem={this._renderPH}
                // keyExtractor={(item, index) => index.toString()}
                keyExtractor={this._keyExtrac}
              />
            ) : null
            // <View style={{ backgroundColor: 'red', height: 30, }}></View> : null
          }
          <View style={{flex: 1, marginTop: 18}}>
            <Text style={{color: 'gray', fontSize: 12, marginBottom: 7}}>
              Nội dung phản hồi
            </Text>
            <TextInput
              placeholder="Nội dung phản hồi"
              placeholderTextColor="gray"
              //underlineColorAndroid={'transparent'}
              style={{
                borderWidth: 1,
                borderColor: 'gray',
                height: 200,
                borderRadius: 10,
                opacity: 0.6,
                maxHeight: '40%',
                paddingLeft: 10,
              }}
              textAlignVertical="top"
              multiline={true}
              numberOfLines={3}
            />
          </View>
        </View>
      </View>
    );
  }
}

export default ThemPhanHoi;
