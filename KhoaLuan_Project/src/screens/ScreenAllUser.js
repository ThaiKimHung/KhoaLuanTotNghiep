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
import {Avatar, Accessory, SearchBar} from 'react-native-elements';
import {GetAllUser} from '../apis/apiUser';

const avatar = require('../assets/images/avatar.png');
// const congratulation = require('../assets/images/congratulations.png');
const Online = () => {
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

const Offine = () => {
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
export default class ScreenAllUser extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DsUser: [],
      refresh: true,
      searchText: '',
      filteredData: [],
    };
  }
  _GetAllUser = async () => {
    let res = await GetAllUser();
    console.log('ress all user', res);
    if (res.status == 1) {
      this.setState({
        DsUser: res.Data,
        refresh: !this.state.refresh,
      });
    } else {
      this.setState({refresh: !this.state.refresh});
      alert('thất bại');
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
        <Avatar
          size="medium"
          rounded
          containerStyle={{margin: 5}}
          source={
            item.Avatar
              ? {uri: item.Avatar}
              : {
                  uri:
                    'https://png.pngtree.com/png-clipart/20190904/original/pngtree-black-round-pattern-user-cartoon-avatar-png-image_4492904.jpg',
                }
          }
          activeOpacity={0.7}
        />

        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
            paddingRight: 10,
          }}>
          <Text>{item.Username}</Text>
          {item.TinhTrang === true ? <Online></Online> : <Offine></Offine>}
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
  search = (searchText) => {
    this.setState({searchText: searchText});
    let filteredData = this.state.DsUser.filter(function (item) {
      return item.Username.includes(searchText);
    });
    this.setState({filteredData: filteredData});
  };

  componentDidMount() {
    this._GetAllUser();
  }

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
});
