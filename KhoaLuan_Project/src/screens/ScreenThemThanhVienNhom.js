import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
  Dimensions,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import FontSize from '../components/size';
import {Avatar, SearchBar} from 'react-native-elements';

import {GetDSUser_filter_InGroup, addUserGroup} from '../apis/apiUser';
import Utils from '../apis/Utils';
import {showMessage, hideMessage} from 'react-native-flash-message';
const check = require('../assets/images/check.png');
const avatar = require('../assets/images/avatar.jpg');
const goback = require('../assets/images/go-back-left-arrow.png');
const add = require('../assets/images/add.png');

// const congratulation = require('../assets/images/congratulations.png');
export default class ScreenThanhVienNhom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsUser: [],
      refresh: true,
      searchText: '',
      filteredData: [],
      idgroup: '',
      check: false,
    };
  }

  NhanData = async () => {
    const {
      id_nguoidang = {},
    } = this.props.route.params.id_nguoidang.id_nguoidang;
    this.setState({
      idgroup: id_nguoidang.ID_group,
    });
    // await console.log('nhan data', id_nguoidang);
  };

  _AddUserGroup = async (iduser, username) => {
    let strBody = JSON.stringify({
      Id_Group: this.state.idgroup,
      id_user: 0,
      quyen_group: false,
    });
    // console.log('strBody add user group==============', strBody);
    let res = await addUserGroup(this.state.idgroup, iduser, strBody);
    // console.log(
    //   'res  add user group==========',
    //   res,
    //   this.state.idgroup,
    //   iduser,
    // );
    if (res.status == 1) {
      this._GetAllUser();
      showMessage({
        message: 'Thông báo',
        description: 'Thêm thành viên ' + username + ' thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
    }
  };

  _GetAllUser = async () => {
    let res = await GetDSUser_filter_InGroup(this.state.idgroup);
    // console.log('ress all user bên thêm user', res);
    if (res.status == 1) {
      this.setState({
        DsUser: res.Data,
        refresh: false,
      });
    } else {
      this.setState({refresh: false});
      alert('thất bại tải user all');
    }
  };
  handleNoiDung(text) {
    this.setState({
      check: text,
    });
  }

  _renderItem = ({item, index}) => {
    return (
      <View style={[styles.khungchua]}>
        <View
          style={{
            marginLeft: 5,
            borderRadius: 30,
            height: FontSize.scale(30),
            width: FontSize.verticalScale(30),
            margin: 10,
          }}>
          <Image
            style={{
              height: FontSize.scale(30),
              width: FontSize.verticalScale(30),
              borderRadius: 30,
            }}
            resizeMode="cover"
            source={item.Avatar ? {uri: item.Avatar} : avatar}></Image>
        </View>

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            paddingRight: 10,
          }}>
          <Text>{item.Username}</Text>
          <TouchableOpacity
            onPress={() =>
              Alert.alert(
                'Thông Báo',
                'Bạn Muốn Thêm Thành Viên ?' + item.Username,
                [
                  {
                    text: 'Đồng ý',
                    onPress: () =>
                      this._AddUserGroup(item.ID_user, item.Username),
                  },
                  {
                    text: 'Hủy',
                    style: 'cancel',
                  },
                ],
                {cancelable: false},
              )
            }>
            <Image
              source={add}
              style={{
                height: FontSize.scale(15),
                width: FontSize.verticalScale(15),
                // borderRadius: 30,
              }}></Image>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  EmptyListMessage = ({item}) => {
    return (
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No User Found
      </Text>
    );
  };

  search = (searchText) => {
    this.setState({searchText: searchText});
    let filteredData = this.state.DsUser.filter((item) =>
      Utils.removeAccents(item['Username'])
        .toUpperCase()
        .includes(Utils.removeAccents(searchText.toUpperCase())),
    );
    this.setState({filteredData: filteredData});
  };

  async componentDidMount() {
    await this.NhanData();
    await this._GetAllUser();
  }

  render() {
    // console.log('this thêm thành viên nhóm', this.props);
    return (
      <View style={styles.container}>
        <View style={styles.back}>
          <View style={{justifyContent: 'center', flexDirection: 'row'}}>
            <TouchableOpacity
              onPress={() => Utils.goback(this, '')}
              style={{justifyContent: 'center', marginLeft: 5}}>
              <Image
                source={goback}
                style={{
                  height: FontSize.scale(13),
                  width: FontSize.verticalScale(18),
                }}></Image>
            </TouchableOpacity>
            <Text style={styles.title}> Thêm thành viên nhóm</Text>
          </View>
        </View>
        <View style={styles.header}>
          <SearchBar
            placeholder="Tìm thành viên..."
            showCancel="true"
            platform="android"
            containerStyle={{
              backgroundColor: '#DDDDDD80',
              borderRadius: 20,
              height: FontSize.scale(40),
              justifyContent: 'center',
            }}
            onChangeText={this.search}
            value={this.state.searchText}
          />
        </View>
        <View style={styles.footer}>
          <FlatList
            data={
              this.state.filteredData && this.state.filteredData.length > 0
                ? this.state.filteredData
                : this.state.DsUser
            }
            renderItem={this._renderItem}
            keyExtractor={(item, index) => index.toString()}
            refreshing={this.state.refresh}
            onRefresh={() => {
              this.setState({refresh: true}, this._GetAllUser);
            }}
            ListEmptyComponent={this.EmptyListMessage}
          />
        </View>
      </View>
    );
  }
}
const widthScreen = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    // backgroundColor: '#4285F4',
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
    height: '92%',
    width: '100%',
    // paddingTop: 5,
    // padding: 10,
  },
  khungchua: {
    flexDirection: 'row',
    // padding: 10,
    marginTop: 5,
    // justifyContent: 'flex-start',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    backgroundColor: '#C0C0C020',
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
  back: {
    flexDirection: 'row',
    height: FontSize.scale(45),
    backgroundColor: '#007DE3',
    alignItems: 'center',
    // justifyContent: 'center',
    // marginBottom: 10,
  },
  title: {
    fontSize: FontSize.reSize(20),
    marginLeft: 10,
    // textAlign: 'center',
  },
});
