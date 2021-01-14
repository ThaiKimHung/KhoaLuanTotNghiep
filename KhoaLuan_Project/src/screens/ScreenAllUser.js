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
import {SearchBar} from 'react-native-elements';
import {GetAllUser, GetDSNhanVien} from '../apis/apiUser';
import Utils from '../apis/Utils';
const avatar = require('../assets/images/avatar.jpg');
import {ROOTGlobal} from '../apis/dataGlobal';
// const congratulation = require('../assets/images/congratulations.png');

export default class ScreenAllUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsUser: [],
      refresh: true,
      searchText: '',
      filteredData: [],
    };
    ROOTGlobal.GetDsUser = this._GetAllUser;
  }

  Online = () => {
    return (
      <View
        style={{
          height: FontSize.scale(10),
          width: FontSize.verticalScale(10),
          backgroundColor: 'green',
          borderRadius: 8,
        }}></View>
    );
  };

  Offine = () => {
    return (
      <View
        style={{
          height: FontSize.scale(10),
          width: FontSize.verticalScale(10),
          backgroundColor: 'gray',
          borderRadius: 8,
        }}></View>
    );
  };

  hamloadLienTuc = () => {
    setInterval(async () => {
      await this._GetAllUser();
    }, 1000);
  };

  _GetAllUser = async () => {
    let res = await GetDSNhanVien();
    // console.log('ress all user', res);
    if (res.status == 1) {
      this.setState({
        DsUser: res.Data,
        refresh: false,
      });
    } else {
      this.setState({refresh: false});
      alert('thất bại tải all user');
    }
  };
  FoodterMessage = ({item}) => {
    return (
      <View onPress={() => getItem(item)}>
        <ActivityIndicator size="small" color="#0078D7"></ActivityIndicator>
      </View>
    );
  };
  _renderItem = ({item, index}) => {
    return (
      <TouchableOpacity style={[styles.khungchua]}>
        {/* <View
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
        </View> */}

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            paddingRight: 10,
          }}>
          <Text style={{marginLeft: 10}}>{item.hoten}</Text>

          {/* {item.TinhTrang === true ? this.Online() : this.Offine()} */}
        </View>
      </TouchableOpacity>
    );
  };
  EmptyListMessage = ({item}) => {
    return (
      // Flat List Item
      <Text style={styles.emptyListStyle} onPress={() => getItem(item)}>
        No Data Found
      </Text>
    );
  };

  Listfooter = () => {
    return (
      // Flat List Item
      <View
        style={{
          flex: 1,
          // backgroundColor: 'red',
          height: 70,
          width: '100%',
          // justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{fontSize: 15, alignItems: 'center', color: '#4F4F4F50'}}>
          ----------------------------- End -----------------------------
        </Text>
      </View>
    );
  };
  search = async (searchText) => {
    await this.setState({searchText: searchText});
    // let filteredData = this.state.DsUser.filter(function (item) {
    //   return item.Username.includes(searchText);
    // });
    let filteredData = this.state.DsUser.filter((item) =>
      Utils.removeAccents(item['hoten'])
        .toUpperCase()
        .includes(Utils.removeAccents(searchText.toUpperCase())),
    );
    await this.setState({filteredData: filteredData});
  };

  componentDidMount = async () => {
    await this._GetAllUser();
    // await this.hamloadLienTuc();
  };

  render() {
    // console.log(' ds user dưới body', this.state.DsUser);

    return (
      <View style={styles.container}>
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
        <View style={styles.header}>
          <Text style={{fontWeight: 'bold', fontSize: FontSize.reSize(20)}}>
            Tất cả các thành viên
          </Text>
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
            ListFooterComponent={this.Listfooter}
            // ListFooterComponentStyle={{
            //   backgroundColor: 'blue',
            //   position: 'relative',
            //   width: '100%',
            //   bottom: 0,
            // }}
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
    padding: 10,
    // backgroundColor: 'yellow',
  },
  header: {
    backgroundColor: '#4285F4',
    height: FontSize.scale(50),
    justifyContent: 'center',
    width: '100%',
    padding: 10,
    borderRadius: 10,
    marginTop: 10,
  },
  footer: {
    // flex: 1,
    // backgroundColor: 'green',
    // flexDirection: 'row',
    height: '92%',
    width: '100%',
    paddingTop: 5,
  },
  khungchua: {
    flexDirection: 'row',
    // padding: 10,
    marginTop: 5,
    // justifyContent: 'flex-start',
    borderRadius: 10,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#C0C0C0',
    backgroundColor: '#C0C0C020',
    height: FontSize.scale(50),
  },
  emptyListStyle: {
    padding: 10,
    fontSize: 18,
    textAlign: 'center',
  },
});
