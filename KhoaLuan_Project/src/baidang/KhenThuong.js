import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
  FlatList,
  ActivityIndicator,
  Dimensions,
  Image,
  ScrollView,
} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {SearchBar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/Feather';
import {showMessage, hideMessage} from 'react-native-flash-message';

import Utils from '../apis/Utils';
import FontSize from '../components/size';
import SvgUri from 'react-native-svg-uri';
import GoBack from '../components/GoBack';

import {GetDSKhenThuong} from '../apis/apiUser';
import {nGlobalKeys} from '../apis/globalKey';
import {nkey} from '../apis/keyStore';
import {GetDSGroup} from '../apis/apiUser';
import DropDownPicker from 'react-native-custom-dropdown';

const goback = require('../assets/images/go-back-left-arrow.png');
const search = require('../assets/images/search.png');
const group = require('../assets/images/group_people.png');
export default class KhenThuong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsKhenThuong: [],
      refresh: true,
      selectedItem: 0,
      userSelected: 0,
      noidung: '',
      user: {},
      DataChuyenVe: {},
      DataNhom: {},
      value: null,
      dsNhom: [],
      mangtam: [],
    };
  }
  EmptyListMessage = ({item}) => {
    return (
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };
  _GetDsKhenThuong = async () => {
    let res = await GetDSKhenThuong();
    // console.log('res ds khen thưởng', res);
    if (res.status === 1) {
      this.setState({
        DsKhenThuong: res.Data,
        refresh: !this.state.refresh,
      });
    } else {
      this.setState({
        refresh: !this.state.refresh,
      });
    }
  };

  // updateSearch = (search) => {
  //   this.setState({search});
  // };
  handleNoiDung(text) {
    this.setState({
      noidung: text,
    });
  }

  ChuyenData = async (item) => {
    Utils.goscreen(this, 'KhenThuong');
    this.setState({
      DataChuyenVe: item,
    });
  };

  ChuyenDataNhom = async (item) => {
    Utils.goscreen(this, 'KhenThuong');
    // Utils.goscreen(this, 'Modal_Nhom');
    this.setState({
      DataNhoms: item,
    });
    console.log('item nhóm truyền về', item);
  };
  GanDataSauKhiChuyenVe = () => {
    this.state.DataChuyenVe
      ? this.setState({
          userSelected: this.state.DataChuyenVe.ID_user,
        })
      : null;
    // console.log('user selected', this.state.userSelected);
  };

  _GetDSGroup = async () => {
    // let res = await GetDSGroup(await Utils.ngetStorage(nkey.id_user));
    let res = await GetDSGroup(2);
    console.log('res', res);
    if (res.status == 1) {
      this.setState({
        dsNhom: res.Data,
      });
      console.log('state', this.state.dsNhom);
    }
  };
  LaymangTam = async () => {
    let temp = this.state.dsNhom.map((e) => {
      var ritem = {};
      ritem['value'] = e.ID_group + '';
      ritem['label'] = e.Ten_Group;
      return ritem;
    });
    await this.setState({mangtam: temp});
  };

  renderItem = ({item, index}) => {
    return (
      <View>
        {this.state.selectedItem == item.ID_khenthuong ? (
          <TouchableOpacity
            onPress={() => {
              if (this.state.selectedItem == item.ID_khenthuong) {
                this.setState({
                  selectedItem: '',
                });
              }
            }}
            style={[
              styles.khung,
              {
                marginLeft: index % 2 != 0 ? 5 : 0,
                backgroundColor: '#87CEFF',
              },
            ]}>
            <View style={styles.khung_DS}>
              <SvgUri
                width={FontSize.scale(100)}
                height={FontSize.verticalScale(100)}
                source={{
                  uri: item.icon,
                }}
              />
              <Text style={{margin: 5, textAlign: 'center'}}>
                {item.tieude}
              </Text>
            </View>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            onPress={() => {
              this.setState({
                selectedItem: item.ID_khenthuong,
              });
            }}
            style={[
              styles.khung,
              {marginLeft: index % 2 != 0 ? 5 : 0, backgroundColor: 'yellow'},
            ]}>
            <View style={styles.khung_DS}>
              <SvgUri
                width={FontSize.scale(100)}
                height={FontSize.verticalScale(100)}
                source={{
                  uri: item.icon,
                }}
              />
              <Text style={{margin: 5, textAlign: 'center'}}>
                {item.tieude}
              </Text>
            </View>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  componentDidMount = async () => {
    await this._GetDsKhenThuong();
    await this.GanDataSauKhiChuyenVe();
    await this._GetDSGroup();
    await this.LaymangTam();
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.back}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              // backgroundColor: '#007DE3',
            }}>
            <View
              style={{
                flexDirection: 'row',
                margin: 5,
                alignItems: 'center',
                width: '100%',
              }}>
              <TouchableOpacity
                onPress={() => {
                  Utils.goback(this, '');
                }}>
                <Image
                  source={goback}
                  style={{
                    height: FontSize.scale(13),
                    width: FontSize.verticalScale(18),
                  }}></Image>
              </TouchableOpacity>
              <View
                style={{
                  flex: 1,
                  alignItems: 'center',
                }}>
                <Text style={styles.title}>Tạo tin khen thưởng</Text>
              </View>
              <View style={{justifyContent: 'center'}}>
                {this.state.userSelected != 0 &&
                this.state.noidung != '' &&
                this.state.selectedItem != 0 ? (
                  <TouchableOpacity>
                    <Text style={styles.textDang}>Đăng</Text>
                  </TouchableOpacity>
                ) : (
                  <Text style={styles.textDang_invisibale}>Đăng</Text>
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.header}>
          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSize.reSize(20),
              marginBottom: 5,
            }}>
            Chọn thành viên:
          </Text>
          <TouchableOpacity
            style={styles.thanh_search}
            onPress={async () => {
              Utils.goscreen(this, 'SearchUser', {chuyenData: this.ChuyenData});
            }}>
            <Image source={search} style={styles.icon}></Image>
            {this.state.DataChuyenVe ? (
              <Text
                style={{
                  fontSize: FontSize.reSize(20),
                  marginLeft: 10,
                  color: '#000000',
                  flex: 1,
                }}>
                {this.state.DataChuyenVe.Username}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: FontSize.reSize(20),
                  marginLeft: 10,
                  color: '#69696980',
                  flex: 1,
                }}>
                Mời bạn chọn nhân viên
              </Text>
            )}
          </TouchableOpacity>

          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSize.reSize(20),
              marginBottom: 5,
            }}>
            Nhập nội dung:
          </Text>
          <TextInput
            autoCapitalize="none"
            placeholderTextColor="#69696980"
            placeholder="Nội dung bài đăng"
            multiline={true}
            style={styles.textinput}
            onChangeText={(text) => this.handleNoiDung(text)}></TextInput>

          <Text
            style={{
              fontWeight: 'bold',
              fontSize: FontSize.reSize(20),
              marginBottom: 5,
            }}>
            Chọn Nhóm:
          </Text>
          <TouchableOpacity
            style={styles.thanh_search}
            onPress={async () => {
              Utils.goscreen(this, 'Modal_Nhom', {
                DataNhomVe: this.ChuyenDataNhom,
              });
            }}>
            <Image source={group} style={styles.icon}></Image>

            {this.state.DataNhom ? (
              <Text
                style={{
                  fontSize: FontSize.reSize(20),
                  marginLeft: 10,
                  color: '#000000',
                  flex: 1,
                }}>
                {this.state.DataNhom.Ten_Group}
              </Text>
            ) : (
              <Text
                style={{
                  fontSize: FontSize.reSize(20),
                  marginLeft: 10,
                  color: '#69696980',
                  flex: 1,
                }}>
                Mời bạn chọn nhóm
              </Text>
            )}
          </TouchableOpacity>
          <DropDownPicker
            // onOpen={() => {
            //   this.setState({
            //     pdiing: true,
            //     isOpen: true,
            //   });
            // }}
            items={this.state.mangtam}
            // defaultValue={}
            style={{backgroundColor: 'red', minHeight: 50}}
            itemStyle={{
              justifyContent: 'flex-start',
            }}
            // onClose={() => {
            //   this.setState({isOpen: false});
            // }}
            dropDownStyle={{backgroundColor: 'red', position: 'absolute'}}
            // onChangeItem={(item) =>
            //   this.setState({
            //     country: item.value,
            //   })
            // }
          ></DropDownPicker>
        </View>
        <View style={styles.footer}>
          {this.state.DsKhenThuong.length != 0 ? (
            <FlatList
              data={this.state.DsKhenThuong}
              renderItem={this.renderItem}
              ItemSeparatorComponent={() => <View style={{height: 10}}></View>}
              numColumns={2}
              keyExtractor={(item, index) => index.toString()}
              ListEmptyComponent={this.EmptyListMessage}
              refreshing={this.state.refresh}
              onRefresh={() => {
                this.setState({refresh: true}, this._GetDsKhenThuong);
              }}
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
const heightScreen = Dimensions.get('screen').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    backgroundColor: '#9C9C9C',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 10,
    marginHorizontal: 10,
    // marginVertical: 10,
  },
  footer: {
    height: '100%',
    width: '100%',
    padding: 10,
  },
  khung: {
    // flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderRadius: 10,
    height: FontSize.scale(heightScreen / 2.5),
    width: FontSize.verticalScale(widthScreen / 2.5),
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
    margin: 2,
  },
  textinput: {
    backgroundColor: '#DDDDDD80',
    borderRadius: 20,
    paddingLeft: 20,
    fontSize: FontSize.reSize(20),
    maxHeight: 150,
  },
  thanh_search: {
    height: FontSize.scale(40),
    backgroundColor: '#DDDDDD80',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    marginBottom: 5,
  },
  icon: {
    width: FontSize.scale(25),
    height: FontSize.verticalScale(25),
    marginLeft: 5,
    tintColor: '#696969',
    marginLeft: 10,
  },
  back: {
    flexDirection: 'row',
    // backgroundColor: 'green',
    height: FontSize.scale(50),
    backgroundColor: '#007DE3',
    // backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    marginBottom: 10,
  },
  title: {
    fontSize: FontSize.reSize(20),
    marginLeft: 10,
    // textAlign: 'center',
  },
  textDang: {
    fontSize: FontSize.reSize(20),
    marginRight: 10,
  },
  textDang_invisibale: {
    fontSize: FontSize.reSize(20),
    marginRight: 10,
    color: '#696969',
    textAlign: 'center',
  },
});
