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
import {
  Update_Quyen_User,
  GetDSUser_In_Group,
  GetDSAllUser_In_Group,
  DeleteUserGroup,
} from '../apis/apiUser';
import Utils from '../apis/Utils';
import {nkey} from '../apis/keyStore';
import {showMessage, hideMessage} from 'react-native-flash-message';

const avatar = require('../assets/images/avatar.png');
const goback = require('../assets/images/go-back-left-arrow.png');
const update = require('../assets/images/up-arrow.png');
const de_lete = require('../assets/images/cancel.png');
const xoa = require('../assets/images/delete.png');
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
      id_user: '',
    };
  }

  NhanData = async () => {
    const {
      id_nguoidang = {},
    } = this.props.route.params.id_nguoidang.id_nguoidang;

    this.setState({
      idgroup: id_nguoidang.ID_group,
      id_user: id_nguoidang.id_user,
    });
    // await console.log(
    //   'id nguoi dang ben thanh vien nhom =========',
    //   id_nguoidang,
    // );
  };

  _GetAllUser = async () => {
    let iduser = await Utils.ngetStorage(nkey.id_user);
    let res = await GetDSAllUser_In_Group(this.state.idgroup, iduser);
    // console.log('ress all user bên thành viên nhóm ==============', res);
    if (res.status == 1) {
      this.setState({
        DsUser: res.Data,
        refresh: false,
      });
    } else {
      this.setState({refresh: false});
      alert('thất bại lấy tất cả thành viên thêm tv nhóm');
    }
  };

  _DeleteUserGroup = async (iduser, username) => {
    let res = await DeleteUserGroup(this.state.idgroup, iduser);
    // console.log('res xóa user group-========', res);
    if (res.status == 1) {
      this._GetAllUser();
      showMessage({
        message: 'Thông báo',
        description: 'Xóa thành viên ' + username + ' thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
    }
  };

  Updata_Quyen = async (iduser_update, quyen_group, username) => {
    let strBody = JSON.stringify({
      Id_Group: this.state.idgroup,
      id_user: 0,
      quyen_group: quyen_group,
    });

    // console.log('strBody update quyên==============', strBody);
    let res = await Update_Quyen_User(iduser_update, strBody);
    // console.log('res update  update quyên=========', res);
    if (res.status == 1) {
      this._GetAllUser();
      showMessage({
        message: 'Thông báo',
        description:
          'Cập nhật quyền của thành viên ' + username + ' thành công',
        type: 'success',
        duration: 1500,
        icon: 'success',
      });
    }
  };

  _renderItem = ({item, index}) => {
    // console.log('item========', item);
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

          {item.quyen_group ? (
            <TouchableOpacity
              onPress={() =>
                Alert.alert(
                  'Thông Báo',
                  'Bạn Muốn Cập Nhật Quyền Của Thành Viên ? ' + item.Username,
                  [
                    {
                      text: 'Đồng ý',
                      onPress: () =>
                        this.Updata_Quyen(
                          item.id_user,
                          !item.quyen_group,
                          item.Username,
                        ),
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
                source={de_lete}
                style={{
                  height: FontSize.scale(15),
                  width: FontSize.verticalScale(15),
                  // borderRadius: 30,
                }}></Image>
            </TouchableOpacity>
          ) : (
            <View style={{flexDirection: 'row'}}>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Thông Báo',
                    'Bạn Muốn Cập Nhật Quyền Của Thành Viên ?' + item.Username,
                    [
                      {
                        text: 'Đồng ý',
                        onPress: () =>
                          this.Updata_Quyen(
                            item.id_user,
                            !item.quyen_group,
                            item.Username,
                          ),
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
                  source={update}
                  style={{
                    height: FontSize.scale(15),
                    width: FontSize.verticalScale(15),
                    // borderRadius: 30,
                  }}></Image>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() =>
                  Alert.alert(
                    'Thông Báo',
                    'Bạn Muốn Xóa Thành Viên ?' + item.Username,
                    [
                      {
                        text: 'Đồng ý',
                        onPress: () =>
                          this._DeleteUserGroup(item.id_user, item.Username),
                      },
                      {
                        text: 'Hủy',
                        style: 'cancel',
                      },
                    ],
                    {cancelable: false},
                  )
                }
                style={{marginLeft: 5}}>
                <Image
                  source={xoa}
                  style={{
                    height: FontSize.scale(15),
                    width: FontSize.verticalScale(15),
                    // borderRadius: 30,
                  }}></Image>
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };
  EmptyListMessage = ({item}) => {
    return (
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
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
    // console.log('this thành viên nhóm', this.props);
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
            <Text style={styles.title}> Tất cả thành viên nhóm</Text>
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
